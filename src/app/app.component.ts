import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from '../counter/counter.component';
import { calculate, CounterResult } from './calculator';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my-app';

  ngOnInit() {
    registerLocaleData(localeDe, 'de', localeDeExtra);
  }


  currentValue = '-';
  currentResult: CounterResult[] = [];
  previousValue = '-';
  previousResult: CounterResult[] = [];

  zaehlForm = new FormGroup({
    betrag: new FormControl('', [Validators.required, Validators.pattern('^-?(\\d+)(\\,\\d{1,2})?$')]),
    usesBackendCalculation: new FormControl(false),
  })

  zaehlen() {
    this.previousValue = this.currentValue;
    this.currentValue = this.zaehlForm.value.betrag ?? "";
    this.previousResult = this.currentResult
    this.currentResult = calculate(this.currentValue)
  }
}
