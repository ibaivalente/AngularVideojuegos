import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { TiendaService } from '../tienda.service';
import { ICategoria } from '../tienda.interfaces';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class CategoriasComponent implements OnInit {
  constructor(private tiendaService: TiendaService, 
    private confirmationService: ConfirmationService,
    private authGuard: AuthGuard) {}

  @ViewChild('formulario') formulario!: NgForm;
  visibleError = false;
  mensajeError = '';
  categorias: ICategoria[] = [];
  visibleConfirm = false;

  categoria: ICategoria = {
    idCategoria: 0,
    genero: '',
    subgenero: ''
  };

  ngOnInit(): void {
    this.getCategorias();
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

  guardar() {
    if (this.categoria.idCategoria === 0) {
      this.tiendaService.addCategoria(this.categoria).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.getCategorias();
          this.formulario.reset();
        },
        error: (err) => {
          this.controlarError(err);
        }
      });
    } else {
      this.tiendaService.updateCategoria(this.categoria).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.cancelarEdicion();
          this.formulario.reset();
          this.getCategorias();
        },
        error: (err) => {
          this.controlarError(err);
        }
      });
    }
  }

  edit(categoria: ICategoria) {
    this.categoria = { ...categoria };
  }

  cancelarEdicion() {
    this.categoria = {
      idCategoria: 0,
      genero: '',
      subgenero: ''
    };
  }

  confirmDelete(categoria: ICategoria) {
    this.confirmationService.confirm({
      message: `¿Eliminar la categoría ${categoria.genero}${categoria.subgenero ? ` - ${categoria.subgenero}` : ''}?`,
      header: '¿Estás seguro?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteCategoria(categoria.idCategoria!)
    });
  }

  deleteCategoria(id: number) {
    this.tiendaService.deleteCategoria(id).subscribe({
      next: (data) => {
        this.visibleError = false;
        this.formulario.reset({
          genero: '',
          subgenero: ''
        });
        this.getCategorias();
      },
      error: (err) => {
        this.controlarError(err);
      }
    });
  }


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