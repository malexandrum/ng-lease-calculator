import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string;
  leaseDate: Date;
  leaseDateString: string;
  leaseMonths: number;
  costPerMile: number;
  milesPerYear: number;
  currentMiles: number;
  daysPassed: number;
  currentMilesLimit: number;
  estimatedMilesEnd: number;
  estimatedExtraPayment: number;
  percentage: number;
  editContractMode: boolean;

  constructor() {
    this.title = 'Auto Lease Miles Calculator';

    if (this.getCookie('leaseDate')) {
      this.leaseDateString = this.getCookie('leaseDate');
      this.leaseDate = new Date(this.leaseDateString);
    }
    if (this.getCookie('leaseMonths')) {
      this.leaseMonths = +this.getCookie('leaseMonths');
    }
    if (this.getCookie('costPerMile')) {
      this.costPerMile = +this.getCookie('costPerMile');
    }
    if (this.getCookie('milesPerYear')) {
      this.milesPerYear = +this.getCookie('milesPerYear');
    }

    if (!this.leaseDate || !this.leaseMonths || !this.leaseMonths || !this.costPerMile || !this.milesPerYear) {
      this.editContractMode = true;
    }
    else {
      this.editContractMode = false;
    }

  }
  onChange(): void {
    const thisMoment: Date = new Date();
    this.leaseDate = new Date(this.leaseDateString);

    this.daysPassed = (+thisMoment - +this.leaseDate) / 1000 / 60 / 60 / 24;
    this.currentMilesLimit = this.daysPassed * this.milesPerYear / 365;
    this.estimatedMilesEnd = (this.leaseMonths * 30) * this.currentMiles / this.daysPassed;
    this.estimatedExtraPayment = (this.estimatedMilesEnd - this.milesPerYear * (this.leaseMonths / 12)) * this.costPerMile;
    this.percentage = this.currentMiles / this.currentMilesLimit;

    this.setCookie('leaseDate', this.leaseDateString ? this.leaseDateString : '', 1825);
    this.setCookie('leaseMonths', this.leaseMonths ? this.leaseMonths.toString() : '', 1825);
    this.setCookie('costPerMile', this.costPerMile ? this.costPerMile.toString() : '', 1825);
    this.setCookie('milesPerYear', this.milesPerYear ? this.milesPerYear.toString() : '', 1825);        

  }
  editContract(): void {
    this.editContractMode = true;
  }
  saveContract(): void {
    if (this.leaseDate && this.leaseMonths && this.costPerMile && this.milesPerYear) {
      this.editContractMode = false;
    }
  }
  setCookie(name: string, value: string, daysValid: number): void {
    let c = name + '=' + value;
    if (daysValid > 0) {
      c += ';expires=' + new Date(+(new Date()) + daysValid * 24 * 60 * 60 * 1000);
    }
    document.cookie = c;
  }
  getCookie(name: string): string {
    const pairs = document.cookie.split(';');
    for (const pair of pairs) {
      const n = pair.trim().split('=');
      if (n[0] === name) {
        return n[1];
      }
    }
    return null;
  }
}
