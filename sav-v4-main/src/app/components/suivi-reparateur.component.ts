import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({
    selector: 'app-suviRepa',
    templateUrl: 'suivi-reparateur.component.html',
})

export class SuiviReparateurComponent implements OnInit {
    workFlowType: String | null = "";

    invoiceList: any[] = [];
    dechargeItems: any[] = [];
    selectedSuplier = "One Tel";

    invoice: any = {
        id: "",
        shopid: 0,
        shop: "",
        date: "",
        shown: false
    };

    constructor(private apiService: ApiService, private route: ActivatedRoute) {
        var user = JSON.parse(localStorage.getItem("user")!)
        console.log(user)
        this.invoice.shop = `${user.firstName} ${user.lastName}`;
        this.invoice.shopid = user.id;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.workFlowType = params['id'];
            console.log();
            this.apiService.getPendingIntervention({ workflow: this.workFlowType }).subscribe((result: any) => {
                this.invoiceList = (result as any[]).map((val) => {
                    val.selected = false;
                    return val;
                });
            });
        });
    }

    selectAll() {
        console.log(this.invoiceList);
        this.invoiceList = this.invoiceList.map((v) => { v.selected = !v.selected; return v; });
    }
    decharge() {
        this.dechargeItems = this.invoiceList.filter((v) => { if (v.selected) return v; });
        var interventions: any[] = [];
        this.dechargeItems.forEach((v) => interventions.push({ id: v.id, laststatus: v.intervention_status[0].obs }));

        var data = {
            userid: this.invoice.shopid ?? 1,
            destination: this.selectedSuplier,
            invoices: interventions,
        }
        console.log(data);

        this.apiService.createDischarge(data).subscribe((res: any) => {
            this.invoice.id = res.id;
            this.invoice.date = res.createdAt.split("T")[0];
        });
        this.invoice.shown = true;
    }

    PrintElem() {
        var mywindow = window.open('', 'PRINT', 'height=400,width=1000')!;

        mywindow.document.write('<html><head><title>' + document.title + '</title>');
        mywindow.document.write('<link rel="stylesheet" href="http://127.0.0.1:4200/styles.css">');
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