"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  encodePassphrase,
  generateRoomId,
  randomString,
} from "@/lib/client-utils";
import styles from "../styles/Home.module.css";

function DemoMeetingTab(props: { label: string }) {
  const router = useRouter();
  const startMeeting = () => {
      router.push(`/rooms/${generateRoomId()}`);
  };
  return (
    <div className={styles.tabContent}>
      <p style={{ margin: 0 }}>
        Try FluentGo for free with our live demo project.
      </p>
      <button
        style={{ marginTop: "1rem" }}
        className="lk-button"
        onClick={startMeeting}
      >
        Start Meeting
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <main className={styles.main} data-lk-theme="default">
        <div className="header">
          <h1>Connect with anyone, anywhere</h1>
          <h2>
            Our video conferencing platform makes it easy to connect with
            colleagues, friends, and family from anywhere in the world. No
            account required - just create or join a room.
          </h2>
        </div>

        <DemoMeetingTab label="Demo" />
      </main>
      <footer data-lk-theme="default">FluentGo</footer>
    </>
  );
}
