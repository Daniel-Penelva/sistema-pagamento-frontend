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
}
