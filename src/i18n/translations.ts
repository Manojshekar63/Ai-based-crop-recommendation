export type Language = 'en' | 'hi' | 'kn';

export interface TranslationKey {
  en: string;
  hi: string;
  kn: string;
}

export const translations = {
  // Navigation & Main Actions
  dashboard: {
    en: "Dashboard",
    hi: "डैशबोर्ड", 
    kn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್"
  },
  start_analysis: {
    en: "Start Analysis",
    hi: "विश्लेषण शुरू करें",
    kn: "ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ"
  },
  back: {
    en: "Back",
    hi: "वापस",
    kn: "ಹಿಂದೆ"
  },
  new_analysis: {
    en: "New Analysis", 
    hi: "नया विश्लेषण",
    kn: "ಹೊಸ ವಿಶ್ಲೇಷಣೆ"
  },
  
  // Hero Section
  smart_crop_recommendations: {
    en: "Smart Crop Recommendations",
    hi: "स्मार्ट फसल सिफारिशें",
    kn: "ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ಶಿಫಾರಸುಗಳು"
  },
  hero_subtitle: {
    en: "AI-powered insights for modern farmers. Get personalized crop recommendations based on your soil conditions, climate, and market trends.",
    hi: "आधुनिक किसानों के लिए AI-संचालित अंतर्दृष्टि। अपनी मिट्टी की स्थिति, जलवायु और बाजार के रुझान के आधार पर व्यक्तिगत फसल सिफारिशें प्राप्त करें।",
    kn: "ಆಧುನಿಕ ರೈತರಿಗೆ AI-ಚಾಲಿತ ಒಳನೋಟಗಳು. ನಿಮ್ಮ ಮಣ್ಣಿನ ಪರಿಸ್ಥಿತಿಗಳು, ಹವಾಮಾನ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ."
  },

  // Features Section
  how_ai_helps: {
    en: "How Our AI Helps You",
    hi: "हमारी AI आपकी कैसे मदद करती है",
    kn: "ನಮ್ಮ AI ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ"
  },
  soil_analysis: {
    en: "Soil Analysis",
    hi: "मिट्टी विश्लेषण",
    kn: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ"
  },
  soil_analysis_desc: {
    en: "Analyze soil pH, nutrients (NPK), and composition to match optimal crop requirements",
    hi: "मिट्टी का pH, पोषक तत्व (NPK), और संरचना का विश्लेषण करके इष्टतम फसल आवश्यकताओं से मेल खाएं",
    kn: "ಅತ್ಯುತ್ತಮ ಬೆಳೆ ಅಗತ್ಯತೆಗಳಿಗೆ ಹೊಂದಿಸಲು ಮಣ್ಣಿನ pH, ಪೋಷಕಾಂಶಗಳು (NPK), ಮತ್ತು ಸಂಯೋಜನೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ"
  },
  ai_predictions: {
    en: "AI Predictions",
    hi: "AI भविष्यवाणियां",
    kn: "AI ಭವಿಷ್ಯವಾಣಿಗಳು"
  },
  ai_predictions_desc: {
    en: "Machine learning algorithms analyze weather patterns and predict best crop matches",
    hi: "मशीन लर्निंग एल्गोरिदम मौसम के पैटर्न का विश्लेषण करते हैं और सर्वोत्तम फसल मिलान की भविष्यवाणी करते हैं",
    kn: "ಯಂತ್ರ ಕಲಿಕೆ ಅಲ್ಗಾರಿದಮ್‌ಗಳು ಹವಾಮಾನ ಮಾದರಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತವೆ ಮತ್ತು ಅತ್ಯುತ್ತಮ ಬೆಳೆ ಹೊಂದಾಣಿಕೆಗಳನ್ನು ಊಹಿಸುತ್ತವೆ"
  },
  market_insights: {
    en: "Market Insights",
    hi: "बाजार अंतर्दृष्टि",
    kn: "ಮಾರುಕಟ್ಟೆ ಒಳನೋಟಗಳು"
  },
  market_insights_desc: {
    en: "Real-time market prices and profitability analysis for informed decision making",
    hi: "सूचित निर्णय लेने के लिए रियल-टाइम बाजार मूल्य और लाभप्रदता विश्लेषण",
    kn: "ತಿಳುವಳಿಕೆಯುಳ್ಳ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಲು ನೈಜ-ಸಮಯದ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ಲಾಭದಾಯಕತೆಯ ವಿಶ್ಲೇಷಣೆ"
  },

  // Form Fields
  farm_analysis: {
    en: "Farm Analysis",
    hi: "फार्म विश्लेषण", 
    kn: "ಕೃಷಿ ವಿಶ್ಲೇಷಣೆ"
  },
  crop_recommendation_analysis: {
    en: "Crop Recommendation Analysis",
    hi: "फसल सिफारिश विश्लेषण",
    kn: "ಬೆಳೆ ಶಿಫಾರಸು ವಿಶ್ಲೇಷಣೆ"
  },
  enter_farm_details: {
    en: "Enter your farm details to get AI-powered crop recommendations",
    hi: "AI-संचालित फसल सिफारिशें प्राप्त करने के लिए अपने फार्म का विवरण दर्ज करें",
    kn: "AI-ಚಾಲಿತ ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಕೃಷಿ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ"
  },
  location: {
    en: "Location",
    hi: "स्थान",
    kn: "ಸ್ಥಳ"
  },
  farm_location: {
    en: "Farm Location",
    hi: "फार्म स्थान",
    kn: "ಕೃಷಿ ಸ್ಥಳ"
  },
  soil_properties: {
    en: "Soil Properties",
    hi: "मिट्टी गुण",
    kn: "ಮಣ್ಣಿನ ಗುಣಗಳು"
  },
  soil_type: {
    en: "Soil Type",
    hi: "मिट्टी का प्रकार",
    kn: "ಮಣ್ಣಿನ ಪ್ರಕಾರ"
  },
  select_soil_type: {
    en: "Select soil type",
    hi: "मिट्टी का प्रकार चुनें",
    kn: "ಮಣ್ಣಿನ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ"
  },
  sandy: {
    en: "Sandy",
    hi: "रेतीली",
    kn: "ಮರಳು"
  },
  loamy: {
    en: "Loamy",
    hi: "दोमट",
    kn: "ಮಿಶ್ರ ಮಣ್ಣು"
  },
  clay: {
    en: "Clay",
    hi: "मिट्टी",
    kn: "ಕೆಸರು"
  },
  silt: {
    en: "Silt",
    hi: "गाद",
    kn: "ಮುಲ್ಲು"
  },
  peaty: {
    en: "Peaty",
    hi: "पीटी",
    kn: "ಪೀಟ್"
  },
  chalky: {
    en: "Chalky",
    hi: "चाकी",
    kn: "ಚುನ್ನದ"
  },
  climate_conditions: {
    en: "Climate Conditions",
    hi: "जलवायु स्थितियां",
    kn: "ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು"
  },
  annual_rainfall: {
    en: "Annual Rainfall (mm)",
    hi: "वार्षिक वर्षा (मिमी)",
    kn: "ವಾರ್ಷಿಕ ಮಳೆ (ಮಿಮೀ)"
  },
  avg_temperature: {
    en: "Avg Temperature (°C)",
    hi: "औसत तापमान (°C)",
    kn: "ಸರಾಸರಿ ತಾಪಮಾನ (°C)"
  },
  humidity: {
    en: "Humidity (%)",
    hi: "आर्द्रता (%)",
    kn: "ಆರ್ದ್ರತೆ (%)"
  },
  analyzing: {
    en: "Analyzing...",
    hi: "विश्लेषण कर रहे हैं...",
    kn: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ..."
  },
  get_crop_recommendations: {
    en: "Get Crop Recommendations",
    hi: "फसल सिफारिशें प्राप्त करें",
    kn: "ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ"
  },

  // Results Page
  crop_recommendations: {
    en: "Crop Recommendations",
    hi: "फसल सिफारिशें",
    kn: "ಬೆಳೆ ಶಿಫಾರಸುಗಳು"
  },
  show_comparison: {
    en: "Show Comparison",
    hi: "तुलना दिखाएं",
    kn: "ಹೋಲಿಕೆ ತೋರಿಸಿ"
  },
  hide_comparison: {
    en: "Hide Comparison", 
    hi: "तुलना छुपाएं",
    kn: "ಹೋಲಿಕೆ ಮರೆಮಾಡಿ"
  },

  // Language Selector
  language: {
    en: "English",
    hi: "हिंदी",
    kn: "ಕನ್ನಡ"
  },

  // Dashboard
  home: {
    en: "Home",
    hi: "होम",
    kn: "ಮನೆ"
  },
  my_farm_dashboard: {
    en: "My Farm Dashboard",
    hi: "मेरा फार्म डैशबोर्ड",
    kn: "ನನ್ನ ಕೃಷಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್"
  },
  saved_analyses: {
    en: "Saved Analyses",
    hi: "सहेजे गए विश्लेषण",
    kn: "ಉಳಿಸಿದ ವಿಶ್ಲೇಷಣೆಗಳು"
  },
  locations: {
    en: "Locations",
    hi: "स्थान",
    kn: "ಸ್ಥಳಗಳು"
  },
  days_since_first: {
    en: "Days Since First",
    hi: "पहले से दिन",
    kn: "ಮೊದಲಿನಿಂದ ದಿನಗಳು"
  },
  back_to_dashboard: {
    en: "Back to Dashboard",
    hi: "डैशबोर्ड पर वापस",
    kn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ"
  },
  saved_analysis_details: {
    en: "Saved Analysis Details",
    hi: "सहेजे गए विश्लेषण विवरण",
    kn: "ಉಳಿಸಿದ ವಿಶ್ಲೇಷಣೆ ವಿವರಗಳು"
  },
  saved_on: {
    en: "Saved on",
    hi: "सहेजा गया",
    kn: "ಉಳಿಸಲಾಗಿದೆ"
  },
  recommendations: {
    en: "Recommendations",
    hi: "सिफारिशें",
    kn: "ಶಿಫಾರಸುಗಳು"
  },
  crops: {
    en: "crops",
    hi: "फसलें",
    kn: "ಬೆಳೆಗಳು"
  },
  ai_confidence: {
    en: "AI Confidence",
    hi: "AI विश्वास",
    kn: "AI ವಿಶ್ವಾಸ"
  },
  high_profit: {
    en: "High Profit",
    hi: "उच्च लाभ",
    kn: "ಹೆಚ್ಚು ಲಾಭ"
  },
  medium_profit: {
    en: "Medium Profit", 
    hi: "मध्यम लाभ",
    kn: "ಮಧ್ಯಮ ಲಾಭ"
  },
  low_profit: {
    en: "Low Profit",
    hi: "कम लाभ",
    kn: "ಕಡಿಮೆ ಲಾಭ"
  },
  expected_yield: {
    en: "Expected Yield:",
    hi: "अपेक्षित उत्पादन:",
    kn: "ನಿರೀಕ್ಷಿತ ಇಳುವರಿ:"
  },
  market_price: {
    en: "Market Price:",
    hi: "बाजार मूल्य:",
    kn: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ:"
  },
  season: {
    en: "Season:",
    hi: "मौसम:",
    kn: "ಋತು:"
  },
  duration: {
    en: "Duration:",
    hi: "अवधि:",
    kn: "ಅವಧಿ:"
  },
  no_saved_analyses: {
    en: "No Saved Analyses",
    hi: "कोई सहेजा गया विश्लेषण नहीं",
    kn: "ಯಾವುದೇ ಉಳಿಸಿದ ವಿಶ್ಲೇಷಣೆಗಳಿಲ್ಲ"
  },
  start_first_analysis: {
    en: "Start by creating your first crop recommendation analysis",
    hi: "अपना पहला फसल सिफारिश विश्लेषण बनाकर शुरुआत करें",
    kn: "ನಿಮ್ಮ ಮೊದಲ ಬೆಳೆ ಶಿಫಾರಸು ವಿಶ್ಲೇಷಣೆಯನ್ನು ರಚಿಸುವ ಮೂಲಕ ಪ್ರಾರಂಭಿಸಿ"
  },
  soil: {
    en: "Soil:",
    hi: "मिट्टी:",
    kn: "ಮಣ್ಣು:"
  },
  view: {
    en: "View",
    hi: "देखें",
    kn: "ನೋಡಿ"
  }
};