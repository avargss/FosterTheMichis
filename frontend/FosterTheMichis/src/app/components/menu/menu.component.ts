import { Component } from '@angular/core';
import { Products } from '../../model/products';
import { ProductsService } from '../../services/products.service';
import { NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  imports: [NgFor, TranslateModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  hotDrinks: Products[] = [];
  coldDrinks: Products[] = [];
  desserts: Products[] = [];
  homemade: Products[] = [];
  felineTreats: Products[] = [];

    constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.loadHotDrinks();
    this.loadColdDrinks();
    this.loadDesserts();
    this.loadHomemade();
    this.loadFelineTreats();
  }

  // Método para cargar las bebidas calientes desde la base de datos
  loadHotDrinks(): void {
    const hotDrinksCategoryId = 1; // ID de la categoría para bebidas calientes
    this.productService.getProductsByCategory(hotDrinksCategoryId).subscribe((products: Products[]) => {
      this.hotDrinks = products;
    });
  }

  // Método para cargar las bebidas frías desde la base de datos
  loadColdDrinks(): void {
    const coldDrinksCategoryId = 2; // ID de la categoría para bebidas frías
    this.productService.getProductsByCategory(coldDrinksCategoryId).subscribe((products: Products[]) => {
      this.coldDrinks = products;
    });
  }

  // Método para cargar los postres desde la base de datos
  loadDesserts(): void {
    const dessertsCategoryId = 3; // ID de la categoría para postres
    this.productService.getProductsByCategory(dessertsCategoryId).subscribe((products: Products[]) => {
      this.desserts = products;
    });
  }

  // Método para cargar los productos caseros desde la base de datos
  loadHomemade(): void {
    const homemadeCategoryId = 4; // ID de la categoría para productos caseros
    this.productService.getProductsByCategory(homemadeCategoryId).subscribe((products: Products[]) => {
      this.homemade = products;
    });
  }

  // Método para cargar los premios para felinos desde la base de datos
  loadFelineTreats(): void {
    const felineTreatsCategoryId = 5; // ID de la categoría para premios para felinos
    this.productService.getProductsByCategory(felineTreatsCategoryId).subscribe((products: Products[]) => {
      this.felineTreats = products;
    });
  }

}
