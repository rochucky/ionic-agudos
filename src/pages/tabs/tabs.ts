import { Component } from '@angular/core';

import { SaldoPage } from '../saldo/saldo';
import { RedeCredenciadaPage } from '../rede-credenciada/rede-credenciada';
import { TransacoesPage } from '../transacoes/transacoes';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SaldoPage;
  tab2Root = RedeCredenciadaPage;
  tab3Root = TransacoesPage;

  constructor() {

  }

  

}
