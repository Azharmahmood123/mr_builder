/**
 * MR Builder & Real Estate - Main Application Scripts
 * Shared components: Header, Mobile Drawer, Dialog Modals, Sticky Docks & WhatsApp links
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initPropertyDialog();
  initQuickContactForms();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/**
 * Mobile Navigation & Header Scroll State
 */
function initNavigation() {
  const header = document.querySelector("#site-header");
  const mobileToggle = document.querySelector("#mobile-menu-toggle");
  const mobileDrawer = document.querySelector("#mobile-drawer");
  const mobileClose = document.querySelector("#mobile-drawer-close");
  const mobileOverlay = document.querySelector("#mobile-drawer-overlay");

  // Sticky header shadow
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header?.classList.add("shadow-md", "bg-slate-900/98");
      header?.classList.remove("bg-slate-900/90");
    } else {
      header?.classList.remove("shadow-md", "bg-slate-900/98");
      header?.classList.add("bg-slate-900/90");
    }
  });

  // Mobile Drawer Toggle
  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove("translate-x-full");
    mobileDrawer.classList.add("translate-x-0");
    mobileOverlay?.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add("translate-x-full");
    mobileDrawer.classList.remove("translate-x-0");
    mobileOverlay?.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  mobileToggle?.addEventListener("click", openDrawer);
  mobileClose?.addEventListener("click", closeDrawer);
  mobileOverlay?.addEventListener("click", closeDrawer);

  // Close drawer on link click
  mobileDrawer?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeDrawer);
  });
}

/**
 * Property Details Modal (HTML5 <dialog>)
 */
function initPropertyDialog() {
  const dialog = document.getElementById("property-detail-dialog");
  if (!dialog) return;

  // Light dismiss: Close on backdrop click
  dialog.addEventListener("click", (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  });

  const closeBtn = dialog.querySelector("#dialog-close-btn");
  closeBtn?.addEventListener("click", () => dialog.close());
}

/**
 * Opens detailed property modal for a given property ID
 */
