import { Component, OnInit, ViewChild } from '@angular/core';
import { TiendaService } from '../tienda.service';
import { NgForm } from '@angular/forms';
import { IPlataforma } from '../tienda.interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthGuard } from 'src/app/guards/auth-guard.service';


@Component({
  selector: 'app-plataformas',
  templateUrl: './plataformas.component.html',
  styleUrls: ['./plataformas.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PlataformasComponent implements OnInit{
  constructor(private tiendaService: TiendaService, 
    private confirmationService: ConfirmationService,
    private authGuard: AuthGuard) {}

  @ViewChild('formulario') formulario!: NgForm;
  visibleError = false;
  mensajeError = '';
  plataformas: IPlataforma[] = [];
  visibleConfirm = false;

  plataforma: IPlataforma = {
    idPlataforma: 0,
    nombre: ''
  };

  ngOnInit(): void {
    this.getPlataformas();
  }

  getPlataformas() {
    this.tiendaService.getPlataformas().subscribe({
      next: (data) => {
        this.visibleError = false;
        this.plataformas = data;
      },
      error: (err) => {
        this.controlarError(err);
      }
    });
  }

  cancelarEdicion() {
    this.plataforma = 
    {
      idPlataforma: 0,
      nombre: ''
    };
  }

  guardar() {
    if (this.plataforma.idPlataforma === 0) {
      this.tiendaService.addPlataformas(this.plataforma).subscribe({
      next: (data) => {
        this.visibleError = false;
        this.getPlataformas();
        this.formulario.reset();
      },
      error: (err) => {
        this.controlarError(err);
      }
    });
    } else {
      this.tiendaService.updatePlataformas(this.plataforma).subscribe ({
      next: (data) => {
        this.visibleError = false;
        this.cancelarEdicion();
        this.formulario.reset();
        this.getPlataformas();
        },
        error: (err) => {
        this.controlarError(err);
        }
      });
    }
  }

  edit(plataforma: IPlataforma) {
    this.plataforma = { ...plataforma };
  }

  deletePlataforma(id: number) {
    this.tiendaService.deletePlataformas(id).subscribe({
      next: (data: IPlataforma) => {
        this.visibleError = false;
        this.formulario.reset({
          nombrePlataforma: ''
        })
        this.getPlataformas();
      },
      error: (err) => {
        this.controlarError(err);
      }
    });
  }

  confirmDelete(plataforma: IPlataforma) {
    this.confirmationService.confirm({
      message: `Eliminar la plataforma ${plataforma.nombre}?`,
      header: '¿Estás seguro?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deletePlataforma(plataforma.idPlataforma!)
    });
  }

  controlarError(err: any){
    this.visibleError = true;
    if (err.error && typeof err.error == 'object' && err.error.message) {
      this.mensajeError = err.error.message;
    } else if (typeof err.error === 'string') {
      // si `err.error` es un string, se asume que es el mensaje de error
      this.mensajeError = err.error;
    } else {
      // Maneja el caso en el que no se recibe un mensaje de error útil
      this.mensajeError = 'Se ha producido un error inesperado';
    }
  }
}
