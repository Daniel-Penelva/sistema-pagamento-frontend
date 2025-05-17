import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  public loginForm!: FormGroup;
  
  showPassword = signal(true);    // Estado reativo para controlar a visibilidade da senha

  loginInvalido: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){}

  // Ao carregar o componente, inicializa o formulário com os campos username e password e defines os valores iniciais como vazios
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;
    console.log(username);
    console.log(password);

    let auth: boolean = this.authService.login(username, password); // Chama o método de login do AuthService
    if (auth) {
      console.log('Login bem-sucedido');   // Exibir mensagem de sucesso
      this.router.navigateByUrl('/admin'); // Redirecionar para a página administrativa
    } else {
      console.log('Login falhou');  // Exibir mensagem de erro
      this.loginInvalido = true;
    }
  }

  // Método para funcionalidade mostrar/ocultar senha
  togglePasswordVisibility(mouseEvent: MouseEvent) {
    this.showPassword.set(!this.showPassword());      // Alterna o estado
    mouseEvent.stopPropagation();                     // Impede a propagação do evento
  }

}
