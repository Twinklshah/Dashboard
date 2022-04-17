import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { User } from './user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  adminlogin: FormGroup;
  loading = false;
  error  : boolean = false;
  message : string;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  authUser:any;
  constructor(private fb: FormBuilder,private firestore: AngularFirestore, private router:Router, private authenticationService : AuthenticationService )
   {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.authUser=  JSON.parse(localStorage.getItem('authuser'))
    }




  ngOnInit() {
    this.adminlogin = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      usertype : ['admin' , Validators.required]
    }
    )

    this.firestore.collection('admin').valueChanges();
    // console.log( this.firestore.collection('admin').valueChanges());
    
  // this.onSubmit();
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}



  admin(){
    return this.firestore.collection('admin').valueChanges();
  
    
  }


  login() {
    this.admin().subscribe((res)=>{
      
      let adminData=res[0]
      console.log("data base admin value--->",adminData);


      // to check user is admin or not
      if(this.adminlogin.value['usertype']=="admin"){

        if(this.adminlogin.value['email']==adminData['email'] && this.adminlogin.value['password']==adminData['password'] )
        {

          let user;
          localStorage.setItem('currentUser', JSON.stringify(adminData));
             this.currentUserSubject.next(user);
            // alert("Login SAucessfully Credentials.....! Bhava")
            this.router.navigateByUrl("dashboard")
            // this.isAuthenticated.next(true);

        }else{
          // this.isAuthenticated.next(false);
          alert("You are not valid user")
        }
      
      }else{
        // alert("You are not Admin Vedya")
      }
      
    })

    console.log(" form value" ,this.adminlogin.value);
    
  }
  

  logins(){
    this.loading = true;
    if (this.adminlogin.invalid) {
      return;
    }

    let emailId  = this.adminlogin.controls.emailId.value;
    let pwd = this.adminlogin.controls.pwd.value;

    // this.authenticationService.login(emailId,pwd)
    //         .pipe(first())
    //         .subscribe(
    //             () => {
    //               this.router.navigate(['/dashboard']);
    //             },
    //             err => {
    //               this.message = err.error.message;
    //               this.error = true;
    //               this.loading = false;
    //             });

    this.admin().pipe(map (user => {
              
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      // this.currentUserSubject.next();

      return user;
      
  })
    
    )
        }



       

}
