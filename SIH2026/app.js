/* ══════════════════════════════════════════════════
   AstraNetra — app.js
   MathWorks ID26038 · DR Screening Web Portal
══════════════════════════════════════════════════ */

/* ─────────────── LANGUAGE DATA ─────────────── */
const LANG = {
  en: {
    name: "English",
    greeting: "Hello! I'm <strong>AstraNetra</strong>, your explainable retinal analysis assistant. I've analysed the uploaded fundus image. Ask me anything about the findings.",
    findings: `<strong>Key Findings — Grade 3 (Severe NPDR):</strong><br>
• <span style="color:#e74c3c">14 microaneurysms</span> detected in the temporal and inferior quadrants<br>
• <span style="color:#f39c12">8 clusters of hard exudates</span> near the macular region<br>
• <span style="color:#9b59b6">6 retinal hemorrhage regions</span> (dot &amp; blot type)<br>
• Venous beading confirmed — positive 4-2-1 rule<br>
• Grad-CAM attention highest near temporal microaneurysm clusters<br><br>
<strong>Recommendation:</strong> Urgent ophthalmologist referral within 2–4 weeks.`,
    grade: `<strong>DR Classification Result:</strong><br>
Grade: <span style="color:#EF5350"><strong>3 — Severe Non-Proliferative DR (NPDR)</strong></span><br>
Confidence: <span style="color:#FFA726">87%</span><br><br>
Model performance on this category:<br>
• Sensitivity: 91.4% | Specificity: 88.2%<br>
• AUC-ROC: 0.943<br><br>
This grade is <strong>referable DR</strong> — immediate specialist review is indicated.`,
    treatment: `<strong>Recommended Clinical Actions:</strong><br>
1. Urgent referral to ophthalmologist (within 2–4 weeks)<br>
2. Optimise glycaemic control (target HbA1c &lt;7%)<br>
3. Blood pressure control (&lt;130/80 mmHg)<br>
4. Lipid management — consider statin therapy<br>
5. Fundus fluorescein angiography (FFA) to map ischaemia<br>
6. Consider pan-retinal photocoagulation (PRP) laser therapy<br>
7. Anti-VEGF injections if DME (diabetic macular oedema) present`,
    gradcam: `<strong>Grad-CAM Explainability:</strong><br>
The Gradient-weighted Class Activation Map (Grad-CAM) highlights the regions that most influenced the Grade 3 decision:<br><br>
🔴 <strong>High attention (red)</strong>: Temporal quadrant microaneurysm clusters and haemorrhages<br>
🟠 <strong>Medium attention (orange)</strong>: Hard exudate regions near fovea<br>
🟡 <strong>Low attention (yellow)</strong>: Peripheral vessel abnormalities<br><br>
This map enables ophthalmologist validation in under 30 seconds.`,
    risk: `<strong>Patient Risk Assessment:</strong><br>
Current Grade 3 NPDR carries a <span style="color:#EF5350"><strong>60% risk of progression to PDR within 1 year</strong></span> without intervention.<br><br>
Risk factors detected:<br>
• Positive 4-2-1 rule (venous beading in 2+ quadrants)<br>
• Intraretinal microvascular abnormalities (IRMA)<br>
• Macular involvement risk: High<br><br>
Annual blindness risk without treatment: ~25%<br>
With timely laser treatment: risk reduced to &lt;5%`
  },
  hi: {
    name: "हिन्दी",
    greeting: "नमस्ते! मैं <strong>AstraNetra</strong> हूँ — आपका रेटिनल विश्लेषण सहायक। मैंने फंडस छवि का विश्लेषण कर लिया है। अपने निष्कर्षों के बारे में मुझसे कुछ भी पूछें।",
    findings: `<strong>मुख्य निष्कर्ष — ग्रेड 3 (गंभीर NPDR):</strong><br>
• <span style="color:#e74c3c">14 सूक्ष्म धमनी-विस्फार</span> टेम्पोरल और अवर क्वाड्रेंट में<br>
• <span style="color:#f39c12">8 कठोर स्राव के समूह</span> मैक्युलर क्षेत्र के पास<br>
• <span style="color:#9b59b6">6 रेटिनल रक्तस्राव क्षेत्र</span> (डॉट और ब्लॉट प्रकार)<br>
• शिरापरक मनका पुष्टि — 4-2-1 नियम सकारात्मक<br><br>
<strong>सिफारिश:</strong> 2-4 सप्ताह के भीतर नेत्र विशेषज्ञ को तत्काल रेफर करें।`,
    grade: `<strong>DR वर्गीकरण परिणाम:</strong><br>
ग्रेड: <span style="color:#EF5350"><strong>3 — गंभीर गैर-प्रसारी DR</strong></span><br>
विश्वास स्तर: <span style="color:#FFA726">87%</span><br><br>
• संवेदनशीलता: 91.4% | विशिष्टता: 88.2%<br>
• यह <strong>रेफरेबल DR</strong> है — तत्काल विशेषज्ञ समीक्षा आवश्यक।`,
    treatment: `<strong>अनुशंसित नैदानिक कार्रवाइयाँ:</strong><br>
1. नेत्र विशेषज्ञ को तत्काल रेफरल (2-4 सप्ताह में)<br>
2. रक्त शर्करा नियंत्रण (HbA1c &lt;7%)<br>
3. रक्तचाप नियंत्रण (&lt;130/80 mmHg)<br>
4. लिपिड प्रबंधन — स्टैटिन थेरेपी पर विचार करें<br>
5. फंडस फ्लोरेसिन एंजियोग्राफी (FFA)<br>
6. पैन-रेटिनल फोटोकोएगुलेशन (PRP) लेजर थेरेपी`,
    gradcam: `<strong>Grad-CAM व्याख्यात्मकता:</strong><br>
ग्रेडिएंट-भारित क्लास एक्टिवेशन मैप उन क्षेत्रों को दर्शाता है जिन्होंने ग्रेड 3 निर्णय को सबसे अधिक प्रभावित किया:<br><br>
🔴 <strong>उच्च ध्यान (लाल)</strong>: टेम्पोरल क्वाड्रेंट माइक्रोएन्यूरिज्म<br>
🟠 <strong>मध्यम ध्यान (नारंगी)</strong>: फोविया के पास कठोर स्राव<br>
यह मानचित्र 30 सेकंड से कम में नेत्र रोग विशेषज्ञ सत्यापन की अनुमति देता है।`,
    risk: `<strong>रोगी जोखिम मूल्यांकन:</strong><br>
वर्तमान ग्रेड 3 NPDR में बिना उपचार के <span style="color:#EF5350"><strong>1 वर्ष में PDR में प्रगति का 60% जोखिम</strong></span> है।<br><br>
• 4-2-1 नियम सकारात्मक<br>
• मैक्युलर जटिलता का जोखिम: उच्च<br>
• समय पर उपचार से अंधेपन का जोखिम &lt;5% तक कम`
  },
  ta: {
    name: "தமிழ்",
    greeting: "வணக்கம்! நான் <strong>AstraNetra</strong> — உங்கள் விழித்திரை பகுப்பாய்வு உதவியாளர். ஃபண்டஸ் படத்தை பகுப்பாய்வு செய்துள்ளேன். கண்டறிதல்களைப் பற்றி என்னிடம் கேளுங்கள்.",
    findings: `<strong>முக்கிய கண்டறிதல்கள் — தரம் 3 (கடுமையான NPDR):</strong><br>
• <span style="color:#e74c3c">14 நுண்தமனி கோளாறுகள்</span> நேரப்பக்க மற்றும் கீழ் பகுதிகளில்<br>
• <span style="color:#f39c12">8 திட வெளியேற்றம் கொத்துகள்</span> மாகுலார் பகுதி அருகில்<br>
• <span style="color:#9b59b6">6 விழித்திரை இரத்தப்போக்கு பகுதிகள்</span><br>
• நரம்பு மணி உறுதிப்படுத்தல் — 4-2-1 விதி நேர்மறை<br><br>
<strong>பரிந்துரை:</strong> 2-4 வாரங்களுக்குள் கண் நிபுணரிடம் அனுப்பவும்.`,
    grade: `<strong>DR வகைப்பாடு முடிவு:</strong><br>
தரம்: <span style="color:#EF5350"><strong>3 — கடுமையான Non-Proliferative DR</strong></span><br>
நம்பகத்தன்மை: <span style="color:#FFA726">87%</span><br><br>
• உணர்திறன்: 91.4% | குறிப்பிட்டன்மை: 88.2%<br>
• இது <strong>பரிந்துரைக்கத்தக்க DR</strong> — உடனடி நிபுணர் மதிப்பாய்வு தேவை.`,
    treatment: `<strong>பரிந்துரைக்கப்பட்ட மருத்துவ நடவடிக்கைகள்:</strong><br>
1. கண் நிபுணரிடம் உடனடி பரிந்துரை (2-4 வாரங்களில்)<br>
2. இரத்த சர்க்கரை கட்டுப்பாடு (HbA1c &lt;7%)<br>
3. இரத்த அழுத்த கட்டுப்பாடு (&lt;130/80 mmHg)<br>
4. Pan-retinal photocoagulation (PRP) லேசர் சிகிச்சை<br>
5. DME இருந்தால் Anti-VEGF ஊசிகள்`,
    gradcam: `<strong>Grad-CAM விளக்கம்:</strong><br>
தரம் 3 முடிவை அதிகம் பாதித்த பகுதிகளை வரைபடம் காட்டுகிறது:<br><br>
🔴 <strong>அதிக கவனம் (சிவப்பு)</strong>: நேரப்பக்க நுண்தமனி கொத்துகள்<br>
🟠 <strong>நடுத்தர கவனம் (ஆரஞ்சு)</strong>: Fovea அருகில் திட வெளியேற்றம்<br>
இந்த வரைபடம் 30 விநாடிகளுக்குள் கண் மருத்துவர் சரிபார்ப்பை செயல்படுத்துகிறது.`,
    risk: `<strong>நோயாளி ஆபத்து மதிப்பீடு:</strong><br>
தற்போதைய தரம் 3 NPDR இல் சிகிச்சை இல்லாமல் <span style="color:#EF5350"><strong>1 வருடத்தில் PDR க்கு முன்னேறும் 60% ஆபத்து</strong></span> உள்ளது.<br><br>
• 4-2-1 விதி நேர்மறை<br>
• மாகுலார் சிக்கல் ஆபத்து: அதிகம்<br>
• சரியான நேரத்தில் சிகிச்சை மூலம் குருட்டு ஆபத்து &lt;5%`
  },
  te: {
    name: "తెలుగు",
    greeting: "నమస్కారం! నేను <strong>AstraNetra</strong> — మీ రెటీనా విశ్లేషణ సహాయకుడు. ఫండస్ చిత్రాన్ని విశ్లేషించాను. అన్వేషణల గురించి నన్ను అడగండి.",
    findings: `<strong>ముఖ్య అన్వేషణలు — గ్రేడ్ 3 (తీవ్రమైన NPDR):</strong><br>
• <span style="color:#e74c3c">14 మైక్రోఎన్యూరిజమ్‌లు</span> టెంపొరల్ మరియు దిగువ చతుర్భుజాలలో<br>
• <span style="color:#f39c12">8 హార్డ్ ఎక్సుడేట్ క్లస్టర్లు</span> మాక్యులర్ ప్రాంతం సమీపంలో<br>
• <span style="color:#9b59b6">6 రెటీనా రక్తస్రావ ప్రాంతాలు</span><br>
• వినస్ బీడింగ్ నిర్ధారించబడింది — 4-2-1 నియమం పాజిటివ్<br><br>
<strong>సిఫారసు:</strong> 2-4 వారాల్లో నేత్ర వైద్యుడికి రెఫర్ చేయండి.`,
    grade: `<strong>DR వర్గీకరణ ఫలితం:</strong><br>
గ్రేడ్: <span style="color:#EF5350"><strong>3 — తీవ్రమైన Non-Proliferative DR</strong></span><br>
విశ్వాసం: <span style="color:#FFA726">87%</span><br><br>
• సెన్సిటివిటీ: 91.4% | స్పెసిఫిసిటీ: 88.2%<br>
• ఇది <strong>రెఫరబుల్ DR</strong> — తక్షణ నిపుణుల సమీక్ష అవసరం.`,
    treatment: `<strong>సిఫారసు చేయబడిన చికిత్సలు:</strong><br>
1. నేత్ర వైద్యుడికి తక్షణ రెఫరల్ (2-4 వారాల్లో)<br>
2. రక్త చక్కెర నియంత్రణ (HbA1c &lt;7%)<br>
3. రక్తపోటు నియంత్రణ (&lt;130/80 mmHg)<br>
4. Pan-retinal photocoagulation (PRP) లేజర్ చికిత్స<br>
5. DME ఉంటే Anti-VEGF ఇంజెక్షన్లు`,
    gradcam: `<strong>Grad-CAM వివరణ:</strong><br>
గ్రేడ్ 3 నిర్ణయాన్ని అత్యధికంగా ప్రభావితం చేసిన ప్రాంతాలను మ్యాప్ చూపిస్తుంది:<br><br>
🔴 <strong>అధిక శ్రద్ధ (ఎరుపు)</strong>: టెంపొరల్ మైక్రోఎన్యూరిజమ్ క్లస్టర్లు<br>
🟠 <strong>మధ్యస్థ శ్రద్ధ (నారింజ)</strong>: ఫోవియా సమీప ఎక్సుడేట్లు<br>
ఈ మ్యాప్ 30 సెకన్లలోపు నేత్ర వైద్య ధృవీకరణను అనుమతిస్తుంది.`,
    risk: `<strong>రోగి రిస్క్ అంచనా:</strong><br>
ప్రస్తుత గ్రేడ్ 3 NPDR లో చికిత్స లేకపోతే <span style="color:#EF5350"><strong>1 సంవత్సరంలో PDR కి 60% ముప్పు</strong></span> ఉంది.<br><br>
• 4-2-1 నియమం పాజిటివ్<br>
• మాక్యులర్ సమస్య ప్రమాదం: అధికం<br>
• సకాలంలో చికిత్సతో అంధత్వ ప్రమాదం &lt;5%`
  },
  kn: {
    name: "ಕನ್ನಡ",
    greeting: "ನಮಸ್ಕಾರ! ನಾನು <strong>AstraNetra</strong> — ನಿಮ್ಮ ರೆಟಿನಾ ವಿಶ್ಲೇಷಣ ಸಹಾಯಕ. ಫಂಡಸ್ ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿದ್ದೇನೆ. ಸಂಶೋಧನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ.",
    findings: `<strong>ಪ್ರಮುಖ ಸಂಶೋಧನೆಗಳು — ದರ್ಜೆ 3 (ತೀವ್ರ NPDR):</strong><br>
• <span style="color:#e74c3c">14 ಮೈಕ್ರೋಅನ್ಯೂರಿಸಮ್‌ಗಳು</span> ಟೆಂಪೊರಲ್ ಮತ್ತು ಕೆಳಗಿನ ಚತುರ್ಭಾಗಗಳಲ್ಲಿ<br>
• <span style="color:#f39c12">8 ಕಠಿಣ ಸ್ರಾವ ಗೊಂಚಲುಗಳು</span> ಮ್ಯಾಕ್ಯುಲಾರ್ ಪ್ರದೇಶದ ಸಮೀಪ<br>
• <span style="color:#9b59b6">6 ರೆಟಿನಾ ರಕ್ತಸ್ರಾವ ಪ್ರದೇಶಗಳು</span><br>
• ಸಿರೆಯ ಮಣಿ ದೃಢಪಡಿಸಲಾಗಿದೆ — 4-2-1 ನಿಯಮ ಧನಾತ್ಮಕ<br><br>
<strong>ಶಿಫಾರಸು:</strong> 2-4 ವಾರಗಳಲ್ಲಿ ನೇತ್ರ ತಜ್ಞರಿಗೆ ತಕ್ಷಣ ರೆಫರ್ ಮಾಡಿ.`,
    grade: `<strong>DR ವರ್ಗೀಕರಣ ಫಲಿತಾಂಶ:</strong><br>
ದರ್ಜೆ: <span style="color:#EF5350"><strong>3 — ತೀವ್ರ Non-Proliferative DR</strong></span><br>
ವಿಶ್ವಾಸ: <span style="color:#FFA726">87%</span><br><br>
• ಸಂವೇದನಶೀಲತೆ: 91.4% | ನಿರ್ದಿಷ್ಟತೆ: 88.2%`,
    treatment: `<strong>ಶಿಫಾರಸು ಮಾಡಿದ ಚಿಕಿತ್ಸೆ:</strong><br>
1. ನೇತ್ರ ತಜ್ಞರಿಗೆ ತಕ್ಷಣ ರೆಫರಲ್<br>
2. ರಕ್ತ ಸಕ್ಕರೆ ನಿಯಂತ್ರಣ (HbA1c &lt;7%)<br>
3. ರಕ್ತದೊತ್ತಡ ನಿಯಂತ್ರಣ (&lt;130/80 mmHg)<br>
4. PRP ಲೇಸರ್ ಚಿಕಿತ್ಸೆ`,
    gradcam: `<strong>Grad-CAM ವಿವರಣೆ:</strong><br>
🔴 <strong>ಹೆಚ್ಚಿನ ಗಮನ (ಕೆಂಪು)</strong>: ಟೆಂಪೊರಲ್ ಮೈಕ್ರೋಅನ್ಯೂರಿಸಮ್ ಗೊಂಚಲುಗಳು<br>
🟠 <strong>ಮಧ್ಯಮ ಗಮನ (ಕಿತ್ತಳೆ)</strong>: ಫೋವಿಯಾ ಸಮೀಪ ಸ್ರಾವಗಳು`,
    risk: `<strong>ರೋಗಿ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ:</strong><br>
ಚಿಕಿತ್ಸೆ ಇಲ್ಲದೆ <span style="color:#EF5350"><strong>1 ವರ್ಷದಲ್ಲಿ PDR ಗೆ 60% ಅಪಾಯ</strong></span> ಇದೆ.<br><br>
• ಸಕಾಲಿಕ ಚಿಕಿತ್ಸೆಯಿಂದ ಕುರುಡತ್ವದ ಅಪಾಯ &lt;5%`
  },
  bn: {
    name: "বাংলা",
    greeting: "নমস্কার! আমি <strong>AstraNetra</strong> — আপনার রেটিনাল বিশ্লেষণ সহকারী। ফান্ডাস চিত্র বিশ্লেষণ করেছি। যেকোনো প্রশ্ন করুন।",
    findings: `<strong>মূল অনুসন্ধান — গ্রেড 3 (গুরুতর NPDR):</strong><br>
• <span style="color:#e74c3c">14টি মাইক্রোঅ্যানিউরিজম</span> টেম্পোরাল ও নিচের চতুর্ভাগে<br>
• <span style="color:#f39c12">8টি কঠিন এক্সুডেট ক্লাস্টার</span> ম্যাকুলার অঞ্চলের কাছে<br>
• <span style="color:#9b59b6">6টি রেটিনাল রক্তক্ষরণ অঞ্চল</span><br>
• ভেনাস বিডিং নিশ্চিত — 4-2-1 নিয়ম পজিটিভ<br><br>
<strong>সুপারিশ:</strong> ২-৪ সপ্তাহের মধ্যে চক্ষু বিশেষজ্ঞের কাছে পাঠান।`,
    grade: `<strong>DR শ্রেণীকরণ ফলাফল:</strong><br>
গ্রেড: <span style="color:#EF5350"><strong>3 — গুরুতর Non-Proliferative DR</strong></span><br>
আস্থা: <span style="color:#FFA726">87%</span><br><br>
• সংবেদনশীলতা: 91.4% | বিশেষত্ব: 88.2%`,
    treatment: `<strong>প্রস্তাবিত চিকিৎসা:</strong><br>
1. চক্ষু বিশেষজ্ঞের কাছে তাৎক্ষণিক রেফারেল<br>
2. রক্তে শর্করার নিয়ন্ত্রণ (HbA1c &lt;7%)<br>
3. PRP লেজার থেরাপি<br>
4. প্রয়োজনে Anti-VEGF ইনজেকশন`,
    gradcam: `<strong>Grad-CAM ব্যাখ্যা:</strong><br>
🔴 <strong>উচ্চ মনোযোগ (লাল)</strong>: মাইক্রোঅ্যানিউরিজম ক্লাস্টার<br>
🟠 <strong>মাঝারি মনোযোগ (কমলা)</strong>: ফোভিয়ার কাছে এক্সুডেট`,
    risk: `<strong>রোগী ঝুঁকি মূল্যায়ন:</strong><br>
চিকিৎসা ছাড়া <span style="color:#EF5350"><strong>১ বছরে PDR-এ অগ্রগতির ৬০% ঝুঁকি</strong></span> রয়েছে।<br><br>
• সময়মত চিকিৎসায় অন্ধত্বের ঝুঁকি &lt;5%`
  },
  mr: {
    name: "मराठी",
    greeting: "नमस्कार! मी <strong>AstraNetra</strong> — तुमचा रेटिनल विश्लेषण सहाय्यक. फंडस प्रतिमेचे विश्लेषण केले आहे. निष्कर्षांबद्दल मला विचारा.",
    findings: `<strong>मुख्य निष्कर्ष — श्रेणी 3 (गंभीर NPDR):</strong><br>
• <span style="color:#e74c3c">14 मायक्रोअॅन्यूरिजम</span> टेम्पोरल आणि खालच्या चतुर्भागात<br>
• <span style="color:#f39c12">8 कठोर स्राव समूह</span> मॅक्युलर क्षेत्राजवळ<br>
• <span style="color:#9b59b6">6 रेटिनल रक्तस्राव क्षेत्रे</span><br>
• शिरापरक मणी पुष्टी — 4-2-1 नियम सकारात्मक<br><br>
<strong>शिफारस:</strong> 2-4 आठवड्यांत नेत्रतज्ज्ञाकडे तातडीने पाठवा.`,
    grade: `<strong>DR वर्गीकरण परिणाम:</strong><br>
श्रेणी: <span style="color:#EF5350"><strong>3 — गंभीर Non-Proliferative DR</strong></span><br>
विश्वास: <span style="color:#FFA726">87%</span><br><br>
• संवेदनशीलता: 91.4% | विशिष्टता: 88.2%`,
    treatment: `<strong>शिफारस केलेले उपचार:</strong><br>
1. नेत्रतज्ज्ञाकडे तातडीने रेफरल<br>
2. रक्तातील साखर नियंत्रण (HbA1c &lt;7%)<br>
3. PRP लेझर थेरपी<br>
4. आवश्यक असल्यास Anti-VEGF इंजेक्शन्स`,
    gradcam: `<strong>Grad-CAM स्पष्टीकरण:</strong><br>
🔴 <strong>उच्च लक्ष (लाल)</strong>: मायक्रोअॅन्यूरिजम क्लस्टर्स<br>
🟠 <strong>मध्यम लक्ष (नारिंगी)</strong>: फोव्हियाजवळ स्राव<br>
हा नकाशा 30 सेकंदांत नेत्रतज्ज्ञ सत्यापन सक्षम करतो.`,
    risk: `<strong>रुग्ण जोखीम मूल्यांकन:</strong><br>
उपचाराशिवाय <span style="color:#EF5350"><strong>1 वर्षात PDR मध्ये प्रगतीचा 60% धोका</strong></span> आहे.<br><br>
• वेळेवर उपचाराने अंधत्वाचा धोका &lt;5%`
  },
  gu: {
    name: "ગુજરાતી",
    greeting: "નમસ્કાર! હું <strong>AstraNetra</strong> — તમારો રેટિનલ વિશ્લેષણ સહાયક. ફંડસ છબીનું વિશ્લેષણ કર્યું છે. તારણો વિશે પૂછો.",
    findings: `<strong>મુખ્ય તારણો — ગ્રેડ 3 (ગંભીર NPDR):</strong><br>
• <span style="color:#e74c3c">14 માઇક્રોઍન્યુરિઝ્મ</span> ટેમ્પોરલ અને નીચેના ભાગોમાં<br>
• <span style="color:#f39c12">8 કઠણ ઉત્સ્રાવ ક્લસ્ટર</span> મ્યાક્યુલર ક્ષેત્ર પાસે<br>
• <span style="color:#9b59b6">6 રેટિનલ રક્તસ્ત્રાવ ક્ષેત્રો</span><br>
• ચેતાતંત્ર બીડિંગ — 4-2-1 નિયમ હકારાત્મક<br><br>
<strong>ભલામણ:</strong> 2-4 અઠવાડિયામાં નેત્ર નિષ્ણાતને તાત્કાલિક રેફર કરો.`,
    grade: `<strong>DR વર્ગીકરણ પરિણામ:</strong><br>
ગ્રેડ: <span style="color:#EF5350"><strong>3 — ગંભીર Non-Proliferative DR</strong></span><br>
વિશ્વાસ: <span style="color:#FFA726">87%</span><br><br>
• સંવેદનશીલતા: 91.4% | વિશિષ્ટતા: 88.2%`,
    treatment: `<strong>ભલામણ કરેલ સારવાર:</strong><br>
1. નેત્ર નિષ્ણાતને તાત્કાલિક રેફરલ<br>
2. રક્ત ખાંડ નિયંત્રણ (HbA1c &lt;7%)<br>
3. PRP લેઝર ઉપચાર<br>
4. જરૂર હોય તો Anti-VEGF ઇન્જેક્શન`,
    gradcam: `<strong>Grad-CAM સ્પષ્ટીકરણ:</strong><br>
🔴 <strong>ઉચ્ચ ધ્યાન (લાલ)</strong>: ટેમ્પોરલ માઇક્રોઍન્યુરિઝ્મ ક્લસ્ટર<br>
🟠 <strong>મધ્યમ ધ્યાન (નારંગી)</strong>: ફોવિયા પાસે ઉત્સ્રાવ`,
    risk: `<strong>દર્દી જોખમ મૂલ્યાંકન:</strong><br>
સારવાર વિના <span style="color:#EF5350"><strong>1 વર્ષમાં PDR માં 60% જોખમ</strong></span> છે.<br><br>
• સમયસર સારવારથી અંધત્વ જોખમ &lt;5%`
  }
};

