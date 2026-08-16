import {Injectable} from '@angular/core';
import {HousingLocation} from './housinglocation';

@Injectable({providedIn: 'root'})
export class HousingService {
  private readonly imageBase = 'https://angular.dev/assets/images/tutorials/common';

  private readonly housingLocationList: HousingLocation[] = [
    {
      id: 0, name: 'Boğaz Işığı Villası', city: 'İstanbul', district: 'Beykoz', state: 'TR',
      photo: '/assets/hero-bosphorus-villa.png',
      gallery: ['/assets/hero-bosphorus-villa.png', '/assets/villa-living-room.png', '/assets/villa-terrace.png', '/assets/villa-bedroom.png'],
      price: 128_500_000, bedrooms: 6, bathrooms: 7, area: 740,
      type: 'Villa', tag: 'Özel Seçki', availableUnits: 1, wifi: true, laundry: true,
      description: 'Boğaz manzarasını çağdaş mimariyle buluşturan, peyzajlı bahçe ve sonsuzluk havuzuna sahip benzersiz bir yaşam alanı.',
    },
    {
      id: 1, name: 'Teşvikiye Loft', city: 'İstanbul', district: 'Nişantaşı', state: 'TR',
      photo: `${this.imageBase}/brandon-griggs-wR11KBaB86U-unsplash.jpg`, gallery: [`${this.imageBase}/brandon-griggs-wR11KBaB86U-unsplash.jpg`], price: 42_750_000, bedrooms: 3, bathrooms: 2, area: 215,
      type: 'Daire', tag: 'Yeni İlan', availableUnits: 1, wifi: true, laundry: true,
      description: 'Şehrin kültür ve moda merkezinde, yüksek tavanları ve özgün detaylarıyla sakin bir şehir sığınağı.',
    },
    {
      id: 2, name: 'Marina Teras Evleri', city: 'İzmir', district: 'Urla', state: 'TR',
      photo: '/assets/urla-stone-villa.png', gallery: ['/assets/urla-stone-villa.png'], price: 34_900_000, bedrooms: 4, bathrooms: 3, area: 310,
      type: 'Villa', tag: 'Denize Yakın', availableUnits: 2, wifi: true, laundry: true,
      description: 'Ege ritmini doğal taş, geniş teraslar ve gün boyu ışık alan yaşam alanlarıyla yeniden yorumlayan seçkin bir ev.',
    },
    {
      id: 3, name: 'Kandilli Yalısı', city: 'İstanbul', district: 'Kandilli', state: 'TR',
      photo: '/assets/kandilli-mansion.png', gallery: ['/assets/kandilli-mansion.png'], price: 164_000_000, bedrooms: 7, bathrooms: 6, area: 680,
      type: 'Yalı', tag: 'Özel Portföy', availableUnits: 1, wifi: true, laundry: true,
      description: 'Boğaz kıyısında tarihi oranları çağdaş konforla buluşturan, korunaklı bahçeli ve zamansız bir İstanbul yalısı.',
    },
    {
      id: 4, name: 'Vadi Rezidans', city: 'İstanbul', district: 'Maslak', state: 'TR',
      photo: `${this.imageBase}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`, gallery: [`${this.imageBase}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`], price: 26_400_000, bedrooms: 2, bathrooms: 2, area: 165,
      type: 'Rezidans', tag: 'Şehir Yaşamı', availableUnits: 3, wifi: true, laundry: true,
      description: 'İş ve yaşam merkezlerine dakikalar mesafede, orman manzaralı ve eksiksiz sosyal olanaklara sahip modern rezidans.',
    },
    {
      id: 5, name: 'Alaçatı Taş Konak', city: 'İzmir', district: 'Çeşme', state: 'TR',
      photo: `${this.imageBase}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`, gallery: [`${this.imageBase}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`], price: 47_500_000, bedrooms: 4, bathrooms: 4, area: 340,
      type: 'Villa', tag: 'Karakterli Ev', availableUnits: 1, wifi: true, laundry: true,
      description: 'Yerel taş işçiliğini çağdaş iç mekânla buluşturan, avlulu ve mahremiyet odaklı zamansız bir Alaçatı evi.',
    },
  ];

  getAllHousingLocations(): HousingLocation[] { return this.housingLocationList; }
  getHousingLocationById(id: number): HousingLocation | undefined { return this.housingLocationList.find((location) => location.id === id); }
}
