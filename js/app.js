// ============================================================
// Vesturo Transformations — Main App Controller
// UI logic, event handling, form management
// ============================================================

const App = {

  // State
  state: {
    category: '',
    subject: '',
    metals: [],
    colorTheme: '',
    customColor: '',
    shape: '',
    movements: [],
    partCount: 25,
    speed: 6.5,
    model: 'claude-opus-4-8',
    isGenerating: false,
    lastPrompt: '',
    lastMasterPrompt: ''
  },

  // ──────────────────────────────────────────────
  // INITIALIZE
  // ──────────────────────────────────────────────
  init() {
    this.loadSavedState();
    this.renderCategories();
    this.renderMetals();
    this.renderShapes();
    this.renderMovements();
    this.renderColorThemes();
    this.renderModels();
    this.bindEvents();
    this.applySavedState();
    console.log('[Vesturo] App initialized');
  },

  // ──────────────────────────────────────────────
  // RENDER CATEGORIES
  // ──────────────────────────────────────────────
  renderCategories() {
    const select = document.getElementById('category-select');
    if (!select) return;

    select.innerHTML = '<option value="" disabled selected>Select a category…</option>';
    Object.keys(VESTURO_DATA.categories).forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      select.appendChild(opt);
    });
  },

  // ──────────────────────────────────────────────
  // RENDER SUBJECTS (based on selected category)
  // ──────────────────────────────────────────────
  renderSubjects(category) {
    const select = document.getElementById('subject-select');
    if (!select) return;

    const subjects = VESTURO_DATA.categories[category] || [];
    select.innerHTML = '<option value="" disabled selected>Select a subject…</option>';
    subjects.forEach(sub => {
      const opt = document.createElement('option');
      opt.value = sub;
      opt.textContent = sub;
      select.appendChild(opt);
    });

    // Enable the select
    select.disabled = subjects.length === 0;
  },

  // ──────────────────────────────────────────────
  // RENDER METAL PILLS
  // ──────────────────────────────────────────────
  renderMetals() {
    const grid = document.getElementById('metal-pills');
    if (!grid) return;

    grid.innerHTML = '';
    VESTURO_DATA.metals.forEach(metal => {
      const pill = document.createElement('button');
      pill.className = 'pill';
      pill.dataset.id = metal.id;
      pill.textContent = metal.name;
      pill.title = metal.desc;
      pill.type = 'button';
      pill.addEventListener('click', () => this.toggleMetal(metal.name, pill));
      grid.appendChild(pill);
    });
  },

  toggleMetal(name, el) {
    const idx = this.state.metals.indexOf(name);
    if (idx === -1) {
      this.state.metals.push(name);
      el.classList.add('selected');
    } else {
      this.state.metals.splice(idx, 1);
      el.classList.remove('selected');
    }
    this.saveState();
  },

  // ──────────────────────────────────────────────
  // RENDER SHAPE GRID
  // ──────────────────────────────────────────────
  renderShapes() {
    const grid = document.getElementById('shape-grid');
    if (!grid) return;

    grid.innerHTML = '';
    VESTURO_DATA.shapes.forEach(shape => {
      const card = document.createElement('button');
      card.className = 'shape-card';
      card.dataset.id = shape.id;
      card.type = 'button';
      card.title = shape.desc;
      card.innerHTML = `
        <span class="shape-icon">${shape.icon}</span>
        <span class="shape-name">${shape.name}</span>
      `;
      card.addEventListener('click', () => this.selectShape(shape.name, card));
      grid.appendChild(card);
    });
  },

  selectShape(name, el) {
    // Deselect all
    document.querySelectorAll('.shape-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    this.state.shape = name;
    this.saveState();
  },

  // ──────────────────────────────────────────────
  // RENDER MOVEMENT PILLS
  // ──────────────────────────────────────────────
  renderMovements() {
    const grid = document.getElementById('movement-pills');
    if (!grid) return;

    grid.innerHTML = '';
    VESTURO_DATA.movements.forEach(mov => {
      const pill = document.createElement('button');
      pill.className = 'pill';
      pill.dataset.id = mov.id;
      pill.textContent = mov.name;
      pill.title = mov.desc;
      pill.type = 'button';
      pill.addEventListener('click', () => this.toggleMovement(mov.name, pill));
      grid.appendChild(pill);
    });
  },

  toggleMovement(name, el) {
    const idx = this.state.movements.indexOf(name);
    if (idx === -1) {
      this.state.movements.push(name);
      el.classList.add('selected');
    } else {
      this.state.movements.splice(idx, 1);
      el.classList.remove('selected');
    }
    this.saveState();
  },

  // ──────────────────────────────────────────────
  // RENDER COLOR THEMES
  // ──────────────────────────────────────────────
  renderColorThemes() {
    const select = document.getElementById('color-select');
    if (!select) return;

    select.innerHTML = '<option value="" disabled selected>Select color theme…</option>';
    VESTURO_DATA.colorThemes.forEach(ct => {
      const opt = document.createElement('option');
      opt.value = ct.name;
      opt.textContent = ct.name;
      select.appendChild(opt);
    });
  },

  // ──────────────────────────────────────────────
  // RENDER AI MODELS
  // ──────────────────────────────────────────────
  renderModels() {
    const select = document.getElementById('model-select');
    if (!select) return;

    select.innerHTML = '';
    VESTURO_DATA.aiModels.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = `${m.name} — ${m.desc}`;
      if (m.id === 'claude-opus-4-8') opt.selected = true;
      select.appendChild(opt);
    });
  },

  // ──────────────────────────────────────────────
  // BIND ALL EVENTS
  // ──────────────────────────────────────────────
  bindEvents() {
    // Category change → load subjects
    const catSelect = document.getElementById('category-select');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.state.category = e.target.value;
        this.renderSubjects(e.target.value);
        // Reset subject
        this.state.subject = '';
        // Show subject section
        const subjectSection = document.getElementById('subject-section');
        if (subjectSection) subjectSection.style.display = '';
        this.saveState();
      });
    }

    // Subject change
    const subSelect = document.getElementById('subject-select');
    if (subSelect) {
      subSelect.addEventListener('change', (e) => {
        this.state.subject = e.target.value;
        this.saveState();
      });
    }

    // Manual toggles for category
    const catManualToggle = document.getElementById('category-manual-toggle');
    if (catManualToggle) {
      catManualToggle.addEventListener('click', () => {
        this.toggleManualInput('category');
      });
    }

    // Manual toggles for subject
    const subManualToggle = document.getElementById('subject-manual-toggle');
    if (subManualToggle) {
      subManualToggle.addEventListener('click', () => {
        this.toggleManualInput('subject');
      });
    }

    // Manual input fields
    const catManualInput = document.getElementById('category-manual-input');
    if (catManualInput) {
      catManualInput.addEventListener('input', (e) => {
        this.state.category = e.target.value;
        this.saveState();
      });
    }

    const subManualInput = document.getElementById('subject-manual-input');
    if (subManualInput) {
      subManualInput.addEventListener('input', (e) => {
        this.state.subject = e.target.value;
        this.saveState();
      });
    }

    // Color theme
    const colorSelect = document.getElementById('color-select');
    if (colorSelect) {
      colorSelect.addEventListener('change', (e) => {
        this.state.colorTheme = e.target.value;
        const customWrapper = document.getElementById('custom-color-wrapper');
        if (customWrapper) {
          customWrapper.style.display = e.target.value === 'Custom (Type Below)' ? 'block' : 'none';
        }
        this.saveState();
      });
    }

    const customColorInput = document.getElementById('custom-color-input');
    if (customColorInput) {
      customColorInput.addEventListener('input', (e) => {
        this.state.customColor = e.target.value;
        this.saveState();
      });
    }

    // Part count slider
    const partSlider = document.getElementById('part-count-slider');
    if (partSlider) {
      partSlider.addEventListener('input', (e) => {
        this.state.partCount = parseInt(e.target.value, 10);
        const display = document.getElementById('part-count-value');
        if (display) display.textContent = this.state.partCount;
        this.saveState();
      });
    }

    // Speed slider
    const speedSlider = document.getElementById('speed-slider');
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        this.state.speed = parseFloat(e.target.value);
        const display = document.getElementById('speed-value');
        if (display) display.textContent = this.state.speed.toFixed(1) + 's';
        this.saveState();
      });
    }

    // Model select
    const modelSelect = document.getElementById('model-select');
    if (modelSelect) {
      modelSelect.addEventListener('change', (e) => {
        this.state.model = e.target.value;
        this.toggleNvidiaKeyVisibility(e.target.value);
        this.saveState();
      });
    }

    // Nvidia key input
    const nvidiaKeyInput = document.getElementById('nvidia-key-input');
    if (nvidiaKeyInput) {
      nvidiaKeyInput.addEventListener('input', (e) => {
        localStorage.setItem('nvidia_api_key', e.target.value);
      });
    }

    // Generate button
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
      generateBtn.addEventListener('click', () => this.generate());
    }

    // Copy buttons
    document.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('[data-copy-target]');
      if (copyBtn) {
        this.copyToClipboard(copyBtn);
      }
    });

    // Collapsible sections
    document.addEventListener('click', (e) => {
      const header = e.target.closest('.collapsible-header');
      if (header) {
        const body = header.nextElementSibling;
        header.classList.toggle('open');
        body.classList.toggle('open');
      }
    });
  },

  // ──────────────────────────────────────────────
  // TOGGLE MANUAL INPUT
  // ──────────────────────────────────────────────
  toggleManualInput(field) {
    const selectWrapper = document.getElementById(`${field}-select-wrapper`);
    const manualWrapper = document.getElementById(`${field}-manual-wrapper`);
    const toggleBtn = document.getElementById(`${field}-manual-toggle`);

    if (!selectWrapper || !manualWrapper || !toggleBtn) return;

    const isManual = manualWrapper.classList.contains('active');

    if (isManual) {
      // Switch back to select
      manualWrapper.classList.remove('active');
      selectWrapper.classList.remove('hidden');
      toggleBtn.textContent = '✎ Type manually';
    } else {
      // Switch to manual
      manualWrapper.classList.add('active');
      selectWrapper.classList.add('hidden');
      toggleBtn.textContent = '↩ Use dropdown';
      // Focus the manual input
      const input = manualWrapper.querySelector('input');
      if (input) input.focus();
    }
  },

  // ──────────────────────────────────────────────
  // TOGGLE NVIDIA KEY VISIBILITY
  // ──────────────────────────────────────────────
  toggleNvidiaKeyVisibility(modelId) {
    const keySection = document.getElementById('nvidia-key-section');
    if (keySection) {
      keySection.style.display = modelId && modelId.startsWith('nvidia/') ? 'block' : 'none';
    }
  },

  // ──────────────────────────────────────────────
  // GENERATE PROMPT
  // ──────────────────────────────────────────────
  async generate() {
    // Validation
    if (!this.state.category) return this.showStatus('Please select a category.', 'error');
    if (!this.state.subject) return this.showStatus('Please select or type a subject.', 'error');
    if (this.state.metals.length === 0) return this.showStatus('Please select at least one metal type.', 'error');
    if (!this.state.colorTheme) return this.showStatus('Please select a color theme.', 'error');
    if (!this.state.shape) return this.showStatus('Please select an abstract shape.', 'error');
    if (this.state.movements.length === 0) return this.showStatus('Please select at least one deployment movement.', 'error');

    if (this.state.isGenerating) return;
    this.state.isGenerating = true;

    const btn = document.getElementById('generate-btn');
    const originalText = btn.textContent;
    btn.textContent = 'GENERATING…';
    btn.classList.add('loading');
    btn.disabled = true;

    this.showStatus('Building base prompt…', 'info');

    try {
      // Step 1: Build base prompt from template
      const config = {
        category: this.state.category,
        subject: this.state.subject,
        metals: this.state.metals,
        colorTheme: this.state.colorTheme,
        customColor: this.state.customColor,
        shape: this.state.shape,
        movements: this.state.movements,
        partCount: this.state.partCount,
        speed: this.state.speed,
      };

      const basePrompt = PromptEngine.buildVideoPrompt(config);
      const masterPrompt = PromptEngine.getMasterPrompt();
      const refinementRequest = PromptEngine.buildRefinementRequest(basePrompt, config);

      // Show master prompt immediately
      this.state.lastMasterPrompt = masterPrompt;
      this.renderOutput('master-prompt-content', masterPrompt);

      // Step 2: Send to AI for refinement
      this.showStatus(`Refining with ${this.getModelName(this.state.model)}… This may take 30-60 seconds.`, 'info');

      const outputEl = document.getElementById('video-prompt-content');
      if (outputEl) {
        outputEl.innerHTML = '<span class="cursor"></span>';
      }

      // Show output area
      const outputArea = document.getElementById('output-area');
      if (outputArea) outputArea.classList.add('visible');

      let finalPrompt = '';

      try {
        finalPrompt = await AIService.generatePrompt(
          this.state.model,
          masterPrompt,
          refinementRequest,
          // Streaming callback
          (chunk, fullText) => {
            if (outputEl) {
              outputEl.innerHTML = this.escapeHtml(fullText) + '<span class="cursor"></span>';
              outputEl.scrollTop = outputEl.scrollHeight;
            }
          }
        );
      } catch (aiErr) {
        // If AI fails, use the base prompt directly
        console.warn('[Vesturo] AI refinement failed, using base prompt:', aiErr.message);
        finalPrompt = basePrompt;
        this.showStatus('AI refinement unavailable — using base prompt. ' + aiErr.message, 'error');
      }

      // Remove cursor
      if (outputEl) {
        outputEl.innerHTML = this.escapeHtml(finalPrompt);
      }

      this.state.lastPrompt = finalPrompt;

      // Step 3: Parse and render sections
      const sections = PromptEngine.extractSections(finalPrompt);
      this.renderOutput('first-frame-content', sections.firstFrame || 'See full prompt above.');
      this.renderOutput('final-frame-content', sections.finalFrame || 'See full prompt above.');
      this.renderTimestamps(sections.timestamps);
      this.renderOutput('sound-design-content', sections.soundDesign || 'See full prompt above.');

      this.showStatus('✓ Prompt generated successfully!', 'success');

      // Scroll to output
      if (outputArea) {
        outputArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

    } catch (err) {
      console.error('[Vesturo] Generation error:', err);
      this.showStatus('Error: ' + err.message, 'error');
    } finally {
      this.state.isGenerating = false;
      btn.textContent = originalText;
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  },

  // ──────────────────────────────────────────────
  // RENDER OUTPUT
  // ──────────────────────────────────────────────
  renderOutput(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = text;
    }
  },

  renderTimestamps(timestamps) {
    const container = document.getElementById('timestamps-content');
    if (!container) return;

    if (!timestamps || timestamps.length === 0) {
      container.innerHTML = '<p style="color: var(--text-tertiary); font-size: 0.8rem;">Timestamps will appear here after generation.</p>';
      return;
    }

    container.innerHTML = timestamps.map(ts => `
      <div class="timestamp-item">
        <div class="timestamp-time">${this.escapeHtml(ts.time)}</div>
        <div class="timestamp-desc">${this.escapeHtml(ts.content).substring(0, 300)}${ts.content.length > 300 ? '…' : ''}</div>
      </div>
    `).join('');
  },

  // ──────────────────────────────────────────────
  // COPY TO CLIPBOARD
  // ──────────────────────────────────────────────
  async copyToClipboard(btn) {
    const targetId = btn.dataset.copyTarget;
    let text = '';

    if (targetId === 'all') {
      text = `=== MASTER PROMPT ===\n\n${this.state.lastMasterPrompt}\n\n=== VIDEO PROMPT ===\n\n${this.state.lastPrompt}`;
    } else if (targetId === 'video-prompt') {
      text = this.state.lastPrompt;
    } else if (targetId === 'master-prompt') {
      text = this.state.lastMasterPrompt;
    } else {
      const el = document.getElementById(targetId);
      if (el) text = el.textContent;
    }

    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      const originalText = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = originalText;
      }, 2000);
    } catch (err) {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);

      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 2000);
    }
  },

  // ──────────────────────────────────────────────
  // STATUS BAR
  // ──────────────────────────────────────────────
  showStatus(message, type = 'info') {
    const bar = document.getElementById('status-bar');
    if (!bar) return;

    bar.className = 'status-bar visible';
    if (type === 'error') bar.classList.add('error');

    const spinner = bar.querySelector('.spinner');
    const text = bar.querySelector('.status-text');

    if (spinner) spinner.style.display = type === 'info' ? 'block' : 'none';
    if (text) text.textContent = message;

    // Auto-hide success/error after 5s
    if (type !== 'info') {
      setTimeout(() => {
        bar.classList.remove('visible');
      }, 5000);
    }
  },

  hideStatus() {
    const bar = document.getElementById('status-bar');
    if (bar) bar.classList.remove('visible');
  },

  // ──────────────────────────────────────────────
  // GET MODEL NAME
  // ──────────────────────────────────────────────
  getModelName(modelId) {
    const model = VESTURO_DATA.aiModels.find(m => m.id === modelId);
    return model ? model.name : modelId;
  },

  // ──────────────────────────────────────────────
  // SAVE / LOAD STATE (localStorage)
  // ──────────────────────────────────────────────
  saveState() {
    try {
      const toSave = {
        category: this.state.category,
        subject: this.state.subject,
        metals: this.state.metals,
        colorTheme: this.state.colorTheme,
        customColor: this.state.customColor,
        shape: this.state.shape,
        movements: this.state.movements,
        partCount: this.state.partCount,
        speed: this.state.speed,
        model: this.state.model
      };
      localStorage.setItem('vesturo_state', JSON.stringify(toSave));
    } catch (e) {
      // localStorage may not be available
    }
  },

  loadSavedState() {
    try {
      const saved = localStorage.getItem('vesturo_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(this.state, parsed);
      }
    } catch (e) {
      // Ignore
    }
  },

  applySavedState() {
    // Apply saved selections to UI
    const { category, subject, metals, colorTheme, customColor, shape, movements, partCount, speed, model } = this.state;

    if (category) {
      const catSelect = document.getElementById('category-select');
      if (catSelect) {
        catSelect.value = category;
        this.renderSubjects(category);
      }
    }

    if (subject) {
      const subSelect = document.getElementById('subject-select');
      if (subSelect) subSelect.value = subject;
    }

    // Metals
    if (metals.length > 0) {
      document.querySelectorAll('#metal-pills .pill').forEach(pill => {
        const metalData = VESTURO_DATA.metals.find(m => m.id === pill.dataset.id);
        if (metalData && metals.includes(metalData.name)) {
          pill.classList.add('selected');
        }
      });
    }

    // Color
    if (colorTheme) {
      const colorSelect = document.getElementById('color-select');
      if (colorSelect) colorSelect.value = colorTheme;
      if (colorTheme === 'Custom (Type Below)') {
        const wrapper = document.getElementById('custom-color-wrapper');
        if (wrapper) wrapper.style.display = 'block';
        const input = document.getElementById('custom-color-input');
        if (input) input.value = customColor || '';
      }
    }

    // Shape
    if (shape) {
      document.querySelectorAll('.shape-card').forEach(card => {
        const shapeData = VESTURO_DATA.shapes.find(s => s.id === card.dataset.id);
        if (shapeData && shapeData.name === shape) {
          card.classList.add('selected');
        }
      });
    }

    // Movements
    if (movements.length > 0) {
      document.querySelectorAll('#movement-pills .pill').forEach(pill => {
        const movData = VESTURO_DATA.movements.find(m => m.id === pill.dataset.id);
        if (movData && movements.includes(movData.name)) {
          pill.classList.add('selected');
        }
      });
    }

    // Sliders
    const partSlider = document.getElementById('part-count-slider');
    if (partSlider) {
      partSlider.value = partCount;
      const display = document.getElementById('part-count-value');
      if (display) display.textContent = partCount;
    }

    const speedSlider = document.getElementById('speed-slider');
    if (speedSlider) {
      speedSlider.value = speed;
      const display = document.getElementById('speed-value');
      if (display) display.textContent = speed.toFixed(1) + 's';
    }

    // Model
    if (model) {
      const modelSelect = document.getElementById('model-select');
      if (modelSelect) modelSelect.value = model;
      this.toggleNvidiaKeyVisibility(model);
    }

    // NVIDIA API Key load
    let savedKey = localStorage.getItem('nvidia_api_key');
    if (!savedKey) {
      savedKey = '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';
      localStorage.setItem('nvidia_api_key', savedKey);
    }
    const nvidiaKeyInput = document.getElementById('nvidia-key-input');
    if (nvidiaKeyInput) nvidiaKeyInput.value = savedKey;
  },

  // ──────────────────────────────────────────────
  // UTILITY
  // ──────────────────────────────────────────────
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// ──────────────────────────────────────────────
// BOOT
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
