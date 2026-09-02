/**
 * MR Builder & Real Estate - Comprehensive Bilingual Engine (English / Urdu اردو)
 * Full language conversion for all pages, navigation, estimator, catalog & forms.
 */

const I18N_DICTIONARY = {
  en: {
    // Top Bar & Utility
    "topbar.direct": "Direct:",
    "topbar.hours": "Mon–Sat: 10:00 AM – 8:00 PM",
    "topbar.office": "Office: Al-Ghani Garden Phase 2, GT Road Lahore",
    "topbar.whatsapp": "WhatsApp Active",
    "topbar.openHours": "Desk Hours: 10am - 8pm",

    // Navigation & Common
    "nav.home": "Home",
    "nav.properties": "Real Estate",
    "nav.construction": "Construction Packages",
    "nav.estimator": "Cost Estimator",
    "nav.portfolio": "Portfolio",
    "nav.listProperty": "List Your Property",
    "nav.contact": "Contact",
    "nav.callNow": "Call Now",
    "nav.callDesk": "Call Desk",
    "nav.siteVisit": "Site Visit",
    "nav.callBuilder": "Call Builder",
    "nav.scheduleVisit": "Schedule Site Visit",
    "nav.langSwitch": "اردو",

    // Hero Section (Home)
    "hero.badge": "Construction Contractor & Direct Real Estate Brokerage",
    "hero.title": "Building Luxury Homes & Securing Prime Real Estate Across Lahore",
    "hero.subtitle": "Under direct supervision of Manzar Malik. High-standard turnkey construction, transparent DHA/Bahria plot transfers, and itemized transparent BOQs with Grade 60 steel & A-grade materials.",
    "hero.btnProperties": "Explore Properties",
    "hero.btnEstimator": "Cost Estimator",
    "hero.trust1": "Grade 60 Steel & Kalat Bricks",
    "hero.trust2": "100% Direct Owner Listings",
    "hero.trust3": "Overseas Video Logs",
    "hero.trust4": "Transparent Land Title Transfer",

    // Metrics Bar
    "stats.years": "15+ Years",
    "stats.yearsLabel": "On-Ground Experience",
    "stats.delivered": "50+ Sites",
    "stats.deliveredLabel": "Turnkey Homes Delivered",
    "stats.guarantee": "100% Verified",
    "stats.guaranteeLabel": "Clean Title Deeds & NDCs",
    "stats.volume": "PKR 5B+",
    "stats.volumeLabel": "Real Estate Handled",

    // Estimator
    "est.badge": "2026 Pakistan Construction Cost Calculator",
    "est.heading": "Instant Construction Cost Estimator",
    "est.subheading": "Get immediate rough estimates calibrated for Lahore & Punjab real estate market.",
    "est.plotSize": "Select Standard Plot Size:",
    "est.coveredArea": "Covered Area (Sq. Ft.):",
    "est.package": "Construction Package Type:",
    "est.pkgGrey": "Grey Structure (PKR 2,400–2,800/sq.ft)",
    "est.pkgTurnkey": "Turnkey A+ Finishing (PKR 4,800–5,500/sq.ft)",
    "est.pkgLuxury": "Executive Luxury (PKR 6,000–7,500/sq.ft)",
    "est.stories": "Number of Stories:",
    "est.storySingle": "Single Story",
    "est.storyDouble": "Double Story",
    "est.storyBasement": "Basement + Double Story",
    "est.estTotal": "Estimated Total Cost",
    "est.estRange": "Market Cost Range",
    "est.breakdown": "Itemized Cost Breakdown (%):",
    "est.btnWhatsApp": "Get Detailed BOQ via WhatsApp",
    "est.print": "Print Estimate",

    // Real Estate Inventory
    "prop.badge": "100% Direct Owner Inventory",
    "prop.heading": "Featured Real Estate Listings",
    "prop.subheading": "Prime residential plots, designer brand new houses, commercial plots, and ready rentals in Lahore.",
    "prop.all": "All Properties",
    "prop.nearOffice": "Near Office (Al-Ghani Garden • 3-5 Marla)",
    "prop.forSale": "For Sale",
    "prop.forRent": "For Rent",
    "prop.plots": "Residential Plots",
    "prop.houses": "Houses & Villas",
    "prop.commercial": "Commercial",
    "prop.exploreAll": "Explore All Properties",
    "prop.searchPlaceholder": "Search by block, society, Marla (e.g. 5 Marla, DHA, Al-Ghani)...",
    "prop.allSocieties": "All Societies (Lahore & Beyond)",
    "prop.directCall": "Call Direct",
    "prop.chatWhatsApp": "Chat on WhatsApp",
    "prop.beds": "Beds",
    "prop.baths": "Baths",
    "prop.sqft": "sq. ft.",
    "prop.viewDetails": "View Full Details",

    // Construction Pillars & Packages
    "cons.heading": "Construction Excellence & Packages",
    "cons.subheading": "Every house is constructed with Grade 60 steel, Kalat bricks, and certified engineering standards.",
    "cons.greyTitle": "Grey Structure",
    "cons.turnkeyTitle": "Turnkey A+ Finishing",
    "cons.luxuryTitle": "Executive Luxury",
    "cons.processHeading": "5-Step Construction Process",

    // Overseas Section
    "overseas.badge": "Dedicated Overseas Pakistani Desk",
    "overseas.heading": "Build or Buy in Lahore Without Leaving Your Home Abroad",
    "overseas.subheading": "Weekly video site logs, transparent digital material ledgers, and embassy power-of-attorney assistance.",
    "overseas.director": "Manzar Malik",
    "overseas.directorTitle": "Owner & Principal Director",
    "overseas.quote": "\"I personally inspect every structural steel grid, cement batch, and society title transfer. When you deal with MR Builder, your investment is safe as family.\"",

    // Contact & Office
    "contact.heading": "Connect Directly With Manzar Malik",
    "contact.subheading": "Whether you are planning to build your house or seeking verified plots in DHA, Bahria Town, or Al-Ghani Garden.",
    "contact.officeTitle": "Office & Site Operations Desk",
    "contact.officeAddress": "Al-Ghani Garden Phase 2, Main GT Road, Lahore, Pakistan",
    "contact.landmarks": "Near Quaid-e-Azam Interchange (Ring Road) & Manawan",
    "contact.openMaps": "Open in Google Maps",
    "contact.getDirections": "Get Driving Directions",
    "contact.formTitle": "Send Direct Inquiry",
    "contact.name": "Your Full Name *",
    "contact.phone": "WhatsApp / Phone *",
    "contact.service": "Service Required *",
    "contact.message": "Project Details / Message",
    "contact.submit": "Send to Manzar Malik on WhatsApp",

    // List Property
    "list.heading": "List Your Property with MR Real Estate",
    "list.subheading": "Direct connection to genuine verified buyers without broker chains.",
    "list.sell": "Sell Property",
    "list.rent": "Rent Out Property",
    "list.submit": "Submit Property Listing & Connect on WhatsApp",

    // Footer
    "footer.rights": "© 2026 MR Builder & Real Estate. All Rights Reserved. Principal: Manzar Malik.",
    "footer.desc": "Premier construction contractors and licensed real estate advisors based in Lahore, Pakistan.",
    "footer.societies": "Prime Societies Covered",
    "footer.nav": "Quick Navigation",
    "footer.contact": "Contact Desk"
  },

  ur: {
    // Top Bar & Utility
    "topbar.direct": "براہِ راست:",
    "topbar.hours": "پیر تا ہفتہ: صبح 10 تا رات 8 بجے",
    "topbar.office": "دفتر: الغنی گارڈن فیز 2، مین جی ٹی روڈ لاہور",
    "topbar.whatsapp": "واٹس ایپ دستیاب ہے",
    "topbar.openHours": "دفتری اوقات: صبح 10 تا شام 8",

    // Navigation & Common
    "nav.home": "صفحہ اول",
    "nav.properties": "جائیداد / پلاٹس و مکانات",
    "nav.construction": "تعمیراتی پیکجز",
    "nav.estimator": "لاگت کا تخمینہ",
    "nav.portfolio": "ہمارے پروجیکٹس",
    "nav.listProperty": "اپنی جائیداد لسٹ کریں",
    "nav.contact": "رابطہ کریں",
    "nav.callNow": "ابھی کال کریں",
    "nav.callDesk": "کال کریں",
    "nav.siteVisit": "سائٹ وزٹ",
    "nav.callBuilder": "بلڈر سے رابطہ",
    "nav.scheduleVisit": "سائٹ وزٹ بک کریں",
    "nav.langSwitch": "English",

    // Hero Section (Home)
    "hero.badge": "مستند کنسٹرکشن ٹھیکیدار اور تصدیق شدہ رئیل اسٹیٹ ایجنسی",
    "hero.title": "لاہور بھر میں جدید معیاری گھروں کی تعمیر اور تصدیق شدہ جائیداد",
    "hero.subtitle": "منظر ملک کی ذاتی زیرِ نگرانی۔ اے پلس ٹرن کی ہاؤس کنسٹرکشن، ڈی ایچ اے، بحریہ ٹاؤن اور الغنی گارڈن میں کلین فائلز اور شفاف ٹرانسفر۔ گریڈ 60 اسٹیل اور قلات کی اول اینٹ کی گارنٹی۔",
    "hero.btnProperties": "پلاٹس اور مکانات دیکھیں",
    "hero.btnEstimator": "تعمیراتی لاگت کا تخمینہ",
    "hero.trust1": "گریڈ 60 اسٹیل اور قلات اینٹ",
    "hero.trust2": "100٪ ڈائریکٹ مالک سے ڈیل",
    "hero.trust3": "بیرون ملک پاکستانیوں کیلئے ویڈیو رپورٹس",
    "hero.trust4": "شفاف سوسائٹی ٹرانسفر",

    // Metrics Bar
    "stats.years": "15+ سال",
    "stats.yearsLabel": "فیلڈ کا عملی تجربہ",
    "stats.delivered": "50+ گھر",
    "stats.deliveredLabel": "کامیابی سے مکمل و حوالے",
    "stats.guarantee": "100٪ کلیئر",
    "stats.guaranteeLabel": "تصدیق شدہ رجسٹری و این ڈی سی",
    "stats.volume": "5 ارب+ روپے",
    "stats.volumeLabel": "پلاٹس و کنسٹرکشن کا والیم",

    // Estimator
    "est.badge": "2026 پاکستان کنسٹرکشن لاگت کیلکولیٹر",
    "est.heading": "تعمیراتی لاگت کا فوری تخمینہ لگائیں",
    "est.subheading": "لاہور اور پنجاب کی موجودہ مارکیٹ ریٹس کے مطابق مٹیریل اور لیبر لاگت جانیں۔",
    "est.plotSize": "پلاٹ کا معیاری سائز منتخب کریں:",
    "est.coveredArea": "چھت کا کل رقبہ (مربع فٹ):",
    "est.package": "تعمیراتی پیکج منتخب کریں:",
    "est.pkgGrey": "گرے اسٹرکچر (2,400 تا 2,800 روپے فی مربع فٹ)",
    "est.pkgTurnkey": "ٹرن کی اے پلس فنشنگ (4,800 تا 5,500 روپے فی مربع فٹ)",
    "est.pkgLuxury": "ایگزیکٹو لگژری (6,000 تا 7,500 روپے فی مربع فٹ)",
    "est.stories": "منزلوں کی تعداد:",
    "est.storySingle": "سنگل اسٹوری (ایک منزلہ)",
    "est.storyDouble": "ڈبل اسٹوری (دو منزلہ)",
    "est.storyBasement": "بیسمنٹ + ڈبل اسٹوری",
    "est.estTotal": "متوقع کل لاگت",
    "est.estRange": "مارکیٹ لاگت کی حدود",
    "est.breakdown": "مختلف شعبوں کی فیصد تقسیم (%):",
    "est.btnWhatsApp": "واٹس ایپ پر مکمل تفصیل (BOQ) حاصل کریں",
    "est.print": "تخمینہ پرنٹ کریں",

    // Real Estate Inventory
    "prop.badge": "100٪ ڈائریکٹ مالک سے لسٹنگز",
    "prop.heading": "نمایاں پلاٹس، ولاز اور دکانیں",
    "prop.subheading": "لاہور کی ٹاپ سوسائٹیز میں تصدیق شدہ رہائشی پلاٹس، برانڈ نیو لگژری گھر، کمرشل پلازے اور دکانیں۔",
    "prop.all": "تمام جائیدادیں",
    "prop.nearOffice": "دفتر کے قریب (الغنی گارڈن • 3 تا 5 مرلہ)",
    "prop.forSale": "برائے فروخت",
    "prop.forRent": "برائے کرایہ",
    "prop.plots": "رہائشی پلاٹس",
    "prop.houses": "تیار مکانات و ولاز",
    "prop.commercial": "کمرشل املاک",
    "prop.exploreAll": "تمام جائیدادیں دیکھیں",
    "prop.searchPlaceholder": "سوسائٹی، بلاک یا مرلہ سرچ کریں (مثلاً 5 مرلہ، ڈی ایچ اے، الغنی)...",
    "prop.allSocieties": "تمام سوسائٹیز (لاہور)",
    "prop.directCall": "ابھی کال کریں",
    "prop.chatWhatsApp": "واٹس ایپ پر بات کریں",
    "prop.beds": "بیڈز",
    "prop.baths": "باتھ",
    "prop.sqft": "مربع فٹ",
    "prop.viewDetails": "مکمل تفصیلات دیکھیں",

    // Construction Pillars & Packages
    "cons.heading": "معیاری تعمیرات اور پیکجز",
    "cons.subheading": "ہر گھر گریڈ 60 اسٹیل، قلات اینٹ اور انجینئرنگ کے اعلیٰ اصولوں پر تعمیر کیا جاتا ہے۔",
    "cons.greyTitle": "گرے اسٹرکچر",
    "cons.turnkeyTitle": "ٹرن کی اے پلس فنشنگ",
    "cons.luxuryTitle": "ایگزیکٹو لگژری",
    "cons.processHeading": "تعمیر کے 5 بنیادی مراحل",

    // Overseas Section
    "overseas.badge": "اوورسیز پاکستانیوں کیلئے خصوصی ڈیسک",
    "overseas.heading": "بیرون ملک بیٹھے لاہور میں گھر بنائیں یا محفوظ پلاٹ خریدیں",
    "overseas.subheading": "ہفتہ وار ویڈیو رپورٹس، مٹیریل کا شفاف ڈیجیٹل کھاتہ اور پاور آف اٹارنی کی مکمل رہنمائی۔",
    "overseas.director": "منظر ملک",
    "overseas.directorTitle": "اونر و مینیجنگ ڈائریکٹر",
    "overseas.quote": "\"میں خود ہر سائٹ پر سریے کی جالی، سیمنٹ کی کوالٹی اور سوسائٹی ٹرانسفر کا معائنہ کرتا ہوں۔ ایم آر بلڈر کے ساتھ آپ کی پائی پائی محفوظ ہے۔\"",

    // Contact & Office
    "contact.heading": "منظر ملک سے براہِ راست رابطہ کریں",
    "contact.subheading": "چاہے آپ نیا گھر بنوانا چاہتے ہیں یا ڈی ایچ اے، بحریہ یا الغنی گارڈن میں تصدیق شدہ پلاٹ لینا چاہتے ہوں۔",
    "contact.officeTitle": "ہیڈ آفس اور سائٹ آپریشنز ڈیسک",
    "contact.officeAddress": "الغنی گارڈن فیز 2، مین جی ٹی روڈ، لاہور، پاکستان",
    "contact.landmarks": "قائد اعظم انٹرچینج (رنگ روڈ) اور تھانہ مناواں کے قریب",
    "contact.openMaps": "گوگل میپس میں کھولیں",
    "contact.getDirections": "راستہ معلوم کریں (ڈائریکشنز)",
    "contact.formTitle": "براہِ راست پیغام بھیجیں",
    "contact.name": "آپ کا مکمل نام *",
    "contact.phone": "واٹس ایپ / فون نمبر *",
    "contact.service": "مطلوبہ سروس *",
    "contact.message": "پروجیکٹ کی تفصیل / پیغام",
    "contact.submit": "منظر ملک کو واٹس ایپ پر بھیجیں",

    // List Property
    "list.heading": "ایم آر رئیل اسٹیٹ پر اپنی جائیداد لسٹ کریں",
    "list.subheading": "بغیر کسی مڈل مین کے براہِ راست بااعتماد خریداروں تک رسائی حاصل کریں۔",
    "list.sell": "پلاٹ / مکان فروخت کرنا ہے",
    "list.rent": "کرائے پر دینا ہے",
    "list.submit": "لسٹنگ جمع کروائیں اور واٹس ایپ پر رابطہ کریں",

    // Footer
    "footer.rights": "© 2026 ایم آر بلڈر اینڈ رئیل اسٹیٹ۔ جملہ حقوق محفوظ ہیں۔ سربراہ: منظر ملک۔",
    "footer.desc": "لاہور پاکستان میں مستند کنسٹرکشن کنٹریکٹر اور لائسنس یافتہ رئیل اسٹیٹ ایڈوائزرز۔",
    "footer.societies": "نمایاں سوسائٹیز",
    "footer.nav": "اہم لنکس",
    "footer.contact": "رابطہ ڈیسک"
  }
};

