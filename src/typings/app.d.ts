/** @typedef { import("@flat-peak/javascript-sdk").FlatPeak } FlatPeak */
/** @typedef { import("@flat-peak/javascript-sdk").Tariff } Tariff */
/** @typedef { import("@flat-peak/javascript-sdk").TariffSchedule } TariffSchedule */
/** @typedef { import("@flat-peak/javascript-sdk").TariffScheduleDatum } TariffScheduleDatum */
/** @typedef { import("@flat-peak/javascript-sdk").TariffDaysAndHours } TariffDaysAndHours */
/** @typedef { import("@flat-peak/javascript-sdk").TariffHour } TariffHour */
import { PostalAddress, Provider, Tariff } from "@flat-peak/javascript-sdk";

export namespace App {
  export interface PeakDetail {
    type: PeakType;
    timeFrom: string;
  }

  export enum PeakType {
    MID = 1,
    OFF = 2,
    PEAK = 3,
  }

  export type TariffType = "weekday";
  export type TariffMonth =
    | "Jan"
    | "Feb"
    | "Mar"
    | "Apr"
    | "May"
    | "Jun"
    | "Jul"
    | "Aug"
    | "Sep"
    | "Oct"
    | "Nov"
    | "Dec"
    | "All";

  export type TariffDay =
    | "Mon"
    | "Tue"
    | "Wed"
    | "Thu"
    | "Fri"
    | "Sat"
    | "Sun"
    | "All"
    | "Weekdays"
    | "Weekend";

  export interface TariffDataStructure {
    time: boolean;
    days: boolean;
    months: boolean;
  }

  export interface TariffState {
    plan: Tariff;
    provider: Provider;
    title: string;
    structure: TariffDataStructure;
    saved: boolean;
  }

  export interface InputState {
    macAddress: string;
    customerId: string;
    productId: string;
    deviceId: string;
    timezone: string;
    postalAddress: PostalAddress;
  }
  export interface OutputState {
    device_id: string;
    customer_id: string;
    product_id: string;
    tariff_id: string;
    confirmed: boolean;
  }
}
