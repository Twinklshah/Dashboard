import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import {finalize } from "rxjs/operators";
import firebase from "firebase/app";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadnews',
  templateUrl: './uploadnews.component.html',
  styleUrls: ['./uploadnews.component.scss']
})
export class UploadnewsComponent implements OnInit {

  addNews : FormGroup
  spx:any;
  alert: boolean = false;
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  constructor(private fbr : FormBuilder ,private firestore: AngularFirestore, private spinner: NgxSpinnerService,private storage: AngularFireStorage, public toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.addNews = this.fbr.group({
      newsTitle: ['' , Validators.required],
      newsdesc: ['' , Validators.required],
      newsImage: ['' ]
    })
  }

  get newsTitle(){
    return this.addNews.get('newsTitle');
  }
  get newsImage(){
    return this.addNews.get('newsImage');
  }

  onFileSelected(event) {
    this.spx = "Uploading..."
    this.spinner.show("spinner-2");
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `acpcenews/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`acpcenews/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.addNews.patchValue({
                newsImage:this.fb ,
          
              })
            }
            console.log(this.fb);
          });
          this.spinner.hide("spinner-2");

        }
        )
      )
      .subscribe(url => {
        if (url) {
         
        }
      });
  }

  onSubmit(){
    this.spx = "Processing..."
    this.spinner.show();

    if (this.addNews.invalid) {
      return;
    }

    console.log(this.addNews.value)
  this.firestore.collection('news').add({
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    newsTitle: this.addNews.value.newsTitle,
    newsdesc: this.addNews.value.newsdesc,
    newsImage: this.addNews.value.newsImage,
  })
   

    setTimeout(() => {
      console.log(this.addNews.value);
      this.addNews.reset();
      this.showSuccess();
      this.router.navigateByUrl("features/viewnews")

      this.spinner.hide();
    }, 2000);

    
  }

  showSuccess() {
    this.toastr.success( 'Successfully','News Details Submitted', {
      timeOut: 5000,
    });
  }

  showError(error) {
    this.toastr.error(error, 'Error', {
      timeOut: 3000,
    });
  }


}
