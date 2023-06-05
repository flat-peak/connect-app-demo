import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  resolveMonthLabelByKey,
  TARIFF_ALL_DAYS,
  TARIFF_ALL_MONTHS,
  TARIFF_DAYS,
  TARIFF_MONTH_LABELS,
  TARIFF_MONTHS,
  TARIFF_TYPE,
  TARIFF_WEEKDAYS,
  TARIFF_WEEKEND,
} from "../../data/tariff-constants";
import { startDeveloperFlow, startSimpleFlow } from "./contextReducer";
import { withProgressMiddleware } from "./progressIndicatorReducer";
import { service, throwOnApiError } from "../../service/flatpeak.service";
import { isEqualObjects } from "../../global/common";

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
export const isWeekdayConfigurable = (schedule) => {
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

export const getStartDayOfRange = (days) => {
  if (!days.length) {
    return null;
  }
  switch (days[0]) {
    case TARIFF_WEEKDAYS:
    case TARIFF_ALL_DAYS:
      return TARIFF_DAYS[0];
    case TARIFF_WEEKEND:
      return TARIFF_DAYS[5];
    default:
      return days[0];
  }
};

export const getEndDayOfRange = (days) => {
  if (!days.length) {
    return null;
  }
  switch (days[0]) {
    case TARIFF_WEEKEND:
    case TARIFF_ALL_DAYS:
      return TARIFF_DAYS[6];
    case TARIFF_WEEKDAYS:
      return TARIFF_DAYS[4];
    default:
      return days[days.length - 1];
  }
};

export const getStartMonthOfRange = (months) => {
  return months[0] === TARIFF_ALL_MONTHS ? TARIFF_MONTHS[0] : months[0];
};
export const getEndMonthOfRange = (months) => {
  return months[0] === TARIFF_ALL_MONTHS
    ? TARIFF_MONTHS[11]
    : months[months.length - 1];
};
function isSameWeekDays(daysAndHours, index) {
  if (!daysAndHours[index] || !daysAndHours[index + 1]) {
    return false;
  }

  if (
    daysAndHours[index].days[0] === TARIFF_WEEKDAYS &&
    daysAndHours[index + 1].days[0] === TARIFF_WEEKEND
  ) {
    return isEqualObjects(
      daysAndHours[index].hours,
      daysAndHours[index + 1].hours
    );
  }

  return false;
}
/**
 * @param {string[]} [days]
 * @param {TariffDataStructure} structure
 * @return TariffScheduleDaysAndHours
 */
export const blankTariffScheduleDaysAndHours = (days = [], structure) => {
  return {
    days: days,
    hours: [blankHoursTemplate()],
  };
};

/**
 * @param {Array<TariffMonth>} months
 * @param {TariffDataStructure} structure
 * @return TariffScheduleDatum
 */
export const blankTariffScheduleDatum = (months = [], structure) => {
  return {
    days_and_hours: structure.days
      ? [
          blankTariffScheduleDaysAndHours([TARIFF_WEEKDAYS], structure),
          blankTariffScheduleDaysAndHours([TARIFF_WEEKEND], structure),
        ]
      : [blankTariffScheduleDaysAndHours([TARIFF_ALL_DAYS], structure)],
    months: months.length
      ? months
      : structure.months
      ? [...TARIFF_MONTHS]
      : [TARIFF_ALL_MONTHS],
  };
};

/**
 * @param {TariffDataStructure} structure
 * @return TariffSchedule
 */
export const blankWeekdaySchedule = (structure) => {
  return {
    type: TARIFF_TYPE.WEEKDAY,
    data: [blankTariffScheduleDatum([], structure)],
  };
};

/**
 * @param {TariffDataStructure} structure
 * @return Tariff
 */
export const blankTariff = (structure) => {
  return {
    id: undefined,
    object: "tariff",
    display_name: "My tariff plan",
    product_id: undefined,
    timezone: undefined,
    time_created: undefined,
    time_expiry: undefined,
    import: [blankWeekdaySchedule(structure)],
    export: undefined,
  };
};

const handleResetTariff = (state, action) => {
  const structure = {
    time: true,
    hours: false,
    months: false,
  };

  state.plan = blankTariff(structure);
  state.provider = undefined;
  state.saved = false;
  state.structure = structure;
};

export const saveManualTariff = createAsyncThunk(
  "tariff/saveManual",
  withProgressMiddleware(async (args, thunkAPI) => {
    let {
      /** @type {App.TariffState} */ tariff: {
        provider: { id: providerId },
        plan: tariffPlan,
      },
      inputData: { macAddress, timezone, postalAddress, productId, customerId },
    } = thunkAPI.getState();

    return await service.saveManualTariff({
      macAddress,
      timezone,
      postalAddress,
      productId,
      customerId,
      providerId,
      tariffPlan,
    });
  })
);

export const connectTariff = createAsyncThunk(
  "tariff/connect",
  withProgressMiddleware(
    async ({ customer_id, product_id, tariff_id }, thunkAPI) => {
      const [customer, product, tariff] = await Promise.all([
        service.getCustomer(customer_id).then((obj) => throwOnApiError(obj)),
        service.getProduct(product_id).then((obj) => throwOnApiError(obj)),
        service.getTariff(tariff_id).then((obj) => throwOnApiError(obj)),
      ]);
      return {
        customer,
        product,
        tariff,
      };
    }
  )
);

export const saveConnectedTariff = createAsyncThunk(
  "tariff/saveConnected",
  withProgressMiddleware(async (args, thunkAPI) => {
    let {
      /** @type {App.TariffState} */ tariff: {
        provider: { id: providerId },
        plan: tariffPlan,
      },
      inputData: { macAddress, timezone, postalAddress, productId, customerId },
    } = thunkAPI.getState();

    return await service.saveConnectedTariff({
      macAddress,
      timezone,
      postalAddress,
      productId,
      customerId,
      providerId,
      tariffPlan,
    });
  })
);

export const tariffSlice = createSlice({
  name: "tariff",
  initialState: {
    plan: blankTariff({
      time: true,
      hours: false,
      months: false,
    }),
    provider: undefined,
    saved: false,
    structure: {
      time: true,
      hours: false,
      months: false,
    },
  },
  reducers: {
    resetTariff: handleResetTariff,
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
        state.plan.export = [blankWeekdaySchedule(state.structure)];
      }
    },

    addPriceRange: (state, action) => {
      const { side, seasonIndex, daysIndex } = action.payload;

      let schedule = findWeekdaySchedule(state.plan[side]);

      if (!schedule) {
        return;
      }

      const daysCollection = schedule.data[seasonIndex]?.days_and_hours;
      const dayPrices = daysCollection[daysIndex];

      if (!dayPrices) {
        return;
      }

      const sameWeekdays = isSameWeekDays(daysCollection, daysIndex);

      if (dayPrices.hours.length) {
        /** @type {TariffScheduleHours} */
        const prev = dayPrices.hours[dayPrices.hours.length - 1];
        const template = blankHoursTemplate(prev.valid_to);
        dayPrices.hours.push(template);
        if (sameWeekdays) {
          daysCollection[daysIndex + 1].hours.push(template);
        }
        return;
      }

      const template = blankHoursTemplate();
      dayPrices.hours.push(template);
      if (sameWeekdays) {
        daysCollection[daysIndex + 1].hours.push(template);
      }
    },

    removePriceRange: (state, action) => {
      const { side, priceIndex, seasonIndex, daysIndex } = action.payload;

      let schedule = findWeekdaySchedule(state.plan[side]);

      if (!schedule) {
        return;
      }

      const daysCollection = schedule.data[seasonIndex]?.days_and_hours;
      const dayPrices = daysCollection[daysIndex];

      if (!dayPrices) {
        return;
      }

      if (isSameWeekDays(daysCollection, daysIndex)) {
        daysCollection[daysIndex + 1].hours.splice(priceIndex, 1);
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

      const daysCollection = schedule.data[seasonIndex]?.days_and_hours;
      const dayPrices = daysCollection[daysIndex];

      if (!dayPrices) {
        return;
      }

      if (isSameWeekDays(daysCollection, daysIndex)) {
        daysCollection[daysIndex + 1].hours[priceIndex] = price;
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
                blankTariffScheduleDatum(
                  [lastMonthOfYear, lastMonthOfYear],
                  state.structure
                )
              );
              return;
            }
            if (index > -1) {
              const months = TARIFF_MONTHS.slice(index + 1);
              if (months.length > 1) {
                schedule.data.push(
                  blankTariffScheduleDatum(months, state.structure)
                );
                return;
              }
            }
          }
        }
      }
      schedule.data.push(blankTariffScheduleDatum([], state.structure));
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

      state.structure = structure;
      /**
       * @type {TariffSchedule|null}
       */
      let schedule = findWeekdaySchedule(state.plan[target]);
      if (!schedule) {
        schedule = blankWeekdaySchedule(structure);
        state.plan[target].push(schedule);
      }

      if (!structure.months) {
        schedule.data = schedule.data.filter(
          (datum) => datum.months[0] === TARIFF_ALL_MONTHS
        );
        if (schedule.data.length > 1) {
          schedule.data.splice(1, schedule.data.length - 1);
        } else if (!schedule.data.length) {
          schedule.data = [
            blankTariffScheduleDatum([TARIFF_ALL_MONTHS], structure),
          ];
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

      if (!structure.days) {
        schedule.data.forEach((datum) => {
          if (datum.days_and_hours.length > 1) {
            datum.days_and_hours.splice(1, datum.days_and_hours.length - 1);
          }
          if (!datum.days_and_hours.length) {
            datum.days_and_hours = [
              blankTariffScheduleDaysAndHours([], structure),
            ];
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
              blankTariffScheduleDaysAndHours([TARIFF_WEEKDAYS], structure),
              blankTariffScheduleDaysAndHours([TARIFF_WEEKEND], structure),
            ];
          }
        });
      }

      if (!structure.hours) {
        schedule.data.forEach((datum) => {
          datum.days_and_hours.forEach((entry) => {
            // reset ?
          });
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startSimpleFlow.fulfilled, handleResetTariff)
      .addCase(startDeveloperFlow.fulfilled, handleResetTariff)
      .addCase(connectTariff.fulfilled, (state, action) => {
        state.plan = action.payload.tariff;
      })
      .addCase(saveManualTariff.fulfilled, (state, action) => {
        state.saved = true;
      })
      .addCase(saveConnectedTariff.fulfilled, (state, action) => {
        state.saved = true;
      });
  },
});

export const {
  setDisplayName,
  setProvider,
  addPriceRange,
  removePriceRange,
  setPrice,
  setSamePrices,
  setSeasonRange,
  addSeasonRange,
  removeSeasonRange,
  setStructure,
  setTariff,
  setExportEnabled,
} = tariffSlice.actions;

export const selectDisplayName = (state) => state.tariff.plan.display_name;
export const selectPlan = (state) => state.tariff.plan;
export const selectProvider = (state) => state.tariff?.provider;
export const selectSaved = (state) => state.tariff.saved;
export const selectStructure = (state) => state.tariff.structure;
export const selectExportEnabled = (state) => Boolean(state.tariff.plan.export);

export default tariffSlice.reducer;
