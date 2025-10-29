"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Sparkles, Globe, ChevronRight, Shield, Clock,
  HeartHandshake, TrendingUp, Building, CreditCard,
  Banknote, Key, DoorOpen
} from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { CubeLoader, DNALoader, GatewayVaultLoader, GoldenPotLoader, MorphingLoader, QuantumLoader, RippleLoader, TrustShieldLoader, UltimateLoader, WealthPortalLoader } from "@/components/ui/ultimate-loader";
import SplashLoader from './Splashloader';

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "മലയാളം", flag: "🇮🇳" },
  { code: "or", name: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  { code: "as", name: "অসমীয়া", flag: "🇮🇳" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
];

// Static positions for floating icons to prevent hydration mismatch
const floatingIconsData = [
  { left: 10, top: 20, duration: 15, xOffset: 30, yOffset: -20 },
  { left: 80, top: 10, duration: 18, xOffset: -40, yOffset: 30 },
  { left: 20, top: 70, duration: 20, xOffset: 25, yOffset: 40 },
  { left: 70, top: 60, duration: 17, xOffset: -30, yOffset: -25 },
  { left: 40, top: 30, duration: 19, xOffset: 35, yOffset: 35 },
  { left: 60, top: 80, duration: 16, xOffset: -20, yOffset: -30 },
];

export function LoadingScreen() {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    // Check if language was already selected and if we've shown the loading screen before
    const savedLang = localStorage.getItem('language');
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');

    if (savedLang && hasSeenLoader === 'true') {
      // Skip loading screen entirely for returning visitors in same session
      setIsLoading(false);
      return;
    }

    if (savedLang) {
      setSelectedLanguage(savedLang);
      setShowLanguageSelector(false);
      startLoading();
      sessionStorage.setItem('hasSeenLoader', 'true');
    }
  }, []);

  const startLoading = () => {
    // Show loader for 600ms (reduced from 1000ms for faster load)
    setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasSeenLoader', 'true');
    }, 600);
  };

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setLanguage(langCode);
    setShowLanguageSelector(false);
    startLoading();
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-[#38bdf8] via-[#34d399] to-[#38bdf8] overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
            }} />
          </div>

          {/* Floating Icons */}
          <div className="absolute inset-0">
            {[CreditCard, Banknote, Shield, TrendingUp, Building, HeartHandshake].map((Icon, i) => {
              const iconData = floatingIconsData[i];
              return (
                <motion.div
                  key={i}
                  className="absolute text-white/10"
                  animate={{
                    x: [0, iconData.xOffset],
                    y: [0, iconData.yOffset],
                  }}
                  transition={{
                    duration: iconData.duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    left: `${iconData.left}%`,
                    top: `${iconData.top}%`,
                  }}
                >
                  <Icon size={40} />
                </motion.div>
              );
            })}
          </div>

          {showLanguageSelector ? (
            /* Language Selection Screen */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full relative z-10 px-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-emerald-600/95 to-emerald-700/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
              >
                {/* Header */}
                <div className="p-8 pb-6">
                  <h1 className="text-4xl font-bold text-white mb-6">
                    Choose Your Language
                  </h1>
                  
                  {/* Search Bar */}
                  {/* <div className="relative">
                    <input
                      type="text"
                      placeholder="Search languages..."
                      className="w-full px-4 py-3 pl-12 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    />
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                  </div> */}
                </div>

                {/* Language Grid */}
                <div className="px-8 pb-8 max-h-[60vh] overflow-y-auto">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {languages.map((lang, index) => (
                      <motion.button
                        key={lang.code}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.03 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className="bg-emerald-700/50 hover:bg-emerald-600/60 backdrop-blur-sm rounded-xl p-4 transition-all text-left group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-semibold text-white/70 bg-emerald-800/40 px-2 py-1 rounded">
                            {lang.code.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">
                          {lang.name}
                        </div>
                        <div className="text-sm text-white/70">
                          {lang.name === "English" ? "English" : 
                           lang.code === "hi" ? "Hindi" :
                           lang.code === "mr" ? "Marathi" :
                           lang.code === "gu" ? "Gujarati" :
                           lang.code === "pa" ? "Punjabi" :
                           lang.code === "bn" ? "Bengali" :
                           lang.code === "ta" ? "Tamil" :
                           lang.code === "te" ? "Telugu" :
                           lang.code === "kn" ? "Kannada" :
                           lang.code === "ml" ? "Malayalam" :
                           lang.code === "or" ? "Odia" :
                           lang.code === "as" ? "Assamese" :
                           lang.code === "ur" ? "Urdu" : ""}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Footer with checkbox */}
                <div className="px-8 py-6 border-t border-white/10 bg-emerald-800/30">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded bg-fuchsia-600 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90 font-medium">
                      Remember my choice (1 year)
                    </span>
                  </label>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* Loading Animation - Gateway Vault Loader */
            <SplashLoader />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}