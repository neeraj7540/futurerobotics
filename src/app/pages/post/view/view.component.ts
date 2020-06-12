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

     
      title:{
        title: 'Title',
        type: 'string'
      },
     
      description: {
        title: 'description',
        type: 'html',
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
    name: ['', [Validators.required, Validators.minLength(4)]],
    image: ['',[Validators.required]],
    description:['', [Validators.required, Validators.minLength(4)]],
    status:['0']

   });
   
  }


  getAllItems(){

    this.http.get(this.baseUrl + 'api/postlist').subscribe(
      (response: any) => {
        
        this.source.load(response.body);
      
     
      },
      (error) => {
  });    


  }



  onDelete(event): void {
    if (confirm('Are you sure to delete this Post?')) {
      this.http.delete(this.baseUrl + 'api/post/' + event.data.id)
        .subscribe(
          (response: any) => {
            if (response.message == 'Post Successfully Deleted!') {
                 this.toast.showToast(NbToastStatus.SUCCESS, 'Post', response.message);
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
      name: item.data.title,
      image:item.data.image,
      description:item.data.description,
      status:item.data.status
   
  });  
    
    this.modalService.open(modelId,{size:'lg'});  
  
  }

  updatItem(){


    this.submitted = true;
   
    if (this.eventForm.invalid) {
      return;
    }
      
    this.spinner = true;
    const formData = new FormData();
    formData.append('title', this.f.name.value);
    formData.append('description', this.f.description.value);
    formData.append('status', this.f.status.value);

    if(this.fileData!=null){
      formData.append('image', this.fileData);
      formData.append('isImage','true');
    }else{
      formData.append('image', this.selectedItem.image);
      formData.append('isImage', 'false');
    }
   
     this.http.put(this.baseUrl + 'api/postedit/'+ this.selectedItem.id, formData).subscribe(
      (response: any) => {
        this.modalService.dismissAll();
        if (response.message === 'Post updated Successfully!') {
          this.modalService.dismissAll();
           this.spinner = false;
           this.toast.showToast(NbToastStatus.SUCCESS, 'Post',response.message);
           this.getAllItems();
        }
      },
      (error) => {
        this.spinner = false;
        this.modalService.dismissAll();
        this.toast.showToast(NbToastStatus.DANGER, 'Post',error.error.message);
       
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

}
