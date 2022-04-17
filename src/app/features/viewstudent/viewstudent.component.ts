import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface userinfo {
  id?: string;
  fname?: string;
  email?: string;
  createdAt : string;

  
}


@Component({
  selector: 'app-viewstudent',
  templateUrl: './viewstudent.component.html',
  styleUrls: ['./viewstudent.component.scss']
})
export class ViewstudentComponent implements OnInit , AfterViewInit {
  userdetails:any =[];
  alert: boolean = false;

  displayedColumns=['name','Department','prn','edit','delete']
  dataSource:any=[
    // {
    //   fanme:"omkar",
    //   dept:20
    // },
    // {
    //   fanme:"omkar",
    //   dept:20
    // },
    // {
    //   fanme:"omkar",
    //   dept:20
    // },
    // {
    //   fanme:"omkar",
    //   dept:20
    // },
  ];

  //  user = firebase.auth().;
  spx: any;

  public userList: userinfo[] = [];
  public uDetails: userinfo;

  public form: FormGroup;

  // public employeeList: userd[] = [];
  // public employeeDetails: userd;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  InvalidData: boolean=false;

  constructor(private firestore: AngularFirestore, private spinner: NgxSpinnerService, public toastr: ToastrService,
    private fb: FormBuilder,
    private modalService: NgbModal
    ) {

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(this.userList);
   }

  ngOnInit(): void {
    this.getuser();  

    // console.log(this.user);
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateuser(userID: string, payload: userd) {
    return this.firestore.doc('user/' + userID).update(payload);
  }

  getuserdetails() {
    // return this.firestore.collection("user", ref => ref.orderBy('createdAt', 'asc')).snapshotChanges();
    return this.firestore.collection("user").snapshotChanges()

  }

 async deleteuser(user) {

  this.spx = "Deleting..."
  this.spinner.show();
   

    // admin.auth().deleteUser(userid);


    if (!user.email || !user.password) {
      return console.warn('Missing email or password to delete the user.')
    }

    await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        const userInFirebaseAuth = firebase.auth().currentUser
        userInFirebaseAuth.delete() // Delete the user in Firebase auth list (has to be logged in).
        firebase.auth().signOut()
        
         this.firestore.doc('user/' + user.userId).delete();
        
         this.showSuccess();
            setTimeout(() => {
              this.alert = true;
              this.spinner.hide();})
        // Then you can delete the user from the users collection if you have one.
      })
    console.log(user);


  
    
  }


  getuser(): void {
    this.getuserdetails().subscribe((res) => {
      // console.log(res);


      this.userdetails= res;
      console.log("user details",this.userdetails);
      this.dataSource=this.userdetails;
      
      this.userList = res.map((user) => {

        // console.log("map data",user);
        // console.log("user pay load",user);
        
        return {
          ...user['payload'].doc.data() as {},
          id: user['payload'].doc.id
       } as userinfo;
      });

      
      this.dataSource=new MatTableDataSource(this.userList);

      
    console.log("data source deatils",this.dataSource);
      
    }); 

    // console.log(this.userdetails);
    
    
    


  }

 
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showSuccess() {
    this.toastr.success( 'Successfully','Student Details Deleted', {
      timeOut: 5000,
    });
  }

  showError(error) {
    this.toastr.error(error, 'Error', {
      timeOut: 3000,
    });
  }


  openModal(content: TemplateRef<any>, uId: string): void {
    this.uDetails = this.userList.find(  (users : userd  )=>users.id === uId)

    this.formInit(this.uDetails);
    this.modalService.open(content, {backdrop: 'static', centered: true});
  }

  formInit(data: userd): void {

    // debugger
    this.form = this.fb.group({
      fname: [data ? data.fname : '', Validators.required],
      // email: [data ? data.email : '',
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      //   ])
      // ],
      mname: [data ? data.mname : '', Validators.required],
      lname: [data ? data.lname : '', Validators.required],
      gender: [data ? data.gender : '', Validators.required],
      dob: [data ? data.dob : '', Validators.required],
      Department: [data ? data.Department : '', Validators.required],
      prn: [data ? data.prn : '', Validators.required],
      createdAt:  firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  updateuserd(uids: string): void {

    console.log("form value", this.form);

    if(this.form.valid)
    {

      this.InvalidData=false;
      console.log("form is valid");
      
      this.updateuser(uids, this.form.value).then();
    }else{
      console.log("form is Invalid");
      this.InvalidData=true
    }
    
  }


}



export interface userd {
  id?: string;
  fname?: string;
  mname?: string;
  lname?: string;
  gender?: string;
  dob?: string;
  Department?: string;
  prn?: string;
  // email?: string;
  createdAt : string;

  
}