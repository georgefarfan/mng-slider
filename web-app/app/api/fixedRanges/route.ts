import { NextResponse } from "next/server";

const URL_FIXED_RANGES = `${process.env.NEXT_PUBLIC_API_BASE_URL}/fixedRanges`;

export async function GET() {
  try {
    const response = await fetch(URL_FIXED_RANGES);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error fetching fixed ranges" },
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
