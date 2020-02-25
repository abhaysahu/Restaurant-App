import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { OrderItem } from 'src/app/shared/order-item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  formData: OrderItem
  itemList: Item[];
  isValid: boolean = true



  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService,
    private orderService: OrderService
     
  ) 
  {  }

  ngOnInit() {

    this.itemService.getItem().then(res =>{
      this.itemList = res as Item[]
      console.log(this.itemList)
    })

    if(this.data.orderItemIndex == null)
    {
      this.formData = {
        orderitemid: null,
        orderid: this.data.orderid,
        itemid: 0,
        itemname: '',
        price: 0,
        quantity: 0,
        total: 0
      }

    }
    else 
    {
      this.formData = Object.assign({},this.orderService.orderItems[this.data.orderItemIndex]);
    }


    
  }

  updatePrice(ctrl) {
    if(ctrl.selectedIndex==0) {
      this.formData.price = 0;
      this.formData.itemname = '';
    }

    else {
      this.formData.price = this.itemList[ctrl.selectedIndex-1].price
      this.formData.itemname = this.itemList[ctrl.selectedIndex-1].name
    }

    this.updateTotal();
  }

  updateTotal(){

    this.formData.total = parseFloat((this.formData.price * this.formData.quantity).toFixed(2)); 
  }

  onSubmit(form:NgForm)
  {
    if(this.validateForm(form.value))
    {
      if(this.data.orderItemIndex == null)
      this.orderService.orderItems.push(form.value);
      else
      this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      this.dialogRef.close();
    }
    
  }


  validateForm(formData:OrderItem) {
    this.isValid = true;
    if(formData.itemid==0)
    {
      this.isValid=false;
    }
    else if (formData.quantity==0)
    {
      this.isValid=false;
    }
    return this.isValid;
  }


}
