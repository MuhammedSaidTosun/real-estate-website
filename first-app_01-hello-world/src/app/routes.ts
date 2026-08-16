import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'MIRA Estate — Seçkin Yaşam Alanları',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Mülk Detayı — MIRA Estate',
  },
];
export default routeConfig;
