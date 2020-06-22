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
  imagePath;
  eventForm: FormGroup;
  submitted = false;
  imgURL: any;
  spinner = false;
  fileData = null;
  message="";


  selectedUserId:any;
  selectedUserName="";
  settings = {
    mode: 'external',
    actions: {
      columnTitle:"",
      position: 'right', // left|right
      edit:true,
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
        title: 'Group Name',
        type: 'string'
      },
      category: {
        title: 'Category',
        type: 'string',
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

       image: {
        title: 'Image',
        type: 'html',
        filter: false,
        valuePrepareFunction: (image: string) => `<img width="30px" src="${this.imagesUrl}${image}" />`,
      }
     
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
  this.getAllItems();
  this.eventForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    image: ['',[Validators.required]],
    category:['GENERAL'],
    description:['', [Validators.required, Validators.minLength(4)]],
    status:['0']

   });
   
  }


  getAllItems(){

    this.http.get(this.baseUrl + 'api/grouplist').subscribe(
      (response: any) => {
        
        this.source.load(response.body);
      
     
      },
      (error) => {
  });    


  }



  onDelete(event): void {
    if (confirm('Are you sure to delete this group?')) {
      this.http.delete(this.baseUrl + 'api/group/' + event.data.id)
        .subscribe(
          (response: any) => {
            if (response.message == 'Group Successfully Deleted!') {
                 this.toast.showToast(NbToastStatus.SUCCESS, 'Group', response.message);
                 this.getAllItems();
            }
        });
    }
  }
  onEdit(item, modelId){
    console.log(item);
    this.selectedItem =item.data;

   this.imgURL = this.imagesUrl+item.data.image;
    this.eventForm.setValue({  
      name: item.data.name,
     image:item.data.image,
      category :item.data.category, 
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
      
    this.spinner = true;
    const formData = new FormData();
    formData.append('name', this.f.name.value);
    formData.append('description', this.f.description.value);
    formData.append('category', this.f.category.value);
    formData.append('status', this.f.status.value);

    if(this.fileData!=null){
      formData.append('image', this.fileData);
      formData.append('isImage','true');
    }else{
      formData.append('image', this.selectedItem.image);
      formData.append('isImage', 'false');
    }
   
     this.http.put(this.baseUrl + 'api/groupedit/'+ this.selectedItem.id, formData).subscribe(
      (response: any) => {
        this.modalService.dismissAll();
        if (response.message === 'Group Updated Successfully!') {
          this.modalService.dismissAll();
           this.spinner = false;
           this.toast.showToast(NbToastStatus.SUCCESS, 'Group',response.message);
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


  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    this.f['image'].setValue(files[0].name ? files[0].name : '');
    const reader = new FileReader();
    this.imagePath = files;
    this.fileData = <File>files[0];
  
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  statusChange(data){
    let itemStatus = '0';
    let itemId = data.id;
    if(data.status=='0'){
      itemStatus = '1';
    }else{
       itemStatus = '0';
    }

    data = {
      "status":itemStatus,
      "groupId":itemId
    }
         this.http.put(this.baseUrl + 'api/groupstatusupdate',data).subscribe(
        (response: any) => {

          if (response.message == 'Status updated Successfully!') {
            this.toast.showToast(NbToastStatus.SUCCESS, 'Group', response.message);
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
