import { Component, ViewChild } from '@angular/core';
import { Slides, Tabs } from 'ionic-angular';

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

  @ViewChild("menuTabs") menuTabs: Tabs;
  @ViewChild(Slides) slides: Slides;

	slideChange(){
  //console.log(this.slides.getActiveIndex());
   if(this.slides.getActiveIndex() == 0){
      this.menuTabs.select(0);
      this.slides.slideTo(0);
    }
    if(this.slides.getActiveIndex() == 1){
      this.menuTabs.select(1);
      this.slides.slideTo(1);
    }
    if(this.slides.getActiveIndex() == 2){
      this.menuTabs.select(2);
      this.slides.slideTo(2);
    }
	}

  tabChange(){
    //console.log("tabchange");
    //console.log(this.menuTabs.getSelected().index);
    if(this.menuTabs.getSelected().index == 0){
      this.menuTabs.select(0);
      this.slides.slideTo(0);
    }
    if(this.menuTabs.getSelected().index == 1){
      this.menuTabs.select(1);
      this.slides.slideTo(1);
    }
    if(this.menuTabs.getSelected().index == 2){
      this.menuTabs.select(2);
      this.slides.slideTo(2);
    }
  }
  

}
