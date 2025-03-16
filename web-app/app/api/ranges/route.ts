import { NextResponse } from "next/server";

const URL = "http://localhost:3000/ranges";

export async function GET() {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error fetching ranges" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
