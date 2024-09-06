import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../products.service';
import { ProductInterface } from '../interfaces/product.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-get',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css'],
})

export class ProductGetComponent {

  products: ProductInterface[] = [];
  productIdToDelete: string | null = null;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.loadProducts().subscribe({
      next: (products) => {
        console.log('liste des produits chargées avec succès:', products);
        this.products = products;
      },

      error: (error) => {
        console.error(
          `Erreur lors de la récupération de la liste des produits :`,
          error
        );
      },
    });
  }

  handleDeleteProduct(id: string) {
    this.productIdToDelete = id;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteModal')!);
    if (modal) {
      modal.show();
      console.log('Modal has been shown successfully');  
    } else {
      console.error('Failed to get the modal instance');  
    }
  }

  handleConfirmDelete(): void {
    if (this.productIdToDelete) {
      this.productsService.deleteProduct(this.productIdToDelete).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== this.productIdToDelete);
          this.productIdToDelete = null;
          const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('deleteModal')!);
          modal.hide();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du produit', error);
        }
      });
    }
  }

  handleCancelDelete(): void {
    this.productIdToDelete = null;
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('deleteModal')!);
    modal.hide();
  }
}
