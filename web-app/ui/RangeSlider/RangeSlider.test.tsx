import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RangeSlider from "./RangeSlider";

describe("RangeSlider Component", () => {
  const mockRangeProps = {
    initialMin: 5,
    initialMax: 100,
  };

  const mockFixedRangesProps = {
    initialMin: 5,
    initialMax: 100,
    rangeValues: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  };

  describe("Range slider single", () => {
    beforeEach(() => {
      render(<RangeSlider {...mockRangeProps} />);
    });

    it("renders correctly with initial values for range slider", () => {
      const minLabel = screen.getByTestId("minRange") as HTMLInputElement;
      expect(minLabel.value).toBe(mockRangeProps.initialMin.toString());
    });

    it("should update min value via input and apply on Enter", () => {
      const minInput = screen.getByTestId("minRange") as HTMLInputElement;
      fireEvent.change(minInput, { target: { value: "10" } });
      fireEvent.keyDown(minInput, { key: "Enter" });

      expect(minInput.value).toBe("10");
    });

    it("should reset min value to previous valid value on blur", () => {
      const minInput = screen.getByTestId("minRange") as HTMLInputElement;
      fireEvent.change(minInput, { target: { value: "200" } });
      fireEvent.blur(minInput);

      expect(minInput.value).toBe(mockRangeProps.initialMin.toString());
    });

    it("should update max value via input and apply on Enter", () => {
      const maxInput = screen.getByTestId("maxRange") as HTMLInputElement;
      fireEvent.change(maxInput, { target: { value: "70" } });
      fireEvent.keyDown(maxInput, { key: "Enter" });

      expect(maxInput.value).toBe("70");
    });

    it("should reset max value to previous valid value on blur", () => {
      const maxInput = screen.getByDisplayValue("100") as HTMLInputElement;
      fireEvent.change(maxInput, { target: { value: "3" } });
      fireEvent.blur(maxInput);

      expect(maxInput.value).toBe("100");
    });

    it("should restrict min handle movement within allowed range values", async () => {
      const trackElement = screen.getByTestId("track");

      jest.spyOn(trackElement, "getBoundingClientRect").mockReturnValue({
        width: 210,
        height: 10,
        top: 0,
        left: 100,
        right: 400,
        bottom: 10,
        x: 100,
        y: 0,
        toJSON: () => {},
      });

      Object.defineProperty(trackElement, "offsetWidth", {
        value: 210,
      });

      const minHandle = screen.getByTestId("minHandle");

      fireEvent.mouseDown(minHandle);
      fireEvent.mouseMove(window, { clientX: 200 });

      await waitFor(() => {
        const tooltip = minHandle.querySelector("#min-tooltip");
        expect(tooltip).toHaveTextContent("50");
      });
    });

    it("should restrict max handle movement within allowed range values", async () => {
      const trackElement = screen.getByTestId("track");

      jest.spyOn(trackElement, "getBoundingClientRect").mockReturnValue({
        width: 210,
        height: 10,
        top: 0,
        left: 100,
        right: 400,
        bottom: 10,
        x: 100,
        y: 0,
        toJSON: () => {},
      });

      Object.defineProperty(trackElement, "offsetWidth", {
        value: 210,
      });

      const maxHandle = screen.getByTestId("maxHandle");

      fireEvent.mouseDown(maxHandle);
      fireEvent.mouseMove(window, { clientX: 102 });

      await waitFor(() => {
        const tooltip = maxHandle.querySelector("#max-tooltip");
        expect(tooltip).toHaveTextContent("6");
      });
    });
  });

  describe("Fixed Range slider", () => {
    beforeEach(() => {
      render(<RangeSlider {...mockFixedRangesProps} />);
    });

    it("renders correctly with initial values for fixed range slider", () => {
      const minLabel = screen.getByTestId("minLabel") as HTMLElement;
      expect(minLabel.textContent).toBe(
        mockFixedRangesProps.initialMin.toString()
      );

      const maxLabel = screen.getByTestId("maxLabel") as HTMLElement;
      expect(maxLabel.textContent).toBe(
        mockFixedRangesProps.initialMax.toString()
      );
    });

    it("should restrict min handle movement within allowed range values", async () => {
      const trackElement = screen.getByTestId("track");

      jest.spyOn(trackElement, "getBoundingClientRect").mockReturnValue({
        width: 210,
        height: 10,
        top: 0,
        left: 100,
        right: 400,
        bottom: 10,
        x: 100,
        y: 0,
        toJSON: () => {},
      });

      Object.defineProperty(trackElement, "offsetWidth", {
        value: 210,
      });

      const minHandle = screen.getByTestId("minHandle");

      fireEvent.mouseDown(minHandle);
      fireEvent.mouseMove(window, { clientX: 200 });

      await waitFor(() => {
        const tooltip = minHandle.querySelector("#min-tooltip");
        expect(tooltip).toHaveTextContent(
          mockFixedRangesProps.rangeValues[3].toString()
        );
      });
    });

    it("should restrict max handle movement within allowed range values", async () => {
      const trackElement = screen.getByTestId("track");

      jest.spyOn(trackElement, "getBoundingClientRect").mockReturnValue({
        width: 210,
        height: 10,
        top: 0,
        left: 0,
        right: 400,
        bottom: 10,
        x: 100,
        y: 0,
        toJSON: () => {},
      });

      Object.defineProperty(trackElement, "offsetWidth", {
        value: 210,
      });

      const maxHandle = screen.getByTestId("maxHandle");

      fireEvent.mouseDown(maxHandle);
      fireEvent.mouseMove(window, { clientX: 160 });

      await waitFor(() => {
        const tooltip = maxHandle.querySelector("#max-tooltip");
        expect(tooltip).toHaveTextContent(
          mockFixedRangesProps.rangeValues[6].toString()
        );
      });
    });
  });
});
