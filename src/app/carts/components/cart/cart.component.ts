import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Carts } from 'src/app/model/carts';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/products/services/product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  Carts:Carts[]=[]
  details:Carts |null=null
  products:any=[]
  dateForm;
  constructor(private service:CartService,private fb:FormBuilder,private productSer:ProductService){
    this.dateForm=this.fb.group({
      start:[''],
      end:['']
    })
  }
  ngOnInit(): void {
    this.getAllCarts()
  }
  getAllCarts(){
    this.service.getAllCarts().subscribe(res=>{
      this.Carts=res
    })
  }
  applyFilter(){
    let date=this.dateForm.value
    this.service.getAllCartsByDateRan(date).subscribe(res=>{
      this.Carts=res
    })
  }
  deleteCart(id:number){
    this.service.deleteCart(id).subscribe(res=>{
      this.getAllCarts()
    })
  }
  viewDetils(index:number){
    this.products=[];
    this.details=this.Carts[index]
    for(let x in this.details.products){
      this.productSer.getProductByTd(this.details.products[x].productId).subscribe(res=>{
        this.products.push({item:res,quantity:this.details?.products[x].quantity})
      })
    }
  }

}
