import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaComponent } from './tienda.component';
import { JuegosComponent } from './juegos/juegos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { DesarrolladorasComponent } from './desarrolladoras/desarrolladoras.component';
import { PlataformasComponent } from './plataformas/plataformas.component';
import { TiendaRoutingModule } from './tienda-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { Toast, ToastModule } from 'primeng/toast';
import { TiendaService } from './tienda.service';

@NgModule({
  declarations: [
    TiendaComponent,
    JuegosComponent,
    CategoriasComponent,
    DesarrolladorasComponent,
    PlataformasComponent
  ],
  imports: [
    CommonModule,
    TiendaRoutingModule,
    SharedModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule
  ],
  providers: [TiendaService]
})
export class TiendaModule { }
