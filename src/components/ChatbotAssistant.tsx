import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Mic, MicOff, Send, MessageSquareText, Globe, X, Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { askGemini } from '@/utils/geminiApi';
import { toast } from '@/hooks/use-toast';

type ChatMsg = { role: 'user' | 'bot'; text: string; ts: number };

const langToSpeech = {
  en: 'en-US',
  hi: 'hi-IN',
  kn: 'kn-IN',
} as const;

export const ChatbotAssistant = () => {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>(() => [
    { role: 'bot', text: t('welcome'), ts: Date.now() },
    { role: 'bot', text: t('ask_question'), ts: Date.now() + 1 },
  ]);

  // Keep welcome texts in sync with language switching
  useEffect(() => {
    if (!open) return;
    // Append a notice when language changes
    setMessages((prev) => ([
      ...prev,
      { role: 'bot', text: t('ask_question'), ts: Date.now() },
    ]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // ----- Speech Synthesis -----
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
  const voices = useRef<SpeechSynthesisVoice[] | null>(null);
  const preferredVoice = useMemo(() => {
    const langTag = langToSpeech[language];
    const list = voices.current || (synth ? synth.getVoices() : []);
    if (!list || list.length === 0) return undefined;
    // Try exact language match first
    let voice = list.find((v) => v.lang?.toLowerCase().startsWith(langTag.toLowerCase()));
    // Kannada can be sparse; try name includes
    if (!voice && language === 'kn') {
      voice = list.find((v) => /kannada/i.test(v.name));
    }
    // Fallback to any with region language (en*, hi*)
    if (!voice) voice = list.find((v) => v.lang?.toLowerCase().startsWith(langTag.split('-')[0]));
    return voice;
  }, [language, synth]);

  useEffect(() => {
    if (!synth) return;
    const handle = () => {
      voices.current = synth.getVoices();
    };
    handle();
    synth.addEventListener('voiceschanged', handle);
    return () => synth.removeEventListener('voiceschanged', handle);
  }, [synth]);

  const speak = (text: string) => {
    if (!voiceEnabled || !synth) return;
    try {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = langToSpeech[language];
      if (preferredVoice) utter.voice = preferredVoice;
      utter.rate = 1;
      utter.pitch = 1;
      synth.cancel();
      synth.speak(utter);
    } catch {
      // ignore
    }
  };

  // ----- Speech Recognition -----
  const recognitionRef = useRef<any>(null);
  const getRecognition = () => {
    if (recognitionRef.current) return recognitionRef.current;
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return null;
    const rec = new SR();
    rec.lang = langToSpeech[language];
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    recognitionRef.current = rec;
    return rec;
  };

  const startListening = () => {
    const rec = getRecognition();
    if (!rec) {
      setMessages((m) => [...m, { role: 'bot', text: t('speech_not_supported'), ts: Date.now() }]);
      return;
    }
    try {
      rec.lang = langToSpeech[language];
      rec.onresult = (e: any) => {
        const transcript = e.results?.[0]?.[0]?.transcript || '';
        setListening(false);
        if (transcript) {
          setInput(transcript);
          handleSend(transcript);
        }
      };
      rec.onerror = (e: any) => {
        setListening(false);
        if (e?.error === 'not-allowed') {
          setMessages((m) => [...m, { role: 'bot', text: t('mic_permission_denied'), ts: Date.now() }]);
        }
      };
      rec.onend = () => setListening(false);
      setListening(true);
      rec.start();
    } catch {
      setListening(false);
    }
  };

  const stopListening = () => {
    const rec = recognitionRef.current;
    if (rec) {
      try { rec.stop(); } catch {}
    }
    setListening(false);
  };

  // ----- Chat logic (Gemini + fallback) -----
  const generateReply = (q: string): string => {
    const l = language;
    const lower = q.toLowerCase().trim();
    const s1 = t('chat_suggestion_1')?.toLowerCase();
    const s2 = t('chat_suggestion_2')?.toLowerCase();
    const s3 = t('chat_suggestion_3')?.toLowerCase();
    if (s1 && lower === s1) return t('crops_monsoon');
    if (s2 && lower === s2) return t('ideal_ph_tomatoes');
    if (s3 && lower === s3) return t('improve_fertility');
    if (/\b(hello|hi)\b|namaste|namaskar|ನಮಸ್ಕಾರ|ಹಲೋ|नमस्ते/i.test(lower)) return t('welcome');
    if (/\b(bye|goodbye)\b|alvida|ವಿದಾಯ|अलविदा/i.test(lower)) return t('bye');
    if (/\b(ph|pH)\b|tomato|tomatoes|टमाटर|ಟಮಾಟೋ/i.test(lower)) return t('ideal_ph_tomatoes');
    if (/fertil|fertility|improv|उर्वर|उपजाऊ|ಫರ್ಟಿಲಿಟಿ/i.test(lower)) return t('improve_fertility');
    if (/weather|rain|temperature|climate|बारिश|मौसम|ತಾಪಮಾನ|ಹವಾಮಾನ/i.test(lower)) {
      return {
        en: 'Ask me about soil pH, rainfall ranges, or best crops for your season. I can guide you with quick tips.',
        hi: 'मुझसे मिट्टी के pH, वर्षा सीमा या आपके मौसम के लिए सर्वोत्तम फसलों के बारे में पूछें। मैं त्वरित सुझाव दे सकता हूँ।',
        kn: 'ಮಣ್ಣಿನ pH, ಮಳೆಯ ಪ್ರಮಾಣ ಅಥವಾ ನಿಮ್ಮ ಋತುವಿಗೆ ಉತ್ತಮ ಬೆಳೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ. ನಾನು ವೇಗದ ಸಲಹೆಗಳನ್ನು ನೀಡುತ್ತೇನೆ.'
      }[l];
    }
    return t('default_answer');
  };

  const handleSend = async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text) return;
    const user: ChatMsg = { role: 'user', text, ts: Date.now() };
    setMessages((m) => [...m, user]);
    setInput('');

    try {
      setLoading(true);
      const reply = await askGemini(text, language);
      const bot: ChatMsg = { role: 'bot', text: reply || t('default_answer'), ts: Date.now() + 1 };
      setMessages((m) => [...m, bot]);
      speak(bot.text);
    } catch (err) {
      // fallback to rule-based reply when API fails
      const fallback = generateReply(text);
      const bot: ChatMsg = { role: 'bot', text: fallback, ts: Date.now() + 1 };
      setMessages((m) => [...m, bot]);
      speak(bot.text);
      // notify user we used fallback (localized minimal strings)
      const loc = {
        en: { title: 'Fallback reply', desc: 'Gemini is unavailable. Using local answer.' },
        hi: { title: 'विकल्प उत्तर', desc: 'जेमिनी उपलब्ध नहीं है। स्थानीय उत्तर दिखाया गया।' },
        kn: { title: 'ಬದಲಿ ಉತ್ತರ', desc: 'ಜೆಮಿನಿ ಲಭ್ಯವಿಲ್ಲ. ಸ್ಥಳೀಯ ಉತ್ತರವನ್ನು ಬಳಸಿದೆ.' },
      } as const;
      const msg = loc[language] ?? loc.en;
      toast({ title: msg.title, description: msg.desc });
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { role: 'bot', text: t('welcome'), ts: Date.now() },
      { role: 'bot', text: t('ask_question'), ts: Date.now() + 1 },
    ]);
  };

  // Suggestions based on language
  const suggestions = [t('chat_suggestion_1'), t('chat_suggestion_2'), t('chat_suggestion_3')];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet open={open} onOpenChange={(v) => { setOpen(v); if (!v) stopListening(); }}>
        <SheetTrigger asChild>
          <Button
            aria-label="Open AI Assistant"
            size="lg"
            className="relative rounded-full h-16 w-16 sm:h-16 sm:w-16 p-0
                       bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600
                       shadow-2xl hover:shadow-glow hover:scale-105 transition
                       ring-2 ring-emerald-200/70 hover:ring-emerald-300
                       before:content-[''] before:absolute before:inset-0 before:rounded-full
                       before:bg-emerald-400/25 before:blur-xl before:-z-10
                       after:content-[''] after:absolute after:inset-0 after:rounded-full
                       after:animate-ping after:bg-emerald-400/20 after:-z-10"
          >
            <MessageSquareText className="h-8 w-8 text-white drop-shadow" />
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full shadow">
              AI
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent className="p-0 w-[100vw] sm:w-[420px] h-[85vh] sm:h-[80vh] flex flex-col">
          <SheetHeader className="px-4 pt-4">
            <SheetTitle className="flex items-center justify-between">
              <span>{t('chat_title')}</span>
              {/* Inline language selector: 🌐 English | हिंदी | ಕನ್ನಡ */}
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4" />
                <button className={`hover:underline ${language==='en'?'font-semibold':''}`} onClick={() => setLanguage('en')}>English</button>
                <span>|</span>
                <button className={`hover:underline ${language==='hi'?'font-semibold':''}`} onClick={() => setLanguage('hi')}>हिंदी</button>
                <span>|</span>
                <button className={`hover:underline ${language==='kn'?'font-semibold':''}`} onClick={() => setLanguage('kn')}>ಕನ್ನಡ</button>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col">
            <Card className="m-4 flex-1 overflow-hidden flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{t('chat_subtitle')}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={listening ? 'destructive' : 'outline'}>
                      {listening ? t('listening') : t('ready')}
                    </Badge>
                    <Button size="icon" variant="ghost" onClick={() => setVoiceEnabled(v => !v)} title={voiceEnabled ? t('voice_on') : t('voice_off')}>
                      {voiceEnabled ? <Mic className="h-4 w-4"/> : <MicOff className="h-4 w-4"/>}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={clearChat} title={t('clear_chat')}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-3 pr-1">
                {messages.map((m) => (
                  <div key={m.ts} className={`flex ${m.role==='user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${m.role==='user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'}`}>{m.text}</div>
                  </div>
                ))}
                {/* Suggestions */}
        <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s, idx) => (
          <Button key={idx} size="sm" variant="outline" onClick={() => handleSend(s)} className="text-xs" disabled={loading}>
                      {s}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-2 px-4 pb-4">
              <Button
                variant={listening ? 'destructive' : 'secondary'}
                size="icon"
                className="shrink-0"
                onClick={listening ? stopListening : startListening}
                title={listening ? t('stop') : t('speak')}
              >
                {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Input
                placeholder={t('type_message')}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !loading) handleSend(); }}
                disabled={loading}
              />
              <Button onClick={() => handleSend()} className="shrink-0" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t('send')}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-1" /> {t('send')}
                  </>
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChatbotAssistant;
