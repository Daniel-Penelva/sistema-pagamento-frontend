import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthorizationGuard {

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authService.isAuthenticated) {
      let requiredRoles = route.data['roles'] as Array<string>;   // pega os roles necessários da rota
      let userRoles = this.authService.roles;                     // pega os roles do usuário logado

      for(let role of userRoles) {                                // percorre os roles do usuário
        if(requiredRoles.includes(role)) {                        // verifica se algum dos roles do usuário está entre os roles necessários
          return true;                                            // se sim, libera o acesso
        }
      }
    }
    this.snackBar.open('Acesso negado. Você não tem permissão para acessar está página.', 'Fechar', { duration: 5000 }); // exibe uma mensagem de erro
    this.router.navigateByUrl('/admin');                          // redireciona para a página principal
    return false;                                                 // se não, bloqueia o acesso e redireciona para a página de login
  }
}
