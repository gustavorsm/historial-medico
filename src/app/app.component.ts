import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
  items: Observable<any[]>;
  constructor(db: AngularFirestore,private router: Router){
    this.items = db.collection('items').valueChanges();
  }

  title = 'historial-medico';
}
  