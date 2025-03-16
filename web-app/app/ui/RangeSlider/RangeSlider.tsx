import React, { useEffect, useRef, useState } from "react";
import "./RangeSlider.css";

export interface IRangeSliderProps {
  initialMin: number;
  initialMax: number;
  rangeValues?: number[];
}

type DraggingType = "min" | "max" | null;

const RangeSlider = ({
  initialMin,
  initialMax,
  rangeValues,
}: IRangeSliderProps) => {
  const [minRange, setMinRange] = useState(initialMin);
  const [maxRange, setMaxRange] = useState(initialMax);

  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);

  const [isDragging, setIsDragging] = useState<DraggingType>(null);

  const trackRef = useRef<HTMLDivElement>(null);

  const sortedRangeValues = rangeValues
    ? [...rangeValues].sort((a, b) => a - b)
    : [];

  const getRangeValue = (value: number): number => {
    if (!sortedRangeValues.length) return value;

    let currentValue = value;

    if (isDragging === "min") {
      let values = sortedRangeValues.filter((v) => v < value);
      currentValue = values.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
      );
    }

    if (isDragging === "max") {
      let values = sortedRangeValues.filter((v) => v < value);
      currentValue = values.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
      );
    }

    return currentValue;
  };

  const calculatePosition = (value: number): number =>
    ((value - minRange) / (maxRange - minRange)) * 100;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      const numericValue = getRangeValue(Number(inputValue));
      if (numericValue < maxRange) {
        setMin(numericValue);
        setMinRange(numericValue);
      }
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      const numericValue = getRangeValue(Number(inputValue));
      if (numericValue > minRange) {
        setMax(numericValue);
        setMaxRange(numericValue);
      }
    }
  };

  const stopDragging = (): void => {
    setIsDragging(null);
  };

  const handleMouseDown =
    (type: DraggingType) =>
    (e: React.MouseEvent | React.TouchEvent): void => {
      setIsDragging(type);
    };

  const handleMouseMove = (e: MouseEvent | TouchEvent): void => {
    if (!isDragging || !trackRef.current) return;

    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;

    const newPosition =
      ((clientX - trackRef.current.getBoundingClientRect().left) /
        trackRef.current.offsetWidth) *
      100;

    const newValue = getRangeValue(
      Math.round((newPosition / 100) * (maxRange - minRange) + minRange)
    );

    if (isDragging === "min") {
      if (
        Math.min(newValue, max - 1) >= minRange &&
        newValue < maxRange &&
        newValue < max
      ) {
        setMin(Math.min(newValue, max - 1));
      }
    } else {
      if (
        Math.max(newValue, min + 1) <= maxRange &&
        newValue > minRange &&
        newValue > min
      ) {
        setMax(Math.max(newValue, min + 1));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);

    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);

      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging]);

  return (
    <div className="rangeSlider">
      <div className="container">
        <div className="limit">
          {!rangeValues ? (
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              value={minRange}
              min={minRange}
              max={max - 1}
              onChange={handleMinChange}
            />
          ) : (
            <p>{minRange}</p>
          )}
        </div>

        <div ref={trackRef} className="track-values">
          <div
            className="rangeFill"
            style={{
              left: `${calculatePosition(min)}%`,
              right: `${100 - calculatePosition(max)}%`,
            }}
          ></div>

          <div
            className="handle"
            style={{ left: `${calculatePosition(min)}%` }}
            onMouseDown={handleMouseDown("min")}
            onTouchStart={handleMouseDown("min")}
          >
            <span className="value-tooltip">{min}</span>
          </div>

          <div
            className="handle"
            style={{ left: `${calculatePosition(max)}%` }}
            onMouseDown={handleMouseDown("max")}
            onTouchStart={handleMouseDown("max")}
          >
            <span className="value-tooltip">{max}</span>
          </div>
        </div>

        <div className="limit">
          {!rangeValues ? (
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              value={maxRange}
              min={min + 1}
              max={maxRange}
              onChange={handleMaxChange}
            />
          ) : (
            <p>{maxRange}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
