import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
    selector: 'app-consultInter',
    templateUrl: 'consult-inter.component.html',
})

export class ConsultInterComponent {

    searchCard: any = {
        shown: true,
        show: () => {
            this.searchCard.shown = true;
            this.invListCard.shown = false;
            this.invDetails.shown = false;
            this.invDetails.showPDF = false;

        },
        searchKey: "clientId",
        searchValue: ""
    };

    invListCard: any = {
        shown: false,
        show: () => {
            this.invListCard.shown = true;
            this.invDetails.shown = false;
            this.searchCard.shown = false;
            this.invDetails.showPDF = false;

        },
        itemsList: []
    };

    invDetails: any = {
        shown: false,
        show: () => {
            this.invDetails.shown = true;
            this.searchCard.shown = false;
            this.invListCard.shown = false;
            this.invDetails.showPDF = false;

        },
        showPdf: (pdflink: String) => {
            this.invDetails.pdflink = pdflink;
            this.invDetails.showPDF = true;
            this.invDetails.shown = false;
            this.searchCard.shown = false;
            this.invListCard.shown = false;
        },
        showPDF: false,
        pdflink: null,
        data: [],

        isModalOpen: false,
        openModal() { this.isModalOpen = true },
        closeModal() { this.isModalOpen = false },
    };

    availableClient: any = {
        id: 0,
        shop: "",
        isAvailable: true,
        dateCall: "",
        hourCall: "",
        pec: "OK",
        Comment: ""
    }

    constructor(private apiService: ApiService) {
        var user = JSON.parse(localStorage.getItem("user")!)
        this.availableClient.shop = `${user.firstName ?? "shop"} ${user.lastName ?? "shop"}`;
        this.searchCard.show();
    }

    search() {
        var _itm = JSON.parse(`{ "${this.searchCard.searchKey}": "" }`);
        _itm[this.searchCard.searchKey] = this.searchCard.searchKey == "id"
            ? Number.parseInt(this.searchCard.searchValue)
            : this.searchCard.searchValue;

        this.apiService.searchIntervention({ option: _itm }).subscribe((result: any) => {
            this.invListCard.itemsList = result;
            this.invListCard.show();
        })
    }

    dateFormat(e: string) {
        e = e.replace("T", " ")
        return (e.slice(0, e.length - 5));
    }

    getInvoiceDetails(id: number, status: string) {
        this.invDetails.selected = id;
        this.invDetails.status = status;

        this.apiService.getDetailsIntervention(id).subscribe((res: any) => {
            this.invDetails.data = res.data;
            this.invDetails.available_client = res.available_client;
            this.availableClient.id = id;

            this.invDetails.show();
        });
    }
    setavailableClient() {
        this.availableClient.callAt = `${this.availableClient.dateCall} ${this.availableClient.hourCall}`;
        this.apiService.setavailableClient(this.availableClient).subscribe((res) => {
            console.log(res);
        });
    }
    closeInvoice() {
        var _itm = {
            id: this.invDetails.selected,
            obs: this.invDetails.data[0].obs,
            shop: this.invDetails.data[0].local
        };
        this.apiService.closeIntervention(_itm).subscribe((res: any) => {
            this.invDetails.status = "Cloturée";
            this.invDetails.data = res.data;
        });
    }
    canClose(s: string, e: String) {
        if (e == "Cloturée") return false;
        switch (s) {
            case "Réparé":
                return true;
                break;
            case "Sortie sans réparation":
                return true;
                break;
            case "Expertise refusé":
                return true;
                break;
            case "Devis refusé":
                return true;
                break;
            default:
                return false;
                break;
        }
    }

    // PDF CONTROLLE
    accseptPDF() {
        var _itm = {
            id: this.invDetails.selected,
            obs: "En cours de réparation",
            status: "En Attente Envoi réparateur externe",
            local: this.availableClient.shop,
            disch: true,
            ispdfClosed: true,
        };
        this.apiService.setEtatIntervention(_itm).subscribe((res) => {
            this.getInvoiceDetails(_itm.id, _itm.status);
        });
    }
    refusePDF() {
        var _itm = {
            id: this.invDetails.selected,
            obs: "",
            status: "En attente récupération boutique via réparateur externe",
            local: this.availableClient.shop,
            outStore: true,
            ispdfClosed: true,
        };
        _itm.obs = this.invDetails.data[0].obs == "En attente de payment devis" ? "Devis refusé" : "Expertise refusé";


        this.apiService.setEtatIntervention(_itm).subscribe((res) => {
            this.getInvoiceDetails(_itm.id, _itm.status);
        });
    }
}