import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  public loginForm!: FormGroup;
  
  showPassword = signal(true);    // Estado reativo para controlar a visibilidade da senha

  constructor(private formBuilder: FormBuilder){}

  // Ao carregar o componente, inicializa o formulário com os campos username e password e defines os valores iniciais como vazios
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;
    console.log(username);
    console.log(password);
  }

  // Método para funcionalidade mostrar/ocultar senha
  togglePasswordVisibility(mouseEvent: MouseEvent) {
    this.showPassword.set(!this.showPassword());      // Alterna o estado
    mouseEvent.stopPropagation();                     // Impede a propagação do evento
  }

}
