// ============================================================
// Vesturo Transformations — AI Service
// Puter.js integration for free AI model access
// ============================================================

const AIService = {

  _initialized: false,
  _initializing: false,

  // ──────────────────────────────────────────────
  // INITIALIZE PUTER.JS
  // ──────────────────────────────────────────────
  async init() {
    if (this._initialized) return true;
    if (this._initializing) {
      // Wait for ongoing initialization
      return new Promise((resolve) => {
        const check = setInterval(() => {
          if (this._initialized) {
            clearInterval(check);
            resolve(true);
          }
        }, 100);
      });
    }

    this._initializing = true;

    try {
      // Check if puter is available (loaded via CDN in HTML)
      if (typeof puter === 'undefined') {
        throw new Error('Puter.js not loaded. Please check your internet connection.');
      }

      this._initialized = true;
      this._initializing = false;
      console.log('[Vesturo AI] Puter.js ready');
      return true;
    } catch (err) {
      this._initializing = false;
      console.error('[Vesturo AI] Init failed:', err);
      throw err;
    }
  },

  // ──────────────────────────────────────────────
  // GENERATE PROMPT VIA AI
  // ──────────────────────────────────────────────
  async generatePrompt(modelId, systemPrompt, userPrompt, onChunk) {
    if (modelId.startsWith('nvidia/')) {
      const actualModelName = modelId.replace('nvidia/', '');
      return await this._nvidiaGenerate(actualModelName, systemPrompt, userPrompt, onChunk);
    }

    await this.init();

    try {
      // Use streaming if callback provided
      if (onChunk && typeof onChunk === 'function') {
        return await this._streamGenerate(modelId, systemPrompt, userPrompt, onChunk);
      } else {
        return await this._fullGenerate(modelId, systemPrompt, userPrompt);
      }
    } catch (err) {
      console.error('[Vesturo AI] Generation failed:', err);

      // Retry once with fallback model
      if (modelId !== 'claude-sonnet-4-6') {
        console.log('[Vesturo AI] Retrying with Claude Sonnet 4.6...');
        try {
          if (onChunk) {
            return await this._streamGenerate('claude-sonnet-4-6', systemPrompt, userPrompt, onChunk);
          } else {
            return await this._fullGenerate('claude-sonnet-4-6', systemPrompt, userPrompt);
          }
        } catch (retryErr) {
          throw new Error(`AI generation failed: ${retryErr.message}. Please try again or select a different model.`);
        }
      }

      throw new Error(`AI generation failed: ${err.message}. Please try again.`);
    }
  },

  // ──────────────────────────────────────────────
  // NVIDIA NIM STREAMING GENERATION
  // ──────────────────────────────────────────────
  async _nvidiaGenerate(modelName, systemPrompt, userPrompt, onChunk) {
    const apiKey = localStorage.getItem('nvidia_api_key') || document.getElementById('nvidia-key-input')?.value || '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';
    if (!apiKey) {
      throw new Error('Please enter your NVIDIA API Key. You can get one for free at build.nvidia.com.');
    }

    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 4000,
        stream: true
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      let errMsg = response.statusText;
      try {
        const parsed = JSON.parse(errText);
        if (parsed.detail) errMsg = parsed.detail;
        else if (parsed.message) errMsg = parsed.message;
        else if (parsed.error?.message) errMsg = parsed.error.message;
      } catch (e) {}
      throw new Error(`NVIDIA API Error (${response.status}): ${errMsg}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let fullText = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // Keep the last partial line in buffer
        buffer = lines.pop();

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          if (trimmed === 'data: [DONE]') continue;

          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.substring(6);
            try {
              const parsed = JSON.parse(dataStr);
              const content = parsed.choices?.[0]?.delta?.content || '';
              if (content) {
                fullText += content;
                if (onChunk) {
                  onChunk(content, fullText);
                }
              }
            } catch (err) {
              console.warn('[Vesturo AI] Failed to parse SSE line:', trimmed, err);
            }
          }
        }
      }

      // Check if anything remaining in buffer
      if (buffer.trim()) {
        const trimmed = buffer.trim();
        if (trimmed.startsWith('data: ') && trimmed !== 'data: [DONE]') {
          try {
            const parsed = JSON.parse(trimmed.substring(6));
            const content = parsed.choices?.[0]?.delta?.content || '';
            if (content) {
              fullText += content;
              if (onChunk) {
                onChunk(content, fullText);
              }
            }
          } catch (e) {}
        }
      }
    } finally {
      reader.releaseLock();
    }

    return fullText;
  },

  // ──────────────────────────────────────────────
  // FULL (NON-STREAMING) GENERATION
  // ──────────────────────────────────────────────
  async _fullGenerate(modelId, systemPrompt, userPrompt) {
    const response = await puter.ai.chat(userPrompt, {
      model: modelId,
      system: systemPrompt
    });

    // Extract text from response
    if (response && response.message && response.message.content) {
      if (Array.isArray(response.message.content)) {
        return response.message.content
          .filter(block => block.type === 'text')
          .map(block => block.text)
          .join('\n');
      }
      return response.message.content;
    }

    if (typeof response === 'string') {
      return response;
    }

    // Try direct text property
    if (response && response.text) {
      return response.text;
    }

    throw new Error('Unexpected response format from AI model.');
  },

  // ──────────────────────────────────────────────
  // STREAMING GENERATION
  // ──────────────────────────────────────────────
  async _streamGenerate(modelId, systemPrompt, userPrompt, onChunk) {
    let fullText = '';

    try {
      const response = await puter.ai.chat(userPrompt, {
        model: modelId,
        system: systemPrompt,
        stream: true
      });

      // Handle streaming response
      if (response && typeof response[Symbol.asyncIterator] === 'function') {
        for await (const chunk of response) {
          let text = '';
          if (chunk && chunk.text) {
            text = chunk.text;
          } else if (chunk && typeof chunk === 'string') {
            text = chunk;
          } else if (chunk?.message?.content) {
            if (Array.isArray(chunk.message.content)) {
              text = chunk.message.content
                .filter(b => b.type === 'text')
                .map(b => b.text)
                .join('');
            } else {
              text = chunk.message.content;
            }
          }

          if (text) {
            fullText += text;
            onChunk(text, fullText);
          }
        }
      } else {
        // Fallback: not a stream, treat as full response
        fullText = await this._fullGenerate(modelId, systemPrompt, userPrompt);
        onChunk(fullText, fullText);
      }
    } catch (streamErr) {
      // If streaming fails, fall back to non-streaming
      console.warn('[Vesturo AI] Stream failed, falling back to full generation:', streamErr.message);
      fullText = await this._fullGenerate(modelId, systemPrompt, userPrompt);
      onChunk(fullText, fullText);
    }

    return fullText;
  },

  // ──────────────────────────────────────────────
  // LIST AVAILABLE MODELS (optional, for debugging)
  // ──────────────────────────────────────────────
  async listModels() {
    await this.init();
    try {
      const models = await puter.ai.listModels();
      return models;
    } catch (err) {
      console.warn('[Vesturo AI] Could not list models:', err.message);
      return [];
    }
  },

  // ──────────────────────────────────────────────
  // CHECK IF USER IS SIGNED IN
  // ──────────────────────────────────────────────
  async checkAuth() {
    try {
      const isSignedIn = await puter.auth.isSignedIn();
      return isSignedIn;
    } catch {
      return false;
    }
  },

  // ──────────────────────────────────────────────
  // SIGN IN (Puter handles the popup)
  // ──────────────────────────────────────────────
  async signIn() {
    try {
      await puter.auth.signIn();
      return true;
    } catch (err) {
      console.error('[Vesturo AI] Sign-in failed:', err);
      return false;
    }
  }
};

// Export
if (typeof window !== 'undefined') {
  window.AIService = AIService;
}
