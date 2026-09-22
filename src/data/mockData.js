// ============================================================
// AstraNetra — DEMO / SYNTHETIC DATA ONLY
// No real patient records. Generated for prototype/demo purposes.
// ============================================================

export const DR_STAGES = ["No DR", "Mild DR", "Moderate DR", "Severe DR", "Proliferative DR"];

export const RISK_LEVELS = ["Low", "Moderate", "High", "Critical"];

export const RISK_COLOR = {
  Low: "safe",
  Moderate: "caution",
  High: "danger",
  Critical: "danger",
};

export const STAGE_TO_RISK = {
  "No DR": "Low",
  "Mild DR": "Moderate",
  "Moderate DR": "High",
  "Severe DR": "Critical",
  "Proliferative DR": "Critical",
};

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "or", name: "ଓଡ଼ିଆ (Odia)" },
  { code: "as", name: "অসমীয়া (Assamese)" },
  { code: "ur", name: "اردو (Urdu)" },
];

export const REPORT_SUMMARY_TRANSLATIONS = {
  en: "Your screening shows signs that require examination by an eye specialist.",
  hi: "आपकी जांच में ऐसे संकेत मिले हैं जिनके लिए नेत्र विशेषज्ञ की जांच आवश्यक है।",
  ml: "നിങ്ങളുടെ പരിശോധനയിൽ നേത്ര വിദഗ്ധന്റെ പരിശോധന ആവശ്യമായ ലക്ഷണങ്ങൾ കാണുന്നു.",
  ta: "உங்கள் பரிசோதனையில் கண் நிபுணர் பரிசோதனை தேவைப்படும் அறிகுறிகள் காணப்படுகின்றன.",
  te: "మీ పరీక్షలో నేత్ర నిపుణుడి పరీక్ష అవసరమయ్యే సంకేతాలు కనిపించాయి.",
  kn: "ನಿಮ್ಮ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಕಣ್ಣಿನ ತಜ್ಞರ ಪರೀಕ್ಷೆ ಅಗತ್ಯವಿರುವ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿವೆ.",
  bn: "আপনার স্ক্রিনিং-এ এমন লক্ষণ দেখা গেছে যার জন্য চক্ষু বিশেষজ্ঞের পরীক্ষা প্রয়োজন।",
  mr: "तुमच्या तपासणीत अशी लक्षणे आढळली आहेत ज्यासाठी नेत्र तज्ञांची तपासणी आवश्यक आहे.",
  gu: "તમારી તપાસમાં એવા સંકેતો જોવા મળ્યા છે જેના માટે આંખના નિષ્ણાતની તપાસ જરૂરી છે.",
  pa: "ਤੁਹਾਡੀ ਜਾਂਚ ਵਿੱਚ ਅਜਿਹੇ ਸੰਕੇਤ ਮਿਲੇ ਹਨ ਜਿਨ੍ਹਾਂ ਲਈ ਅੱਖਾਂ ਦੇ ਮਾਹਿਰ ਦੀ ਜਾਂਚ ਜ਼ਰੂਰੀ ਹੈ।",
  or: "ଆପଣଙ୍କ ସ୍କ୍ରିନିଂରେ ଏପରି ଲକ୍ଷଣ ଦେଖାଯାଇଛି ଯାହା ପାଇଁ ଚକ୍ଷୁ ବିଶେଷଜ୍ଞଙ୍କ ପରୀକ୍ଷା ଆବଶ୍ୟକ।",
  as: "আপোনাৰ স্ক্ৰীনিঙত এনে লক্ষণ পোৱা গৈছে যাৰ বাবে চকু বিশেষজ্ঞৰ পৰীক্ষাৰ প্ৰয়োজন।",
  ur: "آپ کی اسکریننگ میں ایسی علامات ملی ہیں جن کے لیے آنکھوں کے ماہر سے معائنہ ضروری ہے۔",
};

