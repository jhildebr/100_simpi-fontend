import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'sim-nav-menu',
  templateUrl: 'navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  private brand : string;
  public activeIndex: number;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.brand = "";
    this.route.params.subscribe(params => {
      this.brand = params['brandAlias'];});
  }

  public onNavItemClicked(item : string){
    switch (item) {
        case 'Home': 
            this.activeIndex = 1;
            break;
        case 'Products': 
            this.activeIndex = 2;  
            this.router.navigate([this.brand,'cockpit','products']);
            break;
        case 'Simpis':
            this.activeIndex = 3;   
            break;
        case 'Assets':
            this.activeIndex = 4;    
            this.router.navigate([this.brand,'cockpit','assets']);
            break;
        case 'Analytics':
            this.activeIndex = 5;    
            this.router.navigate([this.brand,'cockpit','analytics']);
            break;
        default:  break;
    }
  }
}
