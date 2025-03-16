import { IRange } from "../types/range";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4200";

export async function getRanges() {
  try {
    const response = await fetch(`${BASE_URL}/ranges`);
    if (!response.ok) {
      throw new Error("Error fetching ranges");
    }
    return (await response.json()) as IRange;
  } catch (error) {
    console.error("Error fetching ranges:", error);
    return null;
  }
}

export async function getFixedRanges() {
  try {
    const response = await fetch(`${BASE_URL}/fixedRanges`);
    if (!response.ok) {
      throw new Error("Error fetching fixed ranges");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching fixed ranges:", error);
    return null;
  }
}
