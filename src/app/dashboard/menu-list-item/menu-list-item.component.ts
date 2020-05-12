import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { globalVariables } from 'src/assets/values/global-variables';
import { Router } from '@angular/router';
import { NavService } from 'src/app/services/nav-services';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {

  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;

  ERS_LOGO_PATH = "../../../" + globalVariables.IMAGE_LOCATION_PATH + globalVariables.LOGO;
  ERS_MENU_ICON_PATH = "../../../" + globalVariables.MENU_ICON_LOCATION_PATH;

  constructor(public navService: NavService,
              public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.url && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.url}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.modules || !item.modules.length) {
      this.router.navigate([item.url]);
      //this.navService.closeNav();
    }
    if (item.modules && item.modules.length) {
      this.expanded = !this.expanded;
    }
  }
}

export interface NavItem {
  moduleName: string
  smallIcon: string,
  largeIcon: string,
  description: string,
  active: boolean,
  cssClass: string,
  url: string,
  modules?: NavItem[];
  /*displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];*/
}
