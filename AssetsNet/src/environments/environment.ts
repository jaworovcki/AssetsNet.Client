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
    new TariffPlan(0, "Стандарт", 0, "Отримайте безкоштовний доступ до нашого застосунку з 100Мб для збереження ваших улюблених фото та відео."),
    new TariffPlan(1, "Преміум", 100, "Максимізуйте свої можливості! З планом Преміум отримайте 200Мб лише за 100 гривень. Більше місця - більше вражень!"),
    new TariffPlan(2, "Голд", 300, "Оберіть Голд і отримайте абсолютний простір - 500Мб для зберігання вашого контенту. Зберігайте усі свої цінні спогади!"),
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
