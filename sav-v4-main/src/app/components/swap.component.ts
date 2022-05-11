import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
    selector: 'app-swap',
    templateUrl: 'swap.component.html',
})

export class SwapComponent {
    app: any = {
        screen1: true,
        screen2: false,
        isModalOpen: false,
        showScreen1: () => { this.app.screen1 = true; this.app.screen2 = false; },
        showScreen2: () => { this.app.screen1 = false; this.app.screen2 = true; },

        currentItem: {},
        result: {
            show: false,
            device: {},
            client: {},
            Swap: {},
        },
        items: []
    }
    constructor(private apiSerivce: ApiService) { this.loaddata() }

    loaddata() {
        this.apiSerivce.getSwapItems().subscribe((res: any) => {
            this.app.items = res
        })
    }
    openSwapItemModel(item: any) {
        this.app.isModalOpen = true;
        this.app.currentItem = item;
    }
    swapDevice() {
        this.app.showScreen2();
        this.app.isModalOpen = false;
    }
    valideSwap() {
        this.apiSerivce.swapedItem({ id: this.app.currentItem.id }).subscribe((res: any) => {
            this.loaddata();
            this.app.result = res.data;
            this.app.result.show = true;
            this.app.showScreen1();
        });
    }
    generateTicket() { }

    dateFormat(e: string) {
        e = e.replace("T", " ")
        return (e.slice(0, e.length - 8));
    }

    retardTime(e: string) {
        var totalSeconds = Math.abs(new Date().valueOf() - new Date(e).valueOf())
        return Math.floor(totalSeconds / (1000 * 60 * 60 * 24)) + " jours"
    }
}