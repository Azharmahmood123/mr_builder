/**
 * MR Builder & Real Estate - Construction Cost Estimator Engine
 * Formats in Pakistani Rupees (Crores / Lacs) and generates pre-filled WhatsApp BOQ requests.
 */

const ESTIMATOR_CONFIG = {
  sqftPerMarla: 225,
  plotSizes: {
    "3": { marla: 3, defaultArea: 1300, minArea: 800, maxArea: 1600, label: "3 Marla" },
    "5": { marla: 5, defaultArea: 2100, minArea: 1400, maxArea: 2500, label: "5 Marla" },
    "7": { marla: 7, defaultArea: 2750, minArea: 2000, maxArea: 3400, label: "7 Marla" },
    "10": { marla: 10, defaultArea: 3500, minArea: 2600, maxArea: 4400, label: "10 Marla" },
    "20": { marla: 20, defaultArea: 6000, minArea: 4500, maxArea: 7500, label: "1 Kanal" },
    "40": { marla: 40, defaultArea: 11500, minArea: 8000, maxArea: 14000, label: "2 Kanal" }
  },
  packages: {
    "grey": {
      name: "Grey Structure",
      rate: 2600,
      minRate: 2400,
      maxRate: 2800,
      tagline: "High-grade structural core (Grade 60 Steel, Approved Bricks & Cement)",
      breakdown: {
        "Civil & RCC Structure": 55,
        "Brickwork & Plaster": 22,
        "Concealed Electrical & Plumbing": 13,
        "Underground & Overhead Tanks": 10
      }
    },
    "turnkey": {
      name: "Turnkey A+ Finish",
      rate: 5100,
      minRate: 4800,
      maxRate: 5500,
      tagline: "Ready-to-move-in luxury standard with imported tiles, Ash wood & Grohe/Master sanitary",
      breakdown: {
        "Structural & Civil Core": 38,
        "Flooring & Wall Porcelain Tiles": 16,
        "Ash Woodwork & Teak Wardrobes": 16,
        "Electrical Wiring, LED & Switches": 10,
        "Sanitaryware, Vanities & Kitchen": 12,
        "False Ceiling & Premium Paint": 8
      }
    },
    "luxury": {
      name: "Executive Luxury",
      rate: 6500,
      minRate: 6000,
      maxRate: 7500,
      tagline: "Bespoke architectural mansion finish, Italian kitchen, smart automation & marble accents",
      breakdown: {
        "Reinforced RCC & Thermal Insulation": 32,
        "Imported Large Format Slabs & Onyx": 20,
        "Solid Teak & High-gloss Custom Joinery": 18,
        "Smart Automation & Designer Chandeliers": 12,
        "Imported Grohe/Kohler Luxury Sanitary": 12,
        "Exterior Rockwall & Architectural Glass": 6
      }
    }
  }
};

/**
 * Formats raw PKR into Pakistani Crores / Lacs (Supports English & Urdu)
 */
function formatPKRCurrency(amount) {
  if (isNaN(amount) || amount === null) return "PKR 0";
  const isUrdu = (typeof getActiveLanguage === "function" && getActiveLanguage() === "ur") || (localStorage.getItem("mrb_lang") === "ur");
  
  if (amount >= 10000000) {
    const crores = (amount / 10000000).toFixed(2);
    return isUrdu ? `${crores} کروڑ روپے` : `PKR ${crores} Crore`;
  } else if (amount >= 100000) {
    const lacs = (amount / 100000).toFixed(2);
    return isUrdu ? `${lacs} لاکھ روپے` : `PKR ${lacs} Lacs`;
  } else {
    return isUrdu ? `${Math.round(amount).toLocaleString('en-PK')} روپے` : `PKR ${Math.round(amount).toLocaleString('en-PK')}`;
  }
}

/**
 * Main calculation handler
 */
function calculateCost(plotKey, packageKey, coveredArea, floors = "double") {
  const pkg = ESTIMATOR_CONFIG.packages[packageKey] || ESTIMATOR_CONFIG.packages["turnkey"];
  const area = parseInt(coveredArea, 10) || 2100;
  
  // Floor multiplier adjust
  let floorMultiplier = 1.0;
  if (floors === "single") floorMultiplier = 0.98;
  if (floors === "basement") floorMultiplier = 1.15; // Basements have extra excavation, water-proofing, RCC walls
  
  const baseTotal = area * pkg.rate * floorMultiplier;
  const minTotal = area * pkg.minRate * floorMultiplier;
  const maxTotal = area * pkg.maxRate * floorMultiplier;
  
  // Detailed items breakdown
  const items = [];
  for (const [itemName, percent] of Object.entries(pkg.breakdown)) {
    const itemCost = Math.round((baseTotal * percent) / 100);
    items.push({
      name: itemName,
      percentage: percent,
      cost: itemCost,
      costFormatted: formatPKRCurrency(itemCost)
    });
  }
  
  return {
    package: pkg,
    area,
    floors,
    baseTotal,
    minTotal,
    maxTotal,
    baseFormatted: formatPKRCurrency(baseTotal),
    rangeFormatted: `${formatPKRCurrency(minTotal)} – ${formatPKRCurrency(maxTotal)}`,
    ratePerSqFt: Math.round(pkg.rate * floorMultiplier),
    breakdownItems: items
  };
}

/**
 * Generate a pre-filled WhatsApp link with the estimation breakdown
 */
function generateEstimatorWhatsAppURL(calcData, plotLabel) {
  const phone = "923001888326";
  const text = 
`Salam Manzar Malik Sahib (MR Builder),

I used your Construction Cost Estimator on your website for my project:
* Plot Size: ${plotLabel}
* Package: ${calcData.package.name}
* Covered Area: ${calcData.area.toLocaleString()} sq. ft.
* Story / Type: ${calcData.floors.toUpperCase()}
* Estimated Cost Range: ${calcData.rangeFormatted} (Avg: ${calcData.baseFormatted})

Please share the detailed itemized BOQ (Bill of Quantities) and schedule a site consultation meeting with me.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Initialize Estimator UI Component
 */
function initEstimatorWidget(containerId = "estimator-widget") {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Render HTML markup
  container.innerHTML = `
    <div class="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <!-- Estimator Header -->
      <div class="bg-gradient-navy p-6 md:p-8 text-white">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <i data-lucide="calculator" class="w-3.5 h-3.5"></i>
              Real-Time Cost Engine (2026 Rates)
            </div>
            <h3 class="text-2xl md:text-3xl font-bold font-heading">Interactive Construction Cost Estimator</h3>
            <p class="text-slate-300 text-sm mt-1">Accurate calculations calibrated for DHA, Bahria Town & Lahore approved bylaws.</p>
          </div>
          <div class="text-right hidden sm:block">
            <span class="text-xs text-slate-400">Consultant In-Charge</span>
            <div class="text-sm font-semibold text-amber-400">Manzar Malik</div>
            <div class="text-xs text-slate-300">+92 300 1888326</div>
          </div>
        </div>
      </div>

      <div class="p-6 md:p-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Inputs Column (7 Cols) -->
          <div class="lg:col-span-7 space-y-6">
            <!-- 1. Plot Size Selector -->
            <div>
              <label class="block text-sm font-semibold text-slate-800 mb-2">
                1. Select Plot Size:
              </label>
              <div class="grid grid-cols-3 sm:grid-cols-6 gap-2" id="est-plot-buttons">
                <button type="button" data-plot="3" class="est-plot-btn py-2.5 px-3 text-center rounded-xl border border-slate-200 text-sm font-medium hover:border-amber-500 hover:text-amber-600 transition-all">3 Marla</button>
                <button type="button" data-plot="5" class="est-plot-btn py-2.5 px-3 text-center rounded-xl border-2 border-amber-600 bg-amber-50 text-amber-700 font-bold text-sm shadow-sm transition-all">5 Marla</button>
                <button type="button" data-plot="7" class="est-plot-btn py-2.5 px-3 text-center rounded-xl border border-slate-200 text-sm font-medium hover:border-amber-500 hover:text-amber-600 transition-all">7 Marla</button>
                <button type="button" data-plot="10" class="est-plot-btn py-2.5 px-3 text-center rounded-xl border border-slate-200 text-sm font-medium hover:border-amber-500 hover:text-amber-600 transition-all">10 Marla</button>
                <button type="button" data-plot="20" class="est-plot-btn py-2.5 px-3 text-center rounded-xl border border-slate-200 text-sm font-medium hover:border-amber-500 hover:text-amber-600 transition-all">1 Kanal</button>
                <button type="button" data-plot="40" class="est-plot-btn py-2.5 px-3 text-center rounded-xl border border-slate-200 text-sm font-medium hover:border-amber-500 hover:text-amber-600 transition-all">2 Kanal</button>
              </div>
            </div>

            <!-- 2. Construction Package Selector -->
            <div>
              <label class="block text-sm font-semibold text-slate-800 mb-2">
                2. Select Construction Package:
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3" id="est-package-cards">
                <!-- Grey -->
                <div data-package="grey" class="est-pkg-card cursor-pointer p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 transition-all text-left">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-slate-900 text-sm">Grey Structure</span>
                    <span class="text-xs font-semibold text-slate-600">PKR 2,600/sq.ft</span>
                  </div>
                  <p class="text-xs text-slate-500">Grade 60 Steel, A+ Bricks, Concealed MEP Conduits</p>
                </div>

                <!-- Turnkey A+ (Default Active) -->
                <div data-package="turnkey" class="est-pkg-card cursor-pointer p-3.5 rounded-xl border-2 border-amber-600 bg-amber-50/60 shadow-sm transition-all text-left">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-amber-900 text-sm flex items-center gap-1">
                      Turnkey A+
                      <span class="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded">Popular</span>
                    </span>
                    <span class="text-xs font-bold text-amber-700">PKR 5,100/sq.ft</span>
                  </div>
                  <p class="text-xs text-slate-600">Complete Ready-to-move, Imported Tiles & Ash Wood</p>
                </div>

                <!-- Luxury -->
                <div data-package="luxury" class="est-pkg-card cursor-pointer p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 transition-all text-left">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-slate-900 text-sm">Executive Luxury</span>
                    <span class="text-xs font-semibold text-slate-600">PKR 6,500/sq.ft</span>
                  </div>
                  <p class="text-xs text-slate-500">Italian Kitchens, Teak Wood, Royal Elevation</p>
                </div>
              </div>
            </div>

            <!-- 3. Building Structure & Floors -->
            <div>
              <label class="block text-sm font-semibold text-slate-800 mb-2">
                3. Building Structure:
              </label>
              <div class="grid grid-cols-3 gap-2" id="est-floor-buttons">
                <button type="button" data-floor="single" class="est-floor-btn py-2 px-3 text-center rounded-xl border border-slate-200 text-xs font-medium hover:border-amber-500 transition-all">Single Story</button>
                <button type="button" data-floor="double" class="est-floor-btn py-2 px-3 text-center rounded-xl border-2 border-amber-600 bg-amber-50 text-amber-800 font-bold text-xs transition-all">Double Story (Std)</button>
                <button type="button" data-floor="basement" class="est-floor-btn py-2 px-3 text-center rounded-xl border border-slate-200 text-xs font-medium hover:border-amber-500 transition-all">Basement + Double</button>
              </div>
            </div>

            <!-- 4. Approximate Covered Area Slider -->
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div class="flex items-center justify-between mb-2">
                <label for="covered-area-slider" class="text-sm font-semibold text-slate-800">
                  4. Approximate Covered Area:
                </label>
                <div class="flex items-center gap-1.5">
                  <input type="number" id="covered-area-input" value="2100" class="w-24 text-right font-bold text-amber-700 bg-white border border-slate-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none" />
                  <span class="text-xs font-semibold text-slate-600">sq. ft.</span>
                </div>
              </div>
              <input type="range" id="covered-area-slider" min="1400" max="2500" step="50" value="2100" class="w-full h-2 bg-slate-200 rounded-lg cursor-pointer" />
              <div class="flex justify-between text-[11px] text-slate-500 mt-1">
                <span id="slider-min-label">1,400 sq.ft</span>
                <span class="font-medium text-slate-700">Lahore Society Standard Ground Coverage</span>
                <span id="slider-max-label">2,500 sq.ft</span>
              </div>
            </div>
          </div>

          <!-- Outputs Column (5 Cols) -->
          <div class="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">Estimated Investment</span>
                <span id="est-current-pkg-badge" class="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Turnkey A+</span>
              </div>

              <!-- Main Amount Display -->
              <div class="mb-5">
                <div class="text-xs text-slate-400 mb-1">Total Estimated Cost:</div>
                <div id="est-cost-main" class="text-3xl sm:text-4xl font-black font-heading text-gradient-gold">
                  PKR 1.07 Crore
                </div>
                <div id="est-cost-range" class="text-xs text-slate-400 mt-1">
                  Estimated Range: PKR 1.01 Crore – PKR 1.15 Crore
                </div>
                <div class="flex items-center gap-2 mt-2 text-[11px] text-slate-300">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                  Avg. Rate: <strong id="est-rate-label" class="text-white">PKR 5,100 / sq. ft.</strong>
                </div>
              </div>

              <!-- Itemized Breakdown Preview -->
              <div class="space-y-2 mb-6 border-t border-slate-800/80 pt-4">
                <div class="text-xs font-semibold text-slate-300 mb-2">Cost Breakdown Estimate:</div>
                <div id="est-breakdown-list" class="space-y-1.5 text-xs">
                  <!-- Injected via JS -->
                </div>
              </div>
            </div>

            <!-- Action CTAs -->
            <div class="space-y-2.5 pt-4 border-t border-slate-800">
              <a id="est-whatsapp-btn" href="#" target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Get Detailed BOQ via WhatsApp
              </a>
              <div class="text-center">
                <span class="text-[11px] text-slate-400">Directly connect with Manzar Malik • Free Site Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // State
  let currentPlot = "5";
  let currentPackage = "turnkey";
  let currentFloor = "double";
  let currentArea = 2100;

  const plotButtons = container.querySelectorAll(".est-plot-btn");
  const pkgCards = container.querySelectorAll(".est-pkg-card");
  const floorButtons = container.querySelectorAll(".est-floor-btn");
  const areaSlider = container.querySelector("#covered-area-slider");
  const areaInput = container.querySelector("#covered-area-input");
  const sliderMinLabel = container.querySelector("#slider-min-label");
  const sliderMaxLabel = container.querySelector("#slider-max-label");

  const costMain = container.querySelector("#est-cost-main");
  const costRange = container.querySelector("#est-cost-range");
  const rateLabel = container.querySelector("#est-rate-label");
  const pkgBadge = container.querySelector("#est-current-pkg-badge");
  const breakdownList = container.querySelector("#est-breakdown-list");
  const whatsappBtn = container.querySelector("#est-whatsapp-btn");

  function updateDisplay() {
    const plotConfig = ESTIMATOR_CONFIG.plotSizes[currentPlot] || ESTIMATOR_CONFIG.plotSizes["5"];
    const calc = calculateCost(currentPlot, currentPackage, currentArea, currentFloor);

    costMain.textContent = calc.baseFormatted;
    costRange.textContent = `Estimated Range: ${calc.rangeFormatted}`;
    rateLabel.textContent = `PKR ${calc.ratePerSqFt.toLocaleString()} / sq. ft.`;
    pkgBadge.textContent = `${calc.package.name}`;

    // Render breakdown
    breakdownList.innerHTML = calc.breakdownItems.map(item => `
      <div class="flex items-center justify-between py-1 border-b border-slate-800/40">
        <span class="text-slate-300 flex items-center gap-1.5">
          <span class="text-[10px] text-amber-400/80 font-mono">${item.percentage}%</span>
          ${item.name}
        </span>
        <span class="font-medium text-slate-100">${item.costFormatted}</span>
      </div>
    `).join("");

    // Update WhatsApp link
    whatsappBtn.href = generateEstimatorWhatsAppURL(calc, plotConfig.label);

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Event Listeners for Plot Selection
  plotButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      plotButtons.forEach(b => {
        b.className = "est-plot-btn py-2.5 px-3 text-center rounded-xl border border-slate-200 text-sm font-medium hover:border-amber-500 hover:text-amber-600 transition-all";
      });
      btn.className = "est-plot-btn py-2.5 px-3 text-center rounded-xl border-2 border-amber-600 bg-amber-50 text-amber-700 font-bold text-sm shadow-sm transition-all";

      currentPlot = btn.dataset.plot;
      const plotConfig = ESTIMATOR_CONFIG.plotSizes[currentPlot];
      
      // Update slider constraints
      areaSlider.min = plotConfig.minArea;
      areaSlider.max = plotConfig.maxArea;
      areaSlider.value = plotConfig.defaultArea;
      areaInput.value = plotConfig.defaultArea;
      currentArea = plotConfig.defaultArea;

      sliderMinLabel.textContent = `${plotConfig.minArea.toLocaleString()} sq.ft`;
      sliderMaxLabel.textContent = `${plotConfig.maxArea.toLocaleString()} sq.ft`;

      updateDisplay();
    });
  });

  // Event Listeners for Package Selection
  pkgCards.forEach(card => {
    card.addEventListener("click", () => {
      pkgCards.forEach(c => {
        c.className = "est-pkg-card cursor-pointer p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 transition-all text-left";
      });
      card.className = "est-pkg-card cursor-pointer p-3.5 rounded-xl border-2 border-amber-600 bg-amber-50/60 shadow-sm transition-all text-left";

      currentPackage = card.dataset.package;
      updateDisplay();
    });
  });

  // Event Listeners for Floors
  floorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      floorButtons.forEach(b => {
        b.className = "est-floor-btn py-2 px-3 text-center rounded-xl border border-slate-200 text-xs font-medium hover:border-amber-500 transition-all";
      });
      btn.className = "est-floor-btn py-2 px-3 text-center rounded-xl border-2 border-amber-600 bg-amber-50 text-amber-800 font-bold text-xs transition-all";

      currentFloor = btn.dataset.floor;
      updateDisplay();
    });
  });

  // Slider change
  areaSlider.addEventListener("input", (e) => {
    currentArea = parseInt(e.target.value, 10);
    areaInput.value = currentArea;
    updateDisplay();
  });

  // Input change
  areaInput.addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      currentArea = val;
      areaSlider.value = val;
      updateDisplay();
    }
  });

  // Initial render
  updateDisplay();

  // Re-render when language changes
  window.addEventListener("languageChanged", () => {
    updateDisplay();
  });
}