const VILLAGES = [
  { village: "Chikkaballapur Rural", district: "Chikkaballapur", state: "Karnataka" },
  { village: "Anantapalle", district: "Anantapur", state: "Andhra Pradesh" },
  { village: "Bettadapura", district: "Mysuru", state: "Karnataka" },
  { village: "Sironj", district: "Vidisha", state: "Madhya Pradesh" },
  { village: "Kondapalli", district: "Krishna", state: "Andhra Pradesh" },
  { village: "Manapparai", district: "Tiruchirappalli", state: "Tamil Nadu" },
  { village: "Palakkad Rural", district: "Palakkad", state: "Kerala" },
  { village: "Ramanagara", district: "Ramanagara", state: "Karnataka" },
];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

const FIRST_NAMES = ["Ravi", "Sunita", "Manoj", "Lakshmi", "Ganesh", "Kavya", "Suresh", "Anita", "Prakash", "Meena", "Dinesh", "Radha", "Vijay", "Geeta", "Arjun", "Shobha", "Ramesh", "Padma", "Naveen", "Uma"];
const LAST_NAMES = ["Kumar", "Reddy", "Naidu", "Devi", "Rao", "Gowda", "Patil", "Sharma", "Verma", "Yadav", "Nair", "Iyer", "Shetty", "Chauhan", "Mishra"];

export function generatePatients(count = 24) {
  const rng = seededRandom(42);
  const patients = [];
  for (let i = 0; i < count; i++) {
    const stage = pick(rng, DR_STAGES);
    const risk = STAGE_TO_RISK[stage];
    const loc = pick(rng, VILLAGES);
    const age = 35 + Math.floor(rng() * 40);
    const quality = 55 + Math.floor(rng() * 44);
    const confidence = stage === "No DR" ? 92 + Math.floor(rng() * 7) : 78 + Math.floor(rng() * 20);
    const lastScanDaysAgo = Math.floor(rng() * 40);
    const lastScan = new Date(Date.now() - lastScanDaysAgo * 86400000);
    const followUpDays = stage === "No DR" ? 180 : stage === "Mild DR" ? 90 : stage === "Moderate DR" ? 30 : 14;
    const nextFollowUp = new Date(lastScan.getTime() + followUpDays * 86400000);
    const status =
      stage === "Severe DR" || stage === "Proliferative DR"
        ? "Specialist Referral"
        : nextFollowUp < new Date()
        ? "Follow-up Due"
        : "Monitoring";

    patients.push({
      id: `P${String(i + 1).padStart(3, "0")}`,
      name: `${pick(rng, FIRST_NAMES)} ${pick(rng, LAST_NAMES)}`,
      age,
      gender: rng() > 0.5 ? "Male" : "Female",
      village: loc.village,
      district: loc.district,
      state: loc.state,
      diabetesDuration: `${1 + Math.floor(rng() * 18)} years`,
      bloodGlucose: `${90 + Math.floor(rng() * 160)} mg/dL`,
      bloodPressure: `${110 + Math.floor(rng() * 40)}/${70 + Math.floor(rng() * 20)}`,
      previousDrHistory: rng() > 0.7 ? "Yes" : "No",
      stage,
      risk,
      confidence,
      imageQuality: quality,
      lastScan: lastScan.toISOString().slice(0, 10),
      nextFollowUp: nextFollowUp.toISOString().slice(0, 10),
      status,
      category: status === "Follow-up Due" || status === "Monitoring" || status === "Specialist Referral" ? "active" : "passive",
      lesions: {
        microaneurysms: stage === "No DR" ? 0 : Math.floor(rng() * 12),
        hemorrhages: stage === "No DR" || stage === "Mild DR" ? 0 : Math.floor(rng() * 8),
        exudates: stage === "No DR" ? 0 : Math.floor(rng() * 9),
        cottonWoolSpots: ["Severe DR", "Proliferative DR"].includes(stage) ? Math.floor(rng() * 4) : 0,
        neovascularization: stage === "Proliferative DR" ? Math.floor(1 + rng() * 3) : 0,
        irma: ["Severe DR", "Proliferative DR"].includes(stage) ? Math.floor(rng() * 3) : 0,
      },
      progression: buildProgression(rng, stage),
    });
  }
  return patients;
}

