import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'src/@root/confirm-dialog.module';
import { FirebaseModule } from 'src/@root/Firebase/Firebase.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashbordComponent } from './dashbord-component/dashbord.component';
import { LayoutComponent } from './layout-component/layout.component';
import { LoginComponent } from './login-component/login.component';
import { MaterialModule } from './material.module';
import { PublicationFormComponent } from './publication-form-component/publication-form.component';
import { PublicationListComponent } from './publication-list-component/publication-list.component';
import { MemberFormComponent } from './member-form-component/member-form.component';
import { MemberListComponent } from './member-list-component/member-list.component';
import { EventFormComponent } from './event-form-component/event-form.component';
import { EventListComponent } from './event-list-component/event-list.component';
import { ToolListComponent } from './tool-list-component/tool-list.component';
import { ToolFormComponent } from './tool-form-component/tool-form.component';
import { PowerBiReportModule } from 'angular-powerbi-report';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashbordComponent,
    LoginComponent,
    MemberListComponent,
    MemberFormComponent,
    PublicationFormComponent,
    PublicationListComponent,
    EventFormComponent,
    EventListComponent,
    ToolListComponent,
    ToolFormComponent,
  ],
  imports: [
    PowerBiReportModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatNativeDateModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ConfirmDialogModule,
    FirebaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
