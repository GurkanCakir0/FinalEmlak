import { EAlertService } from './EAlert.service';
import { ApiServiceService } from './Api-Service.service';
import { Sonuc } from './../models/Sonuc';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        public apiServis: ApiServiceService,
        public alert: EAlertService,
        public router: Router

    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var yetkiler = route.data["yetkiler"] as Array<string>;
        var gitUrl = route.data["gerigit"] as string;

        if (!this.apiServis.OturumK() || !yetkiler || !yetkiler.length) {
            this.router.navigate([gitUrl]);
            return false;
        }

        var sonuc: boolean = false;

        sonuc = this.apiServis.yetkiKontrol(yetkiler);
        if (!sonuc) {
            this.router.navigate([gitUrl]);
        }
        return sonuc;
    }

}