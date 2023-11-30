import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './carts/components/cart/cart.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';

const routes: Routes = [
  {path:'', redirectTo:'cart',pathMatch:'full'},
  {path:'cart' , component:CartComponent},
  {path :'products', component:AllProductsComponent},
  {path:'**',redirectTo :'cart',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
