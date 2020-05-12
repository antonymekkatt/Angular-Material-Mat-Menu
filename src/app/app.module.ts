import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  MatInputModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatMenuModule,
  MatSelectModule,
  MatGridListModule,
  MatIconModule,
  MatSliderModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatTableModule,
  MatPaginatorModule,
  MatTabsModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSortModule,
  MatDialogModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { ErrorsHandlerService } from './services/error-handler-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavMenuModule } from 'mat-sidenav-menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';
import { PowerUserAddComponent } from './access-management/power-user-add/power-user-add.component';
import { PowerUserListComponent } from './access-management/power-user-list/power-user-list.component';
import { ReportUsergroupListComponent } from './access-management/report-usergroup-list/report-usergroup-list.component';
import { ReportUsergroupAddComponent } from './access-management/report-usergroup-add/report-usergroup-add.component';
import { HomeComponent } from './dashboard/home/home.component';
import { PageNotFoundComponent } from './dashboard/page-not-found/page-not-found.component';
import { MyErrorHandler } from './services/MyErrorHandler';
import { MenuListItemComponent } from './dashboard/menu-list-item/menu-list-item.component';
import { NavService } from './services/nav-services';

import { ConfirmDialogComponent } from './common-dialog/confirm-dialog/confirm-dialog.component';


@NgModule({
  entryComponents: [ConfirmDialogComponent],
  declarations: [
    AppComponent,

    //home and common
    DashboardContainerComponent,
    HomeComponent,
    PageNotFoundComponent,

    //access Management
    PowerUserListComponent,
    PowerUserAddComponent,
    ReportUsergroupListComponent,
    ReportUsergroupAddComponent,
    
    MenuListItemComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatGridListModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSidenavMenuModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [ErrorsHandlerService
    , { provide: ErrorHandler, useClass: MyErrorHandler },NavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
