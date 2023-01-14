import { createSlice } from "@reduxjs/toolkit";
import { Actions } from "../sagas/actions";
import {
  TARIFF_TYPE,
  TARIFF_ALL_DAYS,
  TARIFF_ALL_MONTHS,
  TARIFF_WEEKDAYS,
  TARIFF_WEEKEND,
  TARIFF_MONTHS,
} from "../../data/tariff-constants";

/**
 * @param {string} validFrom
 * @param {string} validTo
 * @param {string} cost
 * @return TariffScheduleHours
 */
const blankHoursTemplate = (
  validFrom = "00:00:00",
  validTo = "00:00:00",
  cost = "0.00"
) => {
  return {
    valid_from: validFrom,
    valid_to: validTo,
    cost: cost,
  };
};

/**
 * @param {Array<TariffSchedule>} schedules
 * @return {TariffSchedule | null}
 */
export const findWeekdaySchedule = (schedules) => {
  if (!schedules || !schedules.length) {
    return null;
  }
  return schedules.find((schedule) => schedule.type === TARIFF_TYPE.WEEKDAY);
};

/**
 * @param {TariffSchedule} schedule
 * @return {boolean}
 */
export const isTimeConfigurable = (schedule) => {
  if (!schedule) {
    return false;
  }
  return schedule.data[0]?.days_and_hours[0]?.days[0] !== TARIFF_ALL_DAYS;
};

/**
 * @param {TariffSchedule} schedule
 * @return {boolean}
 */
export const isSeasonConfigurable = (schedule) => {
  if (!schedule) {
    return false;
  }
  return schedule?.data[0]?.months[0] !== TARIFF_ALL_MONTHS;
};

/**
 * @param {string[]} [days]
 * @return TariffScheduleDaysAndHours
 */
export const blankTariffScheduleDaysAndHours = (days = []) => {
  return {
    days: days,
    hours: [blankHoursTemplate()],
  };
};

/**
 * @param {Array<TariffMonth>} months
 * @return TariffScheduleDatum
 */
export const blankTariffScheduleDatum = (months = []) => {
  return {
    days_and_hours: [
      blankTariffScheduleDaysAndHours([TARIFF_WEEKDAYS]),
      blankTariffScheduleDaysAndHours([TARIFF_WEEKEND]),
    ],
    months: months.length ? months : [...TARIFF_MONTHS],
  };
};

/**
 * @return TariffSchedule
 */
export const blankWeekdaySchedule = () => {
  return {
    type: TARIFF_TYPE.WEEKDAY,
    data: [blankTariffScheduleDatum()],
  };
};

/**
 * @return Tariff
 */
export const blankTariff = () => {
  return {
    id: undefined,
    object: "tariff",
    display_name: "My tariff plan",
    product_id: undefined,
    timezone: undefined,
    time_created: undefined,
    time_expiry: undefined,
    import: [blankWeekdaySchedule()],
    export: undefined,
  };
};

