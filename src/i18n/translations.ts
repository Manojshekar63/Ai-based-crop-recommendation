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
  },

  // New Location & Option Selection
  automatic_recommendations: {
    en: "Get recommendations from my exact location",
    hi: "मेरे सटीक स्थान से सिफारिशें प्राप्त करें",
    kn: "ನನ್ನ ನಿಖರ ಸ್ಥಳದಿಂದ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ"
  },
  manual_input: {
    en: "Enter details manually",
    hi: "विवरण मैन्युअल रूप से दर्ज करें",
    kn: "ವಿವರಗಳನ್ನು ಹಸ್ತಚಾಲಿತವಾಗಿ ನಮೂದಿಸಿ"
  },
  choose_option: {
    en: "Choose Your Option",
    hi: "अपना विकल्प चुनें",
    kn: "ನಿಮ್ಮ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ"
  },
  automatic_detection_description: {
    en: "We'll automatically detect your location and fetch soil & climate data",
    hi: "हम स्वचालित रूप से आपका स्थान पता लगाएंगे और मिट्टी और जलवायु डेटा प्राप्त करेंगे",
    kn: "ನಾವು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪತ್ತೆ ಮಾಡಿ ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ಡೇಟಾವನ್ನು ಪಡೆಯುತ್ತೇವೆ"
  },
  manual_input_description: {
    en: "Manually enter your farm's soil and climate details",
    hi: "अपने खेत की मिट्टी और जलवायु का विवरण मैन्युअल रूप से दर्ज करें",
    kn: "ನಿಮ್ಮ ಕೃಷಿಯ ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನದ ವಿವರಗಳನ್ನು ಹಸ್ತಚಾಲಿತವಾಗಿ ನಮೂದಿಸಿ"
  },
  detecting_location: {
    en: "Detecting Your Location",
    hi: "आपका स्थान खोजा जा रहा है",
    kn: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪತ್ತೆ ಮಾಡಲಾಗುತ್ತಿದೆ"
  },
  allow_location_access: {
    en: "Please allow location access when prompted",
    hi: "कृपया प्रेरित होने पर स्थान पहुंच की अनुमति दें",
    kn: "ಕೇಳಿದಾಗ ದಯವಿಟ್ಟು ಸ್ಥಳ ಪ್ರವೇಶಕ್ಕೆ ಅನುಮತಿ ನೀಡಿ"
  },
  fetching_soil_climate_data: {
    en: "Fetching Soil & Climate Data",
    hi: "मिट्टी और जलवायु डेटा प्राप्त कर रहे हैं",
    kn: "ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ಡೇಟಾವನ್ನು ಪಡೆಯುತ್ತಿದ್ದೇವೆ"
  },
  analyzing_your_location: {
    en: "Analyzing your location's agricultural conditions",
    hi: "आपके स्थान की कृषि स्थितियों का विश्लेषण कर रहे हैं",
    kn: "ನಿಮ್ಮ ಸ್ಥಳದ ಕೃಷಿ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದ್ದೇವೆ"
  },
  location_data_detected: {
    en: "Location Data Detected",
    hi: "स्थान डेटा का पता चला",
    kn: "ಸ್ಥಳ ಡೇಟಾ ಪತ್ತೆಯಾಗಿದೆ"
  },
  detected_location_description: {
    en: "We've analyzed your location and detected the following soil and climate conditions",
    hi: "हमने आपके स्थान का विश्लेषण किया है और निम्नलिखित मिट्टी और जलवायु स्थितियों का पता लगाया है",
    kn: "ನಾವು ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ವಿಶ್ಲೇಷಿಸಿದ್ದೇವೆ ಮತ್ತು ಈ ಕೆಳಗಿನ ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಪತ್ತೆ ಮಾಡಿದ್ದೇವೆ"
  },
  detected_soil_properties: {
    en: "Detected Soil Properties",
    hi: "पता लगाए गए मिट्टी के गुण",
    kn: "ಪತ್ತೆಯಾದ ಮಣ್ಣಿನ ಗುಣಗಳು"
  },
  detected_climate_conditions: {
    en: "Detected Climate Conditions",
    hi: "पता लगाई गई जलवायु स्थितियां",
    kn: "ಪತ್ತೆಯಾದ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು"
  },
  level: {
    en: "Level",
    hi: "स्तर",
    kn: "ಮಟ್ಟ"
  },
  acidic: {
    en: "Acidic",
    hi: "अम्लीय",
    kn: "ಆಮ್ಲೀಯ"
  },
  alkaline: {
    en: "Alkaline",
    hi: "क्षारीय",
    kn: "ಕ್ಷಾರೀಯ"
  },
  neutral: {
    en: "Neutral",
    hi: "तटस्थ",
    kn: "ತಟಸ್ಥ"
  },
  soil_texture: {
    en: "Soil Texture",
    hi: "मिट्टी की बनावट",
    kn: "ಮಣ್ಣಿನ ರಚನೆ"
  },
  organic_carbon: {
    en: "Organic Carbon",
    hi: "जैविक कार्बन",
    kn: "ಸಾವಯವ ಇಂಗಾಲ"
  },
  detect_again: {
    en: "Detect Again",
    hi: "फिर से खोजें",
    kn: "ಮತ್ತೆ ಪತ್ತೆ ಮಾಡಿ"
  },
  automatic_location_detection: {
    en: "Automatic Location Detection",
    hi: "स्वचालित स्थान खोज",
    kn: "ಸ್ವಯಂಚಾಲಿತ ಸ್ಥಳ ಪತ್ತೆ"
  },
  what_we_detect: {
    en: "What we'll detect:",
    hi: "हम क्या खोजेंगे:",
    kn: "ನಾವು ಏನನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತೇವೆ:"
  },
  exact_coordinates: {
    en: "Your exact farm coordinates",
    hi: "आपके खेत के सटीक निर्देशांक",
    kn: "ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಕೃಷಿಯ ನಿರ್ದೇಶಾಂಕಗಳು"
  },
  soil_ph_nutrients: {
    en: "Soil pH and nutrient levels",
    hi: "मिट्टी का pH और पोषक तत्व स्तर",
    kn: "ಮಣ್ಣಿನ pH ಮತ್ತು ಪೋಷಕಾಂಶದ ಮಟ್ಟಗಳು"
  },
  local_climate_data: {
    en: "Local climate and weather patterns",
    hi: "स्थानीय जलवायु और मौसम पैटर्न",
    kn: "ಸ್ಥಳೀಯ ಹವಾಮಾನ ಮತ್ತು ಹವಾಮಾನ ಮಾದರಿಗಳು"
  },
  soil_texture_composition: {
    en: "Soil texture and composition",
    hi: "मिट्टी की बनावट और संरचना",
    kn: "ಮಣ್ಣಿನ ರಚನೆ ಮತ್ತು ಸಂಯೋಜನೆ"
  },
  detect_my_location: {
    en: "Detect My Location",
    hi: "मेरा स्थान खोजें",
    kn: "ನನ್ನ ಸ್ಥಳವನ್ನು ಪತ್ತೆ ಮಾಡಿ"
  },
  geolocation_not_supported: {
    en: "Geolocation is not supported by this browser",
    hi: "इस ब्राउज़र द्वारा भौगोलिक स्थान समर्थित नहीं है",
    kn: "ಈ ಬ್ರೌಸರ್‌ನಿಂದ ಭೌಗೋಳಿಕ ಸ್ಥಳವು ಬೆಂಬಲಿತವಾಗಿಲ್ಲ"
  },
  error_fetching_data: {
    en: "Error fetching data. Please try again or use manual input.",
    hi: "डेटा प्राप्त करने में त्रुटि। कृपया पुनः प्रयास करें या मैन्युअल इनपुट का उपयोग करें।",
    kn: "ಡೇಟಾ ಪಡೆಯುವಲ್ಲಿ ದೋಷ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಹಸ್ತಚಾಲಿತ ಇನ್‌ಪುಟ್ ಬಳಸಿ."
  },
  location_permission_denied: {
    en: "Location access denied. Please allow location access or use manual input.",
    hi: "स्थान पहुंच से इनकार। कृपया स्थान पहुंच की अनुमति दें या मैन्युअल इनपुट का उपयोग करें।",
    kn: "ಸ್ಥಳ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಸ್ಥಳ ಪ್ರವೇಶಕ್ಕೆ ಅನುಮತಿ ನೀಡಿ ಅಥವಾ ಹಸ್ತಚಾಲಿತ ಇನ್‌ಪುಟ್ ಬಳಸಿ."
  },
  location_unavailable: {
    en: "Location information unavailable.",
    hi: "स्थान की जानकारी उपलब्ध नहीं है।",
    kn: "ಸ್ಥಳದ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ."
  },
  location_timeout: {
    en: "Location request timed out.",
    hi: "स्थान अनुरोध का समय समाप्त हो गया।",
    kn: "ಸ್ಥಳ ವಿನಂತಿಯು ಸಮಯ ಮೀರಿದೆ."
  },
  location_unknown_error: {
    en: "Unknown error occurred while getting location.",
    hi: "स्थान प्राप्त करते समय अज्ञात त्रुटि हुई।",
    kn: "ಸ್ಥಳವನ್ನು ಪಡೆಯುವಾಗ ಅಜ್ಞಾತ ದೋಷ ಸಂಭವಿಸಿದೆ."
  },
  select_preferred_method: {
    en: "Select your preferred method to get crop recommendations",
    hi: "फसल की सिफारिशें प्राप्त करने के लिए अपनी पसंदीदा विधि चुनें",
    kn: "ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಆದ್ಯತೆಯ ವಿಧಾನವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ"
  },
  instant_analysis: {
    en: "Instant soil & climate analysis",
    hi: "तत्काल मिट्टी और जलवायु विश्लेषण",
    kn: "ತತ್ಕ್ಷಣ ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ"
  },
  saves_time: {
    en: "Saves time - no manual data entry",
    hi: "समय बचाता है - कोई मैन्युअल डेटा एंट्री नहीं",
    kn: "ಸಮಯವನ್ನು ಉಳಿಸುತ್ತದೆ - ಯಾವುದೇ ಹಸ್ತಚಾಲಿತ ಡೇಟಾ ಎಂಟ್ರಿ ಇಲ್ಲ"
  },
  precise_location_data: {
    en: "Precise location-based data",
    hi: "सटीक स्थान-आधारित डेटा",
    kn: "ನಿಖರವಾದ ಸ್ಥಳ-ಆಧಾರಿತ ಡೇಟಾ"
  },
  use_automatic_detection: {
    en: "Use Automatic Detection",
    hi: "स्वचालित खोज का उपयोग करें",
    kn: "ಸ್ವಯಂಚಾಲಿತ ಪತ್ತೆಯನ್ನು ಬಳಸಿ"
  },
  full_control: {
    en: "Full control over input data",
    hi: "इनपुट डेटा पर पूर्ण नियंत्रण",
    kn: "ಇನ್‌ಪುಟ್ ಡೇಟಾದ ಮೇಲೆ ಸಂಪೂರ್ಣ ನಿಯಂತ್ರಣ"
  },
  no_location_needed: {
    en: "No location access needed",
    hi: "स्थान पहुंच की आवश्यकता नहीं",
    kn: "ಯಾವುದೇ ಸ್ಥಳ ಪ್ರವೇಶದ ಅಗತ್ಯವಿಲ್ಲ"
  },
  custom_parameters: {
    en: "Custom soil & climate parameters",
    hi: "कस्टम मिट्टी और जलवायु पैरामीटर",
    kn: "ಕಸ್ಟಮ್ ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ಪ್ಯಾರಾಮೀಟರ್‌ಗಳು"
  },
  use_manual_input: {
    en: "Use Manual Input",
    hi: "मैन्युअल इनपुट का उपयोग करें",
    kn: "ಹಸ್ತಚಾಲಿತ ಇನ್‌ಪುಟ್ ಬಳಸಿ"
  },
  nitrogen: {
    en: "Nitrogen",
    hi: "नाइट्रोजन",
    kn: "ಸಾರಜನಕ"
  },
  phosphorus: {
    en: "Phosphorus",
    hi: "फास्फोरस",
    kn: "ರಂಜಕ"
  },
  potassium: {
    en: "Potassium",
    hi: "पोटैशियम",
    kn: "ಪೊಟ್ಯಾಸಿಯಮ್"
  },
  temperature: {
    en: "Temperature",
    hi: "तापमान",
    kn: "ತಾಪಮಾನ"
  }
};

// Chatbot strings (added at module end so existing imports continue to work)
export const chatbotTranslations = {
  chat_title: {
    en: 'Assistant',
    hi: 'सहायक',
    kn: 'ಸಹಾಯಕ'
  },
  chat_subtitle: {
    en: 'Ask in English, Hindi, or Kannada',
    hi: 'अंग्रेज़ी, हिंदी या कन्नड़ में पूछें',
    kn: 'ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ ಅಥವಾ ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ'
  },
  welcome: {
    en: 'Hello! How can I assist you today?',
    hi: 'नमस्ते! मैं आपकी किस प्रकार सहायता कर सकता हूँ?',
    kn: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?'
  },
  ask_question: {
    en: 'Please type or say your question.',
    hi: 'कृपया अपना सवाल टाइप करें या बोलें।',
    kn: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಹೇಳಿ.'
  },
  bye: {
    en: 'Goodbye!',
    hi: 'अलविदा!',
    kn: 'ವಿದಾಯ!'
  },
  default_answer: {
    en: "I can help with crops, soil pH, and fertility. Try asking about 'ideal pH for tomatoes' or 'best crops for monsoon'.",
    hi: "मैं फसलों, मिट्टी के pH और उर्वरता में मदद कर सकता हूँ। जैसे 'टमाटर के लिए आदर्श pH' या 'मानसून के लिए सर्वोत्तम फसलें' पूछें।",
    kn: "ನಾನು ಬೆಳೆಗಳು, ಮಣ್ಣಿನ pH ಮತ್ತು ಫಲವತ್ತತೆಯಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಹುದು. 'ಟೊಮೇಟೊಗಳ ಆದರ್ಶ pH' ಅಥವಾ 'ಮಳೆಗಾಲಕ್ಕೆ ಉತ್ತಮ ಬೆಳೆಗಳು' ಬಗ್ಗೆ ಕೇಳಿ."
  },
  chat_suggestion_1: {
    en: 'Best crops for monsoon?',
    hi: 'मानसून में सर्वोत्तम फसलें?',
    kn: 'ಮಳೆಗಾಲಕ್ಕೆ ಉತ್ತಮ ಬೆಳೆಗಳು?'
  },
  chat_suggestion_2: {
    en: 'Ideal soil pH for tomatoes?',
    hi: 'टमाटर के लिए आदर्श मिट्टी pH?',
    kn: 'ಟೊಮೇಟೊಗೆ ಆದರ್ಶ ಮಣ್ಣಿನ pH?'
  },
  crops_monsoon: {
    en: 'Monsoon-friendly crops include rice, maize, millets, pulses (tur/urad), and groundnut depending on your region and soil drainage.',
    hi: 'मानसून में चावल, मक्का, बाजरा, दालें (तूर/उड़द) और मूंगफली जैसी फसलें उपयुक्त रहती हैं—क्षेत्र और मिट्टी के जलनिकास पर निर्भर.',
    kn: 'ಮಾನ್ಸೂನ್ ಕಾಲಕ್ಕೆ ಅಕ್ಕಿ, ಜೋಳ, ಸಜ್ಜೆ, ಪಲ್ಸೆಗಳು (ತೂರ್/ಉದ್ದಿನ) ಮತ್ತು ಕಡಲೆ ಉತ್ತಮ—ನಿಮ್ಮ ಪ್ರದೇಶ ಮತ್ತು ಮಣ್ಣಿನ ನೀರಿನ ಹರಿವಿನ ಮೇಲೆ ಅವಲಂಬಿತ.'
  },
  ideal_ph_tomatoes: {
    en: 'Ideal soil pH for tomatoes is 6.0–6.8. Add lime if too acidic (<6) or sulfur if too alkaline (>7.5).',
    hi: 'टमाटर के लिए आदर्श pH 6.0–6.8 होता है। pH < 6 हो तो चूना, > 7.5 हो तो सल्फर मिलाएँ.',
    kn: 'ಟೊಮೇಟೊಗಳಿಗೆ ಆದರ್ಶ ಮಣ್ಣಿನ pH 6.0–6.8. pH < 6 ಇದ್ದರೆ ಚುನ್ನ, > 7.5 ಇದ್ದರೆ ಗಂಧಕ ಬಳಸಿ.'
  },
  improve_fertility: {
    en: 'Improve soil fertility with organic compost, green manures, crop rotation, and balanced NPK as per a soil test.',
    hi: 'जैविक कंपोस्ट, ग्रीन मैन्योर, फसल चक्र और मिट्टी परीक्षण के अनुसार संतुलित NPK से उर्वरता बढ़ाएँ.',
    kn: 'ಜೈವಿಕ ಕಂಪೋಸ್ಟ್, ಹಸಿರು ಮಾನ್ಯುರ್, ಬೆಳೆ ಪರಿವರ್ತನೆ ಮತ್ತು ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯ ಪ್ರಕಾರ ಸಮತೋಲನ NPK ಬಳಸಿ ಫಲವತ್ತತೆಯನ್ನು ಹೆಚ್ಚಿಸಿ.'
  },
  chat_suggestion_3: {
    en: 'How to improve soil fertility?',
    hi: 'मिट्टी की उर्वरता कैसे बढ़ाएँ?',
    kn: 'ಮಣ್ಣಿನ ಫಲವತ್ತತೆಯನ್ನು ಹೇಗೆ ಹೆಚ್ಚಿಸಬೇಕು?'
  },
  listening: {
    en: 'Listening…',
    hi: 'सुन रहा है…',
    kn: 'ಕೆಳೆಯುತ್ತಿದೆ…'
  },
  ready: {
    en: 'Ready',
    hi: 'तैयार',
    kn: 'ಸಿದ್ಧ'
  },
  speak: {
    en: 'Speak',
    hi: 'बोलें',
    kn: 'ಮಾತನಾಡಿ'
  },
  stop: {
    en: 'Stop',
    hi: 'रोकें',
    kn: 'ನಿಲ್ಲಿಸಿ'
  },
  type_message: {
    en: 'Type a message…',
    hi: 'संदेश टाइप करें…',
    kn: 'ಸಂದೇಶವನ್ನು ಬರೆಯಿರಿ…'
  },
  send: {
    en: 'Send',
    hi: 'भेजें',
    kn: 'ಕಳುಹಿಸಿ'
  },
  clear_chat: {
    en: 'Clear chat',
    hi: 'चैट साफ़ करें',
    kn: 'ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ'
  },
  voice_on: {
    en: 'Voice on',
    hi: 'आवाज़ चालू',
    kn: 'ವಾಯ್ಸ್ ಆನ್'
  },
  voice_off: {
    en: 'Voice off',
    hi: 'आवाज़ बंद',
    kn: 'ವಾಯ್ಸ್ ಆಫ್'
  },
  speech_not_supported: {
    en: 'Speech recognition not supported in this browser.',
    hi: 'इस ब्राउज़र में वॉइस रिकग्निशन समर्थित नहीं है।',
    kn: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ವಾಯ್ಸ್ ಗುರುತಿಸುವಿಕೆ ಬೆಂಬಲಿತವಲ್ಲ.'
  },
  mic_permission_denied: {
    en: 'Microphone permission denied. Please allow mic access.',
    hi: 'माइक्रोफ़ोन की अनुमति अस्वीकृत। कृपया माइक की अनुमति दें।',
    kn: 'ಮೈಕ್ರೋಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಮೈಕ್ ಪ್ರವೇಶಕ್ಕೆ ಅನುಮತಿ ನೀಡಿ.'
  }
};