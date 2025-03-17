import { getRanges, getFixedRanges } from "@lib/rangesService";

describe("getRanges", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return correct data when API call is successful", async () => {
    const mockData = { min: 1, max: 100 };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await getRanges();
    expect(result).toEqual(mockData);

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ranges`
    );
  });

  it("should throw an error if the API response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(getRanges()).rejects.toThrow("Error fetching ranges");
  });
});

describe("getFixedRanges", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return correct fixed range data", async () => {
    const mockData = [10, 20, 30, 40, 50];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await getFixedRanges();
    expect(result).toEqual({
      min: 10,
      max: 50,
      data: mockData,
    });
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/fixedRanges`
    );
  });

  it("should throw an error if the API response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(getFixedRanges()).rejects.toThrow(
      "Error fetching fixed ranges"
    );
  });

  it("should throw an error if the data is empty", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    });

    await expect(getFixedRanges()).rejects.toThrow(
      "Error fetching fixed ranges: somthing went wrong"
    );
  });
});
