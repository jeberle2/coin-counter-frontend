import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BackendCounterGateway} from './shared/backend-counter-gateway';
import { of } from 'rxjs';

describe('AppComponent', () => {

  const mockBackendCounterGateway = jasmine.createSpyObj('BackendCounterGateway', ['count']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: BackendCounterGateway, useValue: mockBackendCounterGateway}]
    }).compileComponents();
  });

  it('should create the app', () => {
    mockBackendCounterGateway.count.and.returnValue(of([]));
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  //  Aus Zeitgründen wurde hier auf weitere Tests verzichtet.

});
