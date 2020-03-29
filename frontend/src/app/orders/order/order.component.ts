import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { Order } from 'src/app/shared/order.model';
//import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  formData:Order[];
  customerList: Customer[];

  isValid:boolean = true;


  constructor(private orderService: OrderService,
    private dialog: MatDialog,
    private customerService: CustomerService,
    //private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute
    ) { 
     
    }

  ngOnInit() {

    let orderid = this.currentRoute.snapshot.paramMap.get('id');
    if(orderid == null)
    {
      this.resetForm();
    }
    else
    {
      this.orderService.getOrderById(parseInt(orderid)).then(res => {
        console.log(res)
        this.orderService.formData = res[0].orders[0];
        this.orderService.orderItems = res[0].orderItems
        console.log(this.orderService.formData);
        console.log(this.orderService.orderItems);
      })
    }

    
    this.customerService.getCustomer().then(res => this.customerList = res as Customer[]);
  }



  resetForm(form? :NgForm)
  {
    if(form = null)
      form.resetForm();
    this.orderService.formData = {
      
      orderno: Math.floor(1000000+Math.random()*9000000).toString(),
      customerid:0,
      pmethod:'',
      gtotal: 0,
    };
    this.orderService.orderItems=[];
  }

  AddOrEditOrderItem(orderItemIndex, orderid)
  {
    console.log(this.orderService.orderItems)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={orderItemIndex, orderid}
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res =>{
      this.updateGrandTotal();
    });
  }

  onDeleteOrderItem(orderItemsID: number, i: number)
  {

    let orderid = parseInt(this.currentRoute.snapshot.paramMap.get('id'));
    
    console.log(orderItemsID)
    if(orderItemsID!=null)
    {
      this.orderService.upDateDelete(orderid, orderItemsID)
    }

    else{
      console.log("yes");
    this.orderService.orderItems.splice(i,1);
    this.updateGrandTotal();
    }
      
  }

  updateGrandTotal()
  {
    let orderid = this.currentRoute.snapshot.paramMap.get('id');
    if(orderid==null)
    {
      this.orderService.formData.gtotal=this.orderService.orderItems.reduce((prev,curr)=>{
        return prev+curr.total;
      },0)
  
      this.orderService.formData.gtotal = parseFloat((this.orderService.formData.gtotal).toFixed(2));
    }
    else
    {
      this.orderService.formData.gtotal=this.orderService.orderItems.reduce((prev,curr)=>{
        console.log(prev)
        return prev+curr.total;
      },0)
  
      this.orderService.formData.gtotal = (this.orderService.formData.gtotal);
      //console.log(this.orderService.formData.gtotal)
      // console.log(this.orderService.orderItems)
      // let pre = this.orderService.orderItems.length
      // this.orderService.formData.gtotal=+(this.orderService.formData.gtotal) + this.orderService.orderItems[pre-1].total 
      // console.log(this.orderService.formData.gtotal)

    }
     
  }

  validateForm()
  {
    this.isValid = true;
    if(this.orderService.formData.customerid==0)
    {
      this.isValid=false;
    }
      
    else if (this.orderService.orderItems.length==0)
    {
      this.isValid=false;
    }
      
    else
      this.isValid=true;

      return this.isValid
  }

  
  onSubmit(form: NgForm)

  {
    let orderid = this.currentRoute.snapshot.paramMap.get('id');

    if(orderid==null){

      if(this.validateForm())
    {
      console.log(form.value)
      this.orderService.saveOrder().subscribe(res =>{
        this.orderService.saveItem(res).subscribe(res =>{
          console.log(res)
        })
        this.resetForm();
        //this.toastr.success('Submitted Successfully','Restaurent App.');
        this.router.navigate(['/orders']);
      })
    }

    }

    else
    {
      if(this.validateForm())
      {
        console.log(form.value)
        this.orderService.upDateOrder(orderid).subscribe(res =>{
          this.orderService.upDateItem(res).subscribe(res =>{
            console.log(res)
          })
          this.resetForm();
          //this.toastr.success('Submitted Successfully','Restaurent App.');
          this.router.navigate(['/orders']);
        })
      }

    }

    

  }

}
