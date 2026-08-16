import {CommonModule} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {HousingLocation} from '../housinglocation';
import {PropertyStateService} from '../property-state.service';

@Component({
  selector: 'app-housing-location',
  imports: [CommonModule, RouterLink],
  template: `
    <article class="listing">
      <div class="image-wrap">
        <a class="image-link" [routerLink]="['/details', housingLocation.id]" [attr.aria-label]="housingLocation.name + ' detaylarını görüntüle'"><img class="listing-photo" [src]="housingLocation.photo" [alt]="housingLocation.name" loading="lazy" /></a>
        <span class="tag">{{ housingLocation.tag }}</span>
        <div class="card-actions">
          <button type="button" (click)="state.toggleFavorite(housingLocation.id)" [class.active]="state.isFavorite(housingLocation.id)" [attr.aria-label]="housingLocation.name + ' favorilere ekle'"><i [class]="state.isFavorite(housingLocation.id) ? 'ph-fill ph-heart' : 'ph ph-heart'"></i></button>
          <button type="button" (click)="toggleCompare()" [class.active]="state.isCompared(housingLocation.id)" [attr.aria-label]="housingLocation.name + ' karşılaştırmaya ekle'"><i class="ph ph-scales"></i></button>
        </div>
        <a class="arrow" [routerLink]="['/details', housingLocation.id]" aria-label="İlanı aç"><i class="ph ph-arrow-up-right"></i></a>
      </div>
      <div class="listing-topline"><p>{{ housingLocation.district }}, {{ housingLocation.city }}</p><span>{{ housingLocation.type }}</span></div>
      <h3><a [routerLink]="['/details', housingLocation.id]">{{ housingLocation.name }}</a></h3>
      <div class="listing-details"><p><strong>{{ housingLocation.price | number:'1.0-0':'tr-TR' }} ₺</strong><small>{{ housingLocation.price / housingLocation.area | number:'1.0-0':'tr-TR' }} ₺ / m²</small></p><div><span>{{ housingLocation.bedrooms }} oda</span><span>{{ housingLocation.bathrooms }} banyo</span><span>{{ housingLocation.area }} m²</span></div></div>
      <p class="limit-note" *ngIf="limitReached">En fazla üç mülk karşılaştırabilirsiniz.</p>
    </article>
  `,
  styleUrls: ['./housing-location.component.css'],
})
export class HousingLocationComponent {
  @Input({required: true}) housingLocation!: HousingLocation;
  readonly state = inject(PropertyStateService);
  limitReached = false;

  toggleCompare(): void {
    this.limitReached = !this.state.toggleCompare(this.housingLocation.id);
    if (this.limitReached) setTimeout(() => this.limitReached = false, 2400);
  }
}
