import { EPeakType } from "../data/tariff-constants";

export const getPeakLabel = (key) => {
  switch (key) {
    case EPeakType.MID:
      return "Mid-Peak";
    case EPeakType.OFF:
      return "Off-Peak";
    case EPeakType.PEAK:
    default:
      return "Peak";
  }
};

export const getPeakColor = (key) => {
  switch (key) {
    case EPeakType.MID:
      return "#FFC700";
    case EPeakType.OFF:
      return "#8FCD52";
    case EPeakType.PEAK:
    default:
      return "#DA3333";
  }
};

export const addLeadingZero = (v) => (v < 10 ? "0" + String(v) : String(v));

/**
 * @param {Array<TariffHour>} values
 * @return {Array<PeakDetail>}
 */
export const extractPeaks = (values) => {
  if (!values?.length) {
    return [];
  }
  let min = Infinity;
  let max = -Infinity;

  const averageValue =
    values.reduce((acc, p) => {
      const value = Number(p.cost);
      min = Math.min(value, min);
      max = Math.max(value, max);
      return acc + value;
    }, 0) / values.length;

  return values.map((entry) => {
    const value = Number(entry.cost);

    let type = EPeakType.MID; // MID by default

    if (values.length > 2) {
      const off = Math.pow(value - min, 2);
      const peak = Math.pow(value - max, 2);
      const mid = Math.pow(value - averageValue, 2);
      const lowestDeviation = Math.min(off, peak, mid);

      if (lowestDeviation !== mid) {
        type = lowestDeviation === peak ? EPeakType.PEAK : EPeakType.OFF;
      }
    } else if (value === max) {
      type = EPeakType.PEAK;
    }

    return {
      timeFrom: entry.valid_from,
      timeTo: entry.valid_to,
      type: type,
      price: entry.cost,
    };
  });
};
