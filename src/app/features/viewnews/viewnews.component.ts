import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { userinfo } from '../viewstudent/viewstudent.component';
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-viewnews',
  templateUrl: './viewnews.component.html',
  styleUrls: ['./viewnews.component.scss']
})
export class ViewnewsComponent implements OnInit {
  newsdetails:any =[];
  alert: boolean = false;

  displayedColumns=['News Title','News desc','News Image','delete']
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

  public userList= [];
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

  // updateuser(userID: string, payload: userd) {
  //   return this.firestore.doc('news/' + userID).update(payload);
  // }

  getnewsdetails() {
    // return this.firestore.collection("user", ref => ref.orderBy('createdAt', 'asc')).snapshotChanges();
    return this.firestore.collection("news").snapshotChanges();

  }

 async deleteNews(news) {

  this.spx = "Deleting..."
  this.spinner.show();
   



   
    console.log(news);


    this.firestore.doc('news/'+news.id).delete().then(()=>{
      this.showSuccess();
            setTimeout(() => {
              this.alert = true;
              this.spinner.hide();})
    })


  
    
  }


  getuser(): void {
    this.getnewsdetails().subscribe((res) => {
      // console.log(res);


      this.newsdetails= res;
      this.dataSource=this.newsdetails;
      
      this.userList = res.map((e) => {

        // console.log("map data",user);
        // console.log("user pay load",user);
        
        return {
          ...e['payload'].doc.data() as {},
          id: e['payload'].doc.id
       } 
      });

      
      this.dataSource=new MatTableDataSource(this.userList);

      
    console.log("data source deatils",this.dataSource.data);
      
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
    this.toastr.success( 'Successfully','News Details Deleted', {
      timeOut: 5000,
    });
  }

  showError(error) {
    this.toastr.error(error, 'Error', {
      timeOut: 3000,
    });
  }



}



