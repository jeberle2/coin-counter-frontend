import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject, Observable, of, pairwise, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { calculateDiff, CounterResult } from '../app/shared/calculator';

@Component({
  selector: 'counter-result-table',
  imports: [MatTableModule, CurrencyPipe, AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnInit {
  @Input()
  currentResult!: BehaviorSubject<CounterResult[]>;

  diffResult: Observable<CounterResult[]> = of([]);

  ngOnInit() {
    this.diffResult = this.currentResult.pipe(
      startWith([] as CounterResult[]),
      pairwise(),
      map(([previous, current]) => calculateDiff(current, previous))
    );
  }

  displayedColumns: string[] = ['type', 'count'];
}
