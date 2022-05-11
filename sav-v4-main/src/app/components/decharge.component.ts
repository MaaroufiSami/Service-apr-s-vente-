import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
    selector: 'app-decharge',
    templateUrl: 'decharge.component.html',
})

export class DechargeComponent {

    app: any = {
        shown: false,
        supplier: '',
        id: '',
        shop: '',
        date: '',
        dechargeItems: []
    }
    constructor(private apiService: ApiService) {
        var user = JSON.parse(localStorage.getItem("user")!)
        this.app.shop = `${user.firstName} ${user.lastName}`
    }

    search() {
        this.apiService.getDecharge(this.app.id).subscribe((res: any) => {
            this.app.shown = true;
            this.app.id = res.id;
            this.app.supplier = res.destination;
            this.app.shop = "";
            this.app.date = res.createdAt;
            this.app.dechargeItems = res.interventions;
        });
    }

    dateFormat(e: string) {
        e = e.replace("T", " ")
        return (e.slice(0, e.length - 8));
    }
}