import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any[] = [];
  cart: any[] = [];
  isModalOpen: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.apiService.getData().subscribe(data => {
      this.data = data;
      this.data.forEach(product => {
        product.showDetails = false;  // Inicializar el campo showDetails
      });
      console.log(this.data);
    });
  }

  toggleDetails(productId: number) {
    const product = this.data.find(p => p.id === productId);
    if (product) {
      product.showDetails = !product.showDetails;
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  removeFromCart(item: any) {
    const index = this.cart.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  addToCart(product: any) {
    const index = this.cart.findIndex(cartItem => cartItem.id === product.id);
    if (index !== -1) {
      this.cart[index].quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }


}
