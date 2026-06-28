import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const upstream = await fetch("http://127.0.0.1:8000/api/v1/audio/transcribe", {
      method: "POST",
      headers: {
        "X-Internal-Token": "changeme-internal-token",
      },
      body: formData,
    });
    
    if (!upstream.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: upstream.status });
    }
    
    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
