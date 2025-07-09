import { Component, OnInit, ViewChild } from '@angular/core';
import { Estudante } from '../model/Estudante';
import { Pagamento } from '../model/Pagamento';
import { MatTableDataSource } from '@angular/material/table';
import { EstudantesService } from '../services/estudantes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-estudante-details',
  templateUrl: './estudante-details.component.html',
  styleUrl: './estudante-details.component.scss'
})
export class EstudanteDetailsComponent implements OnInit{

  estudanteCodigo!: string;
  pagamentosEstudante !: Array<Pagamento>;
  pagamentoDataSource !: MatTableDataSource<Pagamento>;
  
  public displayedColumns: string[] = ['id', 'data', 'valor', 'tipoPagamento', 'pagamentoStatus', 'nome'];

  isLoading: boolean = true; // Variável para controlar o estado de carregamento

  // @ViewChild é um decorador de propriedades que configura uma consulta de visualização. O detector de alterações procura o primeiro elemento
  // ou a diretiva correspondente ao seletor no DOM da visualização. Se o DOM da visualização for alterado e um novo filho corresponder ao seletor, a propriedade será atualizada.
  // MatPaginator é o componente para navegação entre informações paginadas.
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Contêiner para MatSortables para gerenciar o estado de classificação e fornecer parâmetros de classificação padrão.
  // MatSort é o componente para ordenação de tabelas.
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private estudanteService: EstudantesService, 
    private snackBar: MatSnackBar, 
    private activatedRoute: ActivatedRoute) {}

  // O método ngOnInit é chamado quando o componente é inicializado
  // A funcionaldiade deste método é buscar os pagamentos do estudante com base no código do estudante obtido da rota ativa, se não houver pagamentos, exibe uma mensagem de erro
  ngOnInit(): void {
    this.estudanteCodigo = this.activatedRoute.snapshot.paramMap.get('codigo')!;

    this.estudanteService.getPagamentoDeEstudantes(this.estudanteCodigo).subscribe({
      next: (value) => {
        this.pagamentosEstudante = value;  // Aqui, é atribuído o valor retornado do serviço aos pagamentos do estudante
        
        if (this.pagamentosEstudante.length === 0) {
          this.snackBar.open('Nenhum pagamento encontrado para este estudante', 'Fechar', { duration: 3000, panelClass: ['red-snackbar']});
        }

        this.pagamentoDataSource = new MatTableDataSource<Pagamento>(this.pagamentosEstudante);  // Aqui, é inicializado o MatTableDataSource com os pagamentos do estudante

        // Aguarda o ciclo de renderização para garantir que sort e paginator existam
          setTimeout(() => {
            this.pagamentoDataSource.sort = this.sort;           // Define o sort para a dataSource
            this.pagamentoDataSource.paginator = this.paginator; // Define o paginator para a dataSource
          });

        this.isLoading = false;  // Define isLoading como false após carregar os pagamentos
      },
      error: (error) => {
        console.log('Erro ao carregar os pagamentos do estudante', error);
        this.isLoading = false; 
        this.snackBar.open('Erro ao carregar os pagamentos do estudante', 'Fechar', { duration: 3000, panelClass: ['red-snackbar']});
      }
    });
  }

}
