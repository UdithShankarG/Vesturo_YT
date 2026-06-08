# VESTURO — AI Video Prompt Generator

> Generate hyper-detailed video prompts for mechanical prototype transformation YouTube Shorts.

## What This Does

VESTURO is a prompt engineering tool for the **Vesturo_Transformations** YouTube channel. It generates extremely detailed video prompts for AI video models (Google Veo / Flow Omni) that describe a palm-sized mechanical prototype "abstract" deploying and transforming into a real-world subject.

**Key features:**
- 20+ categories with 200+ subjects pre-loaded
- 15 metal/material types for prototype construction
- 10 abstract shapes (sphere, cube, hexagonal, etc.)
- 15 deployment movement styles
- Configurable part count (5-80) and transformation speed (4s-9.5s)
- AI-powered prompt refinement via Puter.js (Claude Opus 4.8, Sonnet 4.6, GPT-4o, Gemini, DeepSeek, Llama)
- Timestamped frame-by-frame breakdowns
- One-click copy for all prompt sections

## How to Use

1. **Open the app** — Visit the GitHub Pages URL or open `index.html` locally
2. **Select your options:**
   - Category → Subject (or type manually)
   - Metal types, color theme, abstract shape
   - Deployment movements, part count, speed
   - AI model for refinement
3. **Click "Generate Video Prompt"**
4. **Copy the output** and paste into your video AI model

## AI Models (via Puter.js)

All models are accessed through [Puter.js](https://developer.puter.com) — no API keys needed. You sign in with your Puter account.

| Model | Provider | Best For |
|-------|----------|----------|
| Claude Opus 4.8 | Anthropic | Complex prompt engineering (recommended) |
| Claude Sonnet 4.6 | Anthropic | Fast + high quality daily use |
| GPT-4o | OpenAI | Strong instruction following |
| Gemini 2.5 Pro | Google | Detailed descriptions |
| DeepSeek R1 | DeepSeek | Reasoning-heavy tasks |
| Llama 4 Maverick | Meta | Creative tasks |

## Enable GitHub Pages

1. Go to your repo **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`, Folder: `/ (root)`
4. Click **Save**
5. Your app will be live at `https://udithshankarg.github.io/Vesturo_YT/`

## Tech Stack

- Pure HTML / CSS / JavaScript (no build step)
- [Puter.js](https://js.puter.com/v2/) for AI model access
- [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) fonts
- GitHub Pages hosting

## Project Structure

```
vesturo_yt/
├── index.html              # Main app
├── css/
│   └── styles.css          # Design system
├── js/
│   ├── data.js             # Categories, subjects, metals, shapes
│   ├── prompt-engine.js    # Master prompt + video prompt builder
│   ├── ai-service.js       # Puter.js AI integration
│   └── app.js              # Main controller
└── README.md               # This file
```

## License

MIT — Vesturo_Transformations