export const tariffSlice = createSlice({
  name: "tariff",
  initialState: {
    plan: blankTariff(),
    provider: undefined,
    saved: false,
    preferences: {
      time: true,
      seasons: true,
    },
  },
  reducers: {
    resetTariff: (state, action) => {
      state.plan = blankTariff();
      state.provider = undefined;
      state.saved = false;
      state.preferences = {
        time: true,
        seasons: true,
      };
    },
    setDisplayName: (state, action) => {
      state.plan.display_name = action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setTariff: (state, action) => {
      state.plan = action.payload;
    },
    setExportEnabled: (state, action) => {
      const enabled = action.payload;
      if (!enabled) {
        state.plan.export = undefined;
      } else {
        state.plan.export = [blankWeekdaySchedule()];
      }
    },

    addPriceRange: (state, action) => {
      const { side, seasonIndex, daysIndex } = action.payload;

      let schedule = findWeekdaySchedule(state.plan[side]);

      if (!schedule) {
        return;
      }

      const dayPrices = schedule.data[seasonIndex]?.days_and_hours[daysIndex];

      if (!dayPrices) {
        return;
      }

      if (dayPrices.hours.length) {
        /** @type {TariffScheduleHours} */
        const prev = dayPrices.hours[dayPrices.hours.length - 1];
        dayPrices.hours.push(blankHoursTemplate(prev.valid_to));
        return;
      }

      dayPrices.hours.push(blankHoursTemplate());
    },

    removePriceRange: (state, action) => {
      const { side, priceIndex, seasonIndex, daysIndex } = action.payload;

      let schedule = findWeekdaySchedule(state.plan[side]);

      if (!schedule) {
        return;
      }

      const dayPrices = schedule.data[seasonIndex]?.days_and_hours[daysIndex];

      if (!dayPrices) {
        return;
      }

      dayPrices.hours.splice(priceIndex, 1);
    },

    setPrice: (state, action) => {
      const { side, price, seasonIndex, daysIndex, priceIndex } =
        action.payload;

      let schedule = findWeekdaySchedule(state.plan[side]);

      if (!schedule) {
        return;
      }

      const dayPrices = schedule.data[seasonIndex]?.days_and_hours[daysIndex];

      if (!dayPrices) {
        return;
      }

      dayPrices.hours[priceIndex] = price;
    },
    setSamePrices: (state, action) => {
      const { side, seasonIndex, daysIndex, weekdaysIndex } = action.payload;

      let schedule = findWeekdaySchedule(state.plan[side]);

      if (!schedule) {
        return;
      }

      const dayPrices = schedule.data[seasonIndex]?.days_and_hours[daysIndex];

      if (!dayPrices) {
        return;
      }

      const weekdaysPrices =
        schedule.data[seasonIndex]?.days_and_hours[weekdaysIndex];

      if (!weekdaysPrices) {
        return;
      }

      dayPrices.hours = weekdaysPrices.hours;
    },
    setSeasonRange: (state, action) => {
      const { index, value, type, side } = action.payload;
      if (index === -1) {
        return;
      }
      let schedule = findWeekdaySchedule(state.plan[side]);

      if (!schedule) {
        return;
      }

      const monthList = schedule.data[index]?.months;

      if (!monthList) {
        return;
      }

      const startMonth = type === "from" ? value : monthList[0];
      const endMonth =
        type === "to"
          ? value
          : monthList.length > 1
          ? monthList[monthList.length - 1]
          : "";

      let nextList = [];
      if (startMonth && endMonth) {
        const startMonthIndex = TARIFF_MONTHS.indexOf(startMonth);
        const endMonthIndex = TARIFF_MONTHS.indexOf(endMonth);
        if (endMonthIndex === startMonthIndex) {
          nextList = [startMonth, endMonth];
        } else if (endMonthIndex > startMonthIndex) {
          nextList = [
            ...TARIFF_MONTHS.slice(startMonthIndex, endMonthIndex + 1),
          ];
        } else {
          nextList = [
            ...TARIFF_MONTHS.slice(startMonthIndex, TARIFF_MONTHS.length - 1),
            ...TARIFF_MONTHS.slice(0, endMonthIndex + 1),
          ];
        }
      } else {
        nextList = [startMonth, endMonth];
      }

      schedule.data[index].months = nextList;
    },
    addSeasonRange: (state, action) => {
      const { side } = action.payload;
      let schedule = findWeekdaySchedule(state.plan[side]);

      if (!schedule) {
        return;
      }

      if (schedule.data.length) {
        /** @type {TariffScheduleDatum} */
        const prev = schedule.data[schedule.data.length - 1];
        if (prev.months.length) {
          const lastMonth = prev.months[prev.months.length - 1];
          if (lastMonth !== TARIFF_ALL_MONTHS) {
            const index = TARIFF_MONTHS.indexOf(lastMonth);
            if (index === TARIFF_MONTHS.length - 2) {
              const lastMonthOfYear = TARIFF_MONTHS[TARIFF_MONTHS.length - 1];
              schedule.data.push(
                blankTariffScheduleDatum([lastMonthOfYear, lastMonthOfYear])
              );
              return;
            }
            if (index > -1) {
              const months = TARIFF_MONTHS.slice(index + 1);
              if (months.length > 1) {
                schedule.data.push(blankTariffScheduleDatum(months));
                return;
              }
            }
          }
        }
      }
      schedule.data.push(blankTariffScheduleDatum());
    },
    removeSeasonRange: (state, action) => {
      const { index, side } = action.payload;

      if (index === -1) {
        return;
      }
      let schedule = findWeekdaySchedule(state.plan[side]);

      if (!schedule) {
        return;
      }

      if (index > -1 && index < schedule.data.length) {
        schedule.data.splice(index, 1);
      }
    },
    setTariffSaved: (state, action) => {
      state.saved = action.payload;
    },

    /** @param {App.TariffState} state */
    setStructure: (state, action) => {
      const { target, structure } = action.payload;

      /**
       * @type {TariffSchedule|null}
       */
      let schedule = findWeekdaySchedule(state.plan[target]);
      if (!schedule) {
        schedule = blankWeekdaySchedule();
        state.plan[target].push(schedule);
      }

      if (!structure.seasons) {
        schedule.data = schedule.data.filter(
          (datum) => datum.months[0] === TARIFF_ALL_MONTHS
        );
        if (schedule.data.length > 1) {
          schedule.data.splice(1, schedule.data.length - 1);
        }
        if (!schedule.data.length) {
          schedule.data = [blankTariffScheduleDatum()];
        }
        schedule.data[0].months = [TARIFF_ALL_MONTHS];
      } else {
        schedule.data.forEach((entry) => {
          entry.months = entry.months.filter((m) => m !== TARIFF_ALL_MONTHS);
          if (!entry.months.length) {
            entry.months = [...TARIFF_MONTHS];
          }
        });
      }

      if (!structure.time) {
        schedule.data.forEach((datum) => {
          if (datum.days_and_hours.length > 1) {
            datum.days_and_hours.splice(1, datum.days_and_hours.length - 1);
          }
          if (!datum.days_and_hours.length) {
            datum.days_and_hours = [blankTariffScheduleDaysAndHours()];
          }
          datum.days_and_hours[0].days = [TARIFF_ALL_DAYS];
          datum.days_and_hours[0].hours = [blankHoursTemplate()];
        });
      } else {
        schedule.data.forEach((datum) => {
          if (
            !datum.days_and_hours.length ||
            datum.days_and_hours[0]?.days[0] === TARIFF_ALL_DAYS
          ) {
            datum.days_and_hours = [
              blankTariffScheduleDaysAndHours([TARIFF_WEEKDAYS]),
              blankTariffScheduleDaysAndHours([TARIFF_WEEKEND]),
            ];
          }
        });
      }
    },
  },
});

export const {
  resetTariff,
  setDisplayName,
  setProvider,
  addPriceRange,
  removePriceRange,
  setPrice,
  setSamePrices,
  setSeasonRange,
  addSeasonRange,
  removeSeasonRange,
  setTariffSaved,
  setStructure,
  setTariff,
  setExportEnabled,
} = tariffSlice.actions;

export const saveManualTariff = (payload) => {
  return {
    type: Actions.saveManualTariff,
    payload: payload,
  };
};

export const saveConnectedTariff = (payload) => {
  return {
    type: Actions.saveConnectedTariff,
    payload: payload,
  };
};

export const selectDisplayName = (state) => state.tariff.plan.display_name;
export const selectPlan = (state) => state.tariff.plan;
export const selectProvider = (state) => state.tariff.provider;
export const selectSaved = (state) => state.tariff.saved;
export const selectPreferences = (state) => state.tariff.preferences;
export const selectExportEnabled = (state) => Boolean(state.tariff.plan.export);

export default tariffSlice.reducer;
