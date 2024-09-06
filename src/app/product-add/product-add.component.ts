import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { NewProductInterface } from '../interfaces/product.interface';

@Component({

  selector: 'app-product-add',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})

export class ProductAddComponent implements OnInit {
  // l'opérateur de non-nullité (!) indique à TypeScript que l'on est certain que productForm sera initialisé avant d'être utilisé
  productForm!: FormGroup; 
  isSubmitted = false;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
    });
  }

  register() {
    this.isSubmitted = true;
    if (this.productForm.valid) {
      const product: NewProductInterface = this.productForm.value;
      console.log(`Ajout du produit`, product);
    } else console.log(`Problème lors de l'ajout du formulaire`);
  }
}
