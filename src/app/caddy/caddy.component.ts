import { Component, OnInit } from '@angular/core';
import {ItemProduct} from '../model/item-product.model';
import {AuthenticationService} from '../services/authentication.service';
import {CaddyService} from '../services/caddy.service';
import {Router} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';
import {Caddy} from '../model/caddy.model';

@Component({
  selector: 'app-caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css']
})
export class CaddyComponent implements OnInit {
  public caddy:Caddy;

  constructor(private catService:CatalogueService,
              private router:Router,
              private caddyService:CaddyService,
              private authService:AuthenticationService) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated())
      this.router.navigateByUrl('/login');
    this.caddy=this.caddyService.getCaddy();
    console.log(this.caddy);
  }



  onRemoveProductFromCaddy(p: ItemProduct) {
    this.caddyService.removeProduct(p.id);
  }

  getTotal() {
    return this.caddyService.getTotalCurrentCaddy();
  }

  onNewOrder() {
    this.router.navigateByUrl("/client");
  }

  onAddCaddy() {

    let size=this.caddyService.listCaddies.length;
    let index:number=this.caddyService.listCaddies[size-1].num;
    this.caddyService.addNewCaddy({num:index+1,name:"Caddy"+(index+1)});
  }

  onSelectCaddy(c: { num: number; name: string }) {
    this.caddyService.currentCaddyName=c.name;
    this.caddy=this.caddyService.getCaddy();
  }

}
