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
  AL: "Albania",
  AD: "Andorra",
  AQ: "Antarctica",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BE: "Belgium",
  BA: "Bosnia and Herzegovina",
  BR: "Brazil",
  BG: "Bulgaria",
  CA: "Canada",
  CL: "Chile",
  CN: "China",
  CO: "Colombia",
  HR: "Croatia",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  EC: "Ecuador",
  EG: "Egypt",
  EE: "Estonia",
  ET: "Ethiopia",
  FI: "Finland",
  FR: "France",
  DE: "Germany",
  GR: "Greece",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IE: "Ireland",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  KR: "South Korea",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MK: "Macedonia",
  MY: "Malaysia",
  MT: "Malta",
  MX: "Mexico",
  MD: "Moldova",
  MC: "Monaco",
  MA: "Morocco",
  NL: "Netherlands",
  NZ: "New Zealand",
  NO: "Norway",
  PK: "Pakistan",
  PH: "Philippines",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  RO: "Romania",
  SM: "San Marino",
  SA: "Saudi Arabia",
  RS: "Serbia",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  ZA: "South Africa",
  ES: "Spain",
  LK: "Sri Lanka",
  SE: "Sweden",
  CH: "Switzerland",
  TW: "Taiwan",
  TH: "Thailand",
  TR: "Turkey",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UY: "Uruguay",
  VN: "Vietnam",
};
