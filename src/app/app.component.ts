import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';

import { LEASEMONTHSOPTIONS } from './lease-months-options';
import { COST_PER_MILE_OPTIONS } from './cost-per-mile-options';
import { MILESPERYEAROPTIONS } from './miles-per-year-options'

import 'intl';
import 'intl/locale-data/jsonp/en';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string;
  leaseDate: Date;
  leaseDateString: string;
  leaseMonths: number;
  costPerMile: number;
  milesPerYear: number;
  currentMiles: number;
  currentMilesLimit: number;
  daysPassed: number;
  milesPerDay: number;
  daysToPause: number;
  estimatedMilesEnd: number;
  estimatedExtraPayment: number;
  percentage: number;
  editContractMode: boolean;
  ck: string;
  odometerStyles: {};
  // lmos = LEASEMONTHSOPTIONS;
  // costPerMileOptions = COST_PER_MILE_OPTIONS;
  // milesPerYearOptions = MILESPERYEAROPTIONS;
  // public lmos2: Array<Select2OptionData>;
  // public costPerMileOptions: Array<Select2OptionData>;
  // public milesPerYearOptions: Array<Select2OptionData>;
  public lmos2: Array<Object>;

  constructor() {
    this.title = 'Auto Lease Miles Calculator';
    this.ck = document.cookie;

    if (this.getCookie('leaseDate')) {
      this.leaseDateString = this.getCookie('leaseDate');
      this.leaseDate = new Date(this.leaseDateString);
      this.daysPassed = (+(new Date()) - +this.leaseDate) / 1000 / 60 / 60 / 24;
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

    if (!this.leaseDate || !this.leaseMonths || !this.costPerMile || !this.milesPerYear) {
      this.editContractMode = true;
    }
    else {
      this.editContractMode = false;
    }

    if (this.leaseDate && this.milesPerYear) {
      this.currentMilesLimit = this.daysPassed / 365 * this.milesPerYear;
    }


  }
  onChange(): void {
    const thisMoment: Date = new Date();
    if (this.leaseDateString) {
      this.leaseDate = new Date(this.leaseDateString);
      this.daysPassed = (+(new Date()) - +this.leaseDate) / 1000 / 60 / 60 / 24;
    }
    else {
      return;
    }

    this.ck = document.cookie;

    this.daysPassed = (+thisMoment - +this.leaseDate) / 1000 / 60 / 60 / 24;
    if (this.milesPerYear) {
      this.currentMilesLimit = this.daysPassed * this.milesPerYear / 365;
    }
    if (this.leaseMonths && this.costPerMile) {
      this.estimatedMilesEnd = (this.leaseMonths * 30.4) * this.currentMiles / this.daysPassed;
      this.estimatedExtraPayment = (this.estimatedMilesEnd - this.milesPerYear * (this.leaseMonths / 12)) * this.costPerMile;
    }
    if (this.currentMiles) {
      this.percentage = this.currentMiles / this.currentMilesLimit;
      this.milesPerDay = this.currentMiles / this.daysPassed;
      if (this.percentage > 1) {
        // this.daysToPause = this.leaseMonths * 30 - this.daysPassed - ()
        this.daysToPause = (this.estimatedMilesEnd - this.milesPerYear * this.leaseMonths / 12) / this.milesPerDay;
      }
    }


    if (typeof this.leaseDateString != 'undefined') { this.setCookie('leaseDate', this.leaseDateString ? this.leaseDateString : '', 1825); }
    if (typeof this.leaseMonths != 'undefined') { this.setCookie('leaseMonths', this.leaseMonths ? this.leaseMonths.toString() : '', 1825); }
    if (typeof this.costPerMile != 'undefined') { this.setCookie('costPerMile', this.costPerMile ? this.costPerMile.toString() : '', 1825); }
    if (typeof this.milesPerYear != 'undefined') { this.setCookie('milesPerYear', this.milesPerYear ? this.milesPerYear.toString() : '', 1825); }

  }
  increaseCurrentMiles(miles:number): void {
    if (!this.currentMiles) {
      this.currentMiles = Math.round(this.currentMilesLimit / miles) * miles;
    }
    this.currentMiles += miles;
    this.onChange();
  }
  decreaseCurrentMiles(miles: number): void {
    if (!this.currentMiles) {
      this.currentMiles = Math.round(this.currentMilesLimit / miles) * miles;
    }
    this.currentMiles -= miles;
    this.onChange();
  }
  editContract(): void {
    this.editContractMode = true;
  }
  saveContract(): void {
    if (this.leaseDate && this.leaseMonths && this.costPerMile && this.milesPerYear) {
      this.editContractMode = false;
    }
  }
  resetContract(): void {
    if (confirm('Are you sure want to reset the contract?')) {
      this.leaseDateString = '';
      this.leaseMonths = null;
      this.costPerMile = null;
      this.milesPerYear = null;
      this.onChange();
    }
  }
  setCookie(name: string, value: string, daysValid: number): void {
    let c = name + '=' + value;
    if (daysValid > 0) {
      c += ';expires=' + (new Date(+(new Date()) + daysValid * 24 * 60 * 60 * 1000)).toUTCString();
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

  ngOnInit() {
    this.lmos2 = [
      {
        id: '12',
        text: '12 months'
      },
      {
        id: '24',
        text: '24 months'
      },
      {
        id: '36',
        text: '36 months'
      },
      {
        id: '39',
        text: '39 months'
      }
    ]
  }


}