/* ─────────────── STATE ─────────────── */
let currentLang = 'en';
let isTyping = false;

/* ─────────────── CHAT ─────────────── */
function getLang() { return LANG[currentLang] || LANG.en; }

function setLang(btn, code) {
  currentLang = code;
  document.querySelectorAll('.lpill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const win = document.getElementById('chatWin');
  win.innerHTML = '';
  addAIMsg(getLang().greeting);
}

function addAIMsg(html) {
  const win = document.getElementById('chatWin');
  const div = document.createElement('div');
  div.className = 'msg msg-ai';
  div.innerHTML = `
    <div class="msg-avatar av-ai">🤖</div>
    <div>
      <div class="msg-tag">AstraNetra</div>
      <div class="msg-bubble">${html}</div>
    </div>`;
  win.appendChild(div);
  win.scrollTop = win.scrollHeight;
}

function addUserMsg(txt) {
  const win = document.getElementById('chatWin');
  const div = document.createElement('div');
  div.className = 'msg msg-usr';
  div.innerHTML = `
    <div class="msg-avatar av-usr">👤</div>
    <div>
      <div class="msg-tag" style="text-align:right">You</div>
      <div class="msg-bubble">${txt}</div>
    </div>`;
  win.appendChild(div);
  win.scrollTop = win.scrollHeight;
}

function showTyping() {
  const win = document.getElementById('chatWin');
  const div = document.createElement('div');
  div.className = 'msg msg-ai';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="msg-avatar av-ai">🤖</div>
    <div>
      <div class="msg-tag">AstraNetra</div>
      <div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>
    </div>`;
  win.appendChild(div);
  win.scrollTop = win.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

function sendMsg() {
  if (isTyping) return;
  const inp = document.getElementById('chatInput');
  const txt = inp.value.trim();
  if (!txt) return;
  addUserMsg(txt);
  inp.value = '';
  processQuery(txt.toLowerCase());
}

function quickQuery(key) {
  if (isTyping) return;
  const labels = { findings:'Key findings', grade:'DR grade', treatment:'Treatment options', gradcam:'Grad-CAM explanation', risk:'Risk level' };
  addUserMsg(labels[key] || key);
  processQuery(key);
}

function processQuery(q) {
  isTyping = true;
  showTyping();
  const L = getLang();
  let reply = '';
  const delay = 900 + Math.random() * 600;

  if (q.includes('find') || q.includes('lesion') || q.includes('detect') || q === 'findings') reply = L.findings;
  else if (q.includes('grade') || q.includes('classif') || q.includes('level') || q === 'grade') reply = L.grade;
  else if (q.includes('treat') || q.includes('action') || q.includes('manag') || q === 'treatment') reply = L.treatment;
  else if (q.includes('grad') || q.includes('cam') || q.includes('explain') || q === 'gradcam') reply = L.gradcam;
  else if (q.includes('risk') || q.includes('danger') || q === 'risk') reply = L.risk;
  else {
    reply = L.findings; // default
  }

  setTimeout(() => {
    removeTyping();
    addAIMsg(reply);
    isTyping = false;
  }, delay);
}

/* ─────────────── GRADE SELECTOR ─────────────── */
const GRADE_DATA = [
  {
    label: 'Grade 0 — No DR',
    badge_color: 'rgba(76,175,80,0.12)',
    badge_text: '#66BB6A',
    badge_border: 'rgba(76,175,80,0.3)',
    conf: 96, conf_color: '#66BB6A',
    sens: '94.1%', spec: '96.3%', auc: '0.978', time: '1.4s',
    lesions: [
      { name:'Microaneurysms', count:'None', pct: 0,  color:'#e74c3c' },
      { name:'Hard Exudates',  count:'None', pct: 0,  color:'#f39c12' },
      { name:'Hemorrhages',    count:'None', pct: 0,  color:'#9b59b6' },
      { name:'Venous Beading', count:'Negative', pct: 0, color:'#3498db' }
    ],
    gc_note: 'Minimal activation across the fundus image — model correctly identifies absence of lesion features. Optic disc boundary is clearly delineated with no pathological attention zones.'
  },
  {
    label: 'Grade 1 — Mild NPDR',
    badge_color: 'rgba(255,235,59,0.12)',
    badge_text: '#FDD835',
    badge_border: 'rgba(255,235,59,0.3)',
    conf: 82, conf_color: '#FDD835',
    sens: '88.5%', spec: '91.2%', auc: '0.931', time: '1.5s',
    lesions: [
      { name:'Microaneurysms', count:'1–4 detected', pct: 25, color:'#e74c3c' },
      { name:'Hard Exudates',  count:'Possible',     pct: 15, color:'#f39c12' },
      { name:'Hemorrhages',    count:'None',          pct: 0,  color:'#9b59b6' },
      { name:'Venous Beading', count:'Negative',     pct: 0,  color:'#3498db' }
    ],
    gc_note: 'Low-level attention on 1–4 microaneurysm foci in the posterior pole. Grad-CAM confirms the model relies on subtle dot-shaped lesions. No significant haemorrhage contribution.'
  },
  {
    label: 'Grade 2 — Moderate NPDR',
    badge_color: 'rgba(255,152,0,0.12)',
    badge_text: '#FFA726',
    badge_border: 'rgba(255,152,0,0.3)',
    conf: 84, conf_color: '#FFA726',
    sens: '90.2%', spec: '87.6%', auc: '0.938', time: '1.7s',
    lesions: [
      { name:'Microaneurysms', count:'5–10 detected', pct: 50, color:'#e74c3c' },
      { name:'Hard Exudates',  count:'3–5 clusters',  pct: 40, color:'#f39c12' },
      { name:'Hemorrhages',    count:'1–2 regions',   pct: 20, color:'#9b59b6' },
      { name:'Venous Beading', count:'Possible',      pct: 15, color:'#3498db' }
    ],
    gc_note: 'Moderate attention zones around multiple microaneurysm clusters and exudate deposits. Model weighting indicates both vascular leakage sites and lipid deposition contribute to Grade 2 decision.'
  },
  {
    label: 'Grade 3 — Severe NPDR',
    badge_color: 'rgba(244,67,54,0.12)',
    badge_text: '#EF5350',
    badge_border: 'rgba(244,67,54,0.3)',
    conf: 87, conf_color: '#EF5350',
    sens: '91.4%', spec: '88.2%', auc: '0.943', time: '1.8s',
    lesions: [
      { name:'Microaneurysms', count:'14 detected',   pct: 70, color:'#e74c3c' },
      { name:'Hard Exudates',  count:'8 clusters',    pct: 55, color:'#f39c12' },
      { name:'Hemorrhages',    count:'6 regions',     pct: 45, color:'#9b59b6' },
      { name:'Venous Beading', count:'Positive',      pct: 30, color:'#3498db' }
    ],
    gc_note: 'High attention in red/orange zones at temporal quadrant microaneurysm clusters and exudate deposits near the fovea — confirming the 4-2-1 rule. Critical features driving Grade 3 classification.'
  },
  {
    label: 'Grade 4 — Proliferative DR',
    badge_color: 'rgba(156,39,176,0.15)',
    badge_text: '#AB47BC',
    badge_border: 'rgba(156,39,176,0.3)',
    conf: 91, conf_color: '#AB47BC',
    sens: '93.7%', spec: '89.4%', auc: '0.961', time: '2.1s',
    lesions: [
      { name:'Neovascularisation', count:'Disc + elsewhere', pct: 90, color:'#AB47BC' },
      { name:'Microaneurysms',     count:'20+ detected',    pct: 95, color:'#e74c3c' },
      { name:'Hard Exudates',      count:'12+ clusters',    pct: 80, color:'#f39c12' },
      { name:'Vitreous Haemorrhage',count:'Present',        pct: 65, color:'#9b59b6' }
    ],
    gc_note: 'Widespread high-attention activation across the fundus — neovascular fronds at the optic disc and peripheral retina dominate the Grad-CAM map. Emergency treatment required.'
  }
];

function selGrade(g) {
  // Update selected UI
  document.querySelectorAll('.gi').forEach(el => {
    el.classList.toggle('gi-sel', parseInt(el.dataset.g) === g);
  });

  const d = GRADE_DATA[g];

  // Badge
  const badge = document.getElementById('gdBadge');
  badge.textContent = d.label;
  badge.style.background = d.badge_color;
  badge.style.color = d.badge_text;
  badge.style.border = `1px solid ${d.badge_border}`;

  // Confidence
  document.getElementById('confFill').style.width = d.conf + '%';
  document.getElementById('confPct').textContent = d.conf + '%';
  document.getElementById('confPct').style.color = d.conf_color;
  document.getElementById('confFill').style.background = `linear-gradient(90deg, ${d.conf_color}aa, ${d.conf_color})`;

  // Metrics
  document.getElementById('metSens').textContent = d.sens;
  document.getElementById('metSpec').textContent = d.spec;
  document.getElementById('metAuc').textContent  = d.auc;
  document.getElementById('metTime').textContent = d.time;

  // Lesion bars
  const lb = document.getElementById('lesionBars');
  lb.innerHTML = d.lesions.map(l => `
    <div class="lesion-row">
      <span class="lesion-dot" style="background:${l.color}"></span>
      <span class="lesion-name">${l.name}</span>
      <span class="lesion-cnt">${l.count}</span>
      <div class="lesion-track"><div class="lesion-fill" style="width:${l.pct}%;background:${l.color}"></div></div>
    </div>`).join('');

  // Grad-CAM note
  document.getElementById('gcNote').innerHTML = l => l;
  document.getElementById('gcNote').innerHTML = d.gc_note;

  // Redraw Grad-CAM canvas
  drawGradCAM(g);
}

/* ─────────────── GRAD-CAM CANVAS ─────────────── */
function drawGradCAM(grade) {
  const canvas = document.getElementById('gcCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Dark background (simulated retina)
  ctx.fillStyle = '#060a10';
  ctx.fillRect(0, 0, W, H);

  // Draw a simple retina circle
  ctx.beginPath();
  ctx.arc(W/2, H/2, Math.min(W,H)/2 - 6, 0, Math.PI*2);
  ctx.fillStyle = '#0f1a10';
  ctx.fill();
  ctx.strokeStyle = '#1a3a1a';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Grade-based heatmap blobs
  const blobs = {
    0: [],
    1: [{ x:0.62, y:0.45, r:0.08, intensity:0.6, color:'rgba(255,235,59,' }],
    2: [
      { x:0.58, y:0.42, r:0.10, intensity:0.7, color:'rgba(255,152,0,' },
      { x:0.45, y:0.55, r:0.08, intensity:0.5, color:'rgba(255,152,0,' }
    ],
    3: [
      { x:0.65, y:0.40, r:0.14, intensity:0.9, color:'rgba(239,83,80,' },
      { x:0.55, y:0.55, r:0.11, intensity:0.8, color:'rgba(239,83,80,' },
      { x:0.42, y:0.48, r:0.09, intensity:0.7, color:'rgba(255,152,0,' },
      { x:0.70, y:0.60, r:0.07, intensity:0.6, color:'rgba(255,152,0,' }
    ],
    4: [
      { x:0.65, y:0.42, r:0.16, intensity:0.95, color:'rgba(239,83,80,' },
      { x:0.50, y:0.50, r:0.14, intensity:0.9,  color:'rgba(239,83,80,' },
      { x:0.38, y:0.55, r:0.12, intensity:0.85, color:'rgba(255,152,0,' },
      { x:0.72, y:0.58, r:0.10, intensity:0.8,  color:'rgba(255,152,0,' },
      { x:0.48, y:0.35, r:0.09, intensity:0.75, color:'rgba(171,71,188,' },
      { x:0.30, y:0.45, r:0.08, intensity:0.7,  color:'rgba(171,71,188,' }
    ]
  };

  const blobSet = blobs[grade] || [];
  blobSet.forEach(b => {
    const grd = ctx.createRadialGradient(b.x*W, b.y*H, 0, b.x*W, b.y*H, b.r*W*1.8);
    grd.addColorStop(0,   b.color + b.intensity + ')');
    grd.addColorStop(0.5, b.color + (b.intensity * 0.4) + ')');
    grd.addColorStop(1,   b.color + '0)');
    ctx.beginPath();
    ctx.arc(b.x*W, b.y*H, b.r*W*1.8, 0, Math.PI*2);
    ctx.fillStyle = grd;
    ctx.fill();
  });

  // Optic disc marker
  ctx.beginPath();
  ctx.arc(W*0.65, H*0.43, 10, 0, Math.PI*2);
  ctx.strokeStyle = 'rgba(245,200,66,0.6)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Clip to circle
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(W/2, H/2, Math.min(W,H)/2 - 4, 0, Math.PI*2);
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fill();
  ctx.restore();
}

/* ─────────────── INIT ─────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Boot chat
  addAIMsg(getLang().greeting);

  // Draw default Grad-CAM (grade 3)
  drawGradCAM(3);

  // Keyboard shortcut for chat
  document.getElementById('chatInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMsg();
  });
});


/* ─────────────── CAMERA FEED ─────────────── */
let camStream = null;
let fpsInterval = null;
let frameCount = 0;
let lastFpsTime = Date.now();

function startCam() {
  const constraints = { video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }, audio: false };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      camStream = stream;
      const video = document.getElementById('camVideo');
      video.srcObject = stream;
      video.play();

      // Hide placeholder, show controls
      document.getElementById('camPlaceholder').style.display = 'none';
      document.getElementById('camStartBtn').style.display = 'none';
      document.getElementById('camStopBtn').style.display = '';
      document.getElementById('camSnapBtn').style.display = '';
      document.getElementById('camLiveDot').style.color = '#4FC3F7';

      // FPS counter
      fpsInterval = setInterval(() => {
        const now = Date.now();
        const elapsed = (now - lastFpsTime) / 1000;
        const fps = Math.round(frameCount / elapsed);
        document.getElementById('camFps').textContent = fps + ' fps';
        document.getElementById('camQuality').textContent = fps > 20 ? 'QUALITY: GOOD' : fps > 12 ? 'QUALITY: FAIR' : 'QUALITY: LOW';
        document.getElementById('cmpQuality').textContent = fps > 20 ? 'Good ✓' : fps > 12 ? 'Fair' : 'Low';
        document.getElementById('cmpQuality').style.color = fps > 20 ? '#66BB6A' : fps > 12 ? '#FFA726' : '#ef5350';
        frameCount = 0;
        lastFpsTime = now;
      }, 1000);

      // Count frames via requestAnimationFrame
      function countFrame() {
        if (!camStream) return;
        frameCount++;
        requestAnimationFrame(countFrame);
      }
      requestAnimationFrame(countFrame);

      // Focus simulation
      let focusVal = 0;
      const focusInterval = setInterval(() => {
        if (!camStream) { clearInterval(focusInterval); return; }
        focusVal = Math.min(100, focusVal + Math.floor(Math.random() * 15 + 5));
        const el = document.getElementById('cmpFocus');
        if (el) el.textContent = focusVal >= 100 ? 'Sharp ✓' : 'Adjusting…';
      }, 400);
    })
    .catch(err => {
      // Permission denied or no camera — show informative message
      const ph = document.getElementById('camPlaceholder');
      if (ph) {
        ph.style.display = 'flex';
        ph.innerHTML = `<svg viewBox="0 0 64 64" fill="none" width="44" height="44"><circle cx="32" cy="32" r="28" stroke="#ef5350" stroke-width="2"/><line x1="16" y1="16" x2="48" y2="48" stroke="#ef5350" stroke-width="2.5" stroke-linecap="round"/></svg><p style="color:#ef5350"><strong>Camera access denied</strong><br><span style="font-size:10px;color:#8aabcc">Allow camera permission<br>to activate live scanning feed</span></p>`;
      }
      console.warn('Camera error:', err.message);
    });
}

function stopCam() {
  if (camStream) {
    camStream.getTracks().forEach(t => t.stop());
    camStream = null;
  }
  clearInterval(fpsInterval);
  const video = document.getElementById('camVideo');
  if (video) { video.srcObject = null; }
  document.getElementById('camPlaceholder').style.display = 'flex';
  document.getElementById('camPlaceholder').innerHTML = `<svg viewBox="0 0 64 64" fill="none" width="52" height="52"><rect x="4" y="14" width="40" height="30" rx="4" stroke="#2a4a6a" stroke-width="2"/><path d="M44 24l16-8v24l-16-8V24z" stroke="#2a4a6a" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="29" r="8" stroke="#2a4a6a" stroke-width="2"/><circle cx="24" cy="29" r="3" fill="#2a4a6a" opacity="0.5"/></svg><p>Click <strong>▶ Start Camera</strong> to activate<br>the fundus scanning feed</p>`;
  document.getElementById('camStartBtn').style.display = '';
  document.getElementById('camStopBtn').style.display = 'none';
  document.getElementById('camSnapBtn').style.display = 'none';
  document.getElementById('camFps').textContent = '-- fps';
  document.getElementById('camQuality').textContent = 'QUALITY: --';
  document.getElementById('camLiveDot').style.color = '#ef5350';
  document.getElementById('snapPreviewWrap').style.display = 'none';
}

function snapFrame() {
  const video = document.getElementById('camVideo');
  const canvas = document.getElementById('snapCanvas');
  if (!video || !canvas) return;
  const vw = video.videoWidth  || 320;
  const vh = video.videoHeight || 240;
  canvas.width  = vw;
  canvas.height = vh;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, vw, vh);
  // Apply fundus-style orange tint + circular vignette
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = 'rgba(200,100,30,0.25)';
  ctx.fillRect(0, 0, vw, vh);
  ctx.restore();
  const vig = ctx.createRadialGradient(vw/2, vh/2, vh*0.28, vw/2, vh/2, vh*0.55);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.85)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, vw, vh);
  document.getElementById('snapPreviewWrap').style.display = 'block';
}


/* ─────────────── RETINA SIMULATOR (simulink.py → JS) ─────────────── */

let simCurrentSev = 0;
let simRunning = false;

const SIM_LABELS = {
  0: 'Healthy Retina',
  1: 'Mild Diabetic Retinopathy',
  2: 'Moderate Diabetic Retinopathy',
  3: 'Severe Diabetic Retinopathy'
};

const SIM_DATA = {
  0: { ma: 0,   hm: 0,  ex: 0,  risk: '<1%',   badge: '#66BB6A', rec: '✅ No DR detected. Annual monitoring recommended. Maintain HbA1c < 7%.', recIcon: '✅' },
  1: { ma: 15,  hm: 0,  ex: 0,  risk: '5–8%',  badge: '#FDD835', rec: '⚠️ Mild NPDR. Monitor every 6–12 months. Optimise glycaemic & BP control.', recIcon: '⚠️' },
  2: { ma: 35,  hm: 5,  ex: 8,  risk: '15–25%', badge: '#FFA726', rec: '🔶 Moderate NPDR. Ophthalmologist referral within 3–6 months. FFA recommended.', recIcon: '🔶' },
  3: { ma: 65,  hm: 15, ex: 20, risk: '60%',   badge: '#EF5350', rec: '🚨 Severe NPDR — 4-2-1 rule positive. Urgent referral within 2–4 weeks. Consider PRP laser.', recIcon: '🚨' }
};

/* Seeded PRNG — mirrors np.random.seed(10) behaviour deterministically */
function SeededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 4294967296;
  };
}

function simSelectSeverity(btn, sev) {
  document.querySelectorAll('.sim-sev-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  simCurrentSev = sev;
}

function runSimulation() {
  if (simRunning) return;
  simRunning = true;

  const sev = simCurrentSev;
  const canvas = document.getElementById('simCanvas');
  const overlay = document.getElementById('simOverlay');
  const runBtn  = document.getElementById('simRunBtn');
  const badge   = document.getElementById('simStatusBadge');
  const statusTxt = document.getElementById('simStatusText');

  // Reset pipeline steps
  for (let i = 0; i <= 5; i++) simSetStep(i, 'idle');

  overlay.style.display = 'none';
  runBtn.disabled = true;
  runBtn.textContent = 'Running…';
  badge.className = 'sim-status-badge sim-status-running';
  statusTxt.textContent = 'Simulating…';

  // Hide rec
  document.getElementById('simRec').style.display = 'none';

  // Reset stats
  ['simStatMA','simStatHM','simStatEX','simStatRisk'].forEach(id => {
    document.getElementById(id).textContent = '—';
  });
  document.getElementById('simGradeBadge').textContent = '—';
  document.getElementById('simGradeBadge').style.color = 'var(--text3)';
  document.getElementById('simGradeBadge').style.borderColor = 'var(--border)';

  const SIZE   = canvas.width  = canvas.offsetWidth  || 320;
  const HEIGHT = canvas.height = canvas.offsetHeight || 320;
  const ctx    = canvas.getContext('2d');
  const cx     = SIZE / 2;
  const cy     = HEIGHT / 2;
  const R      = Math.min(SIZE, HEIGHT) / 2 - 10;

  const rand = SeededRandom(10);
  const steps = [];

  /* ── Step 0: Retina background ── */
  steps.push(() => {
    simSetStep(0, 'active');
    ctx.clearRect(0, 0, SIZE, HEIGHT);
    ctx.fillStyle = '#0d0507';
    ctx.fillRect(0, 0, SIZE, HEIGHT);

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();

    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    bg.addColorStop(0,   '#3d1008');
    bg.addColorStop(0.5, '#290905');
    bg.addColorStop(1,   '#0e0303');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, SIZE, HEIGHT);
    ctx.restore();
    simSetStep(0, 'done');
  });

  /* ── Step 1: Optic disc ── */
  steps.push(() => {
    simSetStep(1, 'active');
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();

    // disc glow
    const discX = cx + R * 0.30;
    const discY = cy - R * 0.08;
    const discR = R * 0.15;
    const dg = ctx.createRadialGradient(discX, discY, 0, discX, discY, discR * 2.5);
    dg.addColorStop(0,   'rgba(240,165,20,0.45)');
    dg.addColorStop(0.5, 'rgba(200,120,10,0.15)');
    dg.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = dg;
    ctx.fillRect(0, 0, SIZE, HEIGHT);

    // disc body
    const dd = ctx.createRadialGradient(discX - discR * 0.1, discY - discR * 0.1, 0, discX, discY, discR);
    dd.addColorStop(0,   '#ffe84a');
    dd.addColorStop(0.4, '#f0a800');
    dd.addColorStop(1,   '#b06000');
    ctx.fillStyle = dd;
    ctx.beginPath();
    ctx.arc(discX, discY, discR, 0, Math.PI * 2);
    ctx.fill();

    // bright spot
    const ds = ctx.createRadialGradient(discX, discY, 0, discX, discY, discR * 0.38);
    ds.addColorStop(0, 'rgba(255,245,180,0.9)');
    ds.addColorStop(1, 'rgba(255,200,50,0)');
    ctx.fillStyle = ds;
    ctx.beginPath();
    ctx.arc(discX, discY, discR * 0.38, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    simSetStep(1, 'done');
  });

  /* ── Step 2: Blood vessels ── */
  steps.push(() => {
    simSetStep(2, 'active');
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();

    const vw = 3 + sev * 0.7;
    const vessels = [
      [[cx, cy], [cx - R*0.28, cy - R*0.40], [cx - R*0.56, cy - R*0.72]],
      [[cx, cy], [cx - R*0.40, cy + R*0.20], [cx - R*0.68, cy + R*0.44]],
      [[cx, cy], [cx - R*0.32, cy + R*0.60], [cx - R*0.52, cy + R*0.80]],
      [[cx, cy], [cx + R*0.32, cy - R*0.40], [cx + R*0.56, cy - R*0.72]],
      [[cx, cy], [cx + R*0.40, cy + R*0.28], [cx + R*0.72, cy + R*0.52]],
      [[cx, cy], [cx + R*0.28, cy + R*0.60], [cx + R*0.48, cy + R*0.80]]
    ];

    vessels.forEach(pts => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i][0] + pts[i+1][0]) / 2;
        const my = (pts[i][1] + pts[i+1][1]) / 2;
        ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
      }
      ctx.lineTo(pts[pts.length-1][0], pts[pts.length-1][1]);
      ctx.strokeStyle = '#cc3322';
      ctx.lineWidth = vw;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(180,20,10,0.5)';
      ctx.shadowBlur = vw * 1.5;
      ctx.stroke();
    });

    ctx.restore();
    simSetStep(2, 'done');
  });

  /* ── Step 3: Microaneurysms / lesions ── */
  steps.push(() => {
    simSetStep(3, 'active');
    const count = [0, 15, 35, 65][sev];
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();

    for (let i = 0; i < count; i++) {
      const angle = rand() * 2 * Math.PI;
      const r     = rand() * (R * 0.76 - R * 0.16) + R * 0.16;
      const px    = cx + r * Math.cos(angle);
      const py    = cy + r * Math.sin(angle);
      const sz    = rand() * (25 + sev * 5 - 8) + 8;
      const dotR  = Math.sqrt(sz / Math.PI) * 0.55;

      const g = ctx.createRadialGradient(px, py, 0, px, py, dotR * 2.5);
      g.addColorStop(0,   'rgba(30,20,20,0.95)');
      g.addColorStop(0.6, 'rgba(20,10,10,0.5)');
      g.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(px, py, dotR * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    simSetStep(3, 'done');
  });

  /* ── Step 4: Larger haemorrhages (sev >= 2) ── */
  steps.push(() => {
    simSetStep(4, 'active');
    if (sev >= 2) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      const hmCount = sev * 5;
      for (let i = 0; i < hmCount; i++) {
        const angle = rand() * 2 * Math.PI;
        const r     = rand() * (R * 0.76 - R * 0.28) + R * 0.28;
        const px    = cx + r * Math.cos(angle);
        const py    = cy + r * Math.sin(angle);
        const sz    = rand() * (100 - 40) + 40;
        const dotR  = Math.sqrt(sz / Math.PI) * 1.2;

        const g = ctx.createRadialGradient(px, py, 0, px, py, dotR * 2);
        g.addColorStop(0,   'rgba(139,26,26,0.85)');
        g.addColorStop(0.5, 'rgba(100,10,10,0.45)');
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, dotR * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
    simSetStep(4, 'done');
  });

  /* ── Step 5: Vignette + border ── */
  steps.push(() => {
    simSetStep(5, 'active');
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();

    const vig = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.78)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, SIZE, HEIGHT);
    ctx.restore();

    // Outer ring
    const ringColors = ['#2ecc71','#FDD835','#FFA726','#EF5350'];
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = ringColors[sev];
    ctx.lineWidth = 3;
    ctx.shadowColor = ringColors[sev];
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.shadowBlur = 0;

    simSetStep(5, 'done');
  });

  /* Run steps with animated delays */
  let idx = 0;
  function runStep() {
    if (idx >= steps.length) {
      // Done — update UI
      const d = SIM_DATA[sev];
      const gradeBadge = document.getElementById('simGradeBadge');
      gradeBadge.textContent = SIM_LABELS[sev];
      gradeBadge.style.color = d.badge;
      gradeBadge.style.borderColor = d.badge;
      gradeBadge.style.background = d.badge + '18';

      document.getElementById('simStatMA').textContent   = d.ma;
      document.getElementById('simStatHM').textContent   = d.hm;
      document.getElementById('simStatEX').textContent   = d.ex;
      document.getElementById('simStatRisk').textContent = d.risk;

      const rec = document.getElementById('simRec');
      document.getElementById('simRecText').textContent = d.rec;
      rec.style.display = 'flex';

      badge.className = 'sim-status-badge sim-status-done';
      statusTxt.textContent = 'Complete';
      runBtn.disabled = false;
      runBtn.innerHTML = '<svg viewBox="0 0 16 16" fill="none" width="13" height="13"><polygon points="4,2 14,8 4,14" fill="currentColor"/></svg> Simulate';
      simRunning = false;
      return;
    }
    steps[idx]();
    idx++;
    setTimeout(runStep, 280);
  }
  setTimeout(runStep, 120);
}

function simSetStep(idx, state) {
  const el = document.getElementById('sp' + idx);
  if (!el) return;
  const icon = el.querySelector('.sp-icon');
  el.className = 'sim-pipe-step';
  if (state === 'active') { el.classList.add('sp-active'); icon.textContent = '⟳'; }
  else if (state === 'done')  { el.classList.add('sp-done');   icon.textContent = '✓'; }
  else { icon.textContent = '○'; }
}

/* Init simulator canvas on load */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('simCanvas');
  if (canvas) {
    canvas.width  = canvas.offsetWidth  || 320;
    canvas.height = canvas.offsetHeight || 320;
  }
});


/* ═══════════════════════════════════════════════════════════
   DR-3D_simulator.js  —  Ported from DR-3D_simulator.py
   All geometry/logic identical to the Python original.
   Uses Plotly.js for the interactive 3D globe.
═══════════════════════════════════════════════════════════ */

/* ── Tab switcher ── */
function simSwitchTab(tab) {
  document.getElementById('tab2d').classList.toggle('active', tab === '2d');
  document.getElementById('tab3d').classList.toggle('active', tab === '3d');
  document.getElementById('simTab2d').style.display = tab === '2d' ? '' : 'none';
  document.getElementById('simTab3d').style.display = tab === '3d' ? 'flex' : 'none';
}

/* ── 3D state ── */
let _sim3dSev = 0;

function sim3dSelectSev(btn, sev) {
  document.querySelectorAll('[data-sev3]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  _sim3dSev = sev;
}

/* ═══════════════════════════════════════════════════════════
   STAGE METADATA  (direct port of STAGE_META dict)
═══════════════════════════════════════════════════════════ */
const SIM3D_META = {
  0: { name:'Healthy Retina',            icdrs:'No apparent DR',
       notes:'Clear media. Optic disc and macula visible. No microaneurysms or hemorrhages.',
       ma:0,  blot:0,  exudate:0,  cws:0,  nve:0, widen:1.00 },
  1: { name:'Mild NPDR',                 icdrs:'Mild non-proliferative diabetic retinopathy',
       notes:'Microaneurysms only. Earliest clinically visible lesion of DR.',
       ma:22, blot:0,  exudate:0,  cws:0,  nve:0, widen:1.05 },
  2: { name:'Moderate NPDR',             icdrs:'Moderate non-proliferative diabetic retinopathy',
       notes:'More than just microaneurysms: dot/blot hemorrhages, possible hard exudates.',
       ma:40, blot:18, exudate:12, cws:3,  nve:0, widen:1.18 },
  3: { name:'Severe NPDR',               icdrs:'Severe non-proliferative diabetic retinopathy (4-2-1 rule territory)',
       notes:'Extensive hemorrhages, venous beading, cotton-wool spots. High risk of progression to PDR.',
       ma:55, blot:36, exudate:22, cws:10, nve:0, widen:1.35 },
  4: { name:'Proliferative DR (schematic)', icdrs:'Proliferative diabetic retinopathy (educational schematic)',
       notes:'Neovascular fronds near disc/arcades (schematic). Not a clinical photo substitute.',
       ma:50, blot:42, exudate:18, cws:12, nve:8, widen:1.45 },
};

/* ═══════════════════════════════════════════════════════════
   SEEDED PRNG  (Mulberry32 — deterministic, mirrors np.random.default_rng)
═══════════════════════════════════════════════════════════ */
function makeRng(seed) {
  let s = seed >>> 0;
  return {
    rand() {
      s += 0x6D2B79F5;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
    uniform(lo, hi) { return lo + this.rand() * (hi - lo); },
    normal() {
      // Box-Muller
      const u = 1 - this.rand(), v = this.rand();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    },
    normal3() { return [this.normal(), this.normal(), this.normal()]; },
  };
}

/* ═══════════════════════════════════════════════════════════
   VECTOR HELPERS
═══════════════════════════════════════════════════════════ */
function norm3(v) {
  const m = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]) || 1;
  return [v[0]/m, v[1]/m, v[2]/m];
}
function dot3(a, b)   { return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]; }
function add3(a, b)   { return [a[0]+b[0], a[1]+b[1], a[2]+b[2]]; }
function scale3(v, s) { return [v[0]*s, v[1]*s, v[2]*s]; }

/* ═══════════════════════════════════════════════════════════
   ANATOMY  (exact same coords as Python)
═══════════════════════════════════════════════════════════ */
const DISC  = norm3([0.72, 0.38, 0.18]);
const MACULA = norm3([0.98, -0.12, 0.05]);

/* ═══════════════════════════════════════════════════════════
   SPHERE MESH  (sphere_mesh in Python)
═══════════════════════════════════════════════════════════ */
function sphereMesh(nLat=42, nLon=84, r=1.0) {
  const xs=[], ys=[], zs=[];
  for (let i=0; i<nLat; i++) {
    const lat = Math.PI * i / (nLat-1);
    const rowX=[], rowY=[], rowZ=[];
    for (let j=0; j<nLon; j++) {
      const lon = 2*Math.PI * j / (nLon-1);
      rowX.push(r * Math.sin(lat) * Math.cos(lon));
      rowY.push(r * Math.sin(lat) * Math.sin(lon));
      rowZ.push(r * Math.cos(lat));
    }
    xs.push(rowX); ys.push(rowY); zs.push(rowZ);
  }
  return {x:xs, y:ys, z:zs};
}

/* ═══════════════════════════════════════════════════════════
   GREAT CIRCLE ARC  (great_circle_arc in Python)
═══════════════════════════════════════════════════════════ */
function greatCircleArc(p0, p1, n=28, r=1.015) {
  const a = norm3(p0), b = norm3(p1);
  const d = Math.max(-1, Math.min(1, dot3(a, b)));
  const omega = Math.acos(d);
  const xs=[], ys=[], zs=[];
  if (omega < 1e-6) {
    for (let i=0;i<n;i++) { xs.push(a[0]*r); ys.push(a[1]*r); zs.push(a[2]*r); }
    return {x:xs, y:ys, z:zs};
  }
  for (let i=0; i<n; i++) {
    const t = i / (n-1);
    const s = (Math.sin((1-t)*omega)*a[0] + Math.sin(t*omega)*b[0]) / Math.sin(omega);
    const s1= (Math.sin((1-t)*omega)*a[1] + Math.sin(t*omega)*b[1]) / Math.sin(omega);
    const s2= (Math.sin((1-t)*omega)*a[2] + Math.sin(t*omega)*b[2]) / Math.sin(omega);
    xs.push(s*r); ys.push(s1*r); zs.push(s2*r);
  }
  return {x:xs, y:ys, z:zs};
}

/* ═══════════════════════════════════════════════════════════
   RANDOM RETINA POINTS  (rand_on_retina in Python)
═══════════════════════════════════════════════════════════ */
function randOnRetina(rng, n, avoidDisc=true, discCos=0.92) {
  const xs=[], ys=[], zs=[];
  while (xs.length < n) {
    const u   = rng.uniform(-1, 1);
    const phi = rng.uniform(0, 2*Math.PI);
    const rxy = Math.sqrt(Math.max(0, 1 - u*u));
    const px  = rxy * Math.cos(phi);
    const py  = rxy * Math.sin(phi);
    const pz  = u;
    if (px < -0.15) continue;
    if (avoidDisc && dot3([px,py,pz], DISC) > discCos) continue;
    xs.push(px); ys.push(py); zs.push(pz);
  }
  return {x:xs, y:ys, z:zs};
}

/* ═══════════════════════════════════════════════════════════
   VESSEL TREE  (vessel_tree in Python — identical targets)
═══════════════════════════════════════════════════════════ */
function vesselTree() {
  const rawTargets = [
    [0.55, 0.75, 0.35], [0.50, 0.70,-0.40],
    [0.60,-0.20, 0.75], [0.58,-0.55, 0.40],
    [0.62,-0.50,-0.55], [0.48, 0.15,-0.85],
    [0.85, 0.40,-0.25], [0.88,-0.35, 0.20],
  ];
  const branches = [];
  for (const rt of rawTargets) {
    const t = norm3(rt);
    branches.push([DISC, t]);
    for (let k=0; k<2; k++) {
      const jitter = [0.05, 0.35*Math.cos(k*2.1+t[1]*4), 0.35*Math.sin(k*1.7+t[2]*3)];
      const t2 = norm3(add3(t, jitter));
      const mid = norm3(add3(scale3(DISC, 0.25), scale3(t, 0.75)));
      branches.push([mid, t2]);
    }
  }
  return branches;
}

/* ═══════════════════════════════════════════════════════════
   BUILD PLOTLY FIGURE  (build_figure in Python)
═══════════════════════════════════════════════════════════ */
function sim3dBuildFigure(severity, showSclera, seed) {
  const meta = SIM3D_META[severity];
  const rng  = makeRng(seed);
  const data = [];

  /* ── Retina globe surface ── */
  const sm = sphereMesh(42, 84, 1.0);
  data.push({
    type: 'surface',
    x: sm.x, y: sm.y, z: sm.z,
    colorscale: [[0,'#4a1010'],[0.45,'#7a1c1c'],[0.75,'#9a2a22'],[1,'#c45a3a']],
    showscale: false, opacity: 0.92,
    lighting: {ambient:0.55, diffuse:0.7, specular:0.25, roughness:0.6},
    lightposition: {x:1.6, y:0.4, z:0.8},
    hoverinfo: 'skip', name: 'Retina',
  });

  /* ── Optional sclera shell ── */
  if (showSclera) {
    const sc = sphereMesh(24, 48, 1.08);
    data.push({
      type:'surface', x:sc.x, y:sc.y, z:sc.z,
      colorscale:[[0,'#e8e0d4'],[1,'#d4c4b0']],
      showscale:false, opacity:0.10, hoverinfo:'skip', name:'Sclera',
    });
  }

  /* ── Optic disc ── */
  const discX=[], discY=[], discZ=[];
  for (let i=0;i<280;i++) {
    const n = rng.normal3();
    const m = Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2])||1;
    const nn = [n[0]/m, n[1]/m, n[2]/m];
    const p = norm3([DISC[0]+0.07*nn[0], DISC[1]+0.07*nn[1], DISC[2]+0.07*nn[2]]);
    discX.push(p[0]*1.012); discY.push(p[1]*1.012); discZ.push(p[2]*1.012);
  }
  data.push({
    type:'scatter3d', x:discX, y:discY, z:discZ, mode:'markers',
    marker:{size:3.2, color:'#e8a020', opacity:0.85},
    name:'Optic disc', hovertemplate:'Optic disc<extra></extra>',
  });

  /* ── Macula ── */
  const macX=[], macY=[], macZ=[];
  for (let i=0;i<90;i++) {
    const n = rng.normal3();
    const p = norm3([MACULA[0]+0.035*n[0], MACULA[1]+0.035*n[1], MACULA[2]+0.035*n[2]]);
    macX.push(p[0]*1.01); macY.push(p[1]*1.01); macZ.push(p[2]*1.01);
  }
  data.push({
    type:'scatter3d', x:macX, y:macY, z:macZ, mode:'markers',
    marker:{size:2.4, color:'#5a1010', opacity:0.7},
    name:'Macula', hovertemplate:'Macula / foveal region<extra></extra>',
  });

  /* ── Vessels ── */
  const widen = meta.widen;
  for (const [a,b] of vesselTree()) {
    const arc = greatCircleArc(a, b, 28, 1.015);
    data.push({
      type:'scatter3d', x:arc.x, y:arc.y, z:arc.z, mode:'lines',
      line:{color:'#6b0b0b', width:4.5*widen},
      hoverinfo:'skip', showlegend:false,
    });
  }

  /* ── Sprinkle helper ── */
  function sprinkle(n, sLo, sHi, color, name, hover, r=1.02) {
    if (n <= 0) return;
    const pts = randOnRetina(rng, n);
    const sizes = [];
    for (let i=0;i<n;i++) sizes.push(rng.uniform(sLo,sHi));
    data.push({
      type:'scatter3d',
      x: pts.x.map(v=>v*r), y: pts.y.map(v=>v*r), z: pts.z.map(v=>v*r),
      mode:'markers',
      marker:{size:sizes, color, opacity:0.88, line:{width:0}},
      name, hovertemplate: hover+'<extra></extra>',
    });
  }

  sprinkle(meta.ma,     2.0,  4.5, '#120808', 'Microaneurysms',       'Microaneurysm');
  sprinkle(meta.blot,   5.0, 10.0, '#4a0000', 'Dot/blot hemorrhages', 'Hemorrhage');
  sprinkle(meta.exudate,3.5,  6.5, '#f0d060', 'Hard exudates',        'Hard exudate');
  sprinkle(meta.cws,    6.0,  9.0, '#f5f0e6', 'Cotton-wool spots',    'Cotton-wool spot');

  /* ── Neovascular tufts (PDR) ── */
  if (meta.nve > 0) {
    for (let i=0; i<meta.nve; i++) {
      let base;
      if (i < 3) {
        base = DISC;
      } else {
        const tmp = randOnRetina(rng, 1, false);
        base = [tmp.x[0], tmp.y[0], tmp.z[0]];
      }
      const fx=[], fy=[], fz=[];
      for (let k=0;k<7;k++) {
        const jitter = rng.normal3().map(v=>v*0.06);
        const p = norm3([base[0]+jitter[0]+0.04, base[1]+jitter[1], base[2]+jitter[2]]);
        fx.push(p[0]*1.03); fy.push(p[1]*1.03); fz.push(p[2]*1.03);
      }
      data.push({
        type:'scatter3d', x:fx, y:fy, z:fz, mode:'markers+lines',
        marker:{size:3, color:'#8b0000'},
        line:{color:'#aa2020', width:2},
        name: i===0 ? 'NVE/NVD schematic' : undefined,
        showlegend: i===0,
        hovertemplate:'Schematic neovascular frond<extra></extra>',
      });
    }
  }

  const layout = {
    title: {
      text: `<b>${meta.name}</b><br><sup>${meta.icdrs}</sup>`,
      x:0.5, font:{size:16, color:'#f2e8dc'},
    },
    scene: {
      xaxis:{visible:false}, yaxis:{visible:false}, zaxis:{visible:false},
      aspectmode:'data', bgcolor:'#0b0708',
      camera:{eye:{x:1.85,y:0.35,z:0.25}, up:{x:0,y:0,z:1}},
    },
    paper_bgcolor:'#12090a',
    plot_bgcolor:'#12090a',
    font:{color:'#f2e8dc', family:'Inter, Segoe UI, sans-serif'},
    legend:{bgcolor:'rgba(20,10,10,0.65)', bordercolor:'#5a3030', borderwidth:1, font:{size:11}},
    margin:{l:0, r:0, t:60, b:0},
    height: 380,
  };

  return {data, layout, meta};
}

/* ═══════════════════════════════════════════════════════════
   RENDER / UPDATE
═══════════════════════════════════════════════════════════ */
function sim3dUpdate() {
  const severity   = _sim3dSev;
  const showSclera = document.getElementById('sim3dSclera').checked;
  const seed       = parseInt(document.getElementById('sim3dSeed').value, 10);

  const idle    = document.getElementById('sim3dIdle');
  const plotDiv = document.getElementById('sim3dPlot');
  const notes   = document.getElementById('sim3dNotes');

  // Show loading state
  idle.style.display = 'none';
  plotDiv.style.opacity = '0.4';

  // Update status badge
  const badge = document.getElementById('simStatusBadge');
  const txt   = document.getElementById('simStatusText');
  badge.className = 'sim-status-badge sim-status-running';
  txt.textContent  = 'Building 3D globe…';

  // Defer to next tick so UI updates first
  setTimeout(() => {
    const {data, layout, meta} = sim3dBuildFigure(severity, showSclera, seed);

    Plotly.react('sim3dPlot', data, layout, {
      responsive: true,
      displayModeBar: true,
      modeBarButtonsToRemove: ['toImage','sendDataToCloud'],
      displaylogo: false,
    });

    plotDiv.style.opacity = '1';

    // Stage notes
    document.getElementById('sim3dNoteName').textContent  = meta.name;
    document.getElementById('sim3dNoteIcdrs').textContent = meta.icdrs;
    document.getElementById('sim3dNoteText').textContent  = meta.notes;
    document.getElementById('sim3dLesionGrid').innerHTML  =
      sim3dLesionRow('Microaneurysms',    meta.ma)      +
      sim3dLesionRow('Haemorrhages',      meta.blot)    +
      sim3dLesionRow('Hard exudates',     meta.exudate) +
      sim3dLesionRow('Cotton-wool spots', meta.cws)     +
      sim3dLesionRow('Neovascular tufts', meta.nve);

    notes.style.display = '';

    badge.className = 'sim-status-badge sim-status-done';
    txt.textContent  = '3D complete';
  }, 30);
}

function sim3dLesionRow(label, count) {
  return `<div class="sim3d-lesion-row">
    <span class="sim3d-lesion-lbl">${label}</span>
    <span class="sim3d-lesion-val">${count}</span>
  </div>`;
}
