import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PropertyStateService {
  readonly favorites = signal<number[]>(this.read('mira:favorites'));
  readonly compare = signal<number[]>(this.read('mira:compare'));
  readonly favoritesOpen = signal(false);
  readonly compareOpen = signal(false);
  readonly maxCompare = 3;

  isFavorite(id: number): boolean {
    return this.favorites().includes(id);
  }

  isCompared(id: number): boolean {
    return this.compare().includes(id);
  }

  toggleFavorite(id: number): void {
    const next = this.isFavorite(id)
      ? this.favorites().filter((item) => item !== id)
      : [...this.favorites(), id];
    this.favorites.set(next);
    this.persist('mira:favorites', next);
  }

  toggleCompare(id: number): boolean {
    if (this.isCompared(id)) {
      const next = this.compare().filter((item) => item !== id);
      this.compare.set(next);
      this.persist('mira:compare', next);
      return true;
    }
    if (this.compare().length >= this.maxCompare) return false;
    const next = [...this.compare(), id];
    this.compare.set(next);
    this.persist('mira:compare', next);
    return true;
  }

  clearCompare(): void {
    this.compare.set([]);
    this.persist('mira:compare', []);
    this.compareOpen.set(false);
  }

  private read(key: string): number[] {
    try {
      return JSON.parse(localStorage.getItem(key) ?? '[]');
    } catch {
      return [];
    }
  }

  private persist(key: string, value: number[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
