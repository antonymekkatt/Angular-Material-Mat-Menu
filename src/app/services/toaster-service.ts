import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private MatSnackBar: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar(message: string, action: string, type: string) {
    this.MatSnackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: type,
    });
  }
  openSnackBarSuccess(message: string, action: string) {
    this.MatSnackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: "success",
    });
  }
  openSnackBarWarning(message: string, action: string) {
    this.MatSnackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: "warning",
    });
  }
  openSnackBarError(message: string, action: string) {
    this.MatSnackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: "error",
    });
  }
  openSnackBarInfo(message: string, action: string) {
    this.MatSnackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: "info",
    });
  }
}
