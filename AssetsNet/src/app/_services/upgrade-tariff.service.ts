import { Injectable } from '@angular/core';
import { LiqpayResponse } from '../models/tariffPlan/liqpayResponse';
import { UpgradeTariffRequest } from '../models/tariffPlan/upgradeTariffRequest';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpgradeTariffService {

  private pendingOrderForUpgradeStorageKey = 'pendingOrderForUpgrade';

  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  setOrderForUpgradeToLocalStorage(order: LiqpayResponse) {
    let orderForUpgrade = JSON.stringify(order);
    localStorage.setItem(this.pendingOrderForUpgradeStorageKey, orderForUpgrade);
  }

  getOrderForUpgradeFromLocalStorage(): LiqpayResponse {
    let orderForUpgrade = localStorage.getItem(this.pendingOrderForUpgradeStorageKey);
    return JSON.parse(orderForUpgrade!);
  }

  removeOrderForUpgradeFromLocalStorage() {
    localStorage.removeItem(this.pendingOrderForUpgradeStorageKey);
  }

  upgradeTariffPlan(tariffPlanUpgrade: UpgradeTariffRequest) {
    return this.httpClient.put(`${this.baseUrl}users/update-user-requests-limit`, tariffPlanUpgrade);
  }
}
