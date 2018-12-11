import { Component } from '@angular/core';

import { VendaPage } from '../venda/venda';
import { TransacoesEPage } from '../transacoes-e/transacoes-e';

@Component({
  templateUrl: 'tabs-e.html'
})
export class TabsEPage {

  tab1Root = VendaPage;
  tab2Root = TransacoesEPage;

  constructor() {

  }

  

}
