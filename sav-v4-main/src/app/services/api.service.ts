import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
    apiUrl = "http://127.0.0.1:3000/api";
    constructor(private http: HttpClient) { }

    // AUTH
    login(data: any) {
        return this.http.post(`${this.apiUrl}/auth/login`, data);
    }
    register(data: any) {
        return this.http.post(`${this.apiUrl}/auth/register`, data);
    }

    // device
    searshForIMEI(_imei: String) {
        return this.http.get(`${this.apiUrl}/device/search?imei=${_imei}`);
    }


    // intervention
    createFicheIntervention(data: any) {
        return this.http.post(`${this.apiUrl}/intervention/create`, data);
    }
    setEtatIntervention(data: any) {
        return this.http.post(`${this.apiUrl}/intervention/etat`, data);
    }
    searchIntervention(data: any) {
        return this.http.post(`${this.apiUrl}/intervention/search`, data);
    }
    closeIntervention(data: any) {
        return this.http.post(`${this.apiUrl}/intervention/close`, data);
    }
    getPendingIntervention(data: any) {
        return this.http.post(`${this.apiUrl}/intervention/pending`, data);
    }
    getReturnIntervention(data: any) {
        return this.http.post(`${this.apiUrl}/intervention/return`, data);
    }
    getDetailsIntervention(id: any) {
        return this.http.get(`${this.apiUrl}/intervention/details?id=${id}`);
    }

    // SWAP
    createSWAPIntervention(data: any) {
        return this.http.post(`${this.apiUrl}/intervention/create-swap`, data);
    }
    getSwapDetails(data: any) {
        return this.http.post(`${this.apiUrl}/intervention/details-swap`, data);
    }
    getSwapPending(type: any) {
        return this.http.get(`${this.apiUrl}/intervention/pending-swap?type=${type}`);
    }
    createSwapDischarge(data: any) {
        return this.http.post(`${this.apiUrl}/discharge/swap`, data);
    }

    // DISCHARGE
    createDischarge(data: any) {
        return this.http.post(`${this.apiUrl}/discharge/create`, data);
    }
    getDecharge(id: any) {
        return this.http.get(`${this.apiUrl}/discharge/search?id=${id}`);

    }

    // CLIENT
    setavailableClient(data: any) {
        return this.http.post(`${this.apiUrl}/available_client/create`, data);
    }
    getavailableClient(data: any) {
        return this.http.get(`${this.apiUrl}/available_client/get?id=${data}`);
    }

    // FILE UPLOAD
    upload(file: File, data: any) {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify(data));
        const req = new HttpRequest('POST', `${this.apiUrl}/intervention/etatPDF`, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }

    // NOTIFICATION
    getwaitednotif(data: any) {
        return this.http.post(`${this.apiUrl}/notification/waiting`, data);
    }
    closePdfNdNewStatus(data: any) {
        return this.http.post(`${this.apiUrl}/notification/closePDF`, data);
    }

    // SWAP
    getSwapItems() {
        return this.http.get(`${this.apiUrl}/swap/items`);
    }
    swapedItem(data: any) {
        return this.http.post(`${this.apiUrl}/swap/swaped`, data);
    }

}