import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UploadnewsComponent } from './uploadnews/uploadnews.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewnewsComponent } from './viewnews/viewnews.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { ViewstudentComponent } from './viewstudent/viewstudent.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { AllcourseComponent } from './allcourse/allcourse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { VfeedComponent } from './vfeed/vfeed.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import {MatSelectModule} from '@angular/material/select';



const routes: Routes = [
  { path: 'uploadnews', component: UploadnewsComponent },
  { path: 'viewnews', component: ViewnewsComponent },
  { path: 'addstudent', component: AddstudentComponent },
  { path: 'viewstudent', component: ViewstudentComponent },
  {path: 'addcourse', component: AddcourseComponent},
  {path : 'allcourse' , component: AllcourseComponent},
  {path : 'vfeed' , component: VfeedComponent}
];

@NgModule({
  declarations: [ UploadnewsComponent, ViewnewsComponent, AddstudentComponent, ViewstudentComponent, AddcourseComponent, AllcourseComponent, VfeedComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatBadgeModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()

  ],
  exports:[
    MatBadgeModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ]
})
export class FeaturesModule { }
