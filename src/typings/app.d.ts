import { FlatPeak } from "@flat-peak/javascript-sdk";

export namespace App {
  import Tariff = FlatPeak.Tariff;
  import Provider = FlatPeak.Provider;
  import PostalAddress = FlatPeak.PostalAddress;

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

  export interface TariffState {
    plan: Tariff;
    provider: Provider;
    title: string;
    preferences: {
      time: true;
      seasons: true;
    };
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
