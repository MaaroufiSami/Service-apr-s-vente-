import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
    selector: 'app-NotifWait',
    templateUrl: 'notif-wait.component.html',
})

export class NotifWaitComponent {

    app: any = {
        showPDF: false,
        pdfToShow: "",
        currentItem: {},
        callShowPdf: (item: any) => {
            this.app.showPDF = true;
            this.app.currentItem = item;
        },
        selectedOption: "",
        itemsList: []
    }
    constructor(private apiService: ApiService) {
        var user = JSON.parse(localStorage.getItem("user")!)
        this.app.shop = `${user.firstName} ${user.lastName}`
    }
    onOptionChange() {
        console.log(`new option is ${this.app.selectedOption}`)

        this.apiService.getwaitednotif({ status: this.app.selectedOption }).subscribe((res: any) => {
            this.app.itemsList = res;
        });
    }

    acceptPDF() {
        var _itm = {
            id: this.app.currentItem.id,
            obs: "En cours de réparation",
            status: "En Attente Récuperation PC",
            local: this.app.currentItem.createdBy,
            disch: true,
            ispdfClosed: true,

        };
        this.afterPDF(_itm)
    }
    refusePDF() {
        var _itm = {
            id: this.app.currentItem.id,
            obs: "",
            status: "En attente récupération PC",
            local: this.app.currentItem.createdBy,
            outStore: true,
            ispdfClosed: true,
        };
        _itm.obs = this.app.currentItem.status == "En attente de payment devis" ? "Devis refusé" : "Expertise refusé";
        this.afterPDF(_itm)
    }

    afterPDF(_itm: any) {
        _itm.statusId = this.app.currentItem.statusId

        this.apiService.closePdfNdNewStatus(_itm).subscribe((res) => {
            this.onOptionChange()
            this.app.showPDF = false
        });
    }
}