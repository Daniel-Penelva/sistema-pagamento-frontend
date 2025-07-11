import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TipoPagamento } from '../model/tipo-pagamento.enum';
import { EstudantesService } from '../services/estudantes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-pagamento',
  templateUrl: './new-pagamento.component.html',
  styleUrl: './new-pagamento.component.scss'
})
export class NewPagamentoComponent implements OnInit {

  pagamentoFormGroup!: FormGroup;
  codigoEstudante!: string;
  tipoPagamento: string[] = [];

  selectedFileName: string | null = null;  // Variável para armazenar o nome do arquivo selecionado. Inicialmente é nulo, pois nenhum arquivo foi selecionado.
  selectedImage: string | ArrayBuffer | null = null;  // Variável para armazenar a imagem selecionada. Inicialmente é nulo, pois nenhuma imagem foi selecionada.

  constructor(
    private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private estudanteService: EstudantesService) { }

  ngOnInit(): void {
    
      for(let tipo in TipoPagamento) {

        this.tipoPagamento = Object.keys(TipoPagamento).filter(key => isNaN(Number(key)));

      this.codigoEstudante = this.activatedRoute.snapshot.paramMap.get('codigoEstudante') || '';

      this.pagamentoFormGroup = this.fb.group({
        data: [null, [Validators.required]],
        valor: [null, [Validators.required, Validators.min(0)]],
        tipoPagamento: [null, [Validators.required]],
        codigoEstudante: [{value: this.codigoEstudante, disabled: true}], // O código do estudante é obtido da rota ativa e atribuído ao FormGroup.
        file: [null, [Validators.required]],
      });
    }
}

criarPagamento(): void {
    const dadosPagamento = this.pagamentoFormGroup.getRawValue(); // Inclui o campo desabilitado

    console.log('Dados do pagamento:', dadosPagamento); // Exibe os dados do pagamento no console para depuração.

    const dateValue = this.pagamentoFormGroup.value.data; // Convertendo a data para o formato Date
    const formattedDate = new Date(dateValue).toISOString().split('T')[0];  // retorna "2025-05-31" // Formatando a data para o formato dd/mm/yyyy
    
    let formData = new FormData(); // Cria um novo FormData para enviar os dados do pagamento.
    formData.set('file', this.pagamentoFormGroup.value.file); // Adiciona o arquivo selecionado ao FormData.
    formData.set('valor', this.pagamentoFormGroup.value.valor); // Adiciona o valor do pagamento ao FormData.
    formData.set('tipoPagamento', this.pagamentoFormGroup.value.tipoPagamento); // Adiciona o tipo de pagamento ao FormData.
    formData.set('data', formattedDate); // Adiciona a data formatada ao FormData para o BD.
    formData.set('codigoEstudante', dadosPagamento.codigoEstudante); // Adiciona o código do estudante ao FormData.

    console.log('Dados do pagamento:', formData); // Exibe os dados do pagamento no console para depuração.

    this.estudanteService.criarPagamento(formData).subscribe({
      next: (pagamento) => {
        Swal.fire({
          title: 'Pagamento criado com sucesso!',
          text: `Pagamento de R$ ${pagamento.valor} realizado com sucesso!`,
          icon: 'success',
          confirmButtonText: 'OK'
        })
      },
      error: (error) => {
        Swal.fire({
          title: 'Erro ao criar pagamento',
          text: error.error.message || 'Ocorreu um erro ao criar o pagamento.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })


    
  }

  // Este método é chamado quando o usuário seleciona um arquivo no input do tipo file.
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement; // Obtém o elemento de input do tipo file.
    const file = input.files?.[0];                  // Obtém o primeiro arquivo selecionado pelo usuário.

    if (file) {
      this.selectedFileName = file.name;                      // Armazena o nome do arquivo selecionado na variável selectedFileName.
      this.pagamentoFormGroup.patchValue({ file: file });     // Atualiza o FormGroup com o arquivo selecionado.
      this.pagamentoFormGroup.get('file')?.markAsTouched();   // Marca o campo 'file' como tocado para que as validações sejam aplicadas.

      // Exibe preview da imagem (se for imagem)
      const reader = new FileReader();                       // Cria um novo FileReader para ler o conteúdo do arquivo.
      reader.onload = () => {                                // Define o que acontece quando a leitura do arquivo é concluída. 
        this.selectedImage = reader.result;                  // Armazena o resultado da leitura (que pode ser uma URL de dados) na variável selectedImage.
      };
      reader.readAsDataURL(file);                            // Lê o arquivo como uma URL de dados (data URL), que é uma representação do arquivo em formato base64.
      console.log('Arquivo selecionado:', file);             // Exibe o arquivo selecionado no console para depuração.
    }
  }

  removeFile(): void {
    this.selectedFileName = null;                           // Limpa o nome do arquivo selecionado.
    this.selectedImage = null;                              // Limpa a imagem selecionada.
    this.pagamentoFormGroup.patchValue({ file: null });     // Atualiza o FormGroup para remover o arquivo selecionado.
    this.pagamentoFormGroup.get('file')?.markAsTouched();   // Marca o campo 'file' como tocado para que as validações sejam aplicadas.
  }

}
