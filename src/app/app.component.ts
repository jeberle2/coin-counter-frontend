import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { CounterComponent } from '../counter/counter.component';
import { BackendCounter } from './shared/backendCounter';
import { calculate, CounterResult, toCent } from './shared/calculator';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my-app';

  backendCounter: BackendCounter = inject(BackendCounter);

  ngOnInit() {
    registerLocaleData(localeDe, 'de', localeDeExtra);
  }


  currentValue = '-';
  currentResult: BehaviorSubject<CounterResult[]> = new BehaviorSubject([] as CounterResult[]);
  previousValue = '-';

  zaehlForm = new FormGroup({
    betrag: new FormControl('', [Validators.required, Validators.pattern('^(\\d+)(\\,\\d{1,2})?$')]),
    usesBackendCalculation: new FormControl(false),
  })

  zaehlen() {
    this.previousValue = this.currentValue;
    this.currentValue = this.zaehlForm.value.betrag ?? "";
    
    if (this.zaehlForm.value.usesBackendCalculation) {
      this.backendCounter.count(toCent(this.currentValue))
        .subscribe(result => this.currentResult.next(result));
    } else {
      of(calculate(toCent(this.currentValue)))
        .subscribe(result => this.currentResult.next(result));
    }
  }
}
