import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from '../interface/Carrito';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  
  carritos =[
    {
      name: 'Maquina de afeitar',
      descripcion: 'Consigue un afeitado suave y preciso con nuestra maquinilla de afeitar de alta calidad. Diseñada para ofrecer un afeitado cómodo y sin irritaciones.',
      precio: 20.99,
      image: './assets/img/MaquinadeAfeitar.png'
    },
    {
      name: 'Ceras para peinar',
      descripcion: 'Define tu estilo con nuestras ceras para peinar. Aporta textura y fijación sin dejar residuos, permitiéndote lograr peinados modernos y duraderos.',
      precio: 15.99,
      image: './assets/img/CerasparaPeinar.png'
    },
    {
      name: 'Navajas y maquinillas de afeitar',
      descripcion: 'Experimenta el afeitado clásico con nuestras navajas y maquinillas de afeitar. Diseñadas para proporcionar un afeitado apurado y preciso, resaltando la tradición de la barbería.',
      precio: 15.99,
      image: './assets/img/product3.png'
    },
    {
      name: 'Secadores de cabello',
      descripcion: 'Potencia tu estilo con nuestros secadores de cabello profesionales. Secado rápido y eficiente para lograr el peinado perfecto en menos tiempo.',
      precio: 15.99,
      image: './assets/img/product4.png'
    },
    {
      name: 'Toallas y paños',
      descripcion: 'Envuélvete en comodidad con nuestras toallas y paños de alta absorción. Diseñadas para proporcionar suavidad y secado rápido, brindando una experiencia de barbería de lujo.',
      precio: 15.99,
      image: './assets/img/product5.png'
    },
    {
      name: 'Limpiadores faciales',
      descripcion: 'Cuida tu piel con nuestros limpiadores faciales especializados para hombres. Elimina impurezas y revitaliza tu rostro, dejándolo fresco y rejuvenecido.',
      precio: 15.99,
      image: './assets/img/product6.png'
    },
    {
      name: 'Cepillo para barba de cerdas naturales',
      descripcion: 'Domina tu barba con nuestro cepillo de cerdas naturales. Desenreda y suaviza la barba, distribuyendo uniformemente los productos para un aspecto impecable.',
      precio: 15.99,
      image: './assets/img/product12.jpg'
    },
    {
      name: 'Loción para después del afeitado',
      descripcion: 'Calma y refresca tu piel después del afeitado con nuestra loción especial. Su fórmula suave ayuda a prevenir la irritación, dejando la piel suave y revitalizada.',
      precio: 15.99,
      image: './assets/img/product11.jpeg'
    },
    {
      name: 'Tazón de afeitar de acero inoxidable',
      descripcion: 'Experimenta la elegancia en el afeitado con nuestro tazón de afeitar de acero inoxidable. Ideal para crear una espuma rica y cremosa, elevando tu rutina de afeitado.',
      precio: 15.99,
      image: './assets/img/product10.jpg'
    },
    {
      name: 'Champús y acondicionadores',
      descripcion: 'Mantén tu cabello en óptimas condiciones con nuestros champús y acondicionadores. Formulados para limpiar, hidratar y fortalecer, proporcionando un cuidado completo.',
      precio: 15.99,
      image: './assets/img/product7.png'
    },
    {
      name: 'Tijeras y recortadoras de barba',
      descripcion: 'Dale forma y estilo a tu barba con nuestras tijeras y recortadoras de precisión. Herramientas esenciales para mantener una barba bien cuidada y con un aspecto profesional.',
      precio: 15.99,
      image: './assets/img/product8.png'
    },
    {
      name: 'Kit de afeitado clásico',
      descripcion: 'Revive la tradición del afeitado con nuestro kit clásico. Incluye elementos esenciales para una experiencia de afeitado auténtica y refinada.',
      precio: 15.99,
      image: './assets/img/product9.jpg'
    },
    
  ];

  cartItems: { carrito: Carrito, quantity: number }[] = [];

  constructor(private router: Router) { }

  addToCart(carrito: Carrito) {

    const existingItem = this.cartItems.find(item => item.carrito === carrito);

    if (existingItem) {

      existingItem.quantity++;
    } else {

      this.cartItems.push({ carrito, quantity: 1 });
    }


    this.router.navigate(['/carrito'], { state: { cartItems: this.cartItems } });
  }

}
