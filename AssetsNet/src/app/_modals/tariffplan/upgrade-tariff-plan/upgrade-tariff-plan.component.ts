import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upgrade-tariff-plan',
  templateUrl: './upgrade-tariff-plan.component.html',
  styleUrls: ['./upgrade-tariff-plan.component.scss']
})
export class UpgradeTariffPlanComponent implements OnInit {

  tariffPlans = environment.tariffPlans;

  constructor(private dialogRef: MatDialog,) { }

  ngOnInit(): void {
  }

  closeWindow() {
    this.dialogRef.closeAll();
  }

}