function buildProgression(rng, finalStage) {
  const idx = DR_STAGES.indexOf(finalStage);
  const months = ["2026-01", "2026-04", "2026-07", "2026-09"];
  const path = [];
  let cur = Math.max(0, idx - Math.floor(rng() * 2) - (rng() > 0.5 ? 1 : 0));
  for (let i = 0; i < months.length; i++) {
    if (i === months.length - 1) cur = idx;
    else cur = Math.min(idx, cur + (rng() > 0.6 ? 1 : 0));
    path.push({ month: months[i], stage: DR_STAGES[cur], stageIndex: cur });
  }
  return path;
}

export const PATIENTS = generatePatients(24);

export const ACTIVE_PATIENTS = PATIENTS.filter((p) => p.category === "active");
export const PASSIVE_PATIENTS = PATIENTS.filter((p) => p.category === "passive");

export const OVERVIEW_STATS = {
  totalScreenings: 1284,
  atRisk: 176,
  referred: 64,
  followUpsDue: 38,
};

export const MONTHLY_SCREENINGS = [
  { month: "Jan", screenings: 72 },
  { month: "Feb", screenings: 89 },
  { month: "Mar", screenings: 104 },
  { month: "Apr", screenings: 127 },
  { month: "May", screenings: 141 },
  { month: "Jun", screenings: 168 },
  { month: "Jul", screenings: 183 },
  { month: "Aug", screenings: 201 },
  { month: "Sep", screenings: 199 },
];

export const RISK_DISTRIBUTION = [
  { name: "Low", value: 68, color: "#1E8E5A" },
  { name: "Moderate", value: 21, color: "#C7811C" },
  { name: "High", value: 11, color: "#C22A2A" },
];

export const DR_SEVERITY_DISTRIBUTION = DR_STAGES.map((stage) => ({
  stage,
  count: PATIENTS.filter((p) => p.stage === stage).length,
}));

export const IMAGE_QUALITY_TREND = [
  { month: "Jan", avgQuality: 74 },
  { month: "Feb", avgQuality: 77 },
  { month: "Mar", avgQuality: 79 },
  { month: "Apr", avgQuality: 81 },
  { month: "May", avgQuality: 83 },
  { month: "Jun", avgQuality: 85 },
  { month: "Jul", avgQuality: 86 },
  { month: "Aug", avgQuality: 88 },
  { month: "Sep", avgQuality: 89 },
];

export const FOLLOWUP_COMPLETION = [
  { month: "Apr", completed: 61, missed: 12 },
  { month: "May", completed: 68, missed: 10 },
  { month: "Jun", completed: 74, missed: 9 },
  { month: "Jul", completed: 79, missed: 8 },
  { month: "Aug", completed: 85, missed: 7 },
  { month: "Sep", completed: 88, missed: 6 },
];

export const STAKEHOLDERS = [
  { role: "Rural Patients", problem: "Limited access to eye specialists and long travel distances for screening.", help: "Screening happens locally, near home, with plain-language results in their own language." },
  { role: "ASHA Workers", problem: "Need a simple way to identify at-risk patients without clinical training in ophthalmology.", help: "Guided capture workflow and automatic quality checks remove the need for specialist judgment at the point of care." },
  { role: "ANM / Frontline Healthcare Workers", problem: "Manage many patients with limited time and paperwork support.", help: "Structured patient records, auto-generated reports and follow-up scheduling reduce administrative load." },
  { role: "Ophthalmologists", problem: "Overloaded caseloads and difficulty prioritising which rural cases need urgent attention.", help: "Referrals arrive pre-triaged with confidence scores, lesion detail and explainable heatmaps." },
  { role: "Retinal Specialists", problem: "Limited visibility into a patient's screening history when they eventually reach a clinic.", help: "Longitudinal progression timelines summarise prior screenings at a glance." },
  { role: "Hospitals", problem: "Difficulty forecasting referral volumes from rural catchment areas.", help: "Aggregated analytics show screening volume, risk distribution and referral trends over time." },
  { role: "Government Health Departments", problem: "Need population-level visibility into diabetic retinopathy burden in rural districts.", help: "District and state-level reporting supports planning and resource allocation." },
  { role: "ICMR / Healthcare Data Regulators", problem: "Require assurance that patient data and AI outputs are handled responsibly.", help: "Consent management, anonymization and audit logging are built into the workflow." },
  { role: "Academic Institutions", problem: "Need real-world validation environments for retinal AI research.", help: "The platform can support future collaboration on model evaluation using de-identified data." },
  { role: "SIH / Innovation Ecosystem", problem: "Looking for deployable, socially impactful solutions to real health-access gaps.", help: "A working prototype demonstrates a complete, explainable screening-to-referral pipeline." },
  { role: "Technology / AI Development Team", problem: "Needs a clear architecture to iterate on model accuracy and system reliability.", help: "Modular pipeline (quality → enhancement → classification → XAI) makes each stage independently improvable." },
];

