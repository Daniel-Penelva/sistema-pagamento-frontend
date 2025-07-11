import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagamento } from '../model/Pagamento';
import { environment } from '../../environments/environment';
import { Estudante } from '../model/Estudante';

@Injectable({
  providedIn: 'root'
})
export class EstudantesService {

  constructor(private httpClient: HttpClient) { }

  public getAllPagamentos(): Observable<Array<Pagamento>> {
    return this.httpClient.get<Array<Pagamento>>(`${environment.backendHost}/pagamentos`);
  }

  public getAllEstudantes(): Observable<Array<Estudante>> {
    return this.httpClient.get<Array<Estudante>>(`${environment.backendHost}/estudantes`);
  }

  public getPagamentoDeEstudantes(codigo: string): Observable<Array<Pagamento>> {
    return this.httpClient.get<Array<Pagamento>>(`${environment.backendHost}/estudantes/${codigo}/pagamentos`);
  }

  public criarPagamento(formData: any): Observable<Pagamento> {
    return this.httpClient.post<Pagamento>(`${environment.backendHost}/pagamento`, formData);
  }
}
