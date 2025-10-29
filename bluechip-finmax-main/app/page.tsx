"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Zap, Shield, Clock, Smartphone, Brain, Award, TrendingUp,
  Star, Users, CheckCircle, Play, ChevronDown, Globe, Briefcase, Heart,
  PiggyBank, Calculator, FileCheck, IndianRupee, Sparkles, Trophy,
  BadgeCheck, Rocket, Target, Phone, Mail, MessageCircle
} from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useLanguage } from "@/lib/contexts/LanguageContext";

// Lazy load heavy components that aren't immediately visible
const LoanCalculator = dynamic(() => import("@/components/loan-calculator").then(mod => ({ default: mod.LoanCalculator })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-2xl" />,
  ssr: true,
});

// const FeatureCards = dynamic(() => import("@/components/feature-cards").then(mod => ({ default: mod.FeatureCards })), {
//   loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-2xl" />,
//   ssr: true,
// });

const HeroSection = dynamic(() => import("@/components/hero-section").then(mod => ({ default: mod.HeroSection })), {
  loading: () => <div className="h-screen bg-gradient-to-br from-blue-50 to-green-50 animate-pulse" />,
  ssr: true,
});

const LoadingScreen = dynamic(() => import("@/components/loading-screen").then(mod => ({ default: mod.LoadingScreen })), {
  ssr: false,
});

