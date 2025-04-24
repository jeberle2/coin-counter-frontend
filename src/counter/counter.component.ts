import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { calculateDiff, CounterResult } from '../app/calculator';

@Component({
  selector: 'counter-result-table',
  imports: [MatTableModule, CurrencyPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnChanges {
  @Input()
  currentResult: CounterResult[] = [];
  @Input()
  previousResult: CounterResult[] = [];

  diffResult: CounterResult[] = [];

  ngOnChanges() {
    if (this.previousResult.length > 0) {
      this.diffResult = calculateDiff(this.currentResult, this.previousResult)
    }
  }

  displayedColumns: string[] = ['type', 'count'];
}
