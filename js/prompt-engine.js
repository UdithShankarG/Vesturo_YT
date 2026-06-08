// ============================================================
// Vesturo Transformations — Prompt Engine
// Master prompt template + video prompt builder
// ============================================================

const PromptEngine = {

  // ──────────────────────────────────────────────
  // MASTER SYSTEM PROMPT
  // This is sent as the system message to the AI
  // ──────────────────────────────────────────────
  getMasterPrompt() {
    return `You are Vesturo Prompt Architect — a world-class expert in writing hyper-detailed video generation prompts for mechanical prototype transformation sequences.

CONCEPT DEFINITION:
You create prompts for 10-second vertical smartphone videos (9:16) showing a palm-sized, aerospace-grade mechanical prototype "abstract" — a tightly folded, intricately engineered object — that deploys and transforms into a fully-formed real-world subject. Every part of the abstract IS a part of the final subject, folded and compressed with architectural precision.

ABSOLUTE RULES — NEVER VIOLATE:
1. NO MORPHING — Parts do not morph, melt, dissolve, or shapeshift. They are rigid mechanical components that physically unfold, slide, rotate, extend, hinge, and snap.
2. NO FRAME JUMPS — The transformation is continuous. No teleporting of parts. Every movement is traceable frame-by-frame.
3. NO CUT FRAMES — Single continuous take. No edits, no transitions, no fade-in/out.
4. NO MEASUREMENTS/VALUES — Never show dimensions, numbers, labels, text overlays.
5. NO VOICEOVERS — Zero narration, zero spoken words, zero background music.
6. ONLY ASMR SOUND — All sound comes exclusively from the mechanical parts: clicks, snaps, slides, whirs, metallic tinks, spring releases, gear rotations, panel locks. Captured loud on smartphone internal microphone. Macro-level close-proximity ASMR quality.
7. NO CAMERA EFFECTS — No zooming, no panning, no camera movement, no rack focus, no stabilization. Fixed camera position throughout.
8. NO GRAPHICS/OVERLAYS — No titles, watermarks, logos, UI elements, motion graphics.
9. ABSTRACT STAYS IN POSITION — Once the abstract is placed on the desk, it never slides, shifts, or repositions. All deployment happens in-place.
10. SUBJECT FACES CAMERA — The deployment orientation ensures the subject's "front" faces the camera/person holding the phone.
11. RAW FOOTAGE AESTHETIC — Looks like a real person filmed this with their phone. Natural lighting, slight color temperature variation, no color grading, no post-processing.
12. PARTS-ONLY DEPLOYMENT — Every deployed component was visibly part of the abstract. No new material appears. No parts materialize from nothing.
13. REAL WEIGHT AND PHYSICS — The abstract and subject behave with real gravitational weight. Metal parts have inertia. Springs have tension. Gears have resistance.

CAMERA SETUP (CONSTANT THROUGHOUT VIDEO):
- Smartphone held at 45-60° elevated angle, looking down at a desk
- Person is standing or sitting, phone aimed at the desk surface
- Desk fills 70%+ of frame (worn white/light surface with subtle scratches, scuff marks, tiny paint chips)
- Only a thin sliver of room visible at the very top edge
- Natural indoor lighting, slightly warm
- No camera stabilization (very subtle natural hand-hold micro-movements acceptable in the footage feel)

VISUAL QUALITY:
- Extreme raw visual fidelity — natural colors, mood, tones
- Real-world lighting with soft shadows
- Metal surfaces show accurate reflections, brushed grain, anodized matte textures
- Micro-details visible: tiny screws, seam lines, hinge pins, spring coils
- No CGI feel, no 3D render smoothness — must look physically real like a filmed prototype

YOUR OUTPUT FORMAT:
When given a subject and parameters, output a SINGLE continuous video prompt. Structure it as:

[FIRST FRAME] — Exact visual description of frame 1
[TIMESTAMP: 0.0s - Xs] — Scene-by-scene breakdown with precise timing
[FINAL FRAME] — Exact visual description of the last frame
[SOUND DESIGN] — Specific mechanical sounds at each stage

The prompt must be a single continuous paragraph-style description that a video AI model can directly consume. Include every micro-detail. Leave nothing to interpretation.`;
  },

  // ──────────────────────────────────────────────
  // BUILD THE VIDEO PROMPT
  // ──────────────────────────────────────────────
  buildVideoPrompt(config) {
    const {
      category,
      subject,
      metals,        // array of metal names
      colorTheme,
      customColor,
      shape,
      movements,     // array of movement names
      partCount,
      speed,         // 4.0 to 9.5 seconds for transformation
    } = config;

    // Calculate timestamps
    const handPickup = 1.2;
    const buttonPress = 2.0;
    const placeDown = 2.8;
    const deployStart = 3.2;
    const deployEnd = deployStart + speed;
    const settleEnd = Math.min(deployEnd + 0.5, 10.0);

    // Material description
    const metalDesc = metals.length > 0
      ? metals.join(", ")
      : "brushed titanium and matte black anodized aluminum";

    // Color description
    let colorDesc;
    if (colorTheme === "Exactly Original Subject Colors") {
      colorDesc = `the exact real-world natural colors of a real ${subject} — research and apply the precise biological/manufactured color patterns, markings, gradients, and tones as they appear on the actual ${subject} in reality, rendered through painted metal, anodized coatings, and tinted alloy finishes on the mechanical parts`;
    } else if (colorTheme === "Custom (Type Below)" && customColor) {
      colorDesc = customColor;
    } else {
      colorDesc = colorTheme || "monochrome raw metal finish";
    }

    // Shape description
    const shapeData = VESTURO_DATA.shapes.find(s => s.name === shape) || VESTURO_DATA.shapes[0];

    // Movement descriptions
    const movementDesc = movements.length > 0
      ? movements.join(", ")
      : "sequential unfold with hinge articulation";

    // Get subject anatomy
    const anatomy = VESTURO_DATA.subjectAnatomy[subject] || VESTURO_DATA.subjectAnatomy["_default"];
    const partsList = anatomy.slice(0, Math.min(partCount, anatomy.length));
    const partsPerPhase = Math.ceil(partsList.length / 4);

    // Build deployment sequence description
    const phase1 = partsList.slice(0, partsPerPhase);
    const phase2 = partsList.slice(partsPerPhase, partsPerPhase * 2);
    const phase3 = partsList.slice(partsPerPhase * 2, partsPerPhase * 3);
    const phase4 = partsList.slice(partsPerPhase * 3);

    const deployDuration = speed;
    const phaseTime = deployDuration / 4;
    const t1Start = deployStart;
    const t1End = (deployStart + phaseTime).toFixed(1);
    const t2End = (deployStart + phaseTime * 2).toFixed(1);
    const t3End = (deployStart + phaseTime * 3).toFixed(1);
    const t4End = (deployStart + phaseTime * 4).toFixed(1);

    // Build the user prompt
    const prompt = `Generate a hyper-realistic 10-second vertical smartphone video (9:16 aspect ratio) of a mechanical prototype abstract deploying into a ${subject}.

SUBJECT: ${subject} (Category: ${category})
MATERIALS: ${metalDesc}
COLOR THEME: ${colorDesc}
ABSTRACT SHAPE: ${shapeData.name} — ${shapeData.desc}
DEPLOYMENT STYLE: ${movementDesc}
TOTAL MECHANICAL PARTS: ${partCount}

---

[FIRST FRAME — 0.0s]:
A worn white desk surface fills 70% of the frame, viewed from a smartphone camera held at a 50-degree elevated angle by a person sitting at the desk. The desk has subtle signs of real use — faint scratches, a couple of small scuff marks, a tiny chip in the paint near one edge. Natural warm indoor lighting from the left side casts soft shadows. At the center-right of the desk sits a palm-sized ${shapeData.name.toLowerCase()}-shaped mechanical abstract made of ${metalDesc}. The abstract is approximately 6-7cm across — a tightly packed, intricately engineered object with ${partCount} visible micro-segments folded into the ${shapeData.name.toLowerCase()} form. Every seam is precisely machined with hair-thin gaps between panels. The surface shows ${metalDesc} finishing with visible micro-screws, tiny hex bolts, hairline panel seams, and precision-machined edges. On one face of the abstract, a small tactile button (3mm diameter, slightly raised, metallic click-button) is visible — this is the deployment activation button. The abstract has real physical weight — it sits solidly on the desk surface with a slight shadow underneath. The color scheme across the folded panels shows ${colorDesc}. A thin sliver of a room interior is visible at the very top edge of the frame — just a hint of a wall and ambient space. The footage feels completely raw — natural smartphone camera quality, no stabilization, no color grading, slight natural micro-shake from hand-holding.

[TIMESTAMP: 0.0s – ${handPickup}s — HAND ENTRY]:
A human hand enters naturally from the bottom of the frame — fingers and palm visible, moving at a natural casual pace. The hand reaches toward the abstract on the desk. Natural skin texture, slight ambient light on the fingers. The hand grasps the abstract between thumb and fingers, picking it up. The abstract has visible weight — the hand adjusts grip slightly as it lifts. ASMR sound: soft fingertip-on-metal contact, subtle scrape of the abstract lifting off the desk surface.

[TIMESTAMP: ${handPickup}s – ${buttonPress}s — BUTTON SEARCH AND PRESS]:
The hand holds the abstract at chest-level (still in frame, slightly elevated from desk). Fingers rotate and examine the abstract, searching for the activation button. The camera catches different angles of the tightly folded mechanical surface — glints of ${metalDesc}, visible panel seams, micro-engineering details. The thumb locates the button. PRESS — a decisive, clean mechanical click. ASMR SOUND: A sharp, deeply satisfying macro-captured mechanical click — like a precision micro-switch engaging. The sound resonates with metallic undertone. The button depresses 1mm with tactile feedback.

[TIMESTAMP: ${buttonPress}s – ${placeDown}s — PLACEMENT]:
The hand carefully places the abstract back down on the desk surface in the center of frame, oriented so the subject's eventual front will face the camera. A soft metallic *tink* as the abstract contacts the desk. The hand withdraws downward, exiting the bottom of the frame. The abstract sits motionless on the desk for a brief moment — 0.3 seconds of stillness before deployment begins.

[TIMESTAMP: ${deployStart}s – ${t1End}s — DEPLOYMENT PHASE 1: Primary Structure]:
The deployment begins. Using ${movementDesc} mechanics — the first ${phase1.length} parts activate: ${phase1.join(", ")}. These are the primary structural components. Mechanical sounds fill the audio: precision clicks, sliding metal panels, spring-loaded releases, tiny gear rotations. Each part moves with engineered purpose — no wasted motion, no hesitation. Metal-on-metal contact sounds are captured at macro ASMR proximity. The movements are deliberate, satisfying, and mechanically logical. The abstract begins to lose its ${shapeData.name.toLowerCase()} shape as major components extend outward while remaining anchored to the central structure. Every deployed part was clearly visible as a folded segment of the original abstract.

[TIMESTAMP: ${t1End}s – ${t2End}s — DEPLOYMENT PHASE 2: Secondary Framework]:
Phase 2 activates the next ${phase2.length} parts: ${phase2.join(", ")}. The emerging ${subject} silhouette becomes recognizable. Parts connect to Phase 1 components with precise mechanical locks — audible snap-fits and pin insertions. ${movementDesc} continues driving the deployment. The transformation is purely mechanical — rigid parts on engineered joints. Metal surfaces catch the natural light as they rotate into position. Micro-details become visible: tiny rivets, hinge pins, machined grooves, panel edges. ASMR: layered mechanical sounds — ratcheting, sliding, clicking, spring tension release.

[TIMESTAMP: ${t2End}s – ${t3End}s — DEPLOYMENT PHASE 3: Detail Assembly]:
Phase 3 deploys ${phase3.length} detail components: ${phase3.join(", ")}. The ${subject} form is now clearly identifiable. Fine details articulate into position — smaller panels, surface texture elements, extremity components. The movement precision increases — tiny hinges rotate mere millimeters, micro-panels slide along machined tracks. Colors and material patterns of the ${subject} become fully apparent as panels reach their final orientations. ASMR: higher-pitched clicks, delicate metallic tinks, precision snap-fits, tiny spring pings.

[TIMESTAMP: ${t3End}s – ${t4End}s — DEPLOYMENT PHASE 4: Final Details & Lock]:
The final ${phase4.length} parts complete the transformation: ${phase4.join(", ")}. Every remaining component clicks, slides, or rotates into its terminal position. Final lock sounds — decisive mechanical *clack* noises as the last parts seat. The ${subject} is now fully formed — a complete, anatomically/structurally accurate ${subject} rendered in ${metalDesc} with ${colorDesc}. Every surface detail is resolved. The transformation is complete. A final settling — the weight redistributes as the last part locks. Brief ambient silence.

[FINAL FRAME — ${settleEnd}s – 10.0s]:
The fully deployed ${subject} sits perfectly on the worn white desk. Complete mechanical prototype — palm-sized, made entirely of ${metalDesc}, with ${colorDesc}. Every component that was part of the original ${shapeData.name.toLowerCase()} abstract is now an anatomically/structurally correct part of the ${subject}. The prototype has real weight and dimensionality. Micro-details visible: panel seams now form the natural contours and features of the ${subject}. Metal surfaces catch warm ambient light. The ${subject} faces the camera. Subtle desk reflections. Raw smartphone footage feel — natural colors, no post-processing. Brief moment of stillness. Then the video ends.

[SOUND DESIGN]:
ALL sound is environmental mechanical ASMR captured by smartphone internal microphone at close proximity:
- Fingertip-on-metal contact sounds
- Button click: sharp, satisfying mechanical micro-switch
- Metal-on-desk placement *tink*
- Deployment sounds: precision clicks, spring releases, gear whirs, panel slides, ratcheting, snap-fits, hinge rotations, metallic pings, pin insertions, locking *clacks*
- Final settling: weight redistribution, last lock *click*, then ambient silence
- NO music, NO voiceover, NO background noise, NO wind, NO room ambience beyond the mechanical sounds
- Sound proximity feels like microphone is 10-15cm from the object`;

    return prompt;
  },

  // ──────────────────────────────────────────────
  // BUILD THE AI REFINEMENT PROMPT
  // Sent to AI to polish the base prompt
  // ──────────────────────────────────────────────
  buildRefinementRequest(basePrompt, config) {
    return `I have a base video generation prompt below. Your job is to refine it into a PERFECT, production-ready video prompt for Google Veo / Flow Omni (10-second video model).

REFINEMENT TASKS:
1. SUBJECT ACCURACY: Research the real ${config.subject} anatomy/structure and ensure deployment sequence is physically accurate — parts deploy in the correct anatomical/structural order
2. COLOR ACCURACY: ${config.colorTheme === "Exactly Original Subject Colors" ? `Research the EXACT real-world colors of a ${config.subject} and specify precise color descriptions for each part (e.g., "warm tawny golden-brown on the mane plates, deep amber on the eye lens covers, pale sandy cream on the belly guard")` : `Apply ${config.colorTheme} consistently across all parts`}
3. MOVEMENT PHYSICS: Ensure every mechanical movement is physically plausible — correct pivot points, realistic ranges of motion, proper sequence (structural parts before detail parts)
4. PROMPT PRECISION: Remove any vagueness. Every sentence must be a direct visual instruction. The video AI should have ZERO room for interpretation
5. ANTI-MORPHING ENFORCEMENT: Add explicit anti-morphing language — "rigid mechanical movement only", "no shape-shifting", "solid metal parts on engineered joints"
6. ASMR SOUND ACCURACY: Specify exact sound at each deployment moment — what type of mechanical sound, its character (sharp click vs soft whir vs metallic slide)
7. TIMESTAMP ACCURACY: Ensure timestamps add up to exactly 10.0 seconds total. No overlaps, no gaps
8. WEIGHT AND INERTIA: Add physics descriptions — heavy parts move slower, light parts snap faster, springs release with visible tension

OUTPUT: Return ONLY the refined final video prompt. No explanations, no preamble, no commentary. Just the pure prompt text ready to paste into a video generation model.

---

BASE PROMPT TO REFINE:

${basePrompt}`;
  },

  // ──────────────────────────────────────────────
  // EXTRACT SECTIONS FROM GENERATED PROMPT
  // ──────────────────────────────────────────────
  extractSections(prompt) {
    const sections = {
      firstFrame: "",
      timestamps: [],
      finalFrame: "",
      soundDesign: ""
    };

    // Extract first frame
    const firstFrameMatch = prompt.match(/\[FIRST FRAME[^\]]*\]:?\s*([\s\S]*?)(?=\[TIMESTAMP|\[FINAL|\[SOUND)/i);
    if (firstFrameMatch) sections.firstFrame = firstFrameMatch[1].trim();

    // Extract timestamps
    const timestampRegex = /\[TIMESTAMP:\s*([^\]]+)\]:?\s*([\s\S]*?)(?=\[TIMESTAMP|\[FINAL|\[SOUND)/gi;
    let match;
    while ((match = timestampRegex.exec(prompt)) !== null) {
      sections.timestamps.push({
        time: match[1].trim(),
        content: match[2].trim()
      });
    }

    // Extract final frame
    const finalFrameMatch = prompt.match(/\[FINAL FRAME[^\]]*\]:?\s*([\s\S]*?)(?=\[SOUND|$)/i);
    if (finalFrameMatch) sections.finalFrame = finalFrameMatch[1].trim();

    // Extract sound design
    const soundMatch = prompt.match(/\[SOUND DESIGN\]:?\s*([\s\S]*?)$/i);
    if (soundMatch) sections.soundDesign = soundMatch[1].trim();

    return sections;
  }
};

// Export
if (typeof window !== 'undefined') {
  window.PromptEngine = PromptEngine;
}
