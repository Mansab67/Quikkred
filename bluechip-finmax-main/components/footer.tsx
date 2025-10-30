"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Facebook, Twitter, Linkedin, Instagram, Youtube, Mail,
  Phone, MapPin, Clock, Shield, Award, TrendingUp, Sparkles,
  ArrowRight, ExternalLink, Download, ChevronRight, CreditCard, CheckCircle, X
} from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/Quikkred", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/Quikkred", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/Quikkred", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/Quikkred", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/Quikkred", label: "YouTube" },
];

const certifications = [
  { icon: Shield, text: "ISO 27001 Compliant" },
  // { icon: Award, text: "RBI Licensed NBFC" },
  // { icon: TrendingUp, text: "AAA Credit Rating" },
];

export function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showComingSoonPopup, setShowComingSoonPopup] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError(t.newsletter.errors.required);
      return;
    }
    if (!emailRegex.test(email)) {
      setError(t.newsletter.errors.invalid);
      return;
    }

    setIsSubscribing(true);
    setError("");

    try {
      console.log('Subscribing with email:', email);

      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        setShowSuccessPopup(true);
        setEmail("");
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 3000);
      } else {
        setError(data.message || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setError(t.newsletter.errors.failed);
    } finally {
      setIsSubscribing(false);
    }
  };

  const footerLinks = {
    products: [
      { name: t.footer.products.items.personal, href: "/products/personal-loan" },
      { name: t.footer.products.items.salary, href: "/products/salary-advance" },
      { name: t.footer.products.items.emergency, href: "/products/emergency" },
      { name: t.footer.products.items.medical, href: "/products/medical" },
      { name: t.footer.products.items.travel, href: "/products/travel-loan" },
      { name: t.footer.products.items.festival, href: "/products/festival" },
    ],
    company: [
      { name: t.footer.quickLinks.items.about, href: "/about" },
      { name: t.footer.quickLinks.items.ourStory, href: "/about#story" },
      { name: t.footer.quickLinks.items.leadershipTeam, href: "/about#leadership" },
      { name: t.footer.quickLinks.items.careers, href: "/careers" },
      { name: t.footer.quickLinks.items.pressMedia, href: "/about/press" },
      { name: t.footer.quickLinks.items.awardsRecognition, href: "/about/awards" },
      { name: t.footer.quickLinks.items.csrInitiatives, href: "/about/csr" },
      { name: t.footer.quickLinks.items.testimonials, href: "/testimonials" },
    ],
    resources: [
      { name: t.navigation.emiCalculator, href: "/resources/emi-calculator" },
      { name: t.footer.resources.items.eligibilityCheck, href: "/resources/eligibility-check" },
      { name: t.footer.resources.items.interestRates, href: "/resources/intrest-rate" },
      { name: t.footer.resources.items.documentChecklist, href: "/resources/documents" },
      { name: t.footer.resources.items.howToApply, href: "/resources/how-to-apply" },
      { name: t.navigation.faqs, href: "/resources/faqs" },
      { name: t.navigation.blog, href: "/blog" },
      { name: t.footer.resources.items.financialLiteracy, href: "/resources/financial-literacy" },
    ],
    support: [
      { name: t.footer.quickLinks.items.contact, href: "/contact" },
      { name: t.footer.support.items.customerSupport, href: "/support" },
      { name: t.navigation.track, href: "/track-application" },
      { name: t.footer.support.items.grievanceRedressal, href: "/grievance" },
      { name: t.footer.support.items.nodalOfficer, href: "/nodal-officer" },
      { name: t.footer.support.items.locateBranch, href: "/branches" },
      { name: t.footer.support.items.downloadForms, href: "/downloads" },
      { name: t.footer.support.items.reportFraud, href: "/report-fraud" },
    ],
    legal: [
      { name: t.footer.legal.items.terms, href: "/terms" },
      { name: t.footer.legal.items.privacy, href: "/privacy" },
      { name: t.footer.legal.items.cookiePolicy, href: "/cookies" },
      { name: t.footer.legal.items.fairPracticeCode, href: "/fair-practice" },
      { name: t.footer.legal.items.interestRatePolicy, href: "/interest-policy" },
      { name: t.footer.legal.items.kycPolicy, href: "/kyc-policy" },
      { name: t.footer.legal.items.rbiGuidelines, href: "/rbi-guidelines" },
      { name: t.footer.legal.items.disclaimer, href: "/disclaimer" },
    ],
  };

  return (
    <footer className="bg-slate-900 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 mt-12 sm:mt-16 lg:mt-20 border-t border-slate-700">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 lg:-mt-32">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white shadow-xl-dark"
          style={{ background: 'linear-gradient(135deg, #006837 0%, #FFC107 100%)' }}
        >
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">{t.newsletter.title}</h3>
              <p className="text-sm sm:text-base text-white/90">
                {t.newsletter.subtitle}
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="email"
                  placeholder={t.newsletter.placeholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-white/30 border border-slate-700 text-sm sm:text-base"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubscribe}
                  disabled={isSubscribing}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-slate-800 text-white rounded-full font-semibold hover:shadow-glow transition-all border border-slate-700 text-sm sm:text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribing ? t.newsletter.subscribing : t.newsletter.button}
                </motion.button>
              </div>
              {error && (
                <p className="text-red-400 text-xs sm:text-sm mt-2 ml-2">{error}</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 sm:gap-8 lg:gap-8">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2">
<Link
  href="/"
  className="flex items-start mb-4 sm:mb-6"
>
  <Image
    src="/logoW.png"
    alt={t.common.appName}
    width={150}
    height={150}
    className="w-72 sm:w-80 md:w-96 lg:w-full xl:w-full h-auto object-contain object-left max-w-2xl"
  />
</Link>

            <p className="text-slate-400 mb-4 sm:mb-6 text-sm sm:text-base">
              {t.footer.about.description}
            </p>
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-full flex items-center justify-center shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all border border-slate-700"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#0ea5e9]" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="col-span-1">
            <h4 className="font-semibold text-slate-100 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
              <CreditCard className="w-4 h-4 text-[#34d399]" />
              {t.footer.products.title}
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.products.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-500 transition-colors flex items-center gap-1 text-xs sm:text-sm"
                  >
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h4 className="font-semibold text-slate-100 mb-3 sm:mb-4 text-sm sm:text-base">{t.footer.quickLinks.title}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-500 transition-colors flex items-center gap-1 text-xs sm:text-sm"
                  >
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="font-semibold text-slate-100 mb-3 sm:mb-4 text-sm sm:text-base">{t.navigation.resources}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-500 transition-colors flex items-center gap-1 text-xs sm:text-sm"
                  >
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="font-semibold text-slate-100 mb-3 sm:mb-4 text-sm sm:text-base">{t.footer.support.title}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.support.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-500 transition-colors flex items-center gap-1 text-xs sm:text-sm"
                  >
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="font-semibold text-slate-100 mb-3 sm:mb-4 text-sm sm:text-base">{t.footer.contact.title}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href={`tel:${t.footer.contact.phone}`}
                  className="text-slate-400 hover:text-emerald-500 flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">{t.footer.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t.footer.contact.email}`}
                  className="text-slate-400 hover:text-emerald-500 flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">{t.footer.contact.email}</span>
                </a>
              </li>
              <li className="text-slate-400 flex items-start gap-2 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  {t.footer.contact.address}
                </span>
              </li>
              <li className="text-slate-400 flex items-center gap-2 text-xs sm:text-sm">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{t.footer.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-gray-100">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-8 mb-6 sm:mb-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-slate-800 rounded-full shadow-soft border border-slate-700"
              >
                <cert.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#34d399] flex-shrink-0" />
                <span className="text-slate-400 font-medium text-xs sm:text-sm whitespace-nowrap">{cert.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm mb-6 sm:mb-8 px-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-400 hover:text-emerald-500 transition-colors text-center"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center pt-6 sm:pt-8 border-t border-gray-100 px-4">
            <p className="text-slate-400 mb-2 text-xs sm:text-sm">
              {t.footer.copyright}
            </p>
            {/* <p className="text-xs text-slate-500 break-words">
              CIN: U65929MH2024PTC123456 | NBFC Registration: B.05.12345 | GSTIN: 27AABCL1234N1Z5
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {t.footer.disclaimer}
            </p> */}
          </div>

          {/* Mobile App Download */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4">{t.footer.mobileApp.title}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowComingSoonPopup(true);
                  setTimeout(() => setShowComingSoonPopup(false), 3000);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-800 text-slate-100 rounded-lg border border-slate-700 hover:shadow-glow transition-all text-sm sm:text-base cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {t.footer.mobileApp.appStore}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowComingSoonPopup(true);
                  setTimeout(() => setShowComingSoonPopup(false), 3000);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-800 text-slate-100 rounded-lg border border-slate-700 hover:shadow-glow transition-all text-sm sm:text-base cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {t.footer.mobileApp.playStore}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-white rounded-lg shadow-2xl p-6 max-w-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">{t.newsletter.successTitle}</h4>
                <p className="text-sm text-gray-600">{t.newsletter.successMessage}</p>
              </div>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coming Soon Popup */}
      <AnimatePresence>
        {showComingSoonPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg shadow-2xl p-6 max-w-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">{t.footer.mobileApp.comingSoon}</h4>
                <p className="text-sm text-white/90">{t.footer.mobileApp.comingSoonMessage}</p>
              </div>
              <button
                onClick={() => setShowComingSoonPopup(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}