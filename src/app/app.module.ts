import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { LoginEPage } from '../pages/login-e/login-e';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SaldoPage } from '../pages/saldo/saldo';
import { RedeCredenciadaPage } from '../pages/rede-credenciada/rede-credenciada';
import { TransacoesPage } from '../pages/transacoes/transacoes';

// import { AuthService } from '../providers/auth-service';
import { Dialogs } from '@ionic-native/dialogs';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LoginEPage,
    TabsPage,
    TransacoesPage,
    RedeCredenciadaPage,
    SaldoPage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LoginEPage,
    TabsPage,
    TransacoesPage,
    RedeCredenciadaPage,
    SaldoPage
  ],
  providers: [
    StatusBar,
    Keyboard,
    SplashScreen,
    ToastController,
    Dialogs,
    // AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
