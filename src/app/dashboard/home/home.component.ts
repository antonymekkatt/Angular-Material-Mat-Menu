import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ErrorsHandlerService } from "src/app/services/error-handler-service";
import { CommonDataService } from "src/app/services/common-data-services";
import { Router } from "@angular/router";
import { formatDate, PlatformLocation } from "@angular/common";
import { DataBindService } from "src/app/services/data-bind-service";
import { NavItem } from "../menu-list-item/menu-list-item.component";
import { NavService } from "src/app/services/nav-services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {

  @ViewChild("appDrawer") appDrawer: ElementRef;

  homePageDetails: any;
  userLoginDetails: any = [
    { userId: 0, firstName: null, lastName: null, middleName: null },
  ];
  footerDetails: any = [{ version: null, instance: null, enviornment: null }];
  homePageMenuDetails: any;
  opened: boolean;
  datetime: any;
  isExpanded: boolean = true;
  navigationSubscription;
  
  showSubmenu: boolean = false;
  navItems: NavItem[] = [];

  dashboardDetails:any = [
    {
      moduleItems: [
        {
          active: true,
          cssClass: null,
          description: "Dashboard",
          largeIcon: "dashboard",
          moduleId: 1,
          moduleName: "Dashboard",
          modules: [],
          smallIcon: "dashboard",
          sortOrder: 100,
          url: "home/dashboard",
        },
        {
          active: true,
          cssClass: "menu_dropdowninner_",
          description: "Access Management",
          largeIcon: "account_circle",
          moduleId: 4,
          moduleName: "Access Management",
          modules: [
            {
              active: true,
              cssClass: null,
              description: "Users",
              largeIcon: "person_outline",
              moduleId: 6,
              moduleName: "Users",
              modules: [],
              smallIcon: "users",
              sortOrder: 100,
              url: "home/acc-mnt/users",
            },
            {
              active: true,
              cssClass: null,
              description: "User Group",
              largeIcon: "group",
              moduleId: 5,
              moduleName: "User Group",
              modules: [],
              smallIcon: "user_groups",
              sortOrder: 200,
              url: "home/acc-mnt/usergroups",
            },
          ],
          smallIcon: "access_management",
          sortOrder: 400,
          url: "home/acc-mnt",
        },
      ],
      userlogininfo: [
        {
          comments: null,
          effectiveDate: null,
          firstName: "Antony",
          lastName: "Mekkatt",
          middleName: null,
          status: null,
          userId: 1,
          userName: null,
        },
      ],
    },
  ];

  constructor(
    private errorHandler: ErrorsHandlerService,
    private dataService: CommonDataService,
    private router: Router,
    private databind: DataBindService,
    private location: PlatformLocation,
    private ref: ChangeDetectorRef,
    private navService: NavService
  ) {
    this.userLoginDetails = this.dashboardDetails[0].userlogininfo;
    this.dataService.setUserLoginDetails(this.userLoginDetails);
    this.footerDetails = this.dataService.getFooterDetails();
    this.homePageMenuDetails = this.dashboardDetails[0].moduleItems;
    this.dataService.setHomePageModuleDetails(this.homePageMenuDetails);
  }

  ngOnInit() {
    this.opened = true;
    this.navItems = this.homePageMenuDetails;
    setInterval(() => {
      let today = new Date();
      this.databind.dateTimeBinding(today);
    }, 1);

    this.databind.dateTimeBind.subscribe((selectedData) => {
      this.datetime = this.dataService.getDateFormatLongTime(selectedData);
    });
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
