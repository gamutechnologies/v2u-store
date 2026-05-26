"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address";
  if (!form.message.trim()) errors.message = "Message is required";
  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactFormSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus("loading");
    setErrors({});

    // ── Replace this block with your real API call / email service ──
    try {
      await new Promise((resolve) => setTimeout(resolve, 1400)); // simulate request
      // Example with a real endpoint:
      // await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
    // ────────────────────────────────────────────────────────────────

    // Reset status after 5s so the form can be used again
    setTimeout(() => setStatus("idle"), 5000);
  };

  const inputClass = (field?: string) =>
    `flex items-center rounded-2xl border bg-white/70 px-5 backdrop-blur-xl transition-all duration-300 focus-within:border-[#0066FF]/40 ${
      field
        ? "border-red-300 focus-within:border-red-400"
        : "border-[#7DBBFF]/20"
    }`;

  return (
    <section className="relative overflow-hidden px-6 py-28">
      {/* Background Glow */}
      <div className="absolute left-[-10%] top-[0%] h-[500px] w-[500px] rounded-full bg-[#0066FF]/10 blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#7DBBFF]/20 blur-3xl" />
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Main Card */}
        <div className="grid overflow-hidden rounded-[45px] border border-[#7DBBFF]/20 bg-white/50 backdrop-blur-3xl lg:grid-cols-[1fr_480px]">

          {/* ── LEFT SIDE ──────────────────────────────────────────────────── */}
          <div className="relative overflow-hidden p-10 md:p-16">
            <div className="absolute left-[-10%] top-[10%] h-[350px] w-[350px] rounded-full bg-[#0066FF]/10 blur-3xl" />
            <div className="relative z-10">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full border border-[#7DBBFF]/20 bg-white/70 px-5 py-2 backdrop-blur-xl"
              >
                <Sparkles size={16} className="text-[#0066FF]" />
                <span className="text-sm font-medium text-[#0066FF]">
                  Contact Form
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-8 text-5xl font-black leading-[0.95] tracking-tight text-gray-900 md:text-6xl"
              >
                Start Your
                <span className="block bg-gradient-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
                  Conversation
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="mt-8 max-w-2xl text-lg leading-8 text-gray-600"
              >
                Need help with products, orders, partnerships, or technical
                support? Send us a message and our premium support team
                will get back to you quickly.
              </motion.p>

              {/* Stats */}
              <div className="mt-14 grid gap-5 sm:grid-cols-3">
                {[
                  { value: "24/7", label: "Support" },
                  { value: "<5m",  label: "Response" },
                  { value: "100%", label: "Secure" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-[28px] border border-[#7DBBFF]/20 bg-white/60 p-5 text-center backdrop-blur-2xl"
                  >
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/10 blur-3xl" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-black text-[#0066FF]">{item.value}</h3>
                      <p className="mt-2 text-sm text-gray-600">{item.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE — FORM ──────────────────────────────────────────── */}
          <div className="relative border-l border-[#7DBBFF]/10 bg-white/40 p-10 backdrop-blur-3xl md:p-14">
            <div className="absolute right-[-20%] top-[20%] h-[300px] w-[300px] rounded-full bg-[#0066FF]/10 blur-3xl" />

            <div className="relative z-10">
              {/* Success / Error banners */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4"
                  >
                    <CheckCircle size={20} className="shrink-0 text-green-500" />
                    <div>
                      <p className="text-sm font-semibold text-green-800">
                        Message sent successfully!
                      </p>
                      <p className="mt-0.5 text-xs text-green-600">
                        We'll get back to you within 5 minutes.
                      </p>
                    </div>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4"
                  >
                    <AlertCircle size={20} className="shrink-0 text-red-500" />
                    <div>
                      <p className="text-sm font-semibold text-red-800">
                        Something went wrong.
                      </p>
                      <p className="mt-0.5 text-xs text-red-600">
                        Please try again or email us directly.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.form
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Full Name <span className="text-[#0066FF]">*</span>
                  </label>
                  <div className={inputClass(errors.name)}>
                    <User size={18} className="shrink-0 text-[#0066FF]" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="h-14 w-full bg-transparent px-4 text-sm outline-none placeholder:text-gray-400"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Email Address <span className="text-[#0066FF]">*</span>
                  </label>
                  <div className={inputClass(errors.email)}>
                    <Mail size={18} className="shrink-0 text-[#0066FF]" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="h-14 w-full bg-transparent px-4 text-sm outline-none placeholder:text-gray-400"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Phone Number{" "}
                    <span className="text-xs font-normal text-gray-400">
                      (optional)
                    </span>
                  </label>
                  <div className={inputClass()}>
                    <Phone size={18} className="shrink-0 text-[#0066FF]" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+94 77 123 4567"
                      className="h-14 w-full bg-transparent px-4 text-sm outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Your Message <span className="text-[#0066FF]">*</span>
                  </label>
                  <div
                    className={`flex rounded-2xl border bg-white/70 px-5 py-4 backdrop-blur-xl transition-all duration-300 focus-within:border-[#0066FF]/40 ${
                      errors.message ? "border-red-300" : "border-[#7DBBFF]/20"
                    }`}
                  >
                    <MessageSquare size={18} className="mt-1 shrink-0 text-[#0066FF]" />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none bg-transparent px-4 text-sm outline-none placeholder:text-gray-400"
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={status === "loading" ? {} : { scale: 1.03, y: -2 }}
                  whileTap={status === "loading" ? {} : { scale: 0.97 }}
                  disabled={status === "loading"}
                  className={`group flex w-full items-center justify-center gap-3 rounded-2xl px-8 py-5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(0,102,255,0.25)] transition-all duration-300 ${
                    status === "loading"
                      ? "cursor-not-allowed bg-[#0066FF]/70"
                      : "bg-gradient-to-r from-[#0066FF] to-[#7DBBFF]"
                  }`}
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-gray-400">
                  Fields marked <span className="text-[#0066FF]">*</span> are required
                </p>
              </motion.form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}