import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BehaviorSubject, of} from 'rxjs';
import {ResultComponent} from './result/result.component';
import {BackendCounterGateway} from './shared/backend-counter-gateway';
import {count, CounterResult, toCent} from './shared/counter';


@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, ResultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'coin-counter';

  backendCounter: BackendCounterGateway = inject(BackendCounterGateway);

  ngOnInit() {
    registerLocaleData(localeDe, 'de', localeDeExtra);
  }


  currentValue = '-';
  currentResult: BehaviorSubject<CounterResult[]> = new BehaviorSubject([] as CounterResult[]);
  previousValue = '-';

  countForm = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.pattern('^(\\d+)(\\,\\d{1,2})?$'), Validators.maxLength(8)]),
    usesBackendCounter: new FormControl(false),
  })

  countCoins() {
    this.previousValue = this.currentValue;
    this.currentValue = this.countForm.value.amount ?? "";

    if (this.countForm.value.usesBackendCounter) {
      this.backendCounter.count(toCent(this.currentValue))
        .subscribe(result => this.currentResult.next(result));
    } else {
      of(count(toCent(this.currentValue)))
        .subscribe(result => this.currentResult.next(result));
    }
  }
}
