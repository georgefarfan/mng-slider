"use client";
import { useEffect, useState } from "react";
import { getRanges } from "@lib/rangesService";
import RangeSlider from "../ui/RangeSlider/RangeSlider";

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
        console.error("Error al obtener los rangos:", error);
      }
    };

    fetchRanges();
  }, []);

  return (
    <section>
      <h2>Exercise 1 </h2>
      {ranges ? (
        <RangeSlider initialMin={ranges.min} initialMax={ranges.max} />
      ) : (
        <p>No se encontraron datos de rangos.</p>
      )}
    </section>
  );
}
