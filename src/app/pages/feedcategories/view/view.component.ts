import { map } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrMessages } from '../../../helpers/toaster.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { element } from '@angular/core/src/render3';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';


@Component({
  selector: 'ngx-sponsersview',
  templateUrl: './view.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ViewComponent implements OnInit {

  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;
  allGroups:any = [];
  userGroups = [];
  dropdownList = [];
  selectedItem:any;
  eventForm: FormGroup;
  submitted = false;
  spinner = false;

  selectedUserId:any;
  selectedUserName="";
  settings = {
    mode: 'external',
    actions: {
      columnTitle:"",
      position: 'right', // left|right
      add:false
    },

    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },

    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    custom : [{
      name : "groups",
      title : '<i class="nb-trash"></i>'
    }]
    ,   
    columns: {

      id:{
        title: 'Id',
        type: 'string'

      }
      ,
      name:{
        title: 'Name',
        type: 'string'
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          });
        }
      },

    },


  };
  source: LocalDataSource = new LocalDataSource();



  constructor( 
    private http: HttpClient,
    private router: Router,
    private toast: ToastrMessages,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private datePipe:DatePipe,private _NgbModal: NgbModal) { 
    
  }
  ngOnInit() {
  //  this.getAllGroups();

  this.eventForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    description:['', [Validators.required, Validators.minLength(4)]],
    status:['0']

   });
  this.getAllItems();
   
  }


  getAllItems(){

    this.http.get(this.baseUrl + 'api/feedscategorylist').subscribe(
      (response: any) => {
        this.source.load(response.body);
      },
      (error) => {
  });    


  }



  onDelete(event): void {
    if (confirm('Are you sure to delete this feeds category?')) {
      this.http.delete(this.baseUrl + 'api/feedscategory/' + event.data.id)
        .subscribe(
          (response: any) => {
            if (response.message == 'Feeds Category Successfully Deleted!') {
                 this.toast.showToast(NbToastStatus.SUCCESS, 'Feeds Category', response.message);
                 this.getAllItems();
            }
        });
    }
  }
  

  onEdit(item, modelId){

    this.selectedItem = item.data;
     this.eventForm.setValue({  
      name: item.data.name,
      description:item.data.description,
      status:item.data.status
   
  });  
    
    this.modalService.open(modelId);  
  
  }



  updatItem(){


    this.submitted = true;
    if (this.eventForm.invalid) {
      return;
    }

    let  Data = {
      name:this.f.name.value,
      description:this.f.description.value,
      status:this.f.status.value,
     }

    this.http.put(this.baseUrl + 'api/feedscategoryedit/'+ this.selectedItem.id, Data).subscribe(
      (response: any) => {
        this.modalService.dismissAll();
        if (response.message === 'Feeds Category updated Successfully!') {
          this.modalService.dismissAll();
           this.spinner = false;
           this.toast.showToast(NbToastStatus.SUCCESS, 'Feeds Category',response.message);
           this.getAllItems();
        }
      },
      (error) => {
        this.spinner = false;
        this.modalService.dismissAll();
        this.toast.showToast(NbToastStatus.DANGER, 'Group',error.error.message);
       
      });


  }
  get f() { return this.eventForm.controls; }

  statusChange(data){
    console.log(data);
    let itemStatus = 0;
    let itemId = data.id;
    if(data.status==0){
      itemStatus = 1;
    }else{
       itemStatus = 0;
    }

    data = {
      "status":itemStatus,
      "feedCategoryId":itemId
    }
         this.http.put(this.baseUrl + 'api/feedsCategorystatusupdate',data).subscribe(
        (response: any) => {

          if (response.message == 'Status updated Successfully!') {
            this.toast.showToast(NbToastStatus.SUCCESS, 'Feeds Category', response.message);
            this.getAllItems();
          }
        },
        (error) => {
       });

  }

}

@Component({
  selector: 'button-view',
  template: `
    <button (click)="onClick()" *ngIf="renderValue==0">Activate</button>
    <button (click)="onClick()" *ngIf="renderValue==1">Deactivate</button>

  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private vewcomp:ViewComponent){

  }

  ngOnInit() {

      this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
   this.vewcomp.statusChange(this.rowData);
  }
}