export default function Home() {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const containerRef = useRef(null);

  // Simplify scroll animations to reduce initial load
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Reduce complexity of transforms
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Data arrays using translations
  const trustBadges = [
    { icon: Users, value: t.homepage.trustBadges.customers.value, title: t.homepage.trustBadges.customers.title },
    { icon: IndianRupee, value: t.homepage.trustBadges.disbursed.value, title: t.homepage.trustBadges.disbursed.title },
    { icon: Clock, value: t.homepage.trustBadges.approvalTime.value, title: t.homepage.trustBadges.approvalTime.title },
    { icon: Star, value: t.homepage.trustBadges.rating.value, title: t.homepage.trustBadges.rating.title }
  ];

  const features = [
    {
      icon: Zap,
      title: t.homepage.features.fast.title,
      description: t.homepage.features.fast.description
    },
    {
      icon: Shield,
      title: t.homepage.features.secure.title,
      description: t.homepage.features.secure.description
    },
    {
      icon: Brain,
      title: t.homepage.features.aiScore.title,
      description: t.homepage.features.aiScore.description
    },
    {
      icon: Clock,
      title: t.homepage.features.available.title,
      description: t.homepage.features.available.description
    },
    {
      icon: Smartphone,
      title: t.homepage.features.mobile.title,
      description: t.homepage.features.mobile.description
    },
    {
      icon: Award,
      title: t.homepage.features.licensed.title,
      description: t.homepage.features.licensed.description
    },
    {
      icon: TrendingUp,
      title: t.homepage.features.flexible.title,
      description: t.homepage.features.flexible.description
    },
    {
      icon: Rocket,
      title: t.homepage.features.instant.title,
      description: t.homepage.features.instant.description
    }
  ];

  const loanProducts = [
    {
      name: t.homepage.loanProducts.personal.name,
      description: t.homepage.loanProducts.personal.description,
      rate: t.homepage.loanProducts.personal.rate,
      icon: Heart,
      link: "/products/personal-loan"
    },
    {
      name: t.homepage.loanProducts.business.name,
      description: t.homepage.loanProducts.business.description,
      rate: t.homepage.loanProducts.business.rate,
      icon: Briefcase,
      link: "/products/business-loan"
    },
    {
      name: t.homepage.loanProducts.emergency.name,
      description: t.homepage.loanProducts.emergency.description,
      rate: t.homepage.loanProducts.emergency.rate,
      icon: Zap,
      link: "/products/emergency"
    },
    {
      name: t.homepage.loanProducts.education.name,
      description: t.homepage.loanProducts.education.description,
      rate: t.homepage.loanProducts.education.rate,
      icon: Globe,
      link: "/products/education-loan"
    }
  ];

  const steps = [
    {
      title: t.homepage.steps.apply.title,
      description: t.homepage.steps.apply.description,
      time: t.homepage.steps.apply.time,
      icon: FileCheck
    },
    {
      title: t.homepage.steps.approval.title,
      description: t.homepage.steps.approval.description,
      time: t.homepage.steps.approval.time,
      icon: Brain
    },
    {
      title: t.homepage.steps.money.title,
      description: t.homepage.steps.money.description,
      time: t.homepage.steps.money.time,
      icon: PiggyBank
    }
  ];

  return (
    <>
      <LoadingScreen />

      <div className="min-h-screen" ref={containerRef}>
        {/* Enhanced Hero Section with Parallax */}
        <motion.div
          className="relative w-full overflow-hidden"
          style={{ opacity }}
        >
          {/* Simplified Background - Static for better performance */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#38bdf8]/3 via-[#34d399]/3 to-[#fbbf24]/3" />
          </div>

          {/* Static decorative elements for better performance */}
          <div className="hidden md:block absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[#38bdf8] to-[#34d399] rounded-full opacity-20 blur-3xl" />
          <div className="hidden md:block absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-[#34d399] to-[#fbbf24] rounded-full opacity-20 blur-3xl" />

          <div className="w-full">
            <HeroSection />
          </div>
        </motion.div>

        {/* Trust Badges Section - Clean White Background */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-50 to-green-100 rounded-full mb-2 sm:mb-3">
                    <badge.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{badge.value}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 px-2">{badge.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Features Grid - Clean Light Background */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-12 lg:mb-16"
            >
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                {t.homepage.sections.whyChoose.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-sora mb-3 sm:mb-4 text-gray-900 px-4">
                {t.homepage.sections.whyChoose.title}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                {t.homepage.sections.whyChoose.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-glow transition-all duration-300"
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-white rounded-2xl p-5 sm:p-6 m-[1px]">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-emerald-500 to-yellow-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Loan Products Showcase */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-12 lg:mb-16"
            >
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                {t.homepage.sections.products.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-sora mb-3 sm:mb-4 px-4">
                {t.homepage.sections.products.title} <span className="gradient-prosperity bg-clip-text">{t.homepage.sections.products.titleHighlight}</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                {t.homepage.sections.products.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {loanProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link href={product.link}>
                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 sm:p-6 hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                      <div className="relative">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                          <product.icon className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-violet-600 font-medium">
                            {product.rate}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Loan Calculator Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <span className="inline-block px-4 py-2 glass rounded-full text-xs sm:text-sm font-semibold mb-4">
                  <Sparkles className="inline w-4 h-4 mr-1 text-yellow-500" />
                  {t.homepage.sections.calculator.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-sora mb-4 sm:mb-6">
                  {t.homepage.sections.calculator.title}
                  <span className="block gradient-primary bg-clip-text text-transparent">
                    {t.homepage.sections.calculator.titleHighlight}
                  </span>
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8">
                  {t.homepage.sections.calculator.subtitle}
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-600">{t.homepage.sections.calculator.features.noHiddenCharges}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-600">{t.homepage.sections.calculator.features.flexibleTenure}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-600">{t.homepage.sections.calculator.features.lowestRates}</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <LoanCalculator />
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works - Visual Steps */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-12 lg:mb-16"
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                {t.homepage.sections.howItWorks.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-sora mb-3 sm:mb-4 px-4">
                {t.homepage.sections.howItWorks.title} <span className="gradient-prosperity bg-clip-text">{t.homepage.sections.howItWorks.titleHighlight}</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                {t.homepage.sections.howItWorks.subtitle}
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-purple-600 -translate-y-1/2 hidden lg:block" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className="card-dark p-6 sm:p-8 relative z-10">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      <div className="text-center pt-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                          <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-violet-600" />
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3">{step.title}</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-2">{step.description}</p>
                        <span className="text-xs sm:text-sm text-violet-600 font-medium">{step.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 lg:py-20 gradient-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-12 lg:mb-16"
            >
              <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-600 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                {t.homepage.sections.testimonials.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-sora mb-3 sm:mb-4 px-4">
                {t.homepage.sections.testimonials.title} <span className="gradient-primary bg-clip-text text-transparent">{t.homepage.sections.testimonials.titleHighlight}</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                {t.homepage.sections.testimonials.subtitle}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-dark p-5 sm:p-6 hover-glow"
                >
                  <div className="flex items-center gap-1 mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 italic line-clamp-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {testimonial.name[0]}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base truncate">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{testimonial.designation}</p>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-600">{t.homepage.sections.testimonials.loanAmount}: {testimonial.loanAmount}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-12 lg:mb-16"
            >
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                FAQs
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-sora mb-3 sm:mb-4 px-4">
                {t.homepage.faqs.title}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">
                {t.homepage.faqs.subtitle}
              </p>
            </motion.div>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-soft"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-sm sm:text-base text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ${
                        activeFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeFaq === index ? 'auto' : 0,
                      opacity: activeFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 sm:px-6 pb-3 sm:pb-4 text-sm sm:text-base text-gray-600">
                      {faq.answer}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-teal-500/20" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
            }} />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          >
            <Rocket className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 text-yellow-300" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-sora mb-4 sm:mb-6 px-4">
              {t.homepage.sections.cta.title}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto px-4">
              {t.homepage.sections.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
              <Link href="/apply" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-emerald-600 rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:bg-yellow-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {t.homepage.sections.cta.applyButton}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t.homepage.sections.cta.talkButton}
                </motion.button>
              </Link>
            </div>
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-white/90 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t.homepage.sections.cta.badges.rbiLicensed}</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t.homepage.sections.cta.badges.isoCertified}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t.homepage.sections.cta.badges.awardWinning}</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Feature Comparison Table */}
        {/* <FeatureCards /> */}
      </div>
    </>
  );
}

// Testimonials data (kept outside component as it doesn't need translation yet)
const testimonials: {
  name: string;
  designation: string;
  content: string;
  loanAmount: string;
}[] = [];

const faqs: {
  question: string;
  answer: string;
}[] = [];