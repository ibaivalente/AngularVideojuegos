import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiendaComponent } from './tienda.component';
import { JuegosComponent } from './juegos/juegos.component';
import { PlataformasComponent } from './plataformas/plataformas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { DesarrolladorasComponent } from './desarrolladoras/desarrolladoras.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TiendaComponent,
    children: [
      { path: '', redirectTo: '/tienda/juegos', pathMatch: 'full' },
      { path: 'juegos', component: JuegosComponent },
      { path: 'plataformas', component: PlataformasComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'desarrolladoras', component: DesarrolladorasComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class TiendaRoutingModule {}