import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import firebase from 'firebase/app';
import * as admin from 'firebase-admin';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';  
import { SETTINGS, AngularFirestoreModule } from '@angular/fire/firestore'; 
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule,} from "@angular/fire/storage";

import { HttpClientModule } from "@angular/common/http";
import { ClginfoComponent } from './clginfo/clginfo.component';
import { StaffinfoComponent } from './staffinfo/staffinfo.component';
import { AuthGuard } from '../app/guards/auth.guard';
//ngx spinner
import { NgxSpinnerModule } from 'ngx-spinner';

//ngx toaster
import {ToastrModule} from 'ngx-toastr'
import { LoginComponent } from './login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';


firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    ClginfoComponent,
    StaffinfoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ChartsModule,
    AngularFireStorageModule,
    
    AngularFireModule.initializeApp(environment.firebaseConfig),  
    AngularFireDatabaseModule,

    AngularFirestoreModule,AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(), HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [ThemeService, AuthGuard,
    { provide: SETTINGS, useValue: {} }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
