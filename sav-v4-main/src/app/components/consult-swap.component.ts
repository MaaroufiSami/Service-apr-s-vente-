import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
    selector: 'app-consultSwap',
    templateUrl: 'consult-swap.component.html',
})

export class ConsultSwapComponent {

    app: any = {
        screen1: true,
        screen2: false,
        showScreen1: () => { this.app.screen1 = true; this.app.screen2 = false; },
        showScreen2: () => { this.app.screen1 = false; this.app.screen2 = true; },

        searchValue: "",
        swapId: "",
        statusItems: []
    }

    constructor(private apiService: ApiService) { }

    search() {
        this.apiService.getSwapDetails({ id: this.app.searchValue }).subscribe((res: any) => {
            this.app.swapId = this.app.searchValue;
            this.app.statusItems = res.data;
            this.app.showScreen2();
        });
    }

    dateFormat(e: string) {
        e = e.replace("T", " ")
        return (e.slice(0, e.length - 5));
    }
}