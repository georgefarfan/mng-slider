"use client";
import { useEffect, useState } from "react";
import { getFixedRanges } from "@lib/rangesService";
import RangeSlider from "../ui/RangeSlider/RangeSlider";

export default function Exercise2Page() {
  const [ranges, setRanges] = useState<{ min: number; max: number } | null>(
    null
  );
  const [rangeValues, setRangeValues] = useState([]);

  useEffect(() => {
    const fetchFixedRanges = async () => {
      try {
        const data = await getFixedRanges();
        setRanges({
          min: data[0],
          max: data[data.length - 1],
        });

        setRangeValues(data);
      } catch (error) {
        console.error("Error in obtaining ranks:", error);
      }
    };

    fetchFixedRanges();
  }, []);

  return (
    <section>
      <h2>Exercise 2</h2>
      <div className="container">
        <p>
          {ranges ? (
            <RangeSlider
              rangeValues={rangeValues}
              initialMin={ranges.min}
              initialMax={ranges.max}
            />
          ) : (
            <p>No rank data found.</p>
          )}
        </p>
      </div>
    </section>
  );
}
