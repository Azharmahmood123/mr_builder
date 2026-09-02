/**
 * MR Builder & Real Estate - Property Inventory Rendering & Filtering Engine
 */

function renderPropertyCard(prop) {
  const isUrdu = (typeof getActiveLanguage === "function" && getActiveLanguage() === "ur") || (localStorage.getItem("mrb_lang") === "ur");
  const whatsappURL = generatePropertyWhatsAppURL(prop);

  const forSaleText = isUrdu ? "برائے فروخت" : "For Sale";
  const forRentText = isUrdu ? "برائے کرایہ" : "For Rent";
  const demandText = isUrdu ? "ڈیمانڈ" : "Demand";
  const roadText = isUrdu ? "روڈ کی چوڑائی" : "Road";
  const catText = isUrdu ? "قسم" : "Category";
  const statusText = isUrdu ? "حالت" : "Status";
  const bedsText = isUrdu ? "بیڈز" : "Beds";
  const bathsText = isUrdu ? "باتھ" : "Baths";
  const viewDetailsText = isUrdu ? "مکمل تفصیل" : "View Details";
  const waText = isUrdu ? "واٹس ایپ" : "WhatsApp";

  return `
    <article class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      <!-- Image Thumbnail Box -->
      <div class="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img 
          src="${prop.image}" 
          alt="${prop.title}" 
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none"></div>
        
        <!-- Top Badges -->
        <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span class="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${prop.purpose === 'rent' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white shadow-sm'}">
            ${prop.purpose === 'rent' ? forRentText : forSaleText}
          </span>
          <span class="px-2 py-1 rounded-md text-[11px] font-semibold bg-slate-900/80 text-white backdrop-blur-sm">
            ${prop.id}
          </span>
        </div>

        <!-- Right Trust Tag -->
        <div class="absolute top-3 right-3 z-10">
          <span class="px-2 py-1 rounded-md text-[11px] font-semibold bg-white/95 text-slate-900 shadow-sm flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            ${prop.badges[0] || (isUrdu ? 'تصدیق شدہ' : 'Verified')}
          </span>
        </div>

        <!-- Bottom Price on Image -->
        <div class="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
          <div>
            <span class="text-[10px] text-amber-300 uppercase tracking-wider font-semibold block">${demandText}</span>
            <div class="text-xl font-extrabold font-heading text-white drop-shadow">${prop.priceFormatted}</div>
          </div>
          <div class="text-right">
            <span class="px-2.5 py-1 rounded-lg bg-amber-500/90 text-slate-950 font-bold text-xs shadow">
              ${prop.size}
            </span>
          </div>
        </div>
      </div>

      <!-- Card Content -->
      <div class="p-5 flex flex-col flex-grow justify-between">
        <div>
          <!-- Society Tag & Location -->
          <div class="flex items-center gap-1.5 text-xs text-amber-700 font-semibold mb-1">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 shrink-0"></i>
            <span class="truncate">${prop.location}</span>
          </div>

          <!-- Title -->
          <h3 class="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-amber-600 transition-colors">
            ${prop.title}
          </h3>

          <p class="text-xs text-slate-500 mt-1 line-clamp-2">
            ${prop.tagline}
          </p>

          <!-- Specifications Row -->
          <div class="grid grid-cols-3 gap-2 py-3 my-3 border-y border-slate-100 text-slate-600 text-xs text-center">
            <div>
              <span class="text-[10px] text-slate-400 uppercase block">${roadText}</span>
              <span class="font-semibold text-slate-800 truncate block">${prop.roadWidth}</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 uppercase block">${catText}</span>
              <span class="font-semibold text-slate-800 capitalize truncate block">${prop.type}</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 uppercase block">${statusText}</span>
              <span class="font-semibold text-emerald-600 truncate block">${prop.status}</span>
            </div>
          </div>

          ${prop.beds ? `
            <div class="flex items-center gap-3 text-xs text-slate-600 mb-3 bg-slate-50 px-3 py-1.5 rounded-lg">
              <span class="flex items-center gap-1">
                <i data-lucide="bed-double" class="w-3.5 h-3.5 text-slate-400"></i>
                <strong>${prop.beds}</strong> ${bedsText}
              </span>
              <span class="flex items-center gap-1">
                <i data-lucide="bath" class="w-3.5 h-3.5 text-slate-400"></i>
                <strong>${prop.baths}</strong> ${bathsText}
              </span>
              <span class="flex items-center gap-1">
                <i data-lucide="home" class="w-3.5 h-3.5 text-slate-400"></i>
                <strong>${prop.coveredArea}</strong>
              </span>
            </div>
          ` : ''}
        </div>

        <!-- Card Buttons -->
        <div class="pt-2 grid grid-cols-2 gap-2">
          <button 
            type="button" 
            onclick="openPropertyModal('${prop.id}')" 
            class="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-800 hover:bg-slate-900 hover:text-white text-slate-700 text-xs font-bold transition-all text-center"
          >
            ${viewDetailsText}
          </button>
          <a 
            href="${whatsappURL}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-sm transition-all text-center flex items-center justify-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            ${waText}
          </a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Initializes static category tabs for property showcase (Pure Static - No Database)
 */
function initPropertyCatalog({
  containerId = "properties-grid",
  filterTabsSelector = ".prop-filter-tab",
  limit = null
}) {
  const container = document.getElementById(containerId);
  if (!container || typeof PROPERTIES_DATA === "undefined") return;

  let activeTab = "all";

  function filterData() {
    if (activeTab === "all") return PROPERTIES_DATA;
    return PROPERTIES_DATA.filter(prop => {
      if (activeTab === "sale") return prop.purpose === "sale";
      if (activeTab === "rent") return prop.purpose === "rent";
      if (activeTab === "plot") return prop.type === "plot";
      if (activeTab === "house") return prop.type === "house";
      if (activeTab === "commercial") return prop.type === "commercial";
      if (activeTab === "al-ghani") {
        return (
          prop.society.toLowerCase().includes("al-ghani") || 
          prop.location.toLowerCase().includes("al-ghani") || 
          prop.location.toLowerCase().includes("manawan") || 
          prop.location.toLowerCase().includes("batapur")
        );
      }
      return true;
    });
  }

  function render() {
    let filtered = filterData();
    if (limit && limit > 0) {
      filtered = filtered.slice(0, limit);
    }

    container.innerHTML = filtered.map(renderPropertyCard).join("");

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Filter Tab Clicks (Static UI tab switcher)
  const tabs = document.querySelectorAll(filterTabsSelector);
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.classList.remove("bg-amber-600", "text-white", "shadow-sm");
        t.classList.add("bg-white", "text-slate-700", "border", "border-slate-200");
      });
      tab.classList.remove("bg-white", "text-slate-700", "border", "border-slate-200");
      tab.classList.add("bg-amber-600", "text-white", "shadow-sm");

      activeTab = tab.dataset.filter || "all";
      render();
    });
  });

  // Initial render
  render();

  // Re-render when language changes
  window.addEventListener("languageChanged", () => {
    render();
  });
}

