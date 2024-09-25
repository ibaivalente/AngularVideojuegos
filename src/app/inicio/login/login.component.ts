import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppService } from '../../services/app.service';
import { AuthGuard } from '../../guards/auth-guard.service';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  infoLogin: ILogin = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private appService: AppService, private messageService: MessageService, private authGuard: AuthGuard) {}
  
  ngOnInit() {
    if (this.authGuard.isLoggedIn()){
      this.router.navigateByUrl('tienda/juegos');
    }
  }
  
  login() {
    this.appService.login(this.infoLogin).subscribe({
      next: (data) => {
        localStorage.setItem('usuario', JSON.stringify(data));
        this.router.navigate([`/tienda`], { replaceUrl: true });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales erróneas' });
      }
    });
  }
}
