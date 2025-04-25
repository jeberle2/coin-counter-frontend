import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { CounterResult } from "./calculator";

@Injectable({providedIn: 'root'})
export class BackendCounter {

    private http = inject(HttpClient);

    count(valueInCent: number): Observable<CounterResult[]> {
        return this.http.get<CounterResult[]>(`http://localhost:8080/count/${valueInCent}`)
        .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        // left out due to time reasons - handle error like 5xx with retry and 4xx with client info
        alert('We are facing server problems - please try again later.')
        return throwError(() => new Error('Backend request failed: ' + error))
    }
}