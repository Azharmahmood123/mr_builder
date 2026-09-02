/**
 * MR Builder & Real Estate - "List Your Property" Form Handler
 * Validates submissions, saves to localStorage, and triggers pre-formatted WhatsApp message to Manzar Malik.
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("list-property-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const purpose = form.querySelector('input[name="purpose"]:checked')?.value || "Sell";
    const propertyType = form.querySelector("#property_type")?.value || "Residential Plot";
    const city = form.querySelector("#city")?.value || "Lahore";
    const society = form.querySelector("#society")?.value || "";
    const block = form.querySelector("#block")?.value || "";
    const street = form.querySelector("#street")?.value || "";
    
    const sizeNumber = form.querySelector("#size_number")?.value || "";
    const sizeUnit = form.querySelector("#size_unit")?.value || "Marla";
    
    const demandValue = form.querySelector("#demand_value")?.value || "";
    const demandUnit = form.querySelector("#demand_unit")?.value || "Crore";

    // Selected Features
    const features = [];
    form.querySelectorAll('input[name="features"]:checked').forEach(cb => {
      features.push(cb.value);
    });

    const ownerName = form.querySelector("#owner_name")?.value || "";
    const ownerPhone = form.querySelector("#owner_phone")?.value || "";
    const callTime = form.querySelector("#call_time")?.value || "Anytime";
    const notes = form.querySelector("#notes")?.value || "";

    // Validation
    if (!society || !sizeNumber || !demandValue || !ownerName || !ownerPhone) {
      alert("Please fill in all required fields: Society, Size, Demand, Owner Name, and WhatsApp Number.");
      return;
    }

    const fullDemand = `${demandValue} ${demandUnit}`;
    const fullSize = `${sizeNumber} ${sizeUnit}`;
    const fullLocation = `${society}${block ? ', ' + block : ''}${street ? ', ' + street : ''}, ${city}`;

    // Construct formatted WhatsApp message
    const whatsappMsg = 
`*NEW PROPERTY LISTING DIRECT SUBMISSION*
----------------------------------------
* Purpose: ${purpose.toUpperCase()}
* Property Type: ${propertyType}
* Location: ${fullLocation}
* Size: ${fullSize}
* Asking Demand: PKR ${fullDemand}
* Features / Badges: ${features.length > 0 ? features.join(', ') : 'Standard'}
* Special Notes: ${notes || 'None'}

*Owner / Representative Details:*
* Name: ${ownerName}
* WhatsApp / Contact: ${ownerPhone}
* Best Time to Call: ${callTime}
----------------------------------------
Please review and connect with me for site inspection & buyer matching.`;

    const whatsappURL = `https://wa.me/923001888326?text=${encodeURIComponent(whatsappMsg)}`;

    // Save to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem("mrb_user_listings") || "[]");
      existing.unshift({
        id: "LST-" + Date.now().toString().slice(-6),
        purpose,
        propertyType,
        location: fullLocation,
        size: fullSize,
        demand: fullDemand,
        ownerName,
        ownerPhone,
        date: new Date().toLocaleDateString()
      });
      localStorage.setItem("mrb_user_listings", JSON.stringify(existing.slice(0, 20)));
    } catch (err) {
      console.warn("LocalStorage save warning:", err);
    }

    // Show Confirmation Modal or Redirect
    showSubmissionSuccessModal({
      purpose,
      propertyType,
      fullLocation,
      fullSize,
      fullDemand,
      ownerName,
      whatsappURL
    });

    form.reset();
  });
});

function showSubmissionSuccessModal(data) {
  let modal = document.getElementById("listing-success-dialog");
  if (!modal) {
    modal = document.createElement("dialog");
    modal.id = "listing-success-dialog";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-auto text-center shadow-2xl border border-slate-100">
      <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      </div>

      <h3 class="text-2xl font-bold font-heading text-slate-900 mb-1">Listing Ready to Send!</h3>
      <p class="text-xs text-slate-600 mb-5">
        Your property details have been compiled into a verified format for <strong>Manzar Malik</strong>.
      </p>

      <div class="bg-slate-50 p-4 rounded-xl text-left text-xs space-y-1.5 border border-slate-200 mb-5">
        <div><span class="text-slate-500">Property:</span> <strong>${data.fullSize} ${data.propertyType} (${data.purpose})</strong></div>
        <div><span class="text-slate-500">Location:</span> <strong>${data.fullLocation}</strong></div>
        <div><span class="text-slate-500">Demand:</span> <strong class="text-amber-700">PKR ${data.fullDemand}</strong></div>
        <div><span class="text-slate-500">Owner:</span> <strong>${data.ownerName}</strong></div>
      </div>

      <div class="space-y-2.5">
        <a href="${data.whatsappURL}" target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          Open & Send on WhatsApp Now
        </a>
        <button type="button" onclick="document.getElementById('listing-success-dialog').close()" class="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold">
          Close Window
        </button>
      </div>
    </div>
  `;

  modal.showModal();
}

