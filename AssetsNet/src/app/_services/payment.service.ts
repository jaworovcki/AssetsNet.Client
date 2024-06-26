import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LiqpayResponse } from '../models/tariffPlan/liqpayResponse';
import { PaymentState } from '../models/tariffPlan/paymentState';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getLiqpayRedirectUrl(tariffPlan: number) {
    return this.httpClient.post<LiqpayResponse>(
        `${this.baseUrl}payment/liqpay-url?tariffPlan=${tariffPlan}`,
        {}
    );
  }

  getSessionState(orderId: string) {
    return this.httpClient.get<PaymentState>(this.baseUrl + 'payment/liqpay-state/' + orderId);
  }
}
