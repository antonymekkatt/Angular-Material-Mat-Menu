import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Title } from "@angular/platform-browser";
type Moment = moment.Moment;

@Injectable({
  providedIn: "root",
})
export class CommonDataService {
  constructor(private titleService: Title) {}

  private userLoginDetails: any = [
    { userId: 0, firstName: null, lastName: null, middleName: null },
  ];
  private homePageModuleDetails: any;
  private footerDetails: any = [
    { version: null, instance: null, enviornment: null },
  ];
  private gridPageItemCount: any = 1;

  userList: any = [
    {
      gridHeadings: [
        {
          checked: true,
          datafield: "userName",
          text: "User Name",
        },
        { datafield: "effectiveDate", text: "Effective Date", checked: true },
        { datafield: "status", text: "Status", checked: true },
      ],
      powerusers: [
        {
          comments: null,
          effectiveDate: "2019-10-07T10:19:20.277",
          firstName: "Arun",
          lastName: "Aravind",
          middleName: null,
          status: "Active",
          userId: 1,
          userName: "arun",
        },

        {
          comments: null,
          effectiveDate: "2019-11-19T01:37:36.880",
          firstName: "Antony",
          lastName: "Mekkatt",
          middleName: "Antony",
          status: "Active",
          userId: 3,
          userName: "antony.mekkatt",
        },
        {
          comments: null,
          effectiveDate: "2019-10-07T10:19:20.277",
          firstName: "Niyasi",
          lastName: "Pediyakkal",
          middleName: null,
          status: "Active",
          userId: 2,
          userName: "niyasi",
        },
      ],
    },
  ];

  userGroupList: any = [
    {
      gridHeadings: [
        { datafield: "userGroupName", text: "User Group Name", checked: true },
        { datafield: "description", text: "Description", checked: true },
        { datafield: "modifiedBy", text: "Modified By", checked: true },
        { datafield: "modifiedOn", text: "Modified On", checked: true },
      ],
      groups: [
        {
          active: "Active",
          description: "Administrative privilege- Manage all modules",
          modifiedBy: "ERS-ADMIN",
          modifiedOn: "2019-10-07T10:19:20.277",
          permission: null,
          reportUserGroupId: 1,
          userGroupName: "Report - Administration",
        },
      ],
    },
  ];

  // setter Method
  public setUserLoginDetails(userLoginDetailsObj) {
    this.userLoginDetails = userLoginDetailsObj;
  }

  public setHomePageModuleDetails(homePageModuleDetails) {
    this.homePageModuleDetails = homePageModuleDetails;
  }

  public setHeaderTitle(newTitle: string) {
    this.titleService.setTitle("Home | " + newTitle);
  }

  public addUser(userData) {
    (this.userList[0].powerusers as any).push(userData);
  }

  public addUserGroup(userGroupData) {
    (this.userGroupList[0].groups as any).push(userGroupData);
  }

  public removeUser(userID){
    this.userList[0].powerusers = (this.userList[0].powerusers as any).filter(
      (user) => user.userId != userID
    );
  }

  public removeUserGroup(reportUserGroupId){
    this.userGroupList[0].groups = (this.userGroupList[0].groups as any).filter(
      (group) => group.reportUserGroupId != reportUserGroupId
    );
  }

  public getDashBoardModuleDetails() {
    return this.homePageModuleDetails;
  }

  public getFooterDetails() {
    return this.footerDetails;
  }

  public getGridPageItemCount() {
    return this.gridPageItemCount;
  }

  public getUserList() {
    return this.userList[0];
  }

  public getUserGroupList() {
    return this.userGroupList[0];
  }
  
  public getDateFormatLongTime(dateValue) {
    if (dateValue != null) {
      return moment(new Date(dateValue)).format("MM/DD/YYYY HH:mm:ss");
    } else {
      return "";
    }
  }

  public getDateFormatShort(dateValue) {
    if (dateValue != null) {
      return moment(new Date(dateValue)).format("MM/DD/YYYY");
    } else {
      return "";
    }
  }
}
