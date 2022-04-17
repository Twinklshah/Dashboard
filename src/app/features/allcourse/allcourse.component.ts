import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-allcourse',
  templateUrl: './allcourse.component.html',
  styleUrls: ['./allcourse.component.scss']
})
export class AllcourseComponent implements OnInit {
co:any=[]=[];
it:any=[]=[];
  alert: boolean = false;

  displayedColumns=['Course Image','Course Title','Course Desc','delete']
  dataSource:any=[];
  dataSource1:any=[];
  dataSource2:any=[];
  dataSource3:any=[];
  dataSource4:any=[];
  dataSource5:any=[];
  dataSource6:any=[];

  spx: any;

  upload: any;
  public CourseList= [];
  public CourseList1= [];

  public form: FormGroup;


 

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
this.ite();
    this.coe();
    this.electrical();
    this.electronic();
    this.ete();
    this.mech();
    this.ie();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getcoursedetails1() {
    return this.firestore.collection("course/INFORMATION TECHNOLOGY/coursedetails").snapshotChanges();

  }

  getcoursedetails2() {
    return this.firestore.collection("course/MECHANICAL ENGINEERING/coursedetails").snapshotChanges();

  }

  getcoursedetails3() {
    return this.firestore.collection("course/COMPUTER ENGINEERING/coursedetails").snapshotChanges();

  }

  getcoursedetails4() {
    return this.firestore.collection("course/ELECTRICAL ENGINEERING/coursedetails").snapshotChanges();

  }

  getcoursedetails5() {
    return this.firestore.collection("course/ELECTRONIC ENGINEERING/coursedetails").snapshotChanges();

  }

  getcoursedetails6() {
    return this.firestore.collection("course/ELECTRONICS AND TELECOMMUNICATION ENGINEERING/coursedetails").snapshotChanges();

  }

  
  getcoursedetails7() {
    return this.firestore.collection("course/INSTRUMENTATION ENGINEERING/coursedetails").snapshotChanges();

  }


 

 async deletecourse(cd) {

  this.spx = "Deleting..."
  this.spinner.show();
   


    this.firestore.doc("course/"+cd.courseCategory+"/coursedetails/"+cd.id).delete().then(()=>{
     
            setTimeout(() => {
              this.delete();
              this.spinner.hide();})
    })


  
    
  }




  /* coe(){
    this.firestore
    .collection('course/COMPUTER ENGINEERING/coursedetails').get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
        this.co.push(doc.data());
      });
    });

    this.dataSource=new MatTableDataSource(this.co);
    
  } */

  ite(){
    
    this.getcoursedetails1().subscribe((res) => {
      // console.log(res);


      this.it= res;
      this.dataSource=this.it;
      
      this.CourseList = res.map((e) => {

       
        
        return {
          ...e['payload'].doc.data() as {},
          id: e['payload'].doc.id
       } 
      });

      
      this.dataSource=new MatTableDataSource(this.CourseList);

      
    console.log("data source deatils",this.dataSource.data);
      
    }); 

    // console.log(this.userdetails);
    
    
  }


  mech(){
    
    this.getcoursedetails2().subscribe((res) => {
      // console.log(res);


      this.co= res;
      this.dataSource1=this.co;
      
      this.CourseList1 = res.map((e) => {

       
        
        return {
          ...e['payload'].doc.data() as {},
          id: e['payload'].doc.id
       } 
      });

      
      this.dataSource1=new MatTableDataSource(this.CourseList1);

      
    console.log("data source deatils",this.dataSource1.data);
      
    }); 

    // console.log(this.userdetails);
    


  }



  
  coe(){
    
    this.getcoursedetails3().subscribe((res) => {
      // console.log(res);


      let ele= res;
      this.dataSource2=ele;
      
      let CourseList2 = res.map((e) => {

       
        
        return {
          ...e['payload'].doc.data() as {},
          id: e['payload'].doc.id
       } 
      });

      
      this.dataSource2=new MatTableDataSource(CourseList2);

      
    console.log("data source deatils",this.dataSource2.data);
      
    }); 

    // console.log(this.userdetails);
    
  
  }

  electrical(){
    
    this.getcoursedetails4().subscribe((res) => {
      // console.log(res);


      let ele= res;
      this.dataSource3=ele;
      
      let CourseList3 = res.map((e) => {

       
        
        return {
          ...e['payload'].doc.data() as {},
          id: e['payload'].doc.id
       } 
      });

      
      this.dataSource3=new MatTableDataSource(CourseList3);

      
    console.log("data source deatils",this.dataSource3.data);
      
    }); 

    // console.log(this.userdetails);
    
  
  }


  electronic(){
    
    this.getcoursedetails5().subscribe((res) => {
      // console.log(res);


      let elect= res;
      this.dataSource4=elect;
      
      let CourseList4 = res.map((e) => {

       
        
        return {
          ...e['payload'].doc.data() as {},
          id: e['payload'].doc.id
       } 
      });

      
      this.dataSource4=new MatTableDataSource(CourseList4);

      
    console.log("data source deatils",this.dataSource4.data);
      
    }); 

    // console.log(this.userdetails);
    
  
  }


  ete(){
    
    this.getcoursedetails6().subscribe((res) => {
      // console.log(res);


      let ete= res;
      this.dataSource5=ete;
      
      let CourseList5 = res.map((e) => {

       
        
        return {
          ...e['payload'].doc.data() as {},
          id: e['payload'].doc.id
       } 
      });

      
      this.dataSource5=new MatTableDataSource(CourseList5);

      
    console.log("data source deatils",this.dataSource5.data);
      
    }); 

    // console.log(this.userdetails);
    
  
  }

  ie(){
    
    this.getcoursedetails7().subscribe((res) => {
      // console.log(res);


      let ise= res;
      this.dataSource6=ise;
      
      let CourseList6 = res.map((e) => {

       
        
        return {
          ...e['payload'].doc.data() as {},
          id: e['payload'].doc.id
       } 
      });

      
      this.dataSource6=new MatTableDataSource(CourseList6);

      
    console.log("data source deatils",this.dataSource6.data);
      
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

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();

    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }

  applyFilter4(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource4.filter = filterValue.trim().toLowerCase();

    if (this.dataSource4.paginator) {
      this.dataSource4.paginator.firstPage();
    }
  }

  applyFilter5(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource5.filter = filterValue.trim().toLowerCase();

    if (this.dataSource5.paginator) {
      this.dataSource5.paginator.firstPage();
    }
  }

  applyFilter6(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource6.filter = filterValue.trim().toLowerCase();

    if (this.dataSource6.paginator) {
      this.dataSource6.paginator.firstPage();
    }
  }






  delete() {
    this.toastr.success( 'Successfully','Course Details Deleted', {
      timeOut: 5000,
    });
  }

  showError(error) {
    this.toastr.error(error, 'Error', {
      timeOut: 3000,
    });
  }
}
