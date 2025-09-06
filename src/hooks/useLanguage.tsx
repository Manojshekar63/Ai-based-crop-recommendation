import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { translations, chatbotTranslations, Language, TranslationKey } from '@/i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof (typeof translations & typeof chatbotTranslations)) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useLocalStorage<Language>('preferred-language', 'en');

  // Merge app + chatbot dictionaries for a single t()
  const dict = { ...translations, ...chatbotTranslations } as const;
  type AllKeys = keyof typeof dict;

  const t = (key: AllKeys): string => {
    const translation = (dict as any)[key] as TranslationKey;
    return translation[language] || translation.en;
  };

  return (
  <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};