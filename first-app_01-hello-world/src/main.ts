import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import routeConfig from './app/routes';
import {registerLocaleData} from '@angular/common';
import localeTr from '@angular/common/locales/tr';

registerLocaleData(localeTr);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig, withInMemoryScrolling({scrollPositionRestoration: 'top', anchorScrolling: 'enabled'})),
  ],
}).catch((err) => console.error(err));
