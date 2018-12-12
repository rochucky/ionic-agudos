import { Component, ViewChild } from '@angular/core';
import { App, Slides, Tabs, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { VendaPage } from '../venda/venda';
import { TransacoesEPage } from '../transacoes-e/transacoes-e';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs-e.html'
})

export class TabsEPage {

  tab1Root = VendaPage;
  tab2Root = TransacoesEPage;

  title: any = 'Venda';

  constructor(public app: App, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage,) {

  }

	@ViewChild("menuTabs") menuTabs: Tabs;
  @ViewChild(Slides) slides: Slides;

	slideChange(){
  //console.log(this.slides.getActiveIndex());
   if(this.slides.getActiveIndex() == 0){
      this.title = 'Venda';
      this.menuTabs.select(0);
      this.slides.slideTo(0);
    }
    if(this.slides.getActiveIndex() == 1){
      this.title = 'Transações';
      this.menuTabs.select(1);
      this.slides.slideTo(1);
    }
	}

  tabChange(){
    //console.log("tabchange");
    //console.log(this.menuTabs.getSelected().index);
    if(this.menuTabs.getSelected().index == 0){
      this.title = 'Venda';
      this.menuTabs.select(0);
      this.slides.slideTo(0);
    }
    if(this.menuTabs.getSelected().index == 1){
      this.title = 'Transações';
      this.menuTabs.select(1);
      this.slides.slideTo(1);
    }
  } 

  logout(){
    let confirm = this.alertCtrl.create({
      title: 'Logout',
      subTitle: 'Deseja realmente fazer logout?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Carregando'
            });

            loading.present();

            this.storage.clear().then(() => {
              loading.dismiss();
              this.app.getRootNav().setRoot(HomePage);
              
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
