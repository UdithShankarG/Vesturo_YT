// ============================================================
// Vesturo Transformations — Data Layer
// All structured data for categories, subjects, metals, etc.
// ============================================================

const VESTURO_DATA = {

  // ──────────────────────────────────────────────
  // CATEGORIES & SUBJECTS
  // ──────────────────────────────────────────────
  categories: {
    "Animals": [
      "Lion", "Tiger", "Wolf", "Bear", "Elephant", "Cheetah",
      "Black Panther", "Gorilla", "King Cobra", "Rhino",
      "Fox", "Jaguar", "Bison", "Komodo Dragon"
    ],
    "Birds": [
      "Bald Eagle", "Peregrine Falcon", "Great Horned Owl",
      "Hummingbird", "Peacock", "Phoenix (Mythical)", "Raven",
      "Hawk", "Kingfisher", "Crane", "Toucan", "Macaw"
    ],
    "Insects": [
      "Hercules Beetle", "Praying Mantis", "Dragonfly",
      "Scorpion", "Tarantula", "Stag Beetle", "Butterfly (Monarch)",
      "Wasp", "Atlas Moth", "Centipede", "Ant (Soldier)", "Cicada"
    ],
    "Marine Life": [
      "Great White Shark", "Blue Whale", "Octopus", "Manta Ray",
      "Seahorse", "Jellyfish", "Swordfish", "Hammerhead Shark",
      "Sea Turtle", "Dolphin", "Lobster", "Nautilus", "Orca"
    ],
    "Aircraft & Jets": [
      "F-22 Raptor", "SR-71 Blackbird", "F-35 Lightning II",
      "Su-57 Felon", "B-2 Spirit Bomber", "Eurofighter Typhoon",
      "MiG-29 Fulcrum", "F-16 Fighting Falcon", "Concorde",
      "Apache AH-64", "A-10 Thunderbolt II", "F-14 Tomcat",
      "Rafale", "P-51 Mustang"
    ],
    "Spacecraft": [
      "Space Shuttle", "Saturn V Rocket", "SpaceX Starship",
      "International Space Station", "Apollo Lunar Module",
      "Hubble Space Telescope", "Mars Rover (Perseverance)",
      "X-Wing (Concept)", "Voyager Probe", "Soyuz Capsule"
    ],
    "Vehicles": [
      "Lamborghini Aventador", "Bugatti Chiron", "Ferrari LaFerrari",
      "McLaren P1", "Porsche 911 GT3", "Ford GT",
      "Koenigsegg Jesko", "Pagani Huayra", "Aston Martin Valkyrie",
      "Mercedes AMG One", "Tesla Cybertruck", "BMW M4"
    ],
    "Motorcycles": [
      "Ducati Panigale V4", "Kawasaki Ninja H2R",
      "BMW S1000RR", "Yamaha YZF-R1", "Honda CBR1000RR",
      "Suzuki Hayabusa", "Harley-Davidson V-Rod",
      "KTM RC 390", "MV Agusta F4", "Triumph Speed Triple"
    ],
    "Weapons & Armor": [
      "Katana Sword", "Medieval Knight Helmet", "Crossbow",
      "Viking Battle Axe", "Spartan Shield", "Samurai Armor Set",
      "Throwing Star (Shuriken)", "War Hammer", "Longbow",
      "Gladiator Trident", "Kusarigama", "Flail"
    ],
    "Robots & Mechs": [
      "Humanoid Robot", "Spider Mech", "Combat Drone",
      "Industrial Arm Robot", "Nano Bot Swarm Unit",
      "Quadruped Walker", "Flying Scout Drone",
      "Heavy Assault Mech", "Medical Surgery Bot",
      "Underwater Exploration Bot"
    ],
    "Dinosaurs": [
      "Tyrannosaurus Rex", "Velociraptor", "Triceratops",
      "Pteranodon", "Stegosaurus", "Spinosaurus",
      "Ankylosaurus", "Brachiosaurus", "Dilophosaurus",
      "Parasaurolophus", "Carnotaurus", "Allosaurus"
    ],
    "Mythical Creatures": [
      "Dragon", "Griffin", "Phoenix", "Pegasus",
      "Cerberus", "Hydra", "Minotaur", "Kraken",
      "Chimera", "Basilisk", "Thunderbird", "Fenrir Wolf"
    ],
    "Musical Instruments": [
      "Electric Guitar", "Grand Piano", "Violin",
      "Drum Kit", "Saxophone", "Trumpet", "Cello",
      "Harp", "Accordion", "Synthesizer Keyboard",
      "Double Bass", "French Horn"
    ],
    "Architecture & Landmarks": [
      "Eiffel Tower", "Colosseum", "Taj Mahal",
      "Great Pyramid of Giza", "Sydney Opera House",
      "Burj Khalifa", "Statue of Liberty", "Big Ben",
      "Parthenon", "Golden Gate Bridge", "Sagrada Familia"
    ],
    "Sports Equipment": [
      "Formula 1 Car", "Racing Helmet", "Skateboard",
      "Tennis Racket", "Boxing Glove", "Golf Club Set",
      "Snowboard", "Basketball Shoe", "Cycling Bike",
      "Surfboard", "Cricket Bat", "Ice Hockey Stick"
    ],
    "Electronics & Tech": [
      "Gaming Controller", "Mechanical Keyboard",
      "Drone (DJI Style)", "VR Headset", "Smartwatch",
      "Camera (DSLR)", "Headphones (Over-Ear)",
      "Gaming PC Tower", "Robotic Arm", "Satellite Dish"
    ],
    "Tools & Machinery": [
      "Chainsaw", "Swiss Army Knife", "Power Drill",
      "Steam Engine", "Clockwork Mechanism",
      "Telescope", "Microscope", "Compass (Navigation)",
      "Sextant", "Mechanical Calculator"
    ],
    "Flowers & Plants": [
      "Rose", "Lotus", "Sunflower", "Orchid",
      "Cherry Blossom Branch", "Venus Flytrap",
      "Bonsai Tree", "Cactus (Saguaro)", "Dandelion",
      "Lavender Sprig", "Lily", "Tulip"
    ],
    "Watches & Clocks": [
      "Skeleton Watch", "Pocket Watch", "Chronograph",
      "Diving Watch", "Grandfather Clock Mechanism",
      "Sundial", "Cuckoo Clock", "Digital Smart Watch",
      "Tourbillon Watch", "Hourglass"
    ],
    "Footwear & Fashion": [
      "Air Jordan 1", "Nike Air Max 90", "Adidas Yeezy 350",
      "Combat Boot", "Cowboy Boot", "High Heel Stiletto",
      "Running Spike", "Dress Oxford", "Sneaker (Futuristic)",
      "Ski Boot"
    ],
    "Sea Vessels": [
      "Aircraft Carrier", "Submarine", "Pirate Ship",
      "Yacht", "Battleship", "Kayak", "Hovercraft",
      "Speedboat", "Sailing Ship (Clipper)", "Tugboat"
    ],
    "Trains & Locomotives": [
      "Steam Locomotive", "Bullet Train (Shinkansen)",
      "Diesel Freight Engine", "Maglev Train",
      "Orient Express Car", "Underground Metro",
      "Mountain Rack Railway", "Monorail Pod"
    ]
  },

  // ──────────────────────────────────────────────
  // METAL / MATERIAL TYPES
  // ──────────────────────────────────────────────
  metals: [
    { id: "brushed-titanium",       name: "Brushed Titanium",               desc: "Light grey with fine directional grain lines" },
    { id: "polished-stainless",     name: "Polished Stainless Steel",       desc: "Mirror-reflective chrome-like finish" },
    { id: "matte-black-aluminum",   name: "Matte Black Anodized Aluminum",  desc: "Deep non-reflective black, smooth texture" },
    { id: "rose-gold",             name: "Rose Gold Alloy",                 desc: "Warm pinkish-gold metallic tone" },
    { id: "gunmetal-chrome",       name: "Gunmetal Chrome",                 desc: "Dark charcoal with subtle metallic sheen" },
    { id: "carbon-fiber",          name: "Carbon Fiber Composite",          desc: "Woven black pattern with glossy clear coat" },
    { id: "copper-bronze",         name: "Copper Bronze",                   desc: "Warm reddish-brown with patina potential" },
    { id: "nickel-silver",         name: "Nickel Silver",                   desc: "Cool silver-white, slightly warmer than steel" },
    { id: "tungsten-carbide",      name: "Tungsten Carbide",                desc: "Ultra-dense dark grey, extremely heavy feel" },
    { id: "platinum-finish",       name: "Platinum Finish",                 desc: "Bright white-silver, premium weight" },
    { id: "damascus-steel",        name: "Damascus Steel",                  desc: "Wavy layered pattern, dark and light bands" },
    { id: "blued-steel",           name: "Blued Steel",                     desc: "Deep midnight blue-black tempered finish" },
    { id: "satin-nickel",          name: "Satin Nickel",                    desc: "Soft brushed silver, warm undertone" },
    { id: "antiqued-brass",        name: "Antiqued Brass",                  desc: "Dark golden-brown with aged patina" },
    { id: "liquid-mercury-chrome", name: "Liquid Mercury Chrome",           desc: "Ultra-reflective flowing silver mirror" }
  ],

  // ──────────────────────────────────────────────
  // ABSTRACT SHAPES
  // ──────────────────────────────────────────────
  shapes: [
    { id: "sphere",      name: "Sphere",              icon: "●",  desc: "Parts folded into a perfectly round ball" },
    { id: "cube",        name: "Cube",                icon: "■",  desc: "Sharp-edged cubic block with tight seams" },
    { id: "hexagonal",   name: "Hexagonal Prism",     icon: "⬡",  desc: "Six-sided prism with geometric precision" },
    { id: "cylinder",    name: "Cylinder",            icon: "◎",  desc: "Round barrel-shaped with flat ends" },
    { id: "disc",        name: "Disc / Coin",         icon: "◉",  desc: "Flat round coin-like form, thin profile" },
    { id: "egg",         name: "Egg / Ovoid",         icon: "⬮",  desc: "Organic smooth egg shape, asymmetric" },
    { id: "diamond",     name: "Diamond / Octahedron", icon: "◆", desc: "Two pyramids joined at base, gem-like" },
    { id: "pyramid",     name: "Pyramid",             icon: "△",  desc: "Four triangular faces meeting at apex" },
    { id: "capsule",     name: "Capsule",             icon: "⬭",  desc: "Rounded cylinder, pill-shaped" },
    { id: "pentagon",    name: "Pentagon",             icon: "⬠",  desc: "Five-sided flat prism form" }
  ],

  // ──────────────────────────────────────────────
  // DEPLOYMENT MOVEMENT STYLES
  // ──────────────────────────────────────────────
  movements: [
    { id: "sequential-unfold",   name: "Sequential Unfold",      desc: "Parts open one after another in logical order" },
    { id: "spiral-deploy",       name: "Spiral Deploy",          desc: "Parts twist outward in a helical unwinding motion" },
    { id: "radial-burst",        name: "Radial Burst",           desc: "Parts expand outward from center simultaneously" },
    { id: "cascade-reveal",      name: "Cascade Reveal",         desc: "Parts fall open in a waterfall-like chain reaction" },
    { id: "accordion-expand",    name: "Accordion Expand",       desc: "Zigzag folded sections stretch and extend" },
    { id: "origami-unfold",      name: "Origami Unfold",         desc: "Paper-fold logic — triangular flaps open precisely" },
    { id: "telescopic-extend",   name: "Telescopic Extend",      desc: "Nested tubes slide outward segment by segment" },
    { id: "rotational-assembly", name: "Rotational Assembly",     desc: "Parts rotate into position around pivot points" },
    { id: "magnetic-snap",       name: "Magnetic Snap",          desc: "Parts float slightly then snap into final position" },
    { id: "petal-bloom",         name: "Petal Bloom",            desc: "Parts open like flower petals from center outward" },
    { id: "clockwork-mechanism", name: "Clockwork Mechanism",    desc: "Gears and cogs drive precision movements" },
    { id: "segmented-slide",     name: "Segmented Slide",        desc: "Panel segments slide along tracks into place" },
    { id: "hinge-articulation",  name: "Hinge Articulation",     desc: "Parts swing open on visible hinge joints" },
    { id: "spring-loaded-pop",   name: "Spring-Loaded Pop",      desc: "Compressed parts release with spring tension" },
    { id: "zipper-reveal",       name: "Zipper Reveal",          desc: "Interlocking teeth separate to reveal inner parts" }
  ],

  // ──────────────────────────────────────────────
  // COLOR / THEME OPTIONS
  // ──────────────────────────────────────────────
  colorThemes: [
    { id: "original",          name: "Exactly Original Subject Colors",  desc: "AI researches and applies real-world accurate colors" },
    { id: "raw-metal",         name: "Monochrome Metal Raw",             desc: "Pure unpainted metal finish, industrial look" },
    { id: "stealth-black",     name: "Stealth Matte Black",              desc: "All parts in deep matte black coating" },
    { id: "arctic-silver",     name: "Arctic Silver White",              desc: "Clean white-silver icy premium finish" },
    { id: "military-green",    name: "Military OD Green",                desc: "Olive drab tactical green matte" },
    { id: "midnight-blue",     name: "Midnight Metallic Blue",           desc: "Deep dark blue with metallic flake" },
    { id: "crimson-red",       name: "Crimson Racing Red",               desc: "Bold deep red with glossy finish" },
    { id: "desert-sand",       name: "Desert Sand Tan",                  desc: "Warm beige-tan matte tactical" },
    { id: "custom",            name: "Custom (Type Below)",              desc: "Specify your own color scheme" }
  ],

  // ──────────────────────────────────────────────
  // SUBJECT ANATOMY / DEPLOYMENT PART MAPPING
  // Guides how AI should structure part deployment
  // ──────────────────────────────────────────────
  subjectAnatomy: {
    // Animals
    "Lion":              ["mane plates", "skull casing", "jaw mechanism", "torso shell", "front leg assemblies", "rear leg assemblies", "spine ridge", "tail segments", "paw units", "rib cage panels", "shoulder joints", "hip joints", "ear modules", "eye lens covers", "nose bridge plate", "whisker pins", "muscle overlay panels", "chest plate", "belly guard", "claw tips"],
    "Tiger":             ["head casing", "jaw hinge", "torso barrel", "stripe-patterned panels", "front legs", "rear legs", "tail whip segments", "paw pads", "ear flaps", "spine ridge", "rib panels", "shoulder rotors", "hip joints", "claw arrays", "whisker rods", "eye covers", "nose plate", "chest shield", "belly plate", "haunch panels"],
    "Wolf":              ["skull shell", "jaw assembly", "ear points", "neck ring segments", "torso frame", "front leg struts", "rear leg struts", "paw platforms", "tail segments", "rib cage", "spine column", "shoulder pivots", "hip rotors", "claw tips", "fur texture panels", "snout bridge", "eye lens", "chest plate", "belly guard", "haunch shields"],
    "Bald Eagle":        ["wing panels (left)", "wing panels (right)", "primary feather blades", "secondary feather blades", "tail fan segments", "head shell", "beak upper", "beak lower", "talon assemblies (left)", "talon assemblies (right)", "torso fuselage", "chest keel", "eye lens covers", "neck ring segments", "back plates", "wing joint pivots", "leg struts", "belly panel", "crown crest", "wing tip feathers"],
    "Great White Shark": ["dorsal fin blade", "pectoral fins (L/R)", "tail crescent", "jaw upper arc", "jaw lower arc", "tooth rows", "gill slit panels", "torso barrel segments", "nose cone", "eye housings", "pelvic fins", "anal fin", "spine column", "muscle band panels", "skin texture sheets", "belly white plates", "lateral line sensor strip"],

    // Aircraft
    "F-22 Raptor":       ["nose cone radome", "canopy glass", "cockpit frame", "forward fuselage", "air intake ramps (L/R)", "engine bay panels", "main delta wings (L/R)", "wing leading edge slats", "wing trailing edge flaps", "vertical stabilizers (twin)", "horizontal stabilizers", "exhaust nozzles (twin)", "weapons bay doors", "landing gear assemblies", "tail boom", "dorsal spine", "belly panels", "wingtip sections", "radar array", "avionics bay"],
    "SR-71 Blackbird":   ["nose spike probe", "forward chine panels", "cockpit tandem canopies", "fuselage spine", "engine nacelles (L/R)", "inlet cones (L/R)", "delta wing panels", "wing leading edges", "tail fins (twin canted)", "exhaust nozzles", "landing gear bays", "fuel tank panels", "corrugated skin sections", "titanium belly plates", "wing root fairings", "bypass ducts", "sensor windows", "pitot tubes"],

    // Vehicles
    "Lamborghini Aventador": ["front hood panel", "headlight assemblies", "front splitter", "front wheel arches", "door panels (scissor hinge)", "side skirts", "side air intakes", "windshield frame", "roof panel", "rear engine cover (glass)", "rear wing", "rear diffuser", "taillight bar", "exhaust tips (quad)", "rear wheel arches", "front wheels", "rear wheels", "interior dashboard shell", "steering column", "seat frames"],

    // Default fallback — used when no specific anatomy exists
    "_default":          ["primary core segment", "secondary shell plates", "tertiary detail panels", "articulation joints", "surface texture layers", "extremity extensions", "connecting bridges", "inner mechanism parts", "outer casing sections", "fine detail components"]
  },

  // ──────────────────────────────────────────────
  // SPEED PRESETS
  // ──────────────────────────────────────────────
  speedRange: {
    min: 4.0,
    max: 9.5,
    step: 0.5,
    default: 6.5,
    unit: "seconds"
  },

  // ──────────────────────────────────────────────
  // PART COUNT RANGE
  // ──────────────────────────────────────────────
  partCountRange: {
    min: 5,
    max: 80,
    step: 1,
    default: 25
  },

  // ──────────────────────────────────────────────
  // AI MODELS (via Puter.js)
  // ──────────────────────────────────────────────
  aiModels: [
    { id: "claude-opus-4-8",     name: "Claude Opus 4.8",     provider: "Anthropic",  tier: "flagship",  desc: "Best for complex, multi-step prompt engineering" },
    { id: "claude-sonnet-4-6",   name: "Claude Sonnet 4.6",   provider: "Anthropic",  tier: "high",      desc: "Fast + high quality, great daily driver" },
    { id: "gpt-4o",              name: "GPT-4o",              provider: "OpenAI",     tier: "high",      desc: "Strong instruction following" },
    { id: "gemini-2.5-pro",      name: "Gemini 2.5 Pro",      provider: "Google",     tier: "high",      desc: "Excellent at detailed descriptions" },
    { id: "deepseek-r1",         name: "DeepSeek R1",         provider: "DeepSeek",   tier: "reasoning",  desc: "Strong reasoning model" },
    { id: "nvidia/deepseek-ai/deepseek-v4-pro", name: "DeepSeek V4 Pro (NVIDIA NIM)", provider: "NVIDIA / DeepSeek", tier: "flagship", desc: "NVIDIA NIM Free API, ultra-detailed reasoning & coding" },
    { id: "llama-4-maverick",    name: "Llama 4 Maverick",    provider: "Meta",       tier: "creative",   desc: "Good for creative tasks" }
  ]
};

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.VESTURO_DATA = VESTURO_DATA;
}
