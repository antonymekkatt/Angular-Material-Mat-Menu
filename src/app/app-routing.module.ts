import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';
import { PowerUserListComponent } from './access-management/power-user-list/power-user-list.component';
import { PowerUserAddComponent } from './access-management/power-user-add/power-user-add.component';
import { ReportUsergroupListComponent } from './access-management/report-usergroup-list/report-usergroup-list.component';
import { ReportUsergroupAddComponent } from './access-management/report-usergroup-add/report-usergroup-add.component';
import { HomeComponent } from './dashboard/home/home.component';
import { PageNotFoundComponent } from './dashboard/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home/dashboard', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', component: DashboardContainerComponent },
      {
        path: 'dashboard', data: { breadcrumbs: ' Dashboard' },
        children: [
          { path: '', component: DashboardContainerComponent },
         ]
      },
      {
        path: 'acc-mnt/users', data: { breadcrumbs: ' User List' },
        children: [
          { path: '', component: PowerUserListComponent },
          { path: 'add', component: PowerUserAddComponent, data: { breadcrumbs: '> Add User' } },
        ],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'acc-mnt/usergroups', data: { breadcrumbs: ' User Group' },
        children: [
          { path: '', component: ReportUsergroupListComponent },
          { path: 'add', component: ReportUsergroupAddComponent, data: { breadcrumbs: '> Add User Group' } },
        ],
        runGuardsAndResolvers: 'always',
      },
      { path: '**', redirectTo: '/home/pagenotfound' },
      { path: '404', redirectTo: '/home/pagenotfound' }
    ], runGuardsAndResolvers: 'always',
  },
  { path: '404', redirectTo: '/home/pagenotfound' },
  { path: '**', redirectTo: '/home/pagenotfound' },
  { path: 'home/pagenotfound', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
