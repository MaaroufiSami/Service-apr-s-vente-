import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
})
export class MainComponent {
  title = 'sav-v4';
  navItems = [
    { name: "Rechercher", link: "/search", haveSub: false },
    { name: "Consulter Fiche SAV", link: "consult/intervention", haveSub: false },

    { name: "Consulter Fiche Sinistre", link: "/consult/sinifile", haveSub: false }, // NOT USE

    { name: "Consulter bon sav", link: "/consult/swap", haveSub: false },

    { name: "Consulter Assurance", link: "/consult/assurance", haveSub: false }, // NOT USE
    { name: "Recherche Decharge", link: "/decharge", haveSub: false },
    {
      name: "Suivi point de collecte", haveSub: true, subOpen: false, sub: [
        { name: "Retour Entrepot Terminaux SWAP", link: ["/suivi/retour"] },

      ]
    },
    {
      name: "Go For Swap", haveSub: true, subOpen: false, sub: [
        { name: "Liste des Terminaux", link: ["/swap/items"] },
        { name: "Liste des Terminaux Assurés", link: ["/swap/asured-items"] },

      ]
    },
    { name: "Suivi Fiche Sinistre", link: "/suivi/sinifile", haveSub: false }, // NOT USE

    {
      name: "Suivi Retour Réparateurs", haveSub: true, subOpen: false, sub: [
        { name: "Expedier reparateur interne", link: ["/suivi/reparateur/interne"] },
        { name: "Expedier reparateur externe", link: ["/suivi/reparateur/externe"] },
        { name: "Recu reparateur interne", link: ["/recu/reparateur/interne"] },
        { name: "Recu reparateur externe", link: ["/recu/reparateur/externe"] },
      ]
    },
    {
      name: "Notification", haveSub: true, sub: [
        { name: "Notification sur les devis et exertises en attente de traitement", link: ['/notification/waiting'] }
      ]
    }, // NOT USE 
    { name: "Alerts", link: "/alerts", haveSub: false }, // NOT USE
  ];
  constructor(private router: Router) { }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }


}

