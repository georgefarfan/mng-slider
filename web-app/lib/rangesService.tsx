import { IFixedRange, IRange } from "./types/range";

export async function getRanges(): Promise<IRange> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ranges`
    );
    if (!response.ok) {
      throw new Error("Error fetching ranges");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching ranges: somthing went wrong");
  }
}

export async function getFixedRanges(): Promise<IFixedRange> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/fixedRanges`
    );
    if (!response.ok) {
      throw new Error("Error fetching fixed ranges");
    }
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Error fetching fixed ranges: data is empty");
    }

    return {
      min: data[0],
      max: data[data.length - 1],
      data,
    };
  } catch (error) {
    throw new Error("Error fetching fixed ranges: somthing went wrong");
  }
}
