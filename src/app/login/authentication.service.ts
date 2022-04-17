import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  authUser:any;


  constructor(private http: HttpClient,private firestore: AngularFirestore, private router: Router) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
      this.authUser=  JSON.parse(localStorage.getItem('authuser'))
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  admin(){
    return this.firestore.collection('admin').valueChanges();

  }

  login( ) {
   
    return localStorage.getItem('currentUser')
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl("login");
  }

}
