import { Estudante } from './Estudante';
import { PagamentoStatus } from './pagamento-status.enum';
import { TipoPagamento } from './tipo-pagamento.enum';

export interface Pagamento {
  id: number;
  data: string; // ou Date, mas como vem de API, string é mais seguro
  valor: number;
  tipoPagamento: TipoPagamento;
  pagamentoStatus: PagamentoStatus;
  file: string;
  estudante: Estudante;
}
