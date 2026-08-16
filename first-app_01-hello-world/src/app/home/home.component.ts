import {CommonModule} from '@angular/common';
import {Component, computed, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';
import {PropertyStateService} from '../property-state.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, HousingLocationComponent],
  template: `
    <section class="editorial-hero">
      <div class="hero-copy">
        <p class="locations">İSTANBUL <i></i> BODRUM <i></i> İZMİR</p>
        <h1>Evinizi değil,<br><em>hayatınızı seçin.</em></h1>
        <p class="lede">Nitelikli mimariyi, eşsiz konumları ve iyi yaşamı bir araya getiren özel portföy.</p>
        <label for="hero-search">NEREDE YAŞAMAK İSTERSİNİZ?</label>
        <div class="hero-search"><i class="ph ph-magnifying-glass"></i><input id="hero-search" type="search" placeholder="Şehir, bölge veya ilan adı" #heroSearch (input)="applyFilters(heroSearch.value, typeFilter.value)" /><button type="button" (click)="goToPortfolio()" aria-label="Aramayı görüntüle"><i class="ph ph-arrow-right"></i></button></div>
        <div class="city-chips"><button type="button" (click)="setCity('İstanbul', heroSearch, typeFilter.value)">İstanbul</button><button type="button" (click)="setCity('Bodrum', heroSearch, typeFilter.value)">Bodrum</button><button type="button" (click)="setCity('İzmir', heroSearch, typeFilter.value)">İzmir</button></div>
        <button class="saved-summary" type="button" (click)="state.favoritesOpen.set(true)"><span><i class="ph ph-heart"></i></span><div><strong>KAYDEDİLENLER</strong><small>{{ state.favorites().length ? state.favorites().length + ' mülk kaydedildi' : 'Seçkinizi oluşturmaya başlayın' }}</small></div></button>
      </div>

      <div class="hero-gallery">
        <img class="hero-main-image" [src]="activeHeroImage" [alt]="featuredHome.name" />
        <div class="hero-meta">
          <div><h2>{{ featuredHome.name }}</h2><span>{{ featuredHome.district }} · {{ featuredHome.city }}</span></div>
          <strong>{{ featuredHome.price | number:'1.0-0':'tr-TR' }} ₺</strong>
          <span>{{ selectedHeroIndex + 1 | number:'2.0' }} / {{ heroHomes.length | number:'2.0' }}</span>
          <div class="hero-arrows"><button type="button" (click)="previousHero()" aria-label="Önceki mülk"><i class="ph ph-caret-left"></i></button><button type="button" (click)="nextHero()" aria-label="Sonraki mülk"><i class="ph ph-caret-right"></i></button></div>
        </div>
        <div class="gallery-rail">
          <button *ngFor="let image of featuredHome.gallery; let i = index" type="button" [class.active]="activeGalleryIndex === i" (click)="setHeroImage(i)"><img [src]="image" [alt]="featuredHome.name + ' fotoğraf ' + (i + 1)" /></button>
          <a [routerLink]="['/details', featuredHome.id]"><i class="ph ph-images"></i><span>Tüm<br>fotoğraflar</span></a>
        </div>
        <button class="hero-favorite" type="button" (click)="state.toggleFavorite(featuredHome.id)" [attr.aria-label]="featuredHome.name + ' kaydet'" [class.active]="state.isFavorite(featuredHome.id)"><i [class]="state.isFavorite(featuredHome.id) ? 'ph-fill ph-heart' : 'ph ph-heart'"></i></button>
      </div>
    </section>

    <section class="decision-strip">
      <div class="decision-copy"><span>KAYDEDİLENLER VE KARŞILAŞTIR</span><p>Beğendiğiniz mülkleri kaydedin, karşılaştırın ve size en uygun seçeneği kolayca bulun.</p><button type="button" (click)="state.compareOpen.set(true)" [disabled]="!compareHomes().length"><i class="ph ph-scales"></i> Karşılaştır ({{ compareHomes().length }}) <i class="ph ph-arrow-right"></i></button></div>
      <div class="decision-homes">
        <article *ngFor="let home of compareHomes()"><img [src]="home.photo" [alt]="home.name" /><button type="button" (click)="state.toggleCompare(home.id)" [attr.aria-label]="home.name + ' karşılaştırmadan çıkar'"><i class="ph ph-x"></i></button><div><h3>{{ home.name }}</h3><p>{{ home.district }} · {{ home.city }}</p></div></article>
        <button class="add-home" type="button" (click)="goToPortfolio()" [disabled]="compareHomes().length >= 3"><i class="ph" [class.ph-plus]="compareHomes().length < 3" [class.ph-check]="compareHomes().length >= 3"></i><span>{{ compareHomes().length >= 3 ? 'Seçki dolu' : 'Daha fazla' }}<br>{{ compareHomes().length >= 3 ? '3 / 3' : 'ekle' }}</span></button>
      </div>
      <div class="mortgage-teaser"><span>AYLIK ÖDEME TAHMİNİ</span><strong>{{ monthlyEstimate | number:'1.0-0':'tr-TR' }} ₺</strong><p>{{ featuredHome.name }} için örnek aylık ödeme.</p><a [routerLink]="['/details', featuredHome.id]" fragment="kredi">Hesaplayıcıya git <i class="ph ph-arrow-right"></i></a></div>
    </section>

    <section class="intro" id="yaklasim"><p class="eyebrow"><span></span> MIRA YAKLAŞIMI</p><div><h2>Doğru ev, iyi hissettirir.</h2><p>Biz yalnızca metrekare ve oda sayısı sunmuyoruz. Işığı, manzarayı, malzemeyi ve o evde başlayacak hayatı düşünüyoruz. Her portföy, mimari niteliği ve yaşam değeriyle özenle seçiliyor.</p><a href="#iletisim">Bizi tanıyın <i class="ph ph-arrow-up-right"></i></a></div></section>

    <section class="listings" id="portfoy">
      <div class="section-heading"><div><p class="eyebrow"><span></span> ÖNE ÇIKAN PORTFÖY</p><h2>Seçkin yaşam alanları</h2></div><div class="listing-filters"><select #typeFilter (change)="applyFilters(heroSearch.value, typeFilter.value)" aria-label="Mülk tipine göre filtrele"><option value="">Tüm mülkler</option><option>Villa</option><option>Daire</option><option>Rezidans</option><option>Yalı</option></select><p>{{ filteredLocationList.length }} özel mülk</p></div></div>
      <div class="results" *ngIf="filteredLocationList.length; else emptyState"><app-housing-location *ngFor="let location of filteredLocationList" [housingLocation]="location"></app-housing-location></div>
      <ng-template #emptyState><div class="empty"><i class="ph ph-house-line"></i><h3>Bu aramaya uygun bir seçki bulamadık.</h3><p>Farklı bir bölge veya mülk tipi deneyin.</p><button type="button" (click)="resetFilters(heroSearch, typeFilter)">Tüm portföyü göster</button></div></ng-template>
    </section>

    <section class="manifesto" id="bolgeler"><div class="manifesto-image"></div><div class="manifesto-copy"><p class="eyebrow light"><span></span> YERİNDEN BİRİ</p><h2>Bir bölgeyi bilmek,<br><em>orada yaşamayı bilmektir.</em></h2><p>Kahvenizi nerede içeceğinizden gün batımını hangi koyda izleyeceğinize kadar; yalnızca evi değil, çevresindeki hayatı da anlatıyoruz.</p><div class="stats"><div><strong>12+</strong><span>Yıllık deneyim</span></div><div><strong>240</strong><span>Mutlu eşleşme</span></div><div><strong>8</strong><span>Özel bölge</span></div></div></div></section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  readonly state = inject(PropertyStateService);
  private readonly housingService = inject(HousingService);
  readonly housingLocationList = this.housingService.getAllHousingLocations();
  readonly heroHomes = [this.housingLocationList[0], this.housingLocationList[3], this.housingLocationList[2]];
  readonly compareHomes = computed(() => this.housingLocationList.filter((home) => this.state.compare().includes(home.id)));
  filteredLocationList: HousingLocation[] = this.housingLocationList;
  selectedHeroIndex = 0;
  activeGalleryIndex = 0;

  get featuredHome(): HousingLocation { return this.heroHomes[this.selectedHeroIndex]; }
  get activeHeroImage(): string { return this.featuredHome.gallery[this.activeGalleryIndex] ?? this.featuredHome.photo; }
  get monthlyEstimate(): number { return this.calculatePayment(this.featuredHome.price, .35, 120, 2.49); }

  nextHero(): void { this.selectedHeroIndex = (this.selectedHeroIndex + 1) % this.heroHomes.length; this.activeGalleryIndex = 0; }
  previousHero(): void { this.selectedHeroIndex = (this.selectedHeroIndex - 1 + this.heroHomes.length) % this.heroHomes.length; this.activeGalleryIndex = 0; }
  setHeroImage(index: number): void { this.activeGalleryIndex = index; }

  applyFilters(text: string, type: string): void {
    const term = text.trim().toLocaleLowerCase('tr-TR');
    this.filteredLocationList = this.housingLocationList.filter((location) => {
      const searchable = `${location.name} ${location.city} ${location.district}`.toLocaleLowerCase('tr-TR');
      return (!term || searchable.includes(term)) && (!type || location.type === type);
    });
  }

  setCity(city: string, search: HTMLInputElement, type: string): void { search.value = city; this.applyFilters(city, type); this.goToPortfolio(); }
  goToPortfolio(): void { document.getElementById('portfoy')?.scrollIntoView({behavior: 'smooth'}); }
  resetFilters(search: HTMLInputElement, type: HTMLSelectElement): void { search.value = ''; type.value = ''; this.filteredLocationList = this.housingLocationList; }

  private calculatePayment(price: number, downRatio: number, months: number, monthlyRatePercent: number): number {
    const principal = price * (1 - downRatio);
    const rate = monthlyRatePercent / 100;
    return principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
  }
}
