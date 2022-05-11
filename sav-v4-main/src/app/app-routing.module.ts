import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultInterComponent } from './components/consult-inter.component';
import { ConsultSwapComponent } from './components/consult-swap.component';
import { DechargeComponent } from './components/decharge.component';
import { NotifWaitComponent } from './components/notif-wait.component';
import { RecuReparateurComponent } from './components/recu-reparateur.component';
import { SearchComponent } from './components/search.component';
import { StockRouterComponent } from './components/stock-retour.component';
import { SuiviReparateurComponent } from './components/suivi-reparateur.component';
import { SwapComponent } from './components/swap.component';
import { WelcomeComponent } from './components/welcome.component';
import { IsSignedInGuard } from './is-signed-in.guard';
import { LoginComponent } from './pages/login.component';
import { MainComponent } from './pages/main.component';
import { NotFoundComponent } from './pages/notfound.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [IsSignedInGuard],

    children: [
      { path: '', component: WelcomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'decharge', component: DechargeComponent },

      { path: 'consult/intervention', component: ConsultInterComponent },
      { path: 'consult/swap', component: ConsultSwapComponent },

      { path: 'suivi/retour', component: StockRouterComponent },
      { path: 'suivi/reparateur/:id', component: SuiviReparateurComponent },

      { path: 'recu/reparateur/:id', component: RecuReparateurComponent },

      { path: 'swap/items', component: SwapComponent },

      { path: 'notification/waiting', component: NotifWaitComponent },
      { path: '404', component: NotFoundComponent }
    ]
  },
  { path: '**', redirectTo: "404" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
