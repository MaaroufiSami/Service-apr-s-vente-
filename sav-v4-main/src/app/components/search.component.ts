import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
})

export class SearchComponent {

  deviceRequstInfo: any = {
    isSearch: false,
    isFound: false,
    haveMsg: false,
    msg: ""
  };
  myDevice: any = {
    "imei": "001122",
    "clientid": "12345678",
    "brand": "iphone",
    "model": "6s blanc",
    "status": "vendu",
    "purchase_date": "2022-04-01T01:05:08.000Z",
    "guarantee": 1,
    "nb_retour_sav": 0,
    "insured": 1,
    "batteryId": "1254286529664752",
    "supplier": "ONE TEL"
  };

  createWorkflowFile = false;
  workflowFile: any = {
    battery: 1,
    status: "Bon etat",
    Accessoires: [],
    Panne: [],
    terminal: 1,
    description: "",
    workflow: "Reparateur externe",
    client: {
      "cin": null,
      "firstName": null,
      "lastName": null,
      "phoneNumber1": null,
      "phoneNumber2": null,
      "email": null
    },
  };

  toAddAccess: Array<String> = [];
  toRemoveAccess: Array<String> = [];
  toAddPanne: Array<String> = [];
  toRemovePanne: Array<String> = [];

  invoice: any = {
    shown: false,
    id: 0,
    date: '',
    shop: '',
  };

  swap: any = {
    isModalOpen: false,
    confirmSWAP: false,
    screen1: true,
    showInvoice: false,

    client: {
      "cin": null,
      "firstName": null,
      "lastName": null,
      "phoneNumber1": null,
      "phoneNumber2": null,
      "email": null
    },
    description: '',
    pannes: [],
    replacedBrand: '',
    replacedModel: '',
    replacedIMEI: '',
    price: 0,

    toPanne: [],
    toRemovePanne: [],
    addToSwapPanne: () => {
      this.swap.toPanne.forEach((e: String) => {
        if (!this.swap.pannes.includes(e)) {
          (this.swap.pannes).push(e);
        }
      });
    },
    removeFromSwapPanne: () => {
      this.swap.toRemovePanne.forEach((e: String) => {
        this.swap.pannes = (this.swap.pannes).filter((v: String) => (e == v) ? "" : v);
      });
    },
  }

  constructor(private apiService: ApiService) {
    var user = JSON.parse(localStorage.getItem("user")!)
    this.invoice.shop = `${user.firstName ?? "shop"} ${user.lastName ?? "shop"}`;
  }

  // Search
  searchForIMEI() {
    this.deviceRequstInfo.isSearch = true;
    if (this.myDevice.imei != '')
      this.apiService.searshForIMEI(this.myDevice.imei).pipe().subscribe((data: any) => {
        if (!data.error) {
          this.myDevice = data.device;

          // GET rest of guarantee & FORMAT purchase_date
          var v1 = new Date(this.dateFormat(new Date(this.myDevice.purchase_date), 1)).valueOf() - new Date().valueOf();
          this.myDevice.purchase_date = this.dateFormat(new Date(this.myDevice.purchase_date));

          this.myDevice.rest_guarantee = Math.round((v1) / (1000 * 60 * 60 * 24));

          this.deviceRequstInfo.isFound = true;
          this.createWorkflowFile = false;
          this.invoice.shown = false;
        }
        else {
          this.deviceRequstInfo.haveMsg = true;
          this.deviceRequstInfo.msg = data.msg;
          setTimeout(() => { this.deviceRequstInfo.haveMsg = false; }, 5000);
        }
      });
    else {
      this.deviceRequstInfo.haveMsg = true;
      this.deviceRequstInfo.msg = "Please insert IMEI number.";
      setTimeout(() => { this.deviceRequstInfo.haveMsg = false; }, 5000);

    }
  }

  // Workflow
  createFile() {
    this.createWorkflowFile = true;
    this.deviceRequstInfo.isFound = false;
  }

  addAccessoires() {
    this.toAddAccess.forEach((e: String) => {
      if (!this.workflowFile.Accessoires.includes(e)) {
        (this.workflowFile.Accessoires as Array<String>).push(e);
      }
    });
    console.log(this.toAddAccess)
  }
  removeAccessoires() {
    this.toRemoveAccess.forEach((e: String) => {
      this.workflowFile.Accessoires = (this.workflowFile.Accessoires).filter((v: String) => (e == v) ? "" : v);
    });
  }
  addPanne() {
    this.toAddPanne.forEach((e: String) => {
      if (!this.workflowFile.Panne.includes(e)) {
        (this.workflowFile.Panne).push(e);
      }
    });
  }
  removePanne() {
    this.toRemovePanne.forEach((e: String) => {
      this.workflowFile.Panne = (this.workflowFile.Panne).filter((v: String) => (e == v) ? "" : v);
    });
  }
  // SWAP 
  isItemSWAP(date: string) {
    var itmeDate = new Date(date);
    var now = new Date();
    console.log({ itmeDate, now });
    itmeDate.setDate(itmeDate.getDate() + 15);
    console.log({ itmeDate, now });

    if (itmeDate.valueOf() > now.valueOf
      ()) {
      return true;
    }
    return false;

  }
  swapDevice() {
    this.swap.isModalOpen = false;
    this.swap.confirmSWAP = true;
    this.deviceRequstInfo.isFound = false;
    this.swap.replacedBrand = this.myDevice.brand;
    this.swap.replacedModel = this.myDevice.model;
  }
  submitSWAP() {
    var _cpy = {
      client: this.swap.client,
      Panne: this.swap.pannes.join(",") ?? "",
      description: this.swap.description,
      imei: this.myDevice.imei,
      replacedIMEI: this.swap.replacedIMEI,
      brand: this.swap.replacedBrand,
      model: this.swap.replacedModel,
      price: this.swap.price
    };
    this.apiService.createSWAPIntervention(_cpy).subscribe((res: any) => {
      this.swap.id = res.id;
      this.swap.date = res.createdAt;
      this.swap.showInvoice = true;
    });
  }

  // INVOICE
  submitFile() {
    var _cpy = {
      Accessoires: this.workflowFile.Accessoires.join(",") ?? "",
      Panne: this.workflowFile.Panne.join(",") ?? "",
      battery: this.workflowFile.battery,
      client: this.workflowFile.client,
      description: this.workflowFile.description,
      imei: this.myDevice.imei,
      status: this.workflowFile.status,
      terminal: this.workflowFile.terminal,
      workflow: this.workflowFile.workflow,
      shop: this.invoice.shop
    };

    this.apiService
      .createFicheIntervention(_cpy)
      .subscribe((data: any) => {
        this.invoice.date = data.createdAt;
        this.invoice.id = data.id;
      });
    this.createWorkflowFile = false;
    this.invoice.shown = true;
  }
  PrintElem() {
    var mywindow = window.open('', 'PRINT', 'height=400,width=1000')!;

    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('<link rel="stylesheet" href="styles.css">');
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById("invoice")!.innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    setTimeout(() => {
      mywindow.print();
      mywindow.close();
    }, 1000);


    return true;
  }

  dateFormat(date: Date, add = 0) {
    if (add == 0)
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    else
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() + add}`;

  }

}