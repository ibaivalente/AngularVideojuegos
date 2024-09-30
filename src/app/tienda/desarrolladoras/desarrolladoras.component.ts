import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { TiendaService } from '../tienda.service';
import { NgForm } from '@angular/forms';
import { IDesarrolladora } from '../tienda.interfaces';

@Component({
  selector: 'app-desarrolladoras',
  templateUrl: './desarrolladoras.component.html',
  styleUrls: ['./desarrolladoras.component.css'],
  providers:[ConfirmationService,MessageService]
})


  export class DesarrolladorasComponent implements OnInit {
    constructor(private tiendaService: TiendaService, 
      private confirmationService: ConfirmationService,
      private authGuard: AuthGuard) {}
  
    @ViewChild('formulario') formulario!: NgForm;
    visibleError = false;
    mensajeError = '';
    desarrolladoras:IDesarrolladora[] = [];
    visibleConfirm = false;
  
    desarrolladora: IDesarrolladora = {
      idDesarrolladora: 0,
      nombre: '',
      indie:false,
      pais:''
      
    };
  
    ngOnInit(): void {
      this.getDesarrollaodoras();
      this.desarrolladora.indie=Boolean(this.desarrolladora.indie);////
      
    }

    getDesarrollaodoras() {
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
  
    guardar() {
     this.desarrolladora.indie=Boolean(this.desarrolladora.indie);
      
      // Añadido por el tema de convertir el "true" a true
     // Probando para git
      if (this.desarrolladora.idDesarrolladora === 0) {
        this.tiendaService.addDesarrolladora(this.desarrolladora).subscribe({
          next: (data) => {
            this.visibleError = false;
            this.getDesarrollaodoras();
            this.formulario.reset();
          },

          error: (err) => {
            this.controlarError(err);
          }
        }); 
      } else {
        this.tiendaService.updateDesarroladora(this.desarrolladora).subscribe({
          next: (data) => {
            this.visibleError = false;
            this.cancelarEdicion();
            this.formulario.reset();
            this.getDesarrollaodoras();
          },
          error: (err) => {
            this.controlarError(err);
          }
        });
      }
    }
  
    edit(desarrolladora: IDesarrolladora) {
      
      this.desarrolladora = { ...desarrolladora };
      
      //this.desarrolladora.Indie = this.desarrolladora.Indie ? 'true':'false';
      console.log(this.desarrolladora)
      //console.log(desarrolladora); // añadido para ver lo que hace
    }
  

    // // Con esto pongo los valores iniciales

    cancelarEdicion() {
      this.desarrolladora = {
        idDesarrolladora: 0,
        nombre: '',
        indie:true,
        pais:''
      };
    }
  
    confirmDelete(desarrolladora: IDesarrolladora) {
      this.confirmationService.confirm({
        message: `Eliminar la desarrolladora  ${desarrolladora.nombre}?`,
        header: '¿Estás seguro?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí',
        acceptButtonStyleClass: 'p-button-danger',
        accept: () => this.deleteDesarrolladora(desarrolladora.idDesarrolladora!)
      });
    }
  
    deleteDesarrolladora(IdDesarrolladora: number) {
      this.tiendaService.deleteDesarrolladora(IdDesarrolladora).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.formulario.reset({
            nombre: ''
          });
          this.getDesarrollaodoras();
        },
        error: (err) => {
          this.controlarError(err);
        }
      });
    }
  
   // Tema de controlar el error 
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
