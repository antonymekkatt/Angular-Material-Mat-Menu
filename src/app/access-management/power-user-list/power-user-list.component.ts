import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonDataService } from "src/app/services/common-data-services";
import { ErrorsHandlerService } from "src/app/services/error-handler-service";
import { DataBindService } from "src/app/services/data-bind-service";
import { ToasterService } from "src/app/services/toaster-service";

import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";
import { globalVariables } from "src/assets/values/global-variables";
import { ConfirmDialogComponent } from "src/app/common-dialog/confirm-dialog/confirm-dialog.component";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: "app-power-user-list",
  templateUrl: "./power-user-list.component.html",
  styleUrls: ["./power-user-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PowerUserListComponent implements OnInit {
 
  powerUserForm: FormGroup;

  displayedColumnsPowerUserLists: string[] = [];
  columnsPowerUserLists: string[] = [];
  dataSourcePowerUserList: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSize: any = 0;
  userListDetails: any = [];
  pageIndex: number = 0;
  totalDataLength: number = 0;
  tableDataCount = 0;

  tableHeaderDetails: any;
  powerUserList: any = [];

  clickOnCheckBox: boolean = false;

  displayTableNoDataContent: any = false;
  displayTableMenu: any = false;
  displayTableLoadingContent: any = false;

  TABLE_LOADER_IMAGE_PATH =
    "../../../" +
    globalVariables.IMAGE_LOCATION_PATH +
    globalVariables.TABLE_LOADER_IMAGE;

  constructor(
    private errorHandler: ErrorsHandlerService,
    private dataService: CommonDataService,
    private router: Router,
    private databind: DataBindService,
    private ToasterService: ToasterService,
    public dialog: MatDialog,
    private routerValues: ActivatedRoute,
    private formbuilder: FormBuilder
  ) {
    this.powerUserForm = formbuilder.group({
      poweruser: [
        "",
        [
          Validators.maxLength(40),
          this.customValidatorPattern("^[#A-Za-z0-9_]*$"),
        ],
      ],
    });
  }

  searchValue: string = "";
  formUserSearch = new FormControl("");
  LONG_DATE_TIME = globalVariables.LONG_DATE_TIME;
  deletePowerUserObj: any = { powerUserId: null };

  public hasError = (controlName: string, errorName: string) => {
    return this.powerUserForm.controls[controlName].hasError(errorName);
  };

  ngOnInit() {
    //--------Setting Page Title---------------
    this.dataService.setHeaderTitle("User | List");
    this.pageSize = this.dataService.getGridPageItemCount();
    this.loadPowerUserList();
  }

  customValidatorPattern(pattern: any): ValidatorFn {
    return (control: AbstractControl): any | null => {
      if (control.value !== undefined && control.value != null) {
        if (control.value.length > 0) {
          let regexp = new RegExp(pattern);
          let patternFlag = regexp.test(control.value);
          if (!patternFlag) {
            return { pattern: true };
          }
        }
      }
      return null;
    };
  }

  loadPowerUserList() {
    this.userListDetails = this.dataService.getUserList();
    this.loadTableDetails();
    this.displayLoader(false);
  }

  displayLoader(isAvailable) {
    if (this.dataSourcePowerUserList != undefined)
      this.displayTableLoadingContent = isAvailable;
  }

  loadTableDetails() {
    this.tableHeaderDetails = this.userListDetails.gridHeadings;
    this.totalDataLength = this.userListDetails.powerusers.length;
    this.displayedColumnsPowerUserLists = [];
    this.columnsPowerUserLists = [];
    for (let col of this.tableHeaderDetails) {
      this.displayedColumnsPowerUserLists.push(col.datafield);
      this.columnsPowerUserLists.push(col.datafield);
    }
    this.powerUserList = this.userListDetails.powerusers;
    let index = 0;
    this.tableDataCount = this.powerUserList.length;
    while (index < this.tableDataCount) {
      this.powerUserList[
        index
      ].effectiveDate = this.dataService.getDateFormatShort(
        this.powerUserList[index].effectiveDate
      );
      index++;
    }

    this.dataSourcePowerUserList = new MatTableDataSource<PeriodicElement>(
      this.powerUserList
    );
    if (this.tableDataCount > 0) {
      this.displayTableNoDataContent = false;
      this.displayTableMenu = true;
    } else {
      this.displayTableMenu = false;
      this.displayTableNoDataContent = true;
    }

    this.dataSourcePowerUserList.sort = this.sort;
    this.displayedColumnsPowerUserLists.push("edit");
    this.columnsPowerUserLists.push("edit");
  }

  addPowerUser() {
    this.router.navigate(["/home/acc-mnt/users/add"]);
  }

  editPowerUser(userId) {
    this.router.navigateByUrl("/home/acc-mnt/users/update/" + userId);
  }

  editPowerUserGroupManagement(userId, userName) {
    this.router.navigateByUrl(
      "/home/acc-mnt/users/usergroup/" + userId + "/" + userName
    );
  }

  deletePowerUser(userId, userName) {
    setTimeout(() =>
      this.dialog
        .open(ConfirmDialogComponent, {
          data: {
            title: "",
            message: "Do you want to delete " + userName + "?",
          },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.dataService.removeUser(userId);
            this.loadPowerUserList();
          } else {
            this.dialog.closeAll();
          }
        })
    );
  }

  changePage(event) {
    this.pageIndex = event.pageIndex;
    this.loadPowerUserList();
  }

  powerUserGroupSearch(powerUserFormData) {
    this.searchValue = powerUserFormData.value.poweruser.trim();
    this.pageIndex = 0;
    this.loadPowerUserList();
  }

  myListBoxItemOnCheckChange(colName): void {
    this.clickOnCheckBox = true;

    let dataList: string[] = [];
    const colIndex = this.displayedColumnsPowerUserLists.findIndex(
      (col) => col === colName
    );
    if (colIndex > -1) {
      // column is currently shown in the table, so we remove it
      this.displayedColumnsPowerUserLists.splice(colIndex, 1);
    } else {
      let index = 0;
      for (let c of this.columnsPowerUserLists) {
        if (c == this.displayedColumnsPowerUserLists[index]) {
          dataList.push(c);
          index++;
        } else if (c == colName) {
          dataList.push(c);
        }
      }
      this.displayedColumnsPowerUserLists = dataList;
    }
  }

  myListBoxOnCheckChange(colName) {
    if (!this.clickOnCheckBox) {
      let dataList: string[] = [];
      const colIndex = this.displayedColumnsPowerUserLists.findIndex(
        (col) => col === colName
      );
      if (colIndex > -1) {
        // column is currently shown in the table, so we remove it
        this.displayedColumnsPowerUserLists.splice(colIndex, 1);
      } else {
        let index = 0;
        for (let c of this.columnsPowerUserLists) {
          if (c == this.displayedColumnsPowerUserLists[index]) {
            dataList.push(c);
            index++;
          } else if (c == colName) {
            dataList.push(c);
          }
        }
        this.displayedColumnsPowerUserLists = dataList;
      }

      for (let val of this.tableHeaderDetails) {
        if (val.datafield === colName) {
          val.checked = !val.checked;
        }
      }
    } else this.clickOnCheckBox = false;
  }

  setDeletePowerUserObj(userId) {
    this.deletePowerUserObj.powerUserId = userId;
  }

  getDeletePowerUserObj() {
    return this.deletePowerUserObj;
  }
}

export interface PeriodicElement {
  userId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  userName: string;
  effectiveDate: string;
  status: string;
}
