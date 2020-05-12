import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from './toaster-service';
import { globalVariables } from 'src/assets/values/global-variables';


@Injectable()
export class ErrorsHandlerService implements ErrorHandler {

    constructor(private toasterService: ToasterService, private router: Router) { }

    handleError(error: Error | HttpErrorResponse) {
        debugger
        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
                // Handle offline error
            } else {
                if (error.status == 200) {
                    var str = error.error.text.toString();
                    var restatus = str.indexOf('loginform');
                    if (restatus > -1) {
                        return;
                    } else {
                        this.toasterService.openSnackBar(error.error.text, '', 'success');
                    }
                } else if (error.status == 400) {
                    //Bad Request. ...
                    this.toasterService.openSnackBar(error.error, '', 'error');
                } else if (error.status == 401) {
                    //Unauthorized. ...
                } else if (error.status == 402) {

                } else if (error.status == 403) {
                    //Forbidden. ...
                } else if (error.status == 404) {
                    //Not Found. ...
                    this.toasterService.openSnackBar('404 Error', '', 'error');
                    this.router.navigate(['404']);
                } else if (error.status == 500) {
                    this.toasterService.openSnackBar('Internal Server Error.', '', 'error');
                    //Internal Server Error. ...
                } else if (error.status == 503) {
                    //Service Unavailable. ...
                }
                else if (error.status == 501) {
                }
            }
        } else {
            // Handle Client Error (Angular Error, ReferenceError...)     
        }
        // Log the error anyway
        console.error('It happens: ', error);
    }
}