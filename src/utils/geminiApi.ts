import { Language } from '@/i18n/translations';

/**
 * Simulated Gemini API integration for chatbot functionality
 * This function provides AI-powered responses for agricultural queries
 */
export async function askGemini(text: string, language: Language): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  // Simple rule-based responses for agricultural queries
  const query = text.toLowerCase().trim();
  
  // Language-specific responses
  const responses = {
    en: {
      greeting: "Hello! I'm here to help with your agricultural questions.",
      crops: "For crop recommendations, consider factors like soil pH, climate, and market demand. Rice thrives in clay soil with pH 5.5-7.5, while wheat prefers loamy soil with pH 6.0-7.5.",
      soil: "Soil health is crucial for good yields. Test your soil pH regularly and add organic matter like compost to improve fertility.",
      weather: "Weather patterns greatly affect crop selection. Monsoon crops like rice need high rainfall, while winter crops like wheat need moderate water.",
      fertilizer: "Use balanced NPK fertilizers based on soil test results. Organic fertilizers like compost and manure improve long-term soil health.",
      pest: "Integrated pest management combines biological, cultural, and chemical methods. Regular monitoring helps prevent major infestations.",
      default: "I can help with crop selection, soil management, weather planning, and farming best practices. What specific agricultural topic would you like to know about?"
    },
    hi: {
      greeting: "नमस्ते! मैं आपके कृषि संबंधी प्रश्नों में सहायता के लिए यहाँ हूँ।",
      crops: "फसल की सिफारिश के लिए मिट्टी का pH, जलवायु और बाजार की मांग पर विचार करें। चावल मिट्टी में pH 5.5-7.5 के साथ अच्छा होता है, जबकि गेहूं दोमट मिट्टी में pH 6.0-7.5 के साथ बेहतर होता है।",
      soil: "अच्छी पैदावार के लिए मिट्टी का स्वास्थ्य महत्वपूर्ण है। नियमित रूप से मिट्टी का pH जांचें और उर्वरता बढ़ाने के लिए कंपोस्ट जैसे जैविक पदार्थ मिलाएं।",
      weather: "मौसम के पैटर्न फसल चयन को बहुत प्रभावित करते हैं। मानसूनी फसलों जैसे चावल को अधिक बारिश चाहिए, जबकि सर्दी की फसलों जैसे गेहूं को मध्यम पानी चाहिए।",
      fertilizer: "मिट्टी परीक्षण के परिणामों के आधार पर संतुलित NPK उर्वरकों का उपयोग करें। कंपोस्ट और खाद जैसे जैविक उर्वरक दीर्घकालिक मिट्टी स्वास्थ्य में सुधार करते हैं।",
      pest: "एकीकृत कीट प्रबंधन जैविक, सांस्कृतिक और रासायनिक तरीकों को जोड़ता है। नियमित निगरानी बड़े संक्रमण को रोकने में मदद करती है।",
      default: "मैं फसल चयन, मिट्टी प्रबंधन, मौसम योजना और कृषि सर्वोत्तम प्रथाओं में सहायता कर सकता हूँ। आप किस विशिष्ट कृषि विषय के बारे में जानना चाहते हैं?"
    },
    kn: {
      greeting: "ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡಲು ನಾನು ಇಲ್ಲಿದ್ದೇನೆ.",
      crops: "ಬೆಳೆ ಶಿಫಾರಸುಗಳಿಗಾಗಿ, ಮಣ್ಣಿನ pH, ಹವಾಮಾನ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆಯಂತಹ ಅಂಶಗಳನ್ನು ಪರಿಗಣಿಸಿ. ಅಕ್ಕಿ pH 5.5-7.5 ಇರುವ ಜೇಡಿಮಣ್ಣಿನಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ, ಆದರೆ ಗೋಧಿ pH 6.0-7.5 ಇರುವ ಮಿಶ್ರ ಮಣ್ಣನ್ನು ಆದ್ಯತೆ ನೀಡುತ್ತದೆ.",
      soil: "ಉತ್ತಮ ಇಳುವರಿಗೆ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಅತ್ಯಗತ್ಯ. ನಿಯಮಿತವಾಗಿ ನಿಮ್ಮ ಮಣ್ಣಿನ pH ಪರೀಕ್ಷಿಸಿ ಮತ್ತು ಫಲವತ್ತತೆಯನ್ನು ಸುಧಾರಿಸಲು ಕಂಪೋಸ್ಟ್‌ನಂತಹ ಸಾವಯವ ಪದಾರ್ಥಗಳನ್ನು ಸೇರಿಸಿ.",
      weather: "ಹವಾಮಾನ ಮಾದರಿಗಳು ಬೆಳೆ ಆಯ್ಕೆಯನ್ನು ಬಹಳವಾಗಿ ಪ್ರಭಾವಿಸುತ್ತವೆ. ಅಕ್ಕಿಯಂತಹ ಮಾನ್ಸೂನ್ ಬೆಳೆಗಳಿಗೆ ಹೆಚ್ಚು ಮಳೆ ಬೇಕು, ಆದರೆ ಗೋಧಿಯಂತಹ ಚಳಿಗಾಲದ ಬೆಳೆಗಳಿಗೆ ಮಧ್ಯಮ ನೀರು ಬೇಕು.",
      fertilizer: "ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯ ಫಲಿತಾಂಶಗಳ ಆಧಾರದ ಮೇಲೆ ಸಮತೋಲಿತ NPK ರಸಗೊಬ್ಬರಗಳನ್ನು ಬಳಸಿ. ಕಂಪೋಸ್ಟ್ ಮತ್ತು ಗೊಬ್ಬರದಂತಹ ಸಾವಯವ ರಸಗೊಬ್ಬರಗಳು ದೀರ್ಘಕಾಲೀನ ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ಸುಧಾರಿಸುತ್ತವೆ.",
      pest: "ಸಮಗ್ರ ಕೀಟ ನಿರ್ವಹಣೆಯು ಜೈವಿಕ, ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ರಾಸಾಯನಿಕ ವಿಧಾನಗಳನ್ನು ಸಂಯೋಜಿಸುತ್ತದೆ. ನಿಯಮಿತ ಮೇಲ್ವಿಚಾರಣೆಯು ಪ್ರಮುಖ ಸೋಂಕುಗಳನ್ನು ತಡೆಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
      default: "ನಾನು ಬೆಳೆ ಆಯ್ಕೆ, ಮಣ್ಣಿನ ನಿರ್ವಹಣೆ, ಹವಾಮಾನ ಯೋಜನೆ ಮತ್ತು ಕೃಷಿ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಹುದು. ನೀವು ಯಾವ ನಿರ್ದಿಷ್ಟ ಕೃಷಿ ವಿಷಯದ ಬಗ್ಗೆ ತಿಳಿದುಕೊಳ್ಳಲು ಬಯಸುತ್ತೀರಿ?"
    }
  };

  const langResponses = responses[language] || responses.en;

  // Check for specific topics
  if (/hello|hi|namaste|ನಮಸ್ಕಾರ|नमस्ते/i.test(query)) {
    return langResponses.greeting;
  }
  
  if (/crop|rice|wheat|maize|cotton|soybean|बेळे|ಬೆಳೆ|फसल/i.test(query)) {
    return langResponses.crops;
  }
  
  if (/soil|ph|मिट्टी|ಮಣ್ಣು/i.test(query)) {
    return langResponses.soil;
  }
  
  if (/weather|rain|climate|मौसम|ಹವಾಮಾನ|बारिश|ಮಳೆ/i.test(query)) {
    return langResponses.weather;
  }
  
  if (/fertilizer|nutrient|npk|उर्वरक|ರಸಗೊಬ್ಬರ/i.test(query)) {
    return langResponses.fertilizer;
  }
  
  if (/pest|insect|disease|कीट|ಕೀಟ|बीमारी|ರೋಗ/i.test(query)) {
    return langResponses.pest;
  }

  // Default response
  return langResponses.default;
}