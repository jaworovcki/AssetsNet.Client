// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { TariffPlan } from "src/app/models/tariffPlan/tariffPlan";

export const environment = {
  production: false,
  baseUrl: 'https://localhost:7002/api/',
  hubUrl: 'https://localhost:7002/hubs/',
  eodhdApiUrl:"https://eodhd.com/api/",
  eohdApiToken:"660af0f7449555.28199836",
  clientId: '491184798714-ahvlhl23coq1l5sgk7cg75ta48aqdclr.apps.googleusercontent.com',
  tariffPlans: [
    new TariffPlan(0, "Default", 0, "Get 3 free requests to try our service. Upgrade your plan to get more information about the stock market."),
    new TariffPlan(1, "Basic", 144.30, "Enhance your possibilities with basic features. Get 100 requests to be sure you have enough for your needs."),
    new TariffPlan(2, "Premium", 384.90, "Choose premium plan to get 1000 requests for better experience with researching the stock market."),
  ] as TariffPlan[],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
