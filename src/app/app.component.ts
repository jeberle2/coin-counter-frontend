import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, PatternValidator } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { calculate, CounterResult } from './calculator';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';

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
    this.currentResult = calculate(this.currentValue)
  }
}
