import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
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
    name:{
        title: 'Name',
        type: 'string'
      },
      platform: {
        title: 'platform',
        type: 'string',
      },

      url: {
        title: 'url',
        type: 'string',
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
  const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      platform:['IOS', [Validators.required]],
      url:['', [Validators.required, Validators.pattern(urlRegex)]],
      status:['0']

   });
  this.getAllItems();
   
  }


  getAllItems(){

    this.http.get(this.baseUrl + 'api/applist').subscribe(
      (response: any) => {
        this.source.load(response.body);
      },
      (error) => {
  });    


  }



  onDelete(event): void {
    if (confirm('Are you sure to delete this feeds app?')) {
      this.http.delete(this.baseUrl + 'api/app/' + event.data.id)
        .subscribe(
          (response: any) => {
            if (response.message == 'App Successfully Deleted!') {
                 this.toast.showToast(NbToastStatus.SUCCESS, 'App', response.message);
                 this.getAllItems();
            }
        });
    }
  }
  

  onEdit(item, modelId){

    this.selectedItem = item.data;
     this.eventForm.setValue({  
      name: item.data.name,
      url:item.data.url,
      platform:item.data.platform,
      status:item.data.status
   
  });  
    
    this.modalService.open(modelId);  
  
  }



  updateItem(){


    this.submitted = true;
    if (this.eventForm.invalid) {
      return;
    }

    let  Data = {
      name:this.f.name.value,
      platform:this.f.platform.value,
      status:this.f.status.value,
      url:this.f.url.value,
     }

    this.http.put(this.baseUrl + 'api/appedit/'+ this.selectedItem.id, Data).subscribe(
      (response: any) => {
        this.modalService.dismissAll();
        if (response.message === 'App updated Successfully!') {
          this.modalService.dismissAll();
           this.spinner = false;
           this.toast.showToast(NbToastStatus.SUCCESS, 'App',response.message);
           this.getAllItems();
        }
      },
      (error) => {
        this.spinner = false;
        this.modalService.dismissAll();
        this.toast.showToast(NbToastStatus.DANGER, 'App',error.error.message);
       
      });


  }
  get f() { return this.eventForm.controls; }

}