/**
 * Returns currently selected language: 'en' or 'ur'
 */
function getActiveLanguage() {
  return localStorage.getItem("mrb_lang") || "en";
}

/**
 * Sets website language and applies translations, RTL styles, and UI state
 */
function setAppLanguage(lang) {
  if (lang !== "en" && lang !== "ur") lang = "en";
  localStorage.setItem("mrb_lang", lang);

  const html = document.documentElement;
  const isUrdu = lang === "ur";

  html.lang = lang;
  html.dir = isUrdu ? "rtl" : "ltr";

  if (isUrdu) {
    document.body.classList.add("lang-ur");
    document.body.classList.remove("lang-en");
  } else {
    document.body.classList.add("lang-en");
    document.body.classList.remove("lang-ur");
  }

  // Translate all DOM elements with data-i18n attributes
  const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.en;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  // Titles
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (dict[key]) {
      el.title = dict[key];
    }
  });

  // Update Call Now buttons specifically
  document.querySelectorAll(".call-now-btn-text").forEach(el => {
    el.textContent = isUrdu ? "ابھی کال کریں" : "Call Now";
  });

  // Update Language Switcher buttons across the page
  document.querySelectorAll(".lang-switch-btn").forEach(btn => {
    if (isUrdu) {
      btn.innerHTML = `<span class="inline-flex items-center gap-1 font-bold text-amber-400"><i data-lucide="globe" class="w-3.5 h-3.5"></i> English</span>`;
    } else {
      btn.innerHTML = `<span class="inline-flex items-center gap-1 font-bold text-gold-400"><i data-lucide="globe" class="w-3.5 h-3.5"></i> اردو</span>`;
    }
  });

  // Re-render Lucide icons
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
  }

  // Dispatch event for other modules (properties, estimator)
  window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang, isUrdu } }));
}

/**
 * Toggles between English and Urdu
 */
function toggleAppLanguage() {
  const current = getActiveLanguage();
  const next = current === "ur" ? "en" : "ur";
  setAppLanguage(next);
}

// Attach listener when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const currentLang = getActiveLanguage();
  setAppLanguage(currentLang);

  // Setup click listeners for all language switcher buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".lang-switch-btn");
    if (btn) {
      e.preventDefault();
      toggleAppLanguage();
    }
  });
});
