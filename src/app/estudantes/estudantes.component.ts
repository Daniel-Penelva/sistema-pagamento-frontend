import { Component, OnInit, ViewChild } from '@angular/core';
import { Estudante } from '../model/Estudante';
import { EstudantesService } from '../services/estudantes.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrl: './estudantes.component.scss'
})
export class EstudantesComponent implements OnInit{

  estudantes!: Array<Estudante>;

  public dataSource!: MatTableDataSource<Estudante>; // MatTableDataSource é uma fonte de dados para tabelas do Angular Material 
  public displayedColumns = ['id', 'nome', 'sobrenome', 'codigo', 'programaId'];

  /* @ViewChild é um decorador de propriedades que configura uma consulta de visualização. O detector de alterações procura o primeiro elemento 
   * ou a diretiva correspondente ao seletor no DOM da visualização. Se o DOM da visualização for alterado e um novo filho corresponder ao seletor, 
   * a propriedade será atualizada.
   * MatPaginator é o componente para navegação entre informações paginadas.  */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    /* Contêiner para MatSortables para gerenciar o estado de classificação e fornecer parâmetros de classificação padrão.  */
    @ViewChild(MatSort) sort!: MatSort;

  public isLoading: boolean = true; // Variável para controlar o estado de carregamento

  constructor(private estudantesService: EstudantesService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
      this.estudantesService.getAllEstudantes().subscribe({
        next: (value: any) => {
          this.estudantes = value;
          this.dataSource = new MatTableDataSource<Estudante>(this.estudantes);  // Cria uma nova instância de MatTableDataSource com os pagamentos

          // Aguarda o ciclo de renderização para garantir que sort e paginator existam
          setTimeout(() => {
            this.dataSource.sort = this.sort;           // Define o sort para a dataSource
            this.dataSource.paginator = this.paginator; // Define o paginator para a dataSource
          });

          this.isLoading = false;
        },
        error: (err: any) => {
          console.error('Erro ao carregar pagamentos:', err);
          this.isLoading = false; // Define isLoading como false mesmo em caso de erro
          this.snackBar.open('Erro ao carregar estudantes', 'Fechar', { duration: 5000 });
        }
      });
  }

}