export const ROADMAP = [
  { phase: "Phase 1", title: "Prototype", detail: "Core screening workflow, quality assessment and explainable AI demo." },
  { phase: "Phase 2", title: "Pilot in Rural Clinics", detail: "Field trials with ASHA/ANM workers across selected primary health centres." },
  { phase: "Phase 3", title: "Offline Edge AI", detail: "On-device inference for low-connectivity areas with background sync." },
  { phase: "Phase 4", title: "Multi-Camera Support", detail: "Compatibility with additional portable and smartphone-based fundus cameras." },
  { phase: "Phase 5", title: "Longitudinal Disease Prediction", detail: "Predictive modelling of disease progression across repeat screenings." },
  { phase: "Phase 6", title: "Additional Eye Disease Screening", detail: "Expansion to cataract, glaucoma and AMD indicators." },
];

export const FUTURE_CAPABILITIES = [
  "Cataract indicators",
  "Glaucoma indicators",
  "AMD indicators",
  "AI-assisted referral prioritization",
  "Population-level screening analytics",
  "Federated learning",
  "Edge AI",
  "Tele-ophthalmology integration",
];

export const DATASETS = [
  { name: "APTOS 2019 Blindness Detection", url: "https://www.kaggle.com/c/aptos2019-blindness-detection" },
  { name: "IDRiD — Indian Diabetic Retinopathy Image Dataset", url: "https://ieee-dataport.org/open-access/indian-diabetic-retinopathy-image-dataset-idrid" },
  { name: "DRIVE — Retinal Vessel Extraction", url: "https://drive.grand-challenge.org/" },
  { name: "Messidor-2", url: "https://www.adcis.net/en/third-party/messidor2/" },
];

export const ESTIMATION = {
  hardware: [
    { item: "Portable Fundus Camera", low: 50000, high: 250000 },
    { item: "Edge / Computing Device", low: 15000, high: 50000 },
    { item: "Networking Equipment", low: 5000, high: 20000 },
  ],
  software: [
    { item: "Frontend Development", low: 10000, high: 25000 },
    { item: "Backend Development", low: 10000, high: 25000 },
    { item: "AI Model Development", low: 15000, high: 35000 },
    { item: "Database & Cloud Storage", low: 5000, high: 15000 },
  ],
  deployment: [
    { item: "Training (Health Workers)", low: 10000, high: 30000 },
    { item: "Maintenance & Support", low: 15000, high: 45000 },
  ],
};

export function generateAnalysisResult(quality) {
  if (quality < 50) return null;
  const rng = seededRandom(Math.floor(quality * 97));
  const stage = quality < 70 ? pick(rng, ["No DR", "Mild DR", "Moderate DR"]) : pick(rng, DR_STAGES);
  const confidence = Math.min(98, Math.round(quality * 0.6 + rng() * 25));
  return {
    stage,
    confidence,
    risk: STAGE_TO_RISK[stage],
    uncertainty: Math.round(100 - confidence),
    lesions: {
      microaneurysms: stage === "No DR" ? 0 : Math.round(rng() * 10),
      hemorrhages: ["No DR", "Mild DR"].includes(stage) ? 0 : Math.round(rng() * 6),
      exudates: stage === "No DR" ? 0 : Math.round(rng() * 8),
      cottonWoolSpots: ["Severe DR", "Proliferative DR"].includes(stage) ? Math.round(rng() * 3) : 0,
      neovascularization: stage === "Proliferative DR" ? Math.round(1 + rng() * 2) : 0,
      irma: ["Severe DR", "Proliferative DR"].includes(stage) ? Math.round(rng() * 2) : 0,
    },
  };
}
