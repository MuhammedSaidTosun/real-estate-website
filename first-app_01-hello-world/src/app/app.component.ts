import {CommonModule} from '@angular/common';
import {Component, computed, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {HousingService} from './housing.service';
import {PropertyStateService} from './property-state.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <header class="site-header">
      <a class="brand" routerLink="/" aria-label="MIRA ana sayfa"><img src="/assets/logo.svg" alt="MIRA Estate" /></a>
      <nav [class.is-open]="menuOpen" aria-label="Ana menü">
        <a routerLink="/" fragment="portfoy" (click)="closeMenu()">Portföy</a>
        <a routerLink="/" fragment="yaklasim" (click)="closeMenu()">Yaklaşımımız</a>
        <a routerLink="/" fragment="bolgeler" (click)="closeMenu()">Bölgeler</a>
        <a routerLink="/" fragment="iletisim" (click)="closeMenu()">İletişim</a>
      </nav>
      <div class="header-tools">
        <button class="saved-button" type="button" (click)="state.favoritesOpen.set(true)" aria-label="Kaydedilen evleri aç">
          <i class="ph ph-heart"></i><span>Kaydedilenler</span><b>{{ state.favorites().length }}</b>
        </button>
        <a class="header-cta" routerLink="/" fragment="iletisim">Danışmanla görüş <i class="ph ph-arrow-up-right"></i></a>
      </div>
      <button class="menu-button" type="button" (click)="menuOpen = !menuOpen" [attr.aria-expanded]="menuOpen" aria-label="Menüyü aç veya kapat"><i class="ph ph-list"></i></button>
    </header>

    <main><router-outlet></router-outlet></main>

    <section class="compare-dock" *ngIf="compareHomes().length && showCompareDock">
      <div class="compare-summary">
        <span class="compare-icon"><i class="ph ph-scales"></i></span>
        <div><small>SEÇİMİNİZ</small><strong>{{ compareHomes().length }} mülk karşılaştırmada</strong></div>
      </div>
      <div class="dock-homes">
        <div *ngFor="let home of compareHomes()"><img [src]="home.photo" [alt]="home.name" /><span>{{ home.name }}</span></div>
      </div>
      <button class="dock-action" type="button" (click)="state.compareOpen.set(true)">Karşılaştır <i class="ph ph-arrow-right"></i></button>
      <button class="dock-close" type="button" (click)="state.clearCompare()" aria-label="Karşılaştırmayı temizle"><i class="ph ph-x"></i></button>
    </section>

    <div class="overlay" *ngIf="state.favoritesOpen()" (click)="state.favoritesOpen.set(false)">
      <aside class="saved-drawer" (click)="$event.stopPropagation()">
        <div class="panel-heading"><div><span>KİŞİSEL SEÇKİNİZ</span><h2>Kaydedilen evler</h2></div><button type="button" (click)="state.favoritesOpen.set(false)" aria-label="Paneli kapat"><i class="ph ph-x"></i></button></div>
        <div class="saved-list" *ngIf="favoriteHomes().length; else noFavorites">
          <article *ngFor="let home of favoriteHomes()">
            <a [routerLink]="['/details', home.id]" (click)="state.favoritesOpen.set(false)"><img [src]="home.photo" [alt]="home.name" /></a>
            <div><span>{{ home.district }} · {{ home.city }}</span><h3>{{ home.name }}</h3><p>{{ home.price | number:'1.0-0':'tr-TR' }} ₺</p></div>
            <button type="button" (click)="state.toggleFavorite(home.id)" [attr.aria-label]="home.name + ' favorilerden çıkar'"><i class="ph-fill ph-heart"></i></button>
          </article>
        </div>
        <ng-template #noFavorites><div class="empty-panel"><i class="ph ph-heart"></i><h3>Henüz bir ev kaydetmediniz.</h3><p>Size iyi hissettiren evleri kalp simgesiyle seçkinize ekleyin.</p></div></ng-template>
      </aside>
    </div>

    <div class="overlay compare-overlay" *ngIf="state.compareOpen()" (click)="state.compareOpen.set(false)">
      <section class="compare-modal" (click)="$event.stopPropagation()">
        <div class="panel-heading"><div><span>KARAR MASASI</span><h2>Yan yana, daha net.</h2></div><button type="button" (click)="state.compareOpen.set(false)" aria-label="Karşılaştırmayı kapat"><i class="ph ph-x"></i></button></div>
        <div class="compare-grid" [style.--columns]="compareHomes().length">
          <div class="compare-labels"><span></span><b>Fiyat</b><b>Konum</b><b>Yaşam alanı</b><b>Oda / Banyo</b><b>Mülk tipi</b></div>
          <article *ngFor="let home of compareHomes()">
            <div class="compare-photo"><img [src]="home.photo" [alt]="home.name" /><button type="button" (click)="state.toggleCompare(home.id)" aria-label="Karşılaştırmadan çıkar"><i class="ph ph-x"></i></button></div>
            <h3>{{ home.name }}</h3><strong>{{ home.price | number:'1.0-0':'tr-TR' }} ₺</strong><p>{{ home.district }}, {{ home.city }}</p><p>{{ home.area }} m²</p><p>{{ home.bedrooms }} oda / {{ home.bathrooms }} banyo</p><p>{{ home.type }}</p>
            <a [routerLink]="['/details', home.id]" (click)="state.compareOpen.set(false)">Evi incele <i class="ph ph-arrow-up-right"></i></a>
          </article>
        </div>
      </section>
    </div>

    <footer id="iletisim">
      <div class="footer-top"><div><img src="/assets/logo.svg" alt="MIRA Estate" /><p>İyi yaşam, doğru yerde başlar.</p></div><div class="footer-contact"><span>Yeni bir başlangıç için</span><a href="mailto:merhaba@miraestate.com">merhaba&#64;miraestate.com <i class="ph ph-arrow-up-right"></i></a></div></div>
      <div class="footer-bottom"><p>© 2026 MIRA Estate. Özenle seçilmiş yaşam alanları.</p><div><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Gizlilik</a></div></div>
    </footer>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly state = inject(PropertyStateService);
  private readonly router = inject(Router);
  private readonly homes = inject(HousingService).getAllHousingLocations();
  readonly favoriteHomes = computed(() => this.homes.filter((home) => this.state.favorites().includes(home.id)));
  readonly compareHomes = computed(() => this.homes.filter((home) => this.state.compare().includes(home.id)));
  menuOpen = false;
  get showCompareDock(): boolean { return this.router.url.startsWith('/details/'); }
  closeMenu(): void { this.menuOpen = false; }
}
