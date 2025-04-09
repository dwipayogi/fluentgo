"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, Globe, Mic, Trophy, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <main>
        {/* hero */}
        <section className="min-h-screen flex items-center justify-center -mt-20">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-8">
            <motion.h1
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Revolutionize{" "}
              <span className="text-indigo-500">Language Learning</span> in Your
              Classroom
            </motion.h1>
            <motion.p
              variants={item}
              initial="hidden"
              animate="show"
              className="text-lg max-w-xl"
            >
              FluentGo is an innovative language learning platform that uses AI
              to help you learn languages faster and more effectively.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href="/signup">
                <Button className="hover:cursor-pointer bg-indigo-500 hover:bg-indigo-400">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Feature 1: Translation */}
        <section
          id="feature-translation"
          className="max-w-7xl mx-auto py-12 md:py-24 lg:py-32 px-20"
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
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                  <Globe className="h-8 w-8 text-indigo-500" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-indigo-500">
                  Real-time Translation
                </h2>
                <p className=" text-lg">
                  Break down language barriers instantly with our advanced
                  AI-powered translation system. FluentGo enables seamless
                  communication between students speaking different languages.
                </p>
                <ul className="space-y-2 ">
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
                    <span>Instant translation of spoken and written text</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
                    <span>
                      Contextual translation that understands idioms and slang
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
                    <span>Real-time subtitles during video conversations</span>
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
                <div className="absolute -inset-0.5 rounded-xl opacity-20 blur-xl"></div>
                <Image
                  src="https://placehold.co/600x400"
                  width={600}
                  height={400}
                  alt="Real-time Translation Feature"
                  className="relative mx-auto overflow-hidden rounded-xl object-cover border"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Feature 2: Pronunciation */}
        <section
          id="feature-pronunciation"
          className="max-w-7xl mx-auto py-12 md:py-24 lg:py-32 px-20"
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
                <div className="absolute -inset-0.5 rounded-xl opacity-20 blur-xl"></div>
                <Image
                  src="https://placehold.co/600x400"
                  width={600}
                  height={400}
                  alt="AI Pronunciation Coach Feature"
                  className="relative mx-auto overflow-hidden rounded-xl object-cover border"
                />
              </motion.div>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                  <Mic className="h-8 w-8 text-indigo-500" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-indigo-500">
                  AI Pronunciation Coach
                </h2>
                <p className=" text-lg">
                  Perfect your accent with our advanced AI pronunciation coach
                  that listens, analyzes, and provides personalized feedback in
                  real-time.
                </p>
                <ul className="space-y-2 ">
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
                    <span>Phoneme-level analysis of speech patterns</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
                    <span>Visual feedback showing pronunciation accuracy</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
                    <span>Personalized exercises targeting problem areas</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Feature 3: Gamification */}
        <section
          id="feature-gamification"
          className="max-w-7xl mx-auto py-12 md:py-24 lg:py-32 px-20"
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
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                  <Trophy className="h-8 w-8 text-indigo-500" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-indigo-500">
                  Gamified Learning
                </h2>
                <p className=" text-lg">
                  Transform language practice into an engaging game with our
                  gamification system designed to motivate students and make
                  learning addictive.
                </p>
                <ul className="space-y-2 ">
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
                    <span>Points for completing language challenges</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
                    <span>Classroom and school-wide leaderboards</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
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
                <div className="absolute -inset-0.5 rounded-xl opacity-20 blur-xl"></div>
                <Image
                  src="https://placehold.co/600x400"
                  width={600}
                  height={400}
                  alt="Gamified Learning Feature"
                  className="relative mx-auto overflow-hidden rounded-xl object-cover border"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Feature 4: Analytics */}
        <section
          id="feature-analytics"
          className="max-w-7xl mx-auto py-12 md:py-24 lg:py-32 px-20"
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
                <div className="absolute -inset-0.5 rounded-xl opacity-20 blur-xl"></div>
                <Image
                  src="https://placehold.co/600x400"
                  width={600}
                  height={400}
                  alt="Progress Tracking Feature"
                  className="relative mx-auto overflow-hidden rounded-xl object-cover border"
                />
              </motion.div>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                  <BarChart className="h-8 w-8 text-indigo-500" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-indigo-500">
                  Progress Tracking
                </h2>
                <p className=" text-lg">
                  Gain valuable insights into student performance with
                  comprehensive analytics dashboard.
                </p>
                <ul className="space-y-2 ">
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
                    <span>Give detailed progress reports</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
                    <span>Pronunciation accuracy trends over time</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
                    <span>Vocabulary and grammar mastery tracking</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section
          id="contact"
          className="max-w-7xl mx-auto py-12 md:py-24 lg:py-32"
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
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-indigo-500">
                  Transform Your Language Learning
                </h2>
                <p className="max-w-[600px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Use FluentGo to create engaging, effective language learning
                  experiences.
                </p>
              </div>
              <motion.div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Link href="/signup">
                  <Button className="bg-indigo-500 hover:bg-indigo-400">
                    Get Started
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="text-indigo-500 hover:text-indigo-500 bg-indigo-50 hover:bg-indigo-100 border-indigo-500 dark:border-indigo-500 dark:bg-zinc-950"
                >
                  View Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* footer */}

      <footer className="border-t py-4">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} FluentGo. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
