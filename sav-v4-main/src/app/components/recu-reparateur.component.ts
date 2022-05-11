import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
@Component({
    selector: 'app-recuRepa',
    templateUrl: 'recu-reparateur.component.html',
})

export class RecuReparateurComponent implements OnInit {
    workFlowType = "";
    optionList = [
        "Devis avec terminal",
        "Devis sans terminal",
        "Expertise avec terminal",
        "Expertise sans terminal",
        "Réparé",
        "Irréparable",
        "Remplacé",
        "Sortie sans réparation",
        "Devis refusé",
        "Expertise refusé"
    ];

    selectedOption = this.optionList[4];
    invoiceList: any[] = [];
    opShop = "";

    selectedFiles?: FileList;
    currentFile?: File;
    progress = 0;
    message = '';
    fileInfos?: Observable<any>;

    constructor(private apiService: ApiService, private route: ActivatedRoute) {
        var user = JSON.parse(localStorage.getItem("user")!)
        this.opShop = `${user.firstName ?? "shop"} ${user.lastName ?? "shop"}`;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.workFlowType = params['id'];
            this.apiService.getReturnIntervention({ workflow: this.workFlowType }).subscribe((result: any) => {
                this.invoiceList = result.map((v: any) => {
                    v.remp = 1;
                    v.operation = {
                        marque: null,
                        modele: null,
                        newIMEI: null,
                        pdfLink: null,
                        amount: null
                    }
                    return v;
                });
                console.log(result);
            })
        });
    }

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    
    upload(_itm: any): void {
        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);
            if (file) {
                this.apiService.upload(file, _itm).subscribe((res) => {
                    console.log(res);
                    this.invoiceList = this.invoiceList.filter((v) => v.id != _itm.id ? v : null);
                });
            }
            else {
                console.log("error with file")
            }
        }
        else{
            console.log("not selected file")

        }
    }
    setInvocieStatus(item: any) {
        var _itm = {
            id: item.id,
            obs: this.selectedOption,
            status: "En attente récupération client suite réparateur externe",
            shop: this.opShop,
            operation: item.operation,
            ispdfClosed: false,
            outStore: false,
        };
        if (this.selectedOption == "Devis avec terminal" || this.selectedOption == "Devis sans terminal") {
            _itm.status = "En attente de payment devis";
            _itm.obs = "En attente de payment devis";
            console.log(_itm);
            this.upload(_itm);
        } else if (this.selectedOption == "Expertise avec terminal" || this.selectedOption == "Expertise sans terminal") {
            _itm.status = "En attente de validation expertise";
            _itm.obs = "En attente de validation expertise";
            console.log(_itm);
            this.upload(_itm);
        } else {
            this.apiService
                .setEtatIntervention(_itm)
                .subscribe((res) => {
                    this.invoiceList = this.invoiceList.filter((v) => v.id != item.id ? v : null);
                });
        }
    }
}