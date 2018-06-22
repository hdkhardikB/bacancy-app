import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
   
    {state: 'jobs', type: 'link', name: 'Job List', icon: 'access_alarm'},
    {state: 'new', type: 'link', name: 'Create Job', icon: 'add'},
    
]; 

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
