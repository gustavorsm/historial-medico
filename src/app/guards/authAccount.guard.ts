import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthAccountGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('UserLogged')) {
            console.log("this")
            return true;
        }
        this.router.navigateByUrl('/login');
        return false;
    }
}