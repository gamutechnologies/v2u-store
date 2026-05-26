"use client";

import { motion } from "framer-motion";

import {
  MapPin,
  Navigation,
  Clock3,
  Phone,
} from "lucide-react";

export default function MapSection() {
  return (
    <section className="relative overflow-hidden px-6 py-28">

      {/* Background Glow */}
      <div className="absolute left-[-10%] top-[0%] h-[500px] w-[500px] rounded-full bg-[#0066FF]/10 blur-3xl" />

      <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#7DBBFF]/20 blur-3xl" />

      {/* Futuristic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >

          <span className="rounded-full border border-[#7DBBFF]/20 bg-white/60 px-5 py-2 text-sm font-medium text-[#0066FF] backdrop-blur-xl">
            Visit Our Store
          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-gray-900 md:text-6xl">

            Find Our
            <span className="bg-gradient-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
              {" "}Location
            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Experience our premium retail-tech environment and
            explore the latest technology in person.
          </p>

        </motion.div>

        {/* Main Layout */}
        <div className="grid gap-10 lg:grid-cols-[420px_1fr]">

          {/* Left Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-[40px] border border-[#7DBBFF]/20 bg-white/50 p-8 backdrop-blur-3xl"
          >

            {/* Glow */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/15 blur-3xl" />

            </div>

            {/* Shine */}
            <div className="absolute left-[-120%] top-0 h-full w-[120%] rotate-12 bg-white/30 blur-2xl transition-all duration-1000 group-hover:left-[120%]" />

            <div className="relative z-10">

              {/* Title */}
              <h3 className="text-3xl font-black text-gray-900">
                Our Headquarters
              </h3>

              <p className="mt-4 text-sm leading-8 text-gray-600">
                Visit our premium retail-tech store and experience
                cutting-edge electronics with personalized customer support.
              </p>

              {/* Info Items */}
              <div className="mt-10 space-y-6">

                {/* Address */}
                <div className="flex items-start gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#7DBBFF] text-white shadow-[0_0_25px_rgba(0,102,255,0.25)]">

                    <MapPin size={24} />

                  </div>

                  <div>

                    <h4 className="text-lg font-bold text-gray-900">
                      Address
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      123 Tech Avenue,
                      <br />
                      Colombo, Sri Lanka
                    </p>

                  </div>

                </div>

                {/* Navigation */}
                <div className="flex items-start gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#7DBBFF] text-white shadow-[0_0_25px_rgba(0,102,255,0.25)]">

                    <Navigation size={24} />

                  </div>

                  <div>

                    <h4 className="text-lg font-bold text-gray-900">
                      Navigation
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      Easily accessible from all major
                      routes and city centers.
                    </p>

                  </div>

                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#7DBBFF] text-white shadow-[0_0_25px_rgba(0,102,255,0.25)]">

                    <Clock3 size={24} />

                  </div>

                  <div>

                    <h4 className="text-lg font-bold text-gray-900">
                      Opening Hours
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      Monday - Saturday
                      <br />
                      9:00 AM — 8:00 PM
                    </p>

                  </div>

                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#7DBBFF] text-white shadow-[0_0_25px_rgba(0,102,255,0.25)]">

                    <Phone size={24} />

                  </div>

                  <div>

                    <h4 className="text-lg font-bold text-gray-900">
                      Contact
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      +94 77 123 4567
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

          {/* Right Map */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-[40px] border border-[#7DBBFF]/20 bg-white/50 p-3 backdrop-blur-3xl"
          >

            {/* Glow */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

              <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/10 blur-3xl" />

            </div>

            {/* Map Container */}
            <div className="relative z-10 overflow-hidden rounded-[32px]">

              <iframe
                src="https://www.google.com/maps?q=Colombo,Sri Lanka&output=embed"
                width="100%"
                height="720"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 grayscale-[0.15] transition-all duration-500 group-hover:scale-[1.02]"
              />

              {/* Floating Location Card */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute bottom-6 left-6 rounded-[24px] border border-white/20 bg-white/20 p-5 backdrop-blur-2xl"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#7DBBFF] text-white">

                    <MapPin size={26} />

                  </div>

                  <div>

                    <p className="text-sm font-medium text-gray-700">
                      Main Store Location
                    </p>

                    <h4 className="mt-1 text-2xl font-black text-[#0066FF]">
                      Colombo
                    </h4>

                  </div>

                </div>

              </motion.div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}