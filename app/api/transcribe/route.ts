import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { Groq } from "groq-sdk";
import os from "os";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return new Response(JSON.stringify({ error: "No audio uploaded" }), {
        status: 400,
      });
    }

    const buffer = Buffer.from(await audioFile.arrayBuffer());
    const tempPath = path.join(os.tmpdir(), `${Date.now()}-audio.webm`);
    fs.writeFileSync(tempPath, buffer);

    const transcription = await client.audio.transcriptions.create({
      file: fs.createReadStream(tempPath),
      model: "whisper-large-v3-turbo",
      language: "en",
    });

    fs.unlinkSync(tempPath);

    return new Response(JSON.stringify({ text: transcription.text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Transcription failed" }), {
      status: 500,
    });
  }
}
