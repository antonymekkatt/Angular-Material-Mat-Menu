import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/services/common-data-services';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-power-user-add',
  templateUrl: './power-user-add.component.html',
  styleUrls: ['./power-user-add.component.scss']
})
export class PowerUserAddComponent implements OnInit {

  addPowerUserForm: FormGroup;
  powerUserObj: any = { firstName: null, middleName: null, lastName: null, status: null, effectiveDate: null, userName: null, userId: null, comments: null };

  constructor(private dataService: CommonDataService,
    private router: Router,
    public dialog: MatDialog,
    private formbuilder: FormBuilder) {

    this.addPowerUserForm = formbuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(40), this.customValidatorWhiteSpaceAndPattern('^[#A-Za-z0-9_]*$', 1)]],
      firstName: ['', [Validators.required, Validators.maxLength(50), this.customValidatorWhiteSpaceAndPattern('^(?! )[A-Za-z0-9 ]*$', 1)]],
      middleName: ['', [Validators.maxLength(20), this.customValidatorWhiteSpaceAndPattern('^(?! )[A-Za-z0-9 ]*$', 0)]],
      lastName: ['', [Validators.required, Validators.maxLength(50), this.customValidatorWhiteSpaceAndPattern('^(?! )[A-Za-z0-9 ]*$', 0)]],
      comments: ['', [Validators.required, Validators.maxLength(160), this.customValidatorWhiteSpaceAndPattern('^(?! )[A-Za-z0-9 ,._\/-]*$', 1)]],
      status: [false],
    });
  }

  noWhitespaceValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let val = (control.value || '').trim().length
    const isWhitespace = val > 1 || val == 0;
    return isWhitespace ? null : { 'whitespace': true };
  }

  noWhitespaceValidatorForLastName(control: AbstractControl): { [key: string]: boolean } | null {
    let val = (control.value || '').trim().length
    const isWhitespace = val > 0 || val == 0;
    return isWhitespace ? null : { 'whitespace': true };
  }

  customValidatorWhiteSpaceAndPattern(pattern: any, minLength: Number): ValidatorFn {
    return (control: AbstractControl): any | null => {
      if (control.value !== undefined && control.value != null) {
        if (control.value.length > 0) {
          let regexp = new RegExp(pattern);
          let patternFlag = regexp.test(control.value)
          if (!patternFlag) {
            return { 'pattern': true, 'whitespace': false };
          } else {
            let val = (control.value || '').trim().length
            const isWhitespace = val > minLength || val == 0;
            return isWhitespace ? null : { 'pattern': false, 'whitespace': true };
          }
        }
      }
      return null;
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addPowerUserForm.controls[controlName].hasError(errorName);
  }

  ngOnInit() {
    //--------Setting Page Title---------------
    this.dataService.setHeaderTitle('User | Add');
  }

  getPowerUserObj() {
    return this.powerUserObj;
  }

  addPowerUserAction(powerUserFormData) {
    let powerUserObj = this.getPowerUserObj();
    let length = this.dataService.getUserList().powerusers.length;
    if (powerUserFormData.status === 'VALID') {
      powerUserObj.comments = powerUserFormData.value.comments.trim();
      powerUserObj.status = powerUserFormData.value.status;
      powerUserObj.userName = powerUserFormData.value.userName.trim();
      powerUserObj.firstName = powerUserFormData.value.firstName.trim();
      powerUserObj.middleName = powerUserFormData.value.middleName.trim();
      powerUserObj.lastName = powerUserFormData.value.lastName.trim();
      powerUserObj.effectiveDate = new Date();
      powerUserObj.userId = length++;

      this.dataService.addUser(powerUserObj);
      this.router.navigateByUrl('/home/acc-mnt/users');

    }
  }

  cancelPowerUserAdd() {
    this.router.navigateByUrl('/home/acc-mnt/users');
  }

}
