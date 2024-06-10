import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

interface Producto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  mostrarDetalles?: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: Producto[] = [];
  categorias: string[] = [];
  productosFiltrados: Producto[] = [];
  carrito: Producto[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData(): void {
    this.apiService.getData().subscribe((data: Producto[]) => {
      this.data = data;
      this.categorias = Array.from(new Set(data.map((item: Producto) => item.category)));
      this.productosFiltrados = this.data;
    });
  }

  filtrarCategoria(categoria: string): void {
    this.productosFiltrados = this.data.filter((producto: Producto) => producto.category === categoria);
  }

  toggleDetalles(producto: Producto): void {
    if (producto.mostrarDetalles === undefined) {
      producto.mostrarDetalles = false;
    }
    producto.mostrarDetalles = !producto.mostrarDetalles;
  }

  agregarAlCarrito(producto: Producto): void {
    this.carrito.push(producto);
  }

  contarProductosEnCarrito(): number {
    return this.carrito.length;
  }
}
