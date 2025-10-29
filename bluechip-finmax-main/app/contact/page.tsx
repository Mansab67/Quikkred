"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  HeadphonesIcon,
  Home,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Shield,
  Award
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/contexts/LanguageContext";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number (min 10 digits)";
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Map form subject to API subject format
      const subjectMap: { [key: string]: string } = {
        "loan-inquiry": "LOAN_INQUIRY",
        "application-status": "APPLICATION_STATUS",
        "technical-support": "TECHNICAL_SUPPORT",
        "general-inquiry": "GENERAL_INQUIRY",
        "complaint": "COMPLAINT"
      };

      const apiSubject = formData.subject ? subjectMap[formData.subject] : "GENERAL_INQUIRY";

      const response = await fetch('https://api.Quikkred.com/api/contactUs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          mobile: formData.phone.trim(),
          subject: apiSubject,
          message: formData.message.trim()
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        // Handle API error
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    setFormErrors({});
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      primary: "1800-123-4567",
      secondary: "+91-98765-43210",
      description: "Speak to our loan experts",
      available: "24/7 Support"
    },
    {
      icon: Mail,
      title: "Email Us",
      primary: "support@quikkred.com",
      secondary: "loans@Quikkred.com",
      description: "Get email support",
      available: "Response within 2 hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      primary: "Mumbai Head Office",
      secondary: "Bangalore Branch",
      description: "Meet us in person",
      available: "Mon-Sat: 9 AM - 6 PM"
    }
  ];

  const offices = [
    {
      city: "Mumbai",
      type: "Head Office",
      address: "Level 15, One World Center, Tower 2A, Jupiter Mill Compound, Senapati Bapat Marg, Lower Parel, Mumbai - 400013",
      phone: "+91-22-4567-8900",
      email: "mumbai@Quikkred.com",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM"
    },
    {
      city: "Bangalore",
      type: "Branch Office",
      address: "4th Floor, Prestige Meridian, No. 29, MG Road, Bangalore - 560001",
      phone: "+91-80-4567-8900",
      email: "bangalore@Quikkred.com",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM"
    },
    {
      city: "Delhi",
      type: "Branch Office",
      address: "8th Floor, DLF Cyber City, Phase III, Gurgaon, Delhi NCR - 122002",
      phone: "+91-124-4567-8900",
      email: "delhi@Quikkred.com",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM"
    }
  ];

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 z-[9999]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-lucky max-w-md w-full"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Message Sent Successfully!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for contacting us. Our team will get back to you within 2 hours.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setSubmitted(false);
                handleReset();
              }}
              className="w-full bg-gradient-to-r from-[#006837] to-[#FFC107] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Send Another Message
            </button>
            <Link href="/">
              <button className="w-full bg-white border-2 border-[#1976D2] text-[#1976D2] py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                Back to Home
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
        >
          <Link href="/" className="hover:text-[#1976D2] transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ArrowRight className="w-3 h-3" />
          <span className="text-[#1976D2] font-medium">Contact Us</span>
        </motion.nav>
      </div>

      {/* Header Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <Image src="/logo 2.png" alt="Quikkred" width={200} height={200} className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto object-contain" />
          </Link>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#006837] to-[#FFC107] rounded-full mb-6">
            <HeadphonesIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-sora mb-4">
            <span className="gradient-primary bg-clip-text text-transparent">{t.contact.title}</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        {/* Quick Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl p-6 shadow-lucky hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#006837] to-[#FFC107] rounded-lg flex items-center justify-center mr-4">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">{info.title}</h3>
              </div>
              <div className="space-y-2">
                {info.title === "Call Us" ? (
                  <>
                    <a href={`tel:${info.primary.replace(/\D/g, '')}`} className="text-lg font-semibold text-[#1976D2] hover:underline block">
                      {info.primary}
                    </a>
                    <a href={`tel:${info.secondary.replace(/\D/g, '')}`} className="text-sm text-gray-600 hover:underline block">
                      {info.secondary}
                    </a>
                  </>
                ) : info.title === "Email Us" ? (
                  <>
                    <a href={`mailto:${info.primary}`} className="text-lg font-semibold text-[#1976D2] hover:underline block">
                      {info.primary}
                    </a>
                    <a href={`mailto:${info.secondary}`} className="text-sm text-gray-600 hover:underline block">
                      {info.secondary}
                    </a>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-semibold text-[#1976D2]">{info.primary}</p>
                    <p className="text-sm text-gray-600">{info.secondary}</p>
                  </>
                )}
                <p className="text-sm text-gray-500">{info.description}</p>
                <div className="inline-flex items-center text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3 mr-1" />
                  {info.available}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-lucky"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-[#1976D2]" />
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-2.5 w-4 h-4 ${formErrors.name ? 'text-red-400' : 'text-gray-400'}`} />
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                        formErrors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-[#1976D2]'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {formErrors.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-600 flex items-center">
                      <span className="mr-1">⚠</span> {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-2.5 w-4 h-4 ${formErrors.email ? 'text-red-400' : 'text-gray-400'}`} />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                        formErrors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-[#1976D2]'
                      }`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {formErrors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-600 flex items-center">
                      <span className="mr-1">⚠</span> {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className={`absolute left-3 top-2.5 w-4 h-4 ${formErrors.phone ? 'text-red-400' : 'text-gray-400'}`} />
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      aria-invalid={!!formErrors.phone}
                      aria-describedby={formErrors.phone ? "phone-error" : undefined}
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                        formErrors.phone
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-[#1976D2]'
                      }`}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  {formErrors.phone && (
                    <p id="phone-error" className="mt-1 text-xs text-red-600 flex items-center">
                      <span className="mr-1">⚠</span> {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1.5">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    aria-label="Select inquiry subject"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-transparent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="loan-inquiry">Loan Inquiry</option>
                    <option value="application-status">Application Status</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="general-inquiry">General Inquiry</option>
                    <option value="complaint">Complaint</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-xs ${formData.message.length > 500 ? 'text-red-600' : 'text-gray-500'}`}>
                    {formData.message.length}/500
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  maxLength={500}
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? "message-error" : undefined}
                  rows={4}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:border-transparent transition-colors resize-none ${
                    formErrors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-[#1976D2]'
                  }`}
                  placeholder="Tell us how we can help you... (minimum 10 characters)"
                />
                {formErrors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-600 flex items-center">
                    <span className="mr-1">⚠</span> {formErrors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-[#006837] to-[#FFC107] text-white py-2.5 px-4 rounded-lg font-semibold text-sm flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="sm:w-auto w-full px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Reset form"
                >
                  Reset
                </button>
              </div>
            </form>
          </motion.div>

          {/* Office Locations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lucky">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-[#006837]" />
                Our Offices
              </h2>

              <div className="space-y-6">
                {offices.map((office, index) => (
                  <motion.div
                    key={office.city}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border-l-4 border-[#1976D2] pl-4 pb-6"
                  >
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-bold">{office.city}</h3>
                      <span className="ml-2 text-xs bg-[#FFC107] text-white px-2 py-1 rounded-full">
                        {office.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{office.address}</p>
                    <div className="space-y-1 text-sm">
                      <a
                        href={`tel:${office.phone.replace(/\D/g, '')}`}
                        className="flex items-center hover:text-[#1976D2] transition-colors group"
                      >
                        <Phone className="w-4 h-4 mr-2 text-[#1976D2]" />
                        <span className="group-hover:underline">{office.phone}</span>
                      </a>
                      <a
                        href={`mailto:${office.email}`}
                        className="flex items-center hover:text-[#006837] transition-colors group"
                      >
                        <Mail className="w-4 h-4 mr-2 text-[#006837]" />
                        <span className="group-hover:underline">{office.email}</span>
                      </a>
                      <p className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-[#FFC107]" />
                        {office.hours}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lucky">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Find Us on Map</h3>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive Map Coming Soon</p>
                  <button className="mt-2 text-[#1976D2] hover:underline flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View on Google Maps
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support Hours & FAQ CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid md:grid-cols-2 gap-6"
        >
          <div className="bg-gradient-to-r from-[#006837] to-[#FFC107] rounded-2xl p-6 sm:p-8 ">
            <div className="flex items-center mb-4">
              <Clock className="w-8 h-8 mr-3" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">Support Hours</h3>
            </div>
            <div className="space-y-2">
              <p className="flex justify-between"><span>Phone Support:</span> <span className="font-semibold">24/7</span></p>
              <p className="flex justify-between"><span>Email Support:</span> <span className="font-semibold">24/7</span></p>
              <p className="flex justify-between"><span>Office Visits:</span> <span className="font-semibold">9 AM - 6 PM</span></p>
              <p className="flex justify-between"><span>Weekend Support:</span> <span className="font-semibold">10 AM - 4 PM</span></p>
            </div>
            <div className="mt-6 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span className="text-sm opacity-90">SSL Secured Communications</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[var(--gold)] to-[var(--rose-gold)] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <Award className="w-8 h-8 mr-3" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">Quick Help</h3>
            </div>
            <p className="mb-6 opacity-90">
              Need instant answers? Check our comprehensive FAQ section for common questions and solutions.
            </p>
            <Link href="/resources/faqs">
              <button className="w-full bg-white text-[#1976D2] py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all">
                Browse FAQs
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}