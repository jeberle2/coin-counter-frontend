import {provideHttpClient, withFetch} from '@angular/common/http';
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
