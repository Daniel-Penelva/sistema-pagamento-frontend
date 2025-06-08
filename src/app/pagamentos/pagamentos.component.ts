import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pagamento } from '../model/Pagamento';
import { EstudantesService } from '../services/estudantes.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrl: './pagamentos.component.scss'
})
export class PagamentosComponent implements OnInit{

  public pagamentos: Pagamento[] = [];               // Inicializa a lista de pagamentos como um array vazio
  public dataSource!: MatTableDataSource<Pagamento>; // MatTableDataSource é uma fonte de dados para tabelas do Angular Material 
  public displayedColumns = ['id', 'data', 'valor', 'tipoPagamento', 'pagamentoStatus', 'nome'];  // Este array serve apenas para o Angular Material Table saber quais colunas renderizar.

  /* @ViewChild é um decorador de propriedades que configura uma consulta de visualização. O detector de alterações procura o primeiro elemento 
   * ou a diretiva correspondente ao seletor no DOM da visualização. Se o DOM da visualização for alterado e um novo filho corresponder ao seletor, 
   * a propriedade será atualizada.
   * MatPaginator é o componente para navegação entre informações paginadas.  */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /* Contêiner para MatSortables para gerenciar o estado de classificação e fornecer parâmetros de classificação padrão.  */
  @ViewChild(MatSort) sort!: MatSort;

  public isLoading: boolean = true; // Variável para controlar o estado de carregamento

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar, private estudantesService: EstudantesService) {}

  ngOnInit(): void {
    this.estudantesService.getAllPagamentos().subscribe({
      next: (data: any) => {
        this.pagamentos = data;                                     // Atribui os dados recebidos à variável pagamentos
        this.dataSource = new MatTableDataSource(this.pagamentos);  // Cria uma nova instância de MatTableDataSource com os pagamentos
        
        // Aguarda o ciclo de renderização para garantir que sort e paginator existam
        setTimeout(() => {
          this.dataSource.sort = this.sort;           // Define o sort para a dataSource
          this.dataSource.paginator = this.paginator; // Define o paginator para a dataSource
        });

        this.isLoading = false;                                    // Define isLoading como false após os dados serem carregados
      }, 
      error: (error: any) => {
        console.error('Erro ao carregar pagamentos:', error);       // Exibe um erro no console caso a requisição falhe

        this.isLoading = false;                                    // Define isLoading como false mesmo em caso de erro
        this.snackBar.open('Erro ao carregar pagamentos', 'Fechar', { duration: 5000 }); // Exibe uma mensagem de erro para o usuário
        
      }
    });
  }

}
