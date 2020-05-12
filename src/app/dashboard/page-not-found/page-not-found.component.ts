import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { globalVariables } from 'src/assets/values/global-variables';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  PAGE_NOT_FOUNT_PATH = "../../../" + globalVariables.IMAGE_LOCATION_PATH + globalVariables.PAGE_NOT_FOUND;

  backToDashboard(){
    this.router.navigateByUrl('/home/dashboard');
  }
}
