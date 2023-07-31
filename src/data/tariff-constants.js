export const EPeakType = {
  MID: 1,
  OFF: 2,
  PEAK: 3,
};

/**
 * @type {Array<App.TariffMonth>}
 */
export const TARIFF_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * @type {Array<string>}
 */
export const TARIFF_MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * @type {Array<App.TariffDay>}
 */
export const TARIFF_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** @type {App.TariffDay} */
export const TARIFF_ALL_DAYS = "All";

/** @type {App.TariffDay} */
export const TARIFF_WEEKDAYS = "Weekdays";

/** @type {App.TariffDay} */
export const TARIFF_WEEKEND = "Weekend";

/** @type {App.TariffMonth} */
export const TARIFF_ALL_MONTHS = "All";

export const TARIFF_SIDE = {
  EXPORT: "export",
  IMPORT: "import",
};

/**
 * @type {{[key:string]: App.TariffType}}
 */
export const TARIFF_TYPE = {
  WEEKDAY: "weekday",
};

export const resolveMonthLabelByKey = (key) => {
  let index = TARIFF_MONTHS.indexOf(key);

  if (index === -1) {
    return "";
  }
  return TARIFF_MONTH_LABELS[index];
};

export const resolveMonthKeyByLabel = (key) => {
  let index = TARIFF_MONTH_LABELS.indexOf(key);

  if (index === -1) {
    return "";
  }
  return TARIFF_MONTHS[index];
};

export const TIMEZONES = [
  "Pacific/Pago_Pago",
  "Pacific/Honolulu",
  "America/Los_Angeles",
  "America/Tijuana",
  "America/Denver",
  "America/Phoenix",
  "America/Mazatlan",
  "America/Chicago",
  "America/Mexico_City",
  "America/Regina",
  "America/Guatemala",
  "America/Bogota",
  "America/New_York",
  "America/Lima",
  "America/Caracas",
  "America/Halifax",
  "America/Guyana",
  "America/La_Paz",
  "America/Argentina/Buenos_Aires",
  "America/Godthab",
  "America/Montevideo",
  "America/St_Johns",
  "America/Santiago",
  "America/Sao_Paulo",
  "Atlantic/South_Georgia",
  "Atlantic/Azores",
  "Atlantic/Cape_Verde",
  "Africa/Casablanca",
  "Europe/Dublin",
  "Europe/Lisbon",
  "Europe/London",
  "Africa/Monrovia",
  "Africa/Algiers",
  "Europe/Amsterdam",
  "Europe/Berlin",
  "Europe/Brussels",
  "Europe/Budapest",
  "Europe/Belgrade",
  "Europe/Prague",
  "Europe/Copenhagen",
  "Europe/Madrid",
  "Europe/Paris",
  "Europe/Rome",
  "Europe/Stockholm",
  "Europe/Vienna",
  "Europe/Warsaw",
  "Europe/Athens",
  "Europe/Bucharest",
  "Africa/Cairo",
  "Asia/Jerusalem",
  "Africa/Johannesburg",
  "Europe/Helsinki",
  "Europe/Kiev",
  "Europe/Kaliningrad",
  "Europe/Riga",
  "Europe/Sofia",
  "Europe/Tallinn",
  "Europe/Vilnius",
  "Europe/Istanbul",
  "Asia/Baghdad",
  "Africa/Nairobi",
  "Europe/Minsk",
  "Asia/Riyadh",
  "Europe/Moscow",
  "Asia/Tehran",
  "Asia/Baku",
  "Europe/Samara",
  "Asia/Tbilisi",
  "Asia/Yerevan",
  "Asia/Kabul",
  "Asia/Karachi",
  "Asia/Yekaterinburg",
  "Asia/Tashkent",
  "Asia/Colombo",
  "Asia/Almaty",
  "Asia/Dhaka",
  "Asia/Rangoon",
  "Asia/Bangkok",
  "Asia/Jakarta",
  "Asia/Krasnoyarsk",
  "Asia/Shanghai",
  "Asia/Hong_Kong",
  "Asia/Kuala_Lumpur",
  "Asia/Irkutsk",
  "Asia/Singapore",
  "Asia/Taipei",
  "Asia/Ulaanbaatar",
  "Australia/Perth",
  "Asia/Yakutsk",
  "Asia/Seoul",
  "Asia/Tokyo",
  "Australia/Darwin",
  "Australia/Brisbane",
  "Pacific/Guam",
  "Asia/Magadan",
  "Asia/Vladivostok",
  "Pacific/Port_Moresby",
  "Australia/Adelaide",
  "Australia/Hobart",
  "Australia/Sydney",
  "Pacific/Guadalcanal",
  "Pacific/Noumea",
  "Pacific/Majuro",
  "Asia/Kamchatka",
  "Pacific/Auckland",
  "Pacific/Fakaofo",
  "Pacific/Fiji",
  "Pacific/Tongatapu",
  "Pacific/Apia",
];

export const COUNTRY_CODES = {
  AQ: "Antarctica",
  AU: "Australia",
  AT: "Austria",
  BE: "Belgium",
  BG: "Bulgaria",
  CA: "Canada",
  HR: "Croatia",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  EE: "Estonia",
  FI: "Finland",
  FR: "France",
  DE: "Germany",
  GR: "Greece",
  HU: "Hungary",
  IE: "Ireland",
  IT: "Italy",
  LV: "Latvia",
  LT: "Lithuania",
  LU: "Luxembourg",
  NL: "Netherlands",
  NO: "Norway",
  PL: "Poland",
  PT: "Portugal",
  RO: "Romania",
  ES: "Spain",
  SE: "Sweden",
  CH: "Switzerland",
  GB: "United Kingdom",
  US: "United States",
};