function openPropertyModal(propertyId) {
  const dialog = document.getElementById("property-detail-dialog");
  if (!dialog || typeof PROPERTIES_DATA === "undefined") return;

  const prop = PROPERTIES_DATA.find(p => p.id === propertyId);
  if (!prop) return;

  const container = dialog.querySelector("#dialog-content");
  if (!container) return;

  // WhatsApp inquiry URL for this specific property
  const whatsappMsg = `Salam Manzar Malik Sahib (MR Builder),

I am interested in Property ID [${prop.id}]:
* Title: ${prop.title}
* Location: ${prop.location}
* Demand: ${prop.priceFormatted}
* Size: ${prop.size}

Please share complete pictures, exact pin location, and schedule an on-ground site visit with me.`;

  const whatsappURL = `https://wa.me/923001888326?text=${encodeURIComponent(whatsappMsg)}`;

  container.innerHTML = `
    <div class="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full mx-auto max-h-[85vh] flex flex-col">
      <!-- Modal Header Bar -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-20">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">${prop.id}</span>
          <span class="px-2.5 py-1 rounded ${prop.purpose === 'rent' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'} text-xs font-bold uppercase">
            ${prop.purpose === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
          <span class="text-xs text-slate-500 font-medium hidden sm:inline">• ${prop.society}</span>
        </div>
        <button id="modal-inner-close" type="button" class="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Scrollable Modal Body -->
      <div class="p-6 overflow-y-auto space-y-6">
        <!-- Hero Image -->
        <div class="relative rounded-xl overflow-hidden aspect-video bg-slate-900">
          <img src="${prop.image}" alt="${prop.title}" class="w-full h-full object-cover" />
          <div class="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 bg-slate-950/80 backdrop-blur-md p-4 rounded-xl text-white">
            <div>
              <div class="text-xs text-amber-400 font-semibold uppercase">Asking Demand</div>
              <div class="text-2xl font-black font-heading text-white">${prop.priceFormatted}</div>
            </div>
            <div class="text-right">
              <span class="text-xs text-slate-400 block">Plot / House Size</span>
              <span class="text-base font-bold text-amber-300">${prop.size}</span>
            </div>
          </div>
        </div>

        <!-- Title & Location -->
        <div>
          <h2 class="text-2xl font-bold font-heading text-slate-900">${prop.title}</h2>
          <p class="text-amber-700 font-semibold text-sm mt-0.5">${prop.tagline}</p>
          <div class="flex items-center gap-1.5 text-slate-600 text-sm mt-2">
            <i data-lucide="map-pin" class="w-4 h-4 text-amber-600 shrink-0"></i>
            <span>${prop.location}</span>
          </div>
        </div>

        <!-- Core Specs Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
          <div>
            <span class="text-xs text-slate-500 block">Property Type</span>
            <span class="text-sm font-bold text-slate-800 capitalize">${prop.type}</span>
          </div>
          <div>
            <span class="text-xs text-slate-500 block">Covered Area / Size</span>
            <span class="text-sm font-bold text-slate-800">${prop.coveredArea || prop.size}</span>
          </div>
          <div>
            <span class="text-xs text-slate-500 block">Road Frontage</span>
            <span class="text-sm font-bold text-slate-800">${prop.roadWidth}</span>
          </div>
          <div>
            <span class="text-xs text-slate-500 block">Orientation</span>
            <span class="text-sm font-bold text-slate-800">${prop.facing}</span>
          </div>
          ${prop.beds ? `
            <div>
              <span class="text-xs text-slate-500 block">Bedrooms</span>
              <span class="text-sm font-bold text-slate-800">${prop.beds} Master Beds</span>
            </div>
            <div>
              <span class="text-xs text-slate-500 block">Bathrooms</span>
              <span class="text-sm font-bold text-slate-800">${prop.baths} Attached</span>
            </div>
            <div>
              <span class="text-xs text-slate-500 block">Kitchens</span>
              <span class="text-sm font-bold text-slate-800">${prop.kitchens || 1} Fitted</span>
            </div>
            <div>
              <span class="text-xs text-slate-500 block">Condition</span>
              <span class="text-sm font-bold text-emerald-600">${prop.status}</span>
            </div>
          ` : ''}
        </div>

        <!-- Description -->
        <div>
          <h3 class="text-base font-bold text-slate-900 mb-2">Property Overview</h3>
          <p class="text-slate-600 text-sm leading-relaxed">${prop.description}</p>
        </div>

        <!-- Key Features Checklist -->
        <div>
          <h3 class="text-base font-bold text-slate-900 mb-3">Key Features & Specifications</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${prop.features.map(f => `
              <div class="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
                <span>${f}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Verification & Trust Banner -->
        <div class="bg-amber-50/80 border border-amber-200/80 p-4 rounded-xl flex items-start gap-3">
          <i data-lucide="shield-check" class="w-5 h-5 text-amber-700 shrink-0 mt-0.5"></i>
          <div class="text-xs text-amber-950">
            <strong class="font-semibold block mb-0.5">Verified Direct Inventory by MR Builder & Real Estate</strong>
            Every property listed is verified by Manzar Malik directly from owner title deeds, society NDC records, and physical site demarcation. No duplicate or fake postings.
          </div>
        </div>
      </div>

      <!-- Modal Action Footer -->
      <div class="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20">
        <div class="flex items-center gap-3">
          <img src="assets/images/owner.jpg" alt="Manzar Malik" class="w-11 h-11 rounded-full object-cover border-2 border-amber-500 shadow-sm shrink-0" />
          <div>
            <div class="text-xs text-slate-500">Managing Director</div>
            <div class="text-sm font-bold text-slate-900">Manzar Malik</div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <a href="tel:+923001888326" class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all">
            <i data-lucide="phone" class="w-3.5 h-3.5 text-amber-600"></i>
            Call Direct
          </a>
          <a href="${whatsappURL}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md transition-all">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;

  // Attach internal close button
  container.querySelector("#modal-inner-close")?.addEventListener("click", () => dialog.close());

  dialog.showModal();

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Quick Contact Form Handler
 */
function initQuickContactForms() {
  const forms = document.querySelectorAll(".quick-inquiry-form");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("name") || "Valued Client";
      const phone = formData.get("phone") || "";
      const interest = formData.get("interest") || "General Real Estate & Construction";
      const message = formData.get("message") || "I would like to inquire about your services.";

      const whatsappText = `Salam Manzar Malik Sahib (MR Builder),

I submitted an inquiry through your website:
* Name: ${name}
* Contact / Phone: ${phone}
* Interested In: ${interest}
* Message: ${message}`;

      const url = `https://wa.me/923001888326?text=${encodeURIComponent(whatsappText)}`;
      window.open(url, "_blank");

      form.reset();
      alert("Thank you! Your inquiry is being redirected directly to Manzar Malik on WhatsApp.");
    });
  });
}

