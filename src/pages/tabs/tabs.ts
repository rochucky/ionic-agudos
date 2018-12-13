import { Component, ViewChild } from '@angular/core';
import { App, Slides, Tabs, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SaldoPage } from '../saldo/saldo';
import { RedeCredenciadaPage } from '../rede-credenciada/rede-credenciada';
import { TransacoesPage } from '../transacoes/transacoes';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SaldoPage;
  tab2Root = RedeCredenciadaPage;
  tab3Root = TransacoesPage;

  title: any = 'Venda';

  constructor(public app: App, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage,) {

  }

  @ViewChild("menuTabs") menuTabs: Tabs;
  @ViewChild(Slides) slides: Slides;

  slideChange(){
  //console.log(this.slides.getActiveIndex());
   if(this.slides.getActiveIndex() == 0){
      this.title = 'Saldo';
      this.menuTabs.select(0);
      this.slides.slideTo(0);
    }
    if(this.slides.getActiveIndex() == 1){
      this.title = 'Rede Credenciada';
      this.menuTabs.select(1);
      this.slides.slideTo(1);
    }if(this.slides.getActiveIndex() == 2){
      this.title = 'Transações';
      this.menuTabs.select(2);
      this.slides.slideTo(2);
    }
  }

  tabChange(){
    //console.log("tabchange");
    //console.log(this.menuTabs.getSelected().index);
    if(this.menuTabs.getSelected().index == 0){
      this.title = 'Saldo';
      this.menuTabs.select(0);
      this.slides.slideTo(0);
    }
    if(this.menuTabs.getSelected().index == 1){
      this.title = 'Rede Credenciada';
      this.menuTabs.select(1);
      this.slides.slideTo(1);
    }
    if(this.menuTabs.getSelected().index == 2){
      this.title = 'Transações';
      this.menuTabs.select(2);
      this.slides.slideTo(2);
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
