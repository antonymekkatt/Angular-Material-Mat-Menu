import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataBindService {

    constructor() { }

    private paramValue: any = { formDate: null, paramIndex: null, paramName: null };

    @Output() dateTimeBind: EventEmitter<any> = new EventEmitter();
    @Output() formToFromDateBind: EventEmitter<any> = new EventEmitter();
    @Output() formToFromMonthYearBind: EventEmitter<any> = new EventEmitter();

    dateTimeBinding(dateTime: Date) {
        this.dateTimeBind.emit(dateTime);
    }

    formToFromDateBinding(formDate: Date, paramIndex: any, paramName: any) {
        this.paramValue.formDate = formDate;
        this.paramValue.paramIndex = paramIndex;
        this.paramValue.paramName = paramName;
        this.formToFromDateBind.emit(this.paramValue);
    }

    formToFromMonthYearBinding(formDate: Date, paramIndex: any, paramName: any) {
        this.paramValue.formDate = formDate;
        this.paramValue.paramIndex = paramIndex;
        this.paramValue.paramName = paramName;
        this.formToFromMonthYearBind.emit(this.paramValue);
    }

    getFormattedMonthDayYearHourMinute(date) {
        if (date != null) {
            var dateFormat = new Date(date);

            var year = dateFormat.getFullYear();

            var month = (1 + dateFormat.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
            var day = dateFormat.getDate().toString();
            day = day.length > 1 ? day : '0' + day;

            var hour = dateFormat.getHours().toString();
            hour = hour.length > 1 ? hour : '0' + hour;
            var minute = dateFormat.getMinutes().toString();
            minute = minute.length > 1 ? minute : '0' + minute;

            return month + '/' + day + '/' + year + ' ' + hour + ':' + minute;
        } else {
            return '';
        }
    }

    getFormattedMonthDayYearHourMinuteSecond(date) {
        if (date != null) {
            var dateFormat = new Date(date);

            var year = dateFormat.getFullYear();

            var month = (1 + dateFormat.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
            var day = dateFormat.getDate().toString();
            day = day.length > 1 ? day : '0' + day;

            var hour = dateFormat.getHours().toString();
            hour = hour.length > 1 ? hour : '0' + hour;
            var minute = dateFormat.getMinutes().toString();
            minute = minute.length > 1 ? minute : '0' + minute;
            var second = dateFormat.getSeconds().toString();
            second = second.length > 1 ? second : '0' + second;

            return month + '/' + day + '/' + year + ' ' + hour + ':' + minute + ':' + second;
        } else {
            return '';
        }
    }

    getFormattedYearMonthDay(date) {
        if (date != null) {
            var dateFormat = new Date(date);

            var year = dateFormat.getFullYear();

            var month = (1 + dateFormat.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
            var day = dateFormat.getDate().toString();
            day = day.length > 1 ? day : '0' + day;
            return year + '-' + month + '-' + day;
        } else {
            return '';
        }
    }

    getFormattedMonthDayYear(date) {
        if (date != null) {
            var dateFormat = new Date(date);

            var year = dateFormat.getFullYear();

            var month = (1 + dateFormat.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
            var day = dateFormat.getDate().toString();
            day = day.length > 1 ? day : '0' + day;
            return month + '/' + day + '/' + year;
        } else {
            return '';
        }
    }
}
