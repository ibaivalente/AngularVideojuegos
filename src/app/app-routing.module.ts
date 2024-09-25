import { NgModule, inject } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './inicio/login/login.component';
import { NotFoundComponent } from './inicio/not-found/not-found.component';
import { AuthGuard } from './guards/auth-guard.service';

export const canActivate = (authGuard = inject(AuthGuard)) => authGuard.isLoggedIn();

const appRoutes: Routes = [
  { path: '', redirectTo: '/tienda', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'tienda',
    loadChildren: () => import('./tienda/tienda.module').then((m) => m.TiendaModule),
    canActivate: [() => canActivate()]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}