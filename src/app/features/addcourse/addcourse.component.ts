import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import firebase from "firebase/app";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit {
  addCourse: FormGroup;
  alert: boolean = false;
  spx: any;
  selectedFiles: FileList;
  currentFile: File;
  downloadURL: Observable<string>;
  fu;
  @ViewChild('takeInput', {static: false})

  InputVar: ElementRef;


  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private angfire: AngularFirestore,private storage: AngularFireStorage,private router: Router, public toastr: ToastrService) { 

  // angfire.collection("course").doc("COMPUTER ENGINEERING").collection("coursedetails").add({
  //   courseTitle : "",
  //   courseSubTitle: "",
  //     courseCategory: "",
  //     courseDescription: "",
  //     courseLanguage:"",
  //     ProfessorName: "",
  //     courseImage: "",
  //     lecsec:{
  //       lecname:["abc","bcd","efg"],
  //       lecdesc:["ffvfvf","vffvfvf","fvfvvffvvf"],
  //       lecvideo:["gs://demo1-411f2.appspot.com/demovideo.mp4","gs://demo1-411f2.appspot.com/demovideo.mp4","gs://demo1-411f2.appspot.com/demovideo.mp4"]

  //       // lecname:{
        
  //       // },
  //       // lecdesc:{
        
  //       // },
  //       // lecvideo:{
        
  //       // }
  //     }
  //   //   lecture:["video1","video2","video3" ],
  //   //   objectExample: {
  //   //     a: 5,
  //   //     b: {
  //   //         nested: "foo",
  //   //         nesteds: "foo",
  //   //         nestd: "foo"
  //   //     }
  //   // }


  // })
  
  }

  ngOnInit(): void {
    this.addCourse = this.fb.group({
      courseTitle: ['', Validators.required],
      courseSubTitle: ['', Validators.required],
      courseCategory: ['', Validators.required],
      courseDescription: ['', Validators.required],
      courseLanguage: ['', Validators.required],
      ProfessorName: ['', Validators.required],
      courseImage: ['', Validators.required],
      courseSection: this.fb.array([
        this.addSectionsArray(1)
      ]),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  // courseImages(): FormArray {
  //   return this.addCourse.get("courseImages") as FormArray
  // }

 

  sectionvalu(val) {

  }
  courseVideos(): FormArray {
    return this.addCourse.get("courseVideos") as FormArray
  }

  courseSection(): FormArray {
    return this.addCourse.get("courseSection") as FormArray
  }

  courseSectionLecture(i: number): FormArray {
    return this.courseSection().at(i).get("courseSectionLecture") as FormArray
  }


  // addCourseImages() {
  //   return this.fb.group({
  //     imageURL: [''],
  //     imgURL: ['']
  //   })
  // }

  // addCourseVideos() {
  //   return this.fb.group({
  //     vidURL: [''],
  //     videoURL: ['']
  //   })
  // }

  //add course
  addCourseArray() {
    return this.fb.group({
      lectureNm: ['', Validators.required],
      lectureDesc: ['', Validators.required],
      pdfURL: 'xyz',
      videoURL: ['']
    })
  }

  // add section logic

  addSectionsArray(i) {
    return this.fb.group({
      sectionNm: [{ value: 'Section ' + i, disabled: true }, Validators.required],
      sectionDesc: ['', Validators.required],
      courseSectionLecture: new FormArray([this.addCourseArray()])
    })

  }

  addCourseSection(i) {
    this.courseSection().push(this.addSectionsArray(i));
  }

  removeCourseSection(i: number) {
    if (i > 0) {
      this.courseSection().removeAt(i);
    }
  }

  addCourseSectionLecture(i: number) {
    this.courseSectionLecture(i).push(this.addCourseArray());
  }

  removeCourseSectionLecture(i: number, j: number) {
    if (j > 0) {
      this.courseSectionLecture(i).removeAt(j);
    }
  }


  // getCourseImages() {
  //   return (this.addCourse.get('courseImages') as FormArray).controls;
  // }

  getCourseVideos() {
    return (this.addCourse.get('courseVideos') as FormArray).controls;
  }


  //add course
  

  get courseTitle() {
    return this.addCourse.get('courseTitle');
  }
  get courseSubTitle() {
    return this.addCourse.get('courseSubTitle');
  }
  get courseCategory() {
    return this.addCourse.get('courseCategory');
  }
  get courseDescription() {
    return this.addCourse.get('courseDescription');
  }
  get courseLanguage() {
    return this.addCourse.get('courseLanguage');
  }
  get ProfessorName() {
    return this.addCourse.get('ProfessorName');
  }
  get courseImage() {
    return this.addCourse.get('courseImage');
  }

 
  
  uploadCourseVideo(event, i) {
    // const startTimestamp: number = new Date().getTime();
    // this.selectedFiles = event.target.files;
    // this.currentFile = this.selectedFiles.item(0);
    // const fd = new FormData();
    // fd.append('file', this.currentFile);

    // // converted into bs4
    // if (this.currentFile.size < 30 ** 21) {
    //   this.spx = "Uploading..."

    //   this.spinner.show()

    //   this.service.uploadOnePassFileToAws(fd).subscribe(res => {
    //     const ctrl = (this.myForm.get('courseVideos') as FormArray).controls[i];
    //     (ctrl as any).controls.videoURL.setValue((res as any).fileURL);
    //     setTimeout(() => {
    //       this.spinner.hide();
    //       const endTimestamp: number = new Date().getTime();
    //       const responseTimes = endTimestamp - startTimestamp;
    //       alert("Uploaded Successfully in "+(responseTimes/1000)+" seconds");
    //     }, 2000);
    //   }, () => {
    //     event.srcElement.value = null;
    //     this.spinner.hide()
    //     alert("Failed to upload video due to Network error, Please try again!");
    //   })
    // } else {
    //   alert("Video size couldn't exceed more than 30MB");
    //   event.srcElement.value = null;

    // }

  }

  uploadCourseSectionVideo(event, i, j) {
    // const startTimestamp: number = new Date().getTime();
    // this.selectedFiles = event.target.files;
    // this.currentFile = this.selectedFiles.item(0);
    // const fd = new FormData();
    // fd.append('file', this.currentFile);

    // if (this.currentFile.size < 100 ** 21) {
    //   this.spx = "Uploading..."
    //   this.spinner.show()
    //   this.service.uploadOnePassFileToAws(fd).subscribe(res => {
    //     const ctrl = (this.courseSection().at(i).get("courseSectionLecture") as any).controls[j];
    //     (ctrl as any).controls.videoURL.setValue((res as any).fileURL);
    //     setTimeout(() => {
    //       this.spinner.hide();
    //       const endTimestamp: number = new Date().getTime();
    //       const responseTimes = endTimestamp - startTimestamp;
    //       alert("Uploaded Successfully in "+(responseTimes/1000)+" seconds");
    //     }, 2000);
    //   }, () => {
    //     this.spinner.hide()
    //     event.srcElement.value = null;
    //     alert("Failed to upload video due to Network error, Please try again!");
    //   });
    // } else {
    //   alert("Video size couldn't exceed more than 100MB");
    //   event.srcElement.value = null;
    // }
  }


  uploadcourse(){

    // this.angfire.collection("course").doc(this.addCourse.value).collection("coursedetails").add();
  }
 

  
  onFileSelecte(event) {
    this.spx = "Uploading..."
    this.spinner.show("spinner-2");
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `acpceimg/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`acpceimg/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fu = url;
              this.addCourse.patchValue({
                courseImage:url,
          
              })
            }
            console.log(this.fu);
          });
          this.spinner.hide("spinner-2");
          // this.InputVar.nativeElement.value = "";

        }
        
        )
      )
      .subscribe(url => {
        if (url) {
         
        }
      });
  }



  onFilevideos(event,i,j) {
    this.spx = "Uploading..."
    this.spinner.show("spinner-2");
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `acpcevideo/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`acpcevideo/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
         
          this.downloadURL = fileRef.getDownloadURL();

          this.downloadURL.subscribe(url => {
            
            if (url) {
              this.fu = url;
              
              const ctrl = (this.courseSection().at(i).get("courseSectionLecture") as any).controls[j];
               (ctrl as any).controls.videoURL.setValue(url);
             
              

            }
            this.spinner.hide();
            console.log(this.fu);

          });
        
          this.spinner.hide("spinner-2");
          this.InputVar.nativeElement.value = "";

        }
        
        )
        
      )
      .subscribe(url => {
      
        if (url) {
          
        }
      });
     
  }

  onSubmit() {
    if (this.addCourse.invalid) {
      alert("All Values are required")     
       return;
    }
    this.spx = "Processing..."
    this.spinner.show();
    setTimeout(() => {
      this.angfire.collection("course").doc(this.addCourse.value.courseCategory).collection("coursedetails").add(

        this.addCourse.value);
      this.addCourse.reset();
      this.showSuccess();
  this.router.navigateByUrl("features/allcourse")

      this.spinner.hide();
    }, 2000);


  }

  showSuccess() {
    this.toastr.success( 'Successfully','Course Details Submitted', {
      timeOut: 5000,
    });
  }

  showError(error) {
    this.toastr.error(error, 'Error', {
      timeOut: 3000,
    });
  }




  clear() 
  {
  
    this.InputVar.nativeElement.value = "";
    this.addCourse.reset();

  }
}