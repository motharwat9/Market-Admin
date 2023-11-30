import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Iproduct } from 'src/app/model/iproduct';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProduct } from 'src/app/model/new-product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products:Iproduct[]=[]
  catigroies:string[]=[]
  base64:any=''
  AddProForm;
  constructor(private srvice:ProductService,private fb:FormBuilder){
    this.AddProForm=this.fb.group({
      title: ['',Validators.required],
      price: ['',Validators.required],
      description:['',Validators.required],
      image: ['',Validators.required],
      category: ['',Validators.required]
    })
  }
  ngOnInit(): void {
    this.getAllProduct()
    this.getAllCategories()
  }

  getAllProduct(){
    this.srvice.getAllProducts().subscribe({
      next:(data:Iproduct[])=>{
        this.products=data
      }
    })
  }
  getAllCategories(){
    this.srvice.getAllCategory().subscribe(cat=>{
      this.catigroies=cat
    })
  }
  getImagePath(event:any){
    const file =event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload= ()=>{
      this.base64 =reader.result;
      this.AddProForm.get('image')?.setValue('base64 is large')
    }
  }
  addProduct(){
    let body=this.AddProForm.value
    this.srvice.createNewProduct(body).subscribe(res=>{
      alert('Done')
    })

  }
  getSelectedCat(event:any){
    this.AddProForm.get('category')?.setValue(event)    
  }
  Update(product:any){
    let updatedPro=this.AddProForm.setValue({ // Must provide all properties
      title:product.title,
      price: product.price,
      description:product.description,
      image: product.image,
      category:product.category 
      });
      this.base64=product.image
  }
  

}
