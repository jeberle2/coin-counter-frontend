import { Component, Input } from '@angular/core';
import { CounterResult } from '../app/calculator';

@Component({
  selector: 'counter-result-table',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input()
  currentResult:CounterResult[] = [];

}
