"use client";
import { useEffect, useState } from "react";
import { getRanges } from "@lib/rangesService";
import RangeSlider from "@ui/RangeSlider/RangeSlider";

export default function Exercise1Page() {
  const [ranges, setRanges] = useState<{ min: number; max: number } | null>(
    null
  );

  useEffect(() => {
    const fetchRanges = async () => {
      try {
        const data = await getRanges();
        setRanges(data);
      } catch (error) {
        console.error("Error in obtaining ranks:", error);
      }
    };

    fetchRanges();
  }, []);

  return (
    <section>
      {ranges ? (
        <RangeSlider initialMin={ranges.min} initialMax={ranges.max} />
      ) : (
        <p>No rank data found.</p>
      )}
    </section>
  );
}
