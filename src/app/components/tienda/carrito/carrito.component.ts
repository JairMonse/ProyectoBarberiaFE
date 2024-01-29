import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrito } from '../../interface/Carrito';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitasService } from 'src/app/services/citas.service';
import { Citas } from '../../interface/Citas';
import { Opciones } from '../../interface/Opciones';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  /*
  cartItems: { carrito: Carrito, cantidad: number }[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.cartItems = navigation.extras.state['cartItems'] || [];
    }
  }
  

  realizarCompra() {
    // Simular el proceso de guardar la compra (puedes ajustar esto según tu backend o servicio)
    // Aquí podrías realizar una llamada a un servicio para almacenar la compra en tu base de datos.
    // En este ejemplo, simplemente mostramos un mensaje y redirigimos al usuario.
    alert('Compra realizada con éxito. Gracias por tu compra.');

    // Limpiar el carrito después de realizar la compra (simulación)
    this.cartItems = [];

    // Redirigir al usuario de vuelta a la página de la tienda
    this.router.navigate(['/tienda']);

  }

  
  loading: boolean=false;
  form:FormGroup
  id: number;

  listaCarrito: Carrito[] = [];

  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _carritoService:CarritoService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute){
    this.form=this.fb.group({
      
      cantidad:['',Validators.required],

    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'))
    
    
  }

  ngOnInit():void{
    if(this.id != 0){
        this.operacion= 'Editar'
        this.obtenerCarrito(this.id)
    }

  }

  obtenerCarrito(id: number){
    this.loading=true;
    this._carritoService.getCarrito(id).subscribe(data =>{
      this.form.patchValue({
       
        cantidad:data.cantidad,
      })
      this.loading = false;

    })
  }


  agregarEditarCarrito(){
    //const fechaCita = this.form.get('fechaCita')?.value

    const carrito:Carrito = {
     name: this.form.value.name,
     precio: this.form.value.precio,
      cantidad: this.form.value.cantidad,
      total: this.form.value.total,
      descripcion: this.form.value.descripcion,
      image: this.form.value.image,

    }
    if(this.id !=0 ){
      carrito.id = this.id;
      this.editarCarrito(this.id,carrito);

    }else{
      this.agregarCarrito(carrito);
    }
  }

  editarCarrito(id:number, carrito:Carrito){
    this.loading=true;
    this._carritoService.updateCarrito(id,carrito).subscribe(() =>{
      this.loading = false;

      this.mensajeExito('actualizada');
      this.router.navigate(['/listCarritos'])
    })
  }

  agregarCarrito(carrito:Carrito){
    this._carritoService.addCarrito(carrito).subscribe(data =>{
      this.mensajeExito('registrada');
      this.router.navigate(['/listCarritos'])
    })
 
  }
  
  mensajeExito(texto: string){
    this._snackBar.open(`La cita ha sido ${texto} con exito`,'',{
      duration:3000,
      horizontalPosition:'right'
    });
  }
*/

cartItems: { carrito: Carrito, cantidad: number }[] = [];

realizarCompra() {
  this.mensajeExito('');
  this.cartItems = []; 
  this.router.navigate(['/tienda']); 
  
}


form: FormGroup;
id: number;


constructor(
  private fb: FormBuilder,
  private _carritoService: CarritoService,
  private _snackBar: MatSnackBar,
  private router: Router,
  private aRoute: ActivatedRoute
) {
  // Configuración del formulario
  this.form = this.fb.group({
    cantidad: ['', Validators.required],
  });

  // Obtener el id del parámetro de la ruta
  this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

  // Obtener datos del carrito desde la navegación
  const navigation = this.router.getCurrentNavigation();
  if (navigation && navigation.extras && navigation.extras.state) {
    this.cartItems = navigation.extras.state['cartItems'] || [];
    console.log(this.cartItems); // Verificar si los datos se cargan correctamente
  }
}


ngOnInit(): void {
  if (this.id !== 0) {
    this.obtenerCarrito(this.id);
  }
}

obtenerCarrito(id: number) {
  this._carritoService.getCarrito(id).subscribe(data => {
    this.form.patchValue({
      cantidad: data.cantidad,
    });
  });
}

agregarEditarCarrito() {
  const carrito: Carrito = {
    // Asegúrate de ajustar estos campos según tu modelo Carrito
    name: '',
    precio: 0,
    cantidad: this.form.value.cantidad,
    total: 0,
    descripcion: '',
    image: '',
  };

  if (this.id !== 0) {
    carrito.id = this.id;
    this.editarCarrito();
  } else {
    this.agregarCarrito(carrito);
  }
}

editarCarrito() {
  // Obtén el carrito actual
  const carrito = this.cartItems[0].carrito;

  // Verifica si carrito.id es undefined
  if (carrito.id === undefined) {
    console.error('Error: El ID del carrito es undefined.');
    // Puedes mostrar un mensaje de error al usuario si lo prefieres
    return;
  }

  // Realiza la llamada al servicio para actualizar el carrito
  this._carritoService.updateCarrito(carrito.id, carrito).subscribe(() => {
    // Maneja el éxito de la actualización
    this.mensajeExito('actualizada');
    // Redirige al usuario a la lista de carritos
    this.router.navigate(['/listCarritos']);
  });


}

agregarCarrito(carrito: Carrito) {
  this._carritoService.addCarrito(carrito).subscribe(() => {
    this.mensajeExito('registrada');
    this.router.navigate(['/listCarritos']);
  });
}

mensajeExito(texto: string) {
  this._snackBar.open(`El producto se guardo ${texto} con éxito`, '', {
    duration: 3000,
    horizontalPosition: 'right'
  });
}


}
