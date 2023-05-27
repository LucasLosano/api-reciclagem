import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent { 
  isSairVisible: boolean = false;

  ngOnInit() {
    this.isSairVisible = sessionStorage.getItem('token') !== null;
  }
  
  logout(){
    sessionStorage.removeItem('token');
    location.reload();
  }
}
