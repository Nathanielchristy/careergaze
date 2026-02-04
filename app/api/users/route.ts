import { NextResponse } from 'next/server';

export async function GET() {
  // Replace this with the NEW URL you get after following the steps above
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxDT0Wer2TNoQXgcHkVMs-q8JX1du_gx5tfKgu-MFyXHwfVQgOiwOTw_F22ZXEUi61T/exec";

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
      redirect: 'follow'
    });

    const text = await response.text();

    // Catch the HTML login page before it breaks JSON.parse
    if (text.includes("<!DOCTYPE html>")) {
      return NextResponse.json({ 
        error: "ACCESS_DENIED", 
        message: "Google Script is set to Private. Please set 'Who has access' to 'Anyone'." 
      }, { status: 403 });
    }

    return NextResponse.json(JSON.parse(text));
  } catch (error: any) {
    return NextResponse.json({ error: "FETCH_FAILED", message: error.message }, { status: 500 });
  }
}