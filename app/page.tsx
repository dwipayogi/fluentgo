"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Check,
  Globe,
  Mic,
  Trophy,
  BarChart,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Page() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {/* header */}
      <header className="px-4 py-6 sticky top-0 bg-white border-b-2 z-50">
        <nav>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">FluentGo</h1>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#feature-translation"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Translation
              </Link>
              <Link
                href="#feature-pronunciation"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Pronunciation
              </Link>
              <Link
                href="#feature-gamification"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Gamification
              </Link>
              <Link
                href="#feature-analytics"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Analytics
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* hero */}
        <section className="min-h-screen flex items-center justify-center -mt-20">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-8">
            <motion.h1
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-zinc-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Revolutionize Language Learning in Your Classroom
            </motion.h1>
            <motion.p
              variants={item}
              initial="hidden"
              animate="show"
              className="text-lg text-zinc-800 max-w-xl"
            >
              FluentGo is an innovative language learning platform that uses AI
              to help you learn languages faster and more effectively.
            </motion.p>
            <Link href="/sign-in">
              <Button className="hover:cursor-pointer">Get Started</Button>
            </Link>
          </div>
        </section>

        {/* Feature 1: Translation */}
        <section
          id="feature-translation"
          className="w-full py-12 md:py-24 lg:py-32 bg-zinc-100 px-20"
        >
          <motion.div
            className="px-4 md:px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                  <Globe className="h-8 w-8 text-zinc-200" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-zinc-800">
                  Real-time Translation
                </h2>
                <p className="text-zinc-700 text-lg">
                  Break down language barriers instantly with our advanced
                  AI-powered translation system. FluentGo enables seamless
                  communication between students speaking different languages.
                </p>
                <ul className="space-y-2 text-zinc-700">
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>
                      Support for over 40 languages and regional dialects
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>
                      Contextual translation that understands idioms and slang
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>Real-time subtitles during video conversations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>Voice-to-text and text-to-voice capabilities</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-zinc-500 rounded-xl opacity-20 blur-xl"></div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Real-time Translation Feature"
                  className="relative mx-auto overflow-hidden rounded-xl object-cover border border-zinc-800"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Feature 2: Pronunciation */}
        <section
          id="feature-pronunciation"
          className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50 px-20"
        >
          <motion.div
            className="px-4 md:px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative order-last lg:order-first"
              >
                <div className="absolute -inset-0.5 bg-zinc-500 rounded-xl opacity-20 blur-xl"></div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="AI Pronunciation Coach Feature"
                  className="relative mx-auto overflow-hidden rounded-xl object-cover border border-zinc-800"
                />
              </motion.div>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                  <Mic className="h-8 w-8 text-zinc-200" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-zinc-800">
                  AI Pronunciation Coach
                </h2>
                <p className="text-zinc-700 text-lg">
                  Perfect your accent with our advanced AI pronunciation coach
                  that listens, analyzes, and provides personalized feedback in
                  real-time.
                </p>
                <ul className="space-y-2 text-zinc-700">
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>Phoneme-level analysis of speech patterns</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>Visual feedback showing pronunciation accuracy</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>Personalized exercises targeting problem areas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>Native speaker reference recordings</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Feature 3: Gamification */}
        <section
          id="feature-gamification"
          className="w-full py-12 md:py-24 lg:py-32 bg-zinc-100 px-20"
        >
          <motion.div
            className="px-4 md:px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                  <Trophy className="h-8 w-8 text-zinc-200" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-zinc-800">
                  Gamified Learning
                </h2>
                <p className="text-zinc-700 text-lg">
                  Transform language practice into an engaging game with our
                  gamification system designed to motivate students and make
                  learning addictive.
                </p>
                <ul className="space-y-2 text-zinc-700">
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>
                      Points and XP for completing language challenges
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>Achievement badges for mastering new skills</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>Classroom and school-wide leaderboards</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>Streak rewards for consistent practice</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-zinc-500 rounded-xl opacity-20 blur-xl"></div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Gamified Learning Feature"
                  className="relative mx-auto overflow-hidden rounded-xl object-cover border border-zinc-800"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Feature 4: Analytics */}
        <section
          id="feature-analytics"
          className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50 px-20"
        >
          <motion.div
            className="px-4 md:px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative order-last lg:order-first"
              >
                <div className="absolute -inset-0.5 bg-zinc-500 rounded-xl opacity-20 blur-xl"></div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Progress Tracking Feature"
                  className="relative mx-auto overflow-hidden rounded-xl object-cover border border-zinc-800"
                />
              </motion.div>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                  <BarChart className="h-8 w-8 text-zinc-200" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-zinc-800">
                  Progress Tracking
                </h2>
                <p className="text-zinc-700 text-lg">
                  Gain valuable insights into student performance with
                  comprehensive analytics dashboards designed for educators.
                </p>
                <ul className="space-y-2 text-zinc-700">
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>Individual student progress reports</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>Pronunciation accuracy trends over time</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>Vocabulary and grammar mastery tracking</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>Customizable learning path recommendations</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-zinc-100"
        >
          <motion.div
            className="px-4 md:px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-zinc-800">
                  Transform Your Language Classroom
                </h2>
                <p className="max-w-[600px] text-zinc-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join hundreds of schools already using FluentGo to create
                  engaging, effective language learning experiences.
                </p>
              </div>
              <motion.div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Button>
                  <span className="relative flex items-center">
                    Get Started
                  </span>
                </Button>
                <Button variant="outline">View Demo</Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* footer */}

      <footer className="bg-zinc-50 border-t text-zinc-800 py-4">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} FluentGo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
