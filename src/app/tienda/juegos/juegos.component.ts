import { Component, OnInit, ViewChild } from '@angular/core';
import { TiendaService } from '../tienda.service';
import { ConfirmationService } from 'primeng/api';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { NgForm } from '@angular/forms';
import { IJuego, ICategoria, IDesarrolladora, IPlataforma } from '../tienda.interfaces';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css'],
  providers: [ConfirmationService]
})
export class JuegosComponent implements OnInit{
  constructor(private tiendaService: TiendaService, 
    private confirmationService: ConfirmationService,
    private authGuard: AuthGuard) {}

    @ViewChild('formulario') formulario!: NgForm;
    visibleError = false;
    mensajeError = '';
    juegos: IJuego[] = [];
    categorias: ICategoria[] = [];
    desarrolladoras: IDesarrolladora[] = [];
    plataformas: IPlataforma[] = [];
    visibleConfirm = false;

    juego: IJuego = {
      idJuego: 0,
      nombre: '',
      precio: 0,
      disponible: true,
      lanzamiento: new Date(),
      pegi: 0,
      idCategoria: 0,
      nombreCategoria: '',
      idPlataforma: 0,
      nombrePlataforma: '',
      idDesarrolladora: 0,
      nombreDesarrolladora: ''
    };

    categoria: ICategoria = {
      idCategoria: 0,
      genero: ''
    };

    desarrolladora: IDesarrolladora = {
      idDesarrolladora: 0,
      nombre: '',
      indie: true,
      pais: ''
    }

    plataforma: IPlataforma = {
      idPlataforma: 0,
      nombre: ''
    }

    ngOnInit(): void {
      this.getJuegos();
      this.getCategorias();
      this.getDesarrolladoras();
      this.getPlataformas();
    }

    getJuegos() {
      this.tiendaService.getJuegos().subscribe({
        next: (data) => {
          console.log(data);
          this.visibleError = false;
          this.juegos = data;
        },
        error: (err) => {
          this.controlarError(err);
        }
      });
    }

    getDesarrolladoras() {
      this.tiendaService.getDesarrolladoras().subscribe({
        next: (data) => {
          console.log(data);
          this.visibleError = false;
          this.desarrolladoras = data;
        },
        error: (err) => {
          this.controlarError(err);
        }
      });
    }

    getCategorias() {
      this.tiendaService.getCategorias().subscribe({
        next: (data) => {
          this.visibleError = false;
          this.categorias = data;
        },
        error: (err) => {
          this.controlarError(err);
        }
      });
    }

    // getPlataformas() {
    //   this.tiendaService.getPlataformas().subscribe({
    //     next: (data) => {
    //       this.visibleError = false;
    //       this.plataformas = data;
    //     },
    //     error: (err) => {
    //       this.controlarError(err);
    //     }
    //   });
    // }

    getPlataformas() {
      this.tiendaService.getPlataformas().subscribe({
        next: (data) => {
          this.visibleError = false;
          this.plataformas = data;
          
          // Aquí puedes hacer el console.log para verificar que los datos están llegando bien
          console.log('Plataformas:', this.plataformas);
    
          // Si deseas iterar por cada plataforma
          this.plataformas.forEach(plataforma => {
            console.log('Plataforma:', plataforma);
          });
        },
        error: (err) => {
          this.controlarError(err);
        }
      });
    }

    
  guardar() {
    if (this.juego.idJuego === 0) {
      this.tiendaService.addJuego(this.juego).subscribe({
        next: (data) => {
          this.visibleError = false;          
          this.getJuegos();
          this.formulario.reset();
        },
        error: (err) => {
          this.controlarError(err);
        }
      });
    } else {
      this.tiendaService.updateJuego(this.juego).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.cancelarEdicion();
          this.formulario.reset();
          this.getJuegos();
        },
        error: (err) => {
          this.visibleError = true;
            this.mensajeError = 'Se ha producido un error';
        }
      });
    }
  }

  edit(juego: IJuego) {
    this.juego = { ...juego };
  }

  cancelarEdicion() {
    this.juego = {
      idJuego: 0,
      nombre: '',
      precio: 0,
      disponible: true,
      lanzamiento: new Date(),
      pegi: 0,
      idCategoria: 0,
      nombreCategoria: '',
      idPlataforma: 0,
      nombrePlataforma: '',
      idDesarrolladora: 0,
      nombreDesarrolladora: ''
    };
  }

    // guardar() {
    //   console.log(this.juego);
    //   this.tiendaService.addJuego(this.juego).subscribe({
    //     next: (data: any) => {
    //       this.visibleError = false;
    //       this.formulario.reset();
    //       this.getJuegos();
    //     },
    //     error: (err: any) => {
    //       this.visibleError = true;
    //       this.mensajeError = "no se está enviando el formulario";
    //     }
    //   });
    // }

    confirmDelete(juego: IJuego) {
      this.confirmationService.confirm({
        message: `Eliminar el juego ${juego.nombre}?`,
        header: 'Estás seguro?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí´',
        acceptButtonStyleClass: 'p-button-danger',
        accept: () => this.deleteJuego(juego.idJuego!)
      });
    }
  
    deleteJuego(idJuego: number) {
      this.tiendaService.deleteJuego(idJuego).subscribe({
        next: (data: IJuego) => {
          this.visibleError = false;
          this.getJuegos();
        },
        error: (err: any) => {
          this.visibleError = true;
          this.mensajeError = err.error.msg;
        }
      });
    }


    // ------------
    controlarError(err: any){
      this.visibleError = true;
      if (err.error && typeof err.error === 'object' && err.error.message) {
        this.mensajeError = err.error.message;
      } else if (typeof err.error === 'string') {
        // Si `err.error` es un string, se asume que es el mensaje de error
        this.mensajeError = err.error;
      } else {
        // Maneja el caso en el que no se recibe un mensaje de error útil
        this.mensajeError = 'Se ha producido un error inesperado';
      }
    }
}
