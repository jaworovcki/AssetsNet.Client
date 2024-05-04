import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LiqpayResponse } from '../models/tariffPlan/liqpayResponse';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getLiqpayRedirectUrl(tariffPlan: number) {
    let params = new HttpParams().set('tariffPlan', tariffPlan);
    return this.httpClient.post<LiqpayResponse>(this.baseUrl + 'payment/liqpay-url', { params: params });
  }
}
