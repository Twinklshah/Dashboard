import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent implements OnInit {
  addStudent: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  spx: any;
  error: boolean = false;
  message: string;
  alert: boolean = false;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, public toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.addStudent = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fname: ['', Validators.required],
      cpass: ['', Validators.required],
      mname: ['', Validators.required],
      lname: ['', Validators.required],
      dob: ['', Validators.required],
      prn: ['', Validators.required],
      gender: ['', Validators.required],
      dept: ['', Validators.required]
    }, { validators: this.checkPasswords });


  }

  onSubmit() {

    if (this.addStudent.invalid) {
      return;
    }
    this.spx = "Submitting..."
    this.spinner.show();
    console.log(this.addStudent.value);

    firebase.auth().createUserWithEmailAndPassword(this.addStudent.value.email, this.addStudent.value.password)
      .then(res => {

        console.log(res);

        let user: firebase.User = res.user;
        user.updateProfile({
          displayName: this.addStudent.value.name,
        }).then(() => {
          firebase.firestore().collection("user").doc(res.user.uid).set({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            userId: firebase.auth().currentUser?.uid,
            email: this.addStudent.value.email,
            password: this.addStudent.value.password,
            fname: this.addStudent.value.fname,
            mname: this.addStudent.value.mname,
            lname: this.addStudent.value.lname,
            gender: this.addStudent.value.gender,
            dob: this.addStudent.value.dob,
            Department: this.addStudent.value.dept,
            prn: this.addStudent.value.prn,





            // mobile: form.value.mobile
          }).then(res => {

            this.showSuccess();
            console.log(res);
            setTimeout(() => {
              this.addStudent.reset();
              this.alert = true;
              this.spinner.hide();
              this.router.navigate(['/features/viewstudent'])

            }, 2000);
          }).catch(err => {
          
            console.log(err);
          })
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        this.showError(err.message);
        console.log(err.message);
        setTimeout(() => {
          this.alert = true;
          this.spinner.hide();


        }, 2000);
      })
  }

  get email() {
    return this.addStudent.get('email');
  }
  get password() {
    return this.addStudent.get('password');
  }
  get cpass() {
    return this.addStudent.get('cpass');
  }
  get fname() {
    return this.addStudent.get('fname');
  }
  get mname() {
    return this.addStudent.get('mname');
  }
  get lname() {
    return this.addStudent.get('lname');
  }
  get dob() {
    return this.addStudent.get('dob');
  }
  get prn() {
    return this.addStudent.get('prn');
  }
  get gender() {
    return this.addStudent.get('gender');
  }
  get dept() {
    return this.addStudent.get('dept');
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('cpass').value;
    if (password !== confirmPassword) {
      group.controls.cpass.setErrors({ mismatch: true });
    }
    return password === confirmPassword ? null : { setName: true }
  }

  showSuccess() {
    this.toastr.success( 'Successfully','Student Details Submitted', {
      timeOut: 5000,
    });
  }

  showError(error) {
    this.toastr.error(error, 'Error', {
      timeOut: 3000,
    });
  }
}
