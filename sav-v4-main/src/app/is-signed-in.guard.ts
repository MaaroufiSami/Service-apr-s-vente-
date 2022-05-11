import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var e = localStorage.getItem("token");
        if (e) return true;
        this.router.navigate(['/login']);
        return false;
    }
}