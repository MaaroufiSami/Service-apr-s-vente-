import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
    selector: 'app-stockRetour',
    templateUrl: 'stock-retour.component.html',
})

export class StockRouterComponent {

    app: any = {
        optionList: ["TerminalMobile"],
        selectedOption: "TerminalMobile",

        screen1: true,
        screen2: false,
        showScreen1: () => { this.app.screen1 = true; this.app.screen2 = false; },
        showScreen2: () => { this.app.screen1 = false; this.app.screen2 = true; },

        swapItems: [],
        dechargeItems: [],
        shopId: 1,
        shop: "",
    }

    constructor(private apiService: ApiService) {
        var user = JSON.parse(localStorage.getItem("user")!)
        this.app.shop = `${user.firstName} ${user.lastName}`;
        this.app.shopid = user.id ?? 1;
        this.search();
    }

    search() {
        this.apiService.getSwapPending(this.app.selectedOption).subscribe((res: any) => {
            this.app.swapItems = res.map((v: any) => { v.selected = false; return v; });
            this.app.showScreen1();
        });
    }
    selectAll() {
        this.app.swapItems = this.app.swapItems.map((v: any) => { v.selected = !v.selected; return v; });
    }
    decharge() {
        this.app.dechargeItems = this.app.swapItems.filter((v: any) => { if (v.selected) return v; });
        var interventions: any[] = [];
        this.app.dechargeItems.forEach((v: any) => interventions.push({ id: v.id, status: "Envoie vers Entrepot", device: v.device.imei }));

        this.apiService.createSwapDischarge({ userid: this.app.shopid, dechargeItems: interventions }).subscribe((res: any) => {
            this.app.invoice = {
                id: res.invoice.id,
                date: res.invoice.createdAt.split('T')[0]
            };
            this.app.showScreen2();
        });
    }
    PrintElem() {
        var mywindow = window.open('', 'PRINT', 'height=400,width=1000')!;

        mywindow.document.write('<html><head><title>' + document.title + '</title>');
        mywindow.document.write('<link rel="stylesheet" href="styles.css">');
        mywindow.document.write('</head><body >');
        mywindow.document.write(document.getElementById("decharge")!.innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        setTimeout(() => {
            mywindow.print();
            mywindow.close();
        }, 1000);


        return true;
    }
}