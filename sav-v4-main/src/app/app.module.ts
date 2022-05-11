
import { NgModule } from '@angular/core'
import { CommonModule, } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { FileUploadModule } from 'ng2-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './services/api.service';

// COMPOENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login.component';
import { SearchComponent } from './components/search.component';
import { MainComponent } from './pages/main.component';
import { NotFoundComponent } from './pages/notfound.component';
import { SuiviReparateurComponent } from './components/suivi-reparateur.component';
import { RecuReparateurComponent } from './components/recu-reparateur.component';
import { ConsultInterComponent } from './components/consult-inter.component';
import { ConsultSwapComponent } from './components/consult-swap.component';
import { StockRouterComponent } from './components/stock-retour.component';
import { DechargeComponent } from './components/decharge.component';
import { NotifWaitComponent } from './components/notif-wait.component';
import { SwapComponent } from './components/swap.component';

@NgModule({
  declarations: [
    AppComponent, SearchComponent, LoginComponent, MainComponent, NotFoundComponent,
    SuiviReparateurComponent, RecuReparateurComponent, ConsultInterComponent,
    ConsultSwapComponent, StockRouterComponent, DechargeComponent, NotifWaitComponent,
    SwapComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    PdfViewerModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
