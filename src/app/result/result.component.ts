import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject, Observable, of, pairwise, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
import {CounterResult} from '../shared/counter';
import {calculateDiff, DiffResult} from './result-diff';

@Component({
  selector: 'counter-result-table',
  imports: [MatTableModule, CurrencyPipe, AsyncPipe],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  @Input()
  currentResult!: BehaviorSubject<CounterResult[]>;

  diffResult: Observable<DiffResult[]> = of([]);

  ngOnInit() {
    this.diffResult = this.currentResult.pipe(
      startWith([] as CounterResult[]),
      pairwise(),
      map(([previous, current]) => calculateDiff(current, previous))
    );
  }

  displayedColumns: string[] = ['type', 'count'];
}
