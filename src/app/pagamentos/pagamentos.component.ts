import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrl: './pagamentos.component.scss'
})
export class PagamentosComponent {

  public pagamentos: any;
  public dataSource: any;
  public displayedColumns = ['id', 'data', 'valor', 'tipoPagamento', 'pagamentoStatus', 'nome'];

  /* @ViewChild é um decorador de propriedades que configura uma consulta de visualização. O detector de alterações procura o primeiro elemento 
   * ou a diretiva correspondente ao seletor no DOM da visualização. Se o DOM da visualização for alterado e um novo filho corresponder ao seletor, 
   * a propriedade será atualizada.
   * MatPaginator é o componente para navegação entre informações paginadas.  */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /* Contêiner para MatSortables para gerenciar o estado de classificação e fornecer parâmetros de classificação padrão.  */
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get('http://localhost:8080/pagamentos').subscribe({
      next: (data: any) => {
        this.pagamentos = data;                                     // Atribui os dados recebidos à variável pagamentos
        this.dataSource = new MatTableDataSource(this.pagamentos);  // Cria uma nova instância de MatTableDataSource com os pagamentos
        this.dataSource.paginator = this.paginator;                 // Define o paginator para a dataSource
        this.dataSource.sort = this.sort;                           // Define o sort para a dataSource
      }, 
      error: (error: any) => {
        console.error('Erro ao carregar pagamentos:', error);       // Exibe um erro no console caso a requisição falhe
      }
    });
  }

}
