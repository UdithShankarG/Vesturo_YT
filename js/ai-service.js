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
