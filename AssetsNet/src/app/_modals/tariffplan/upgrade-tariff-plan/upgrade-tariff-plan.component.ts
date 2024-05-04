import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from 'src/app/_services/payment.service';
import { UpgradeTariffService } from 'src/app/_services/upgrade-tariff.service';
import { LiqpayResponse } from 'src/app/models/tariffPlan/liqpayResponse';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upgrade-tariff-plan',
  templateUrl: './upgrade-tariff-plan.component.html',
  styleUrls: ['./upgrade-tariff-plan.component.scss']
})
export class UpgradeTariffPlanComponent implements OnInit {

  tariffPlans = environment.tariffPlans;

  constructor(private dialogRef: MatDialog,
    private paymentService: PaymentService,
    private upgradeTariffService: UpgradeTariffService
  ) { }

  ngOnInit(): void {
  }

  closeWindow() {
    this.dialogRef.closeAll();
  }

  upgradeTariffPlan(tariffPlanId: number) {
    this.paymentService.getLiqpayRedirectUrl(tariffPlanId).subscribe({
      next: (response : LiqpayResponse) => {
        response.tariffPlan = tariffPlanId;
        this.upgradeTariffService.setOrderForUpgradeToLocalStorage(response);
        window.location.href = response.paymentUrl;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
