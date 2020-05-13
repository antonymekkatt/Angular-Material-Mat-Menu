import { Component, OnInit, ViewChild } from "@angular/core";
import { globalVariables } from "src/assets/values/global-variables";
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";
import { ErrorsHandlerService } from "src/app/services/error-handler-service";
import { CommonDataService } from "src/app/services/common-data-services";
import { Router, ActivatedRoute } from "@angular/router";
import { DataBindService } from "src/app/services/data-bind-service";
import { ToasterService } from "src/app/services/toaster-service";
import { ConfirmDialogComponent } from "src/app/common-dialog/confirm-dialog/confirm-dialog.component";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: "app-report-usergroup-list",
  templateUrl: "./report-usergroup-list.component.html",
  styleUrls: ["./report-usergroup-list.component.scss"],
})
export class ReportUsergroupListComponent implements OnInit {
  displayedColumnsUserGroupLists: string[] = [];
  columnsUserGroupLists: string[] = [];
  dataSourceUserGroupList: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSize: any = 0;
  pageIndex: number = 0;
  totalDataLength: number = 0;
  tableDataCount = 0;

  tableHeaderDetails: any;
  userGroupList: any = [];

  userGroup: any = [];
  searchValue: string = "";
  formUserGroupSearch = new FormControl("");
  LONG_DATE_TIME = globalVariables.LONG_DATE_TIME;
  deleteReportUserGroupObj: any = { reportUserGroupId: null };

  userGroupForm: FormGroup;
  displayTableNoDataContent: any = false;
  displayTableMenu: any = false;
  displayTableLoadingContent: any = false;

  clickOnCheckBox: boolean = false;

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
    this.userGroupForm = formbuilder.group({
      usergroup: [
        "",
        [
          Validators.maxLength(80),
          this.customValidatorPattern("^(?! )[A-Za-z0-9 ,._/-]*$"),
        ],
      ],
    });
  }

  ngOnInit() {
    //--------Setting Page Title---------------
    this.dataService.setHeaderTitle("User Group | List");
    this.pageSize = this.dataService.getGridPageItemCount();
    this.loadReportUserGroups();
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

  public hasError = (controlName: string, errorName: string) => {
    return this.userGroupForm.controls[controlName].hasError(errorName);
  };

  loadReportUserGroups() {
    this.userGroup = this.dataService.getUserGroupList();
    this.loadTableDetails();
    this.displayLoader(false);
  }

  displayLoader(isAvailable) {
    if (this.dataSourceUserGroupList != undefined)
      this.displayTableLoadingContent = isAvailable;
  }

  loadTableDetails() {
    this.userGroupList = this.userGroup.groups;
    this.tableHeaderDetails = this.userGroup.gridHeadings;
    this.displayedColumnsUserGroupLists = [];
    this.columnsUserGroupLists = [];
    for (let col of this.tableHeaderDetails) {
      this.displayedColumnsUserGroupLists.push(col.datafield);
      this.columnsUserGroupLists.push(col.datafield);
    }
    this.totalDataLength = this.userGroupList.length;
    let index = 0;
    this.tableDataCount = this.userGroupList.length;
    while (index < this.tableDataCount) {
      this.userGroupList[
        index
      ].modifiedOn = this.dataService.getDateFormatShort(
        this.userGroupList[index].modifiedOn
      );
      index++;
    }

    this.dataSourceUserGroupList = new MatTableDataSource<PeriodicElement>(
      this.userGroupList
    );
    if (this.tableDataCount > 0) {
      this.displayTableNoDataContent = false;
      this.displayTableMenu = true;
    } else {
      this.displayTableMenu = false;
      this.displayTableNoDataContent = true;
    }
    this.dataSourceUserGroupList.sort = this.sort;
    this.displayedColumnsUserGroupLists.push("edit");
    this.columnsUserGroupLists.push("edit");
  }

  changePage(event) {
    this.pageIndex = event.pageIndex;
    this.loadReportUserGroups();
  }

  reportUserGroupSearch(userGroupFormData) {
    this.searchValue = userGroupFormData.value.usergroup.trim();
    this.pageIndex = 0;
    this.loadReportUserGroups();
  }

  addReportUserGroup() {
    this.router.navigateByUrl("/home/acc-mnt/usergroups/add");
  }

  editReportUserGroup(userGroupId) {
    this.router.navigateByUrl("/home/acc-mnt/usergroups/update/" + userGroupId);
  }

  deleteReportUserGroup(reportUserGroupId, userGroupName) {
    setTimeout(() =>
      this.dialog
        .open(ConfirmDialogComponent, {
          data: {
            title: "",
            message: "Do you want to delete " + userGroupName + "?",
          },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.dataService.removeUserGroup(reportUserGroupId);
            this.loadReportUserGroups();
          } else {
            this.dialog.closeAll();
          }
        })
    );
  }

  myListBoxItemOnCheckChange(colName): void {
    this.clickOnCheckBox = true;

    let dataList: string[] = [];
    const colIndex = this.displayedColumnsUserGroupLists.findIndex(
      (col) => col === colName
    );
    if (colIndex > -1) {
      // column is currently shown in the table, so we remove it
      this.displayedColumnsUserGroupLists.splice(colIndex, 1);
    } else {
      let index = 0;
      for (let c of this.columnsUserGroupLists) {
        if (c == this.displayedColumnsUserGroupLists[index]) {
          dataList.push(c);
          index++;
        } else if (c == colName) {
          dataList.push(c);
        }
      }
      this.displayedColumnsUserGroupLists = dataList;
    }
  }

  myListBoxOnCheckChange(colName) {
    if (!this.clickOnCheckBox) {
      let dataList: string[] = [];
      const colIndex = this.displayedColumnsUserGroupLists.findIndex(
        (col) => col === colName
      );
      if (colIndex > -1) {
        // column is currently shown in the table, so we remove it
        this.displayedColumnsUserGroupLists.splice(colIndex, 1);
      } else {
        let index = 0;
        for (let c of this.columnsUserGroupLists) {
          if (c == this.displayedColumnsUserGroupLists[index]) {
            dataList.push(c);
            index++;
          } else if (c == colName) {
            dataList.push(c);
          }
        }
        this.displayedColumnsUserGroupLists = dataList;
      }

      for (let val of this.tableHeaderDetails) {
        if (val.datafield === colName) {
          val.checked = !val.checked;
        }
      }
    } else this.clickOnCheckBox = false;
  }
}

export interface PeriodicElement {
  reportUserGroupId: number;
  userGroupName: string;
  active: string;
  description: string;
  modifiedBy: string;
  modifiedOn: string;
  permission: string;
}
