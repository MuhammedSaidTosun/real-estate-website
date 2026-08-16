import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {HousingService} from '../housing.service';
import {PropertyStateService} from '../property-state.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <article *ngIf="housingLocation as home; else notFound">
      <section class="detail-gallery">
        <div class="gallery-stage" (click)="galleryOpen = true"><img [src]="selectedImage" [alt]="home.name" /><button type="button" class="open-gallery"><i class="ph ph-corners-out"></i> Galeriyi aç</button></div>
        <div class="thumbnail-rail"><button *ngFor="let image of home.gallery; let i = index" type="button" [class.active]="selectedImageIndex === i" (click)="selectImage(i)"><img [src]="image" [alt]="home.name + ' fotoğraf ' + (i + 1)" /></button><button class="all-photos" type="button" (click)="galleryOpen = true"><i class="ph ph-images"></i><span>{{ home.gallery.length }} fotoğraf</span></button></div>
        <div class="detail-topbar"><a routerLink="/"><i class="ph ph-arrow-left"></i> Portföye dön</a><div><button type="button" (click)="state.toggleFavorite(home.id)" [class.active]="state.isFavorite(home.id)"><i [class]="state.isFavorite(home.id) ? 'ph-fill ph-heart' : 'ph ph-heart'"></i><span>{{ state.isFavorite(home.id) ? 'Kaydedildi' : 'Kaydet' }}</span></button><button type="button" (click)="toggleCompare(home.id)" [class.active]="state.isCompared(home.id)"><i class="ph ph-scales"></i><span>Karşılaştır</span></button></div></div>
        <div class="gallery-count">{{ selectedImageIndex + 1 | number:'2.0' }} / {{ home.gallery.length | number:'2.0' }}</div>
      </section>

      <section class="summary">
        <div class="summary-copy"><p class="location">{{ home.district }} · {{ home.city }} <span>{{ home.tag }}</span></p><h1>{{ home.name }}</h1><p class="description">{{ home.description }}</p><div class="amenities"><p><strong>{{ home.bedrooms }}</strong><span>Oda</span></p><p><strong>{{ home.bathrooms }}</strong><span>Banyo</span></p><p><strong>{{ home.area }}</strong><span>m² yaşam alanı</span></p><p><strong>{{ home.type }}</strong><span>Mülk tipi</span></p></div></div>
        <aside class="price-card"><span>İSTENEN FİYAT</span><p class="price">{{ home.price | number:'1.0-0':'tr-TR' }} ₺</p><small>{{ home.price / home.area | number:'1.0-0':'tr-TR' }} ₺ / m²</small><a href="mailto:merhaba@miraestate.com?subject={{ home.name }} hakkında">Özel sunum talep et <i class="ph ph-arrow-up-right"></i></a><p class="compare-warning" *ngIf="limitReached">Karşılaştırma seçkiniz üç mülkle sınırlıdır.</p></aside>
      </section>

      <section class="mortgage" id="kredi">
        <div class="mortgage-intro"><p class="eyebrow">FİNANSMAN REHBERİ</p><h2>Yeni hayatınızın<br><em>aylık karşılığı.</em></h2><p>Peşinat, vade ve faiz oranını değiştirerek size özel tahmini ödeme planını anında görün.</p></div>
        <div class="calculator">
          <div class="calculator-result"><span>TAHMİNİ AYLIK ÖDEME</span><strong>{{ monthlyPayment | number:'1.0-0':'tr-TR' }} ₺</strong><p>{{ term }} ay boyunca · Aylık %{{ interest | number:'1.2-2' }} faiz</p></div>
          <div class="calculator-fields">
            <label>EVİN FİYATI <div><input type="number" [(ngModel)]="propertyPrice" /><span>₺</span></div></label>
            <label>PEŞİNAT <div><input type="number" [(ngModel)]="downPayment" /><span>₺</span></div></label>
            <label>VADE <select [(ngModel)]="term"><option [ngValue]="60">60 ay</option><option [ngValue]="120">120 ay</option><option [ngValue]="180">180 ay</option><option [ngValue]="240">240 ay</option></select></label>
            <label>AYLIK FAİZ <div><input type="number" min="0.1" step="0.05" [(ngModel)]="interest" /><span>%</span></div></label>
          </div>
          <div class="loan-breakdown"><p><span>Kredi tutarı</span><strong>{{ loanAmount | number:'1.0-0':'tr-TR' }} ₺</strong></p><p><span>Peşinat oranı</span><strong>%{{ downPaymentRatio | number:'1.0-0' }}</strong></p><small>Bu hesaplama örnek amaçlıdır; banka teklifi niteliğinde değildir.</small></div>
        </div>
      </section>

      <section class="feature-strip"><div><span>01</span><strong>Seçkin lokasyon</strong><p>{{ home.district }}'in en özel noktalarından biri.</p></div><div><span>02</span><strong>Zamansız mimari</strong><p>Doğal malzemeler ve dengeli mekânlar.</p></div><div><span>03</span><strong>Eksiksiz konfor</strong><p>{{ home.wifi ? 'Akıllı ev altyapısı' : 'Modern altyapı' }} ve özel yaşam.</p></div></section>

      <div class="lightbox" *ngIf="galleryOpen" (click)="galleryOpen = false">
        <button class="lightbox-close" type="button" (click)="galleryOpen = false" aria-label="Galeriyi kapat"><i class="ph ph-x"></i></button>
        <button class="lightbox-arrow previous" type="button" (click)="$event.stopPropagation(); previousImage()" aria-label="Önceki fotoğraf"><i class="ph ph-caret-left"></i></button>
        <img [src]="selectedImage" [alt]="home.name" (click)="$event.stopPropagation()" />
        <button class="lightbox-arrow next" type="button" (click)="$event.stopPropagation(); nextImage()" aria-label="Sonraki fotoğraf"><i class="ph ph-caret-right"></i></button>
        <p>{{ selectedImageIndex + 1 }} / {{ home.gallery.length }} · {{ home.name }}</p>
      </div>
    </article>
    <ng-template #notFound><section class="not-found"><p>404</p><h1>Bu ilan artık burada değil.</h1><a routerLink="/">Portföye dön</a></section></ng-template>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly housingService = inject(HousingService);
  readonly state = inject(PropertyStateService);
  readonly housingLocation = this.housingService.getHousingLocationById(Number(this.route.snapshot.params['id']));
  selectedImageIndex = 0;
  galleryOpen = false;
  limitReached = false;
  propertyPrice = this.housingLocation?.price ?? 0;
  downPayment = Math.round((this.housingLocation?.price ?? 0) * .35);
  term = 120;
  interest = 2.49;

  get selectedImage(): string { return this.housingLocation?.gallery[this.selectedImageIndex] ?? ''; }
  get loanAmount(): number { return Math.max(0, this.propertyPrice - this.downPayment); }
  get downPaymentRatio(): number { return this.propertyPrice ? this.downPayment / this.propertyPrice * 100 : 0; }
  get monthlyPayment(): number {
    if (!this.loanAmount || !this.interest) return this.term ? this.loanAmount / this.term : 0;
    const rate = this.interest / 100;
    return this.loanAmount * rate * Math.pow(1 + rate, this.term) / (Math.pow(1 + rate, this.term) - 1);
  }

  selectImage(index: number): void { this.selectedImageIndex = index; }
  nextImage(): void { if (this.housingLocation) this.selectedImageIndex = (this.selectedImageIndex + 1) % this.housingLocation.gallery.length; }
  previousImage(): void { if (this.housingLocation) this.selectedImageIndex = (this.selectedImageIndex - 1 + this.housingLocation.gallery.length) % this.housingLocation.gallery.length; }
  toggleCompare(id: number): void { this.limitReached = !this.state.toggleCompare(id); if (this.limitReached) setTimeout(() => this.limitReached = false, 2400); }
}
