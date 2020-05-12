import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";
import { ErrorsHandlerService } from "src/app/services/error-handler-service";
import { CommonDataService } from "src/app/services/common-data-services";
import { Router } from "@angular/router";
import { DataBindService } from "src/app/services/data-bind-service";
import { ToasterService } from "src/app/services/toaster-service";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-report-usergroup-add",
  templateUrl: "./report-usergroup-add.component.html",
  styleUrls: ["./report-usergroup-add.component.scss"],
})
export class ReportUsergroupAddComponent implements OnInit {
  addUserGroupForm: FormGroup;

  constructor(
    private errorHandler: ErrorsHandlerService,
    private dataService: CommonDataService,
    private router: Router,
    private databind: DataBindService,
    private ToasterService: ToasterService,
    public dialog: MatDialog,
    private formbuilder: FormBuilder
  ) {
    this.addUserGroupForm = formbuilder.group({
      userGroupName: [
        "",
        [
          Validators.required,
          Validators.maxLength(80),
          this.customValidatorWhiteSpaceAndPattern(
            "^(?! )[A-Za-z0-9 ,._/-]*$",
            1
          ),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.maxLength(160),
          ,
          this.customValidatorWhiteSpaceAndPattern(
            "^(?! )[A-Za-z0-9 ,._/-]*$",
            2
          ),
        ],
      ],
      active: [false],
    });
  }

  ngOnInit() {
    //--------Setting Page Title---------------
    this.dataService.setHeaderTitle("User Group | Add");
  }

  noWhitespaceValidatorForDescription(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    let val = (control.value || "").trim().length;
    const isWhitespace = val > 2 || val == 0;
    return isWhitespace ? null : { whitespace: true };
  }

  noWhitespaceValidatorForGroupName(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    let val = (control.value || "").trim().length;
    const isWhitespace = val > 1 || val == 0;
    return isWhitespace ? null : { whitespace: true };
  }

  customValidatorWhiteSpaceAndPattern(
    pattern: any,
    minLength: Number
  ): ValidatorFn {
    return (control: AbstractControl): any | null => {
      if (control.value !== undefined && control.value != null) {
        if (control.value.length > 0) {
          let regexp = new RegExp(pattern);
          let patternFlag = regexp.test(control.value);
          if (!patternFlag) {
            return { pattern: true, whitespace: false };
          } else {
            let val = (control.value || "").trim().length;
            const isWhitespace = val > minLength || val == 0;
            return isWhitespace ? null : { pattern: false, whitespace: true };
          }
        }
      }
      return null;
    };
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addUserGroupForm.controls[controlName].hasError(errorName);
  };

  getReportUserGroupObj() {
    return {
      permission: null,
      modifiedOn: null,
      active: null,
      description: null,
      reportUserGroupId: null,
      userGroupName: null,
      modifiedBy: null,
    };
  }

  addReportUserGroupAction(reportUserGroupFormData) {
    let reportUserGroupObj = this.getReportUserGroupObj();

    if (reportUserGroupFormData.status === "VALID") {
      reportUserGroupObj.active = reportUserGroupFormData.value.active;
      reportUserGroupObj.description = reportUserGroupFormData.value.description.trim();
      reportUserGroupObj.reportUserGroupId =
        reportUserGroupFormData.value.reportUserGroupId;
      reportUserGroupObj.userGroupName = reportUserGroupFormData.value.userGroupName.trim();
      (reportUserGroupObj.modifiedBy = "ERS-ADMIN"),
        (reportUserGroupObj.modifiedOn = new Date());
      reportUserGroupObj.permission = null;

      this.dataService.addUserGroup(reportUserGroupObj);
      this.router.navigateByUrl("/home/acc-mnt/usergroups");

    }
  }

  cancelReportUserGroupAdd() {
    this.router.navigateByUrl("/home/acc-mnt/usergroups");
  }
}
