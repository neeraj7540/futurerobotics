
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrMessages } from '../../../helpers/toaster.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  eventForm: FormGroup;
  spinner = false;
  submitted = false;
  message: string;
  selectedItem:any;
  contentData;

  
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

      title:{
        title: 'Title',
        type: 'string'
      },
      content: {
        title: 'Content',
        type: 'string',
      },

     
    },


  };
  source: LocalDataSource = new LocalDataSource();

  constructor( 
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrMessages,
    private modalService: NgbModal,
    private datePipe:DatePipe,private _NgbModal: NgbModal) { 
  }

  ngOnInit() {
  //  this.getAllGroups();
  this.eventForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    content: ['', [Validators.required,Validators.minLength(15)]],
    status:['0']
   
  });

   this.getAllContents();
   
  }

  get f() { return this.eventForm.controls; }

  getAllContents(){
    this.http.get(this.baseUrl + 'api/pageslist').subscribe(
      (response: any) => {
       
        this.source.load(response.body);
       },
      (error) => {
  });    

  }
  onDelete(event): void {
    if (confirm('Are you sure to delete this Page?')) {
      this.http.delete(this.baseUrl + 'api/page/' + event.data.id)
        .subscribe(
          (response: any) => {
            if (response.message == 'Page Successfully Deleted!') {
                 this.toast.showToast(NbToastStatus.SUCCESS, 'Page', response.message);
                 this.getAllContents();
            }
        });
    }
  }

  onEdit(item, modelId){
    this.selectedItem = item;
     
    this.eventForm.setValue({  
      title: item.data.title,
      status:item.data.status,
      content:item.data.content,

   });  
    
    this.modalService.open(modelId, { size: 'lg'});    
  }


  updatePage() {
     this.submitted = true;
    if (this.eventForm.invalid) {
    
      return;
    }
    //    // --------------------------------------------------------------          
     this.spinner = true;
 
    // const formData = new FormData();
    // formData.append('title', this.f.title.value);
    // formData.append('content', this.f.content.value);

    var data = {
      title :  this.f.title.value,
      content:this.f.content.value,
      status:this.f.status.value

    }
    
   
        this.http.put(this.baseUrl + "api/pageedit/"+this.selectedItem.data.id, data).subscribe(
      (response: any) => {
        this.modalService.dismissAll();
        this.spinner = false;
        if (response.message === 'Page updated Successfully!') {
          this.toast.showToast(NbToastStatus.SUCCESS, 'Page',response.message);
       
        }
        this.getAllContents();
     },
      (error) => {
        console.log(error);
        this.spinner = false;
        if( error.error.body.email){
          this.toast.showToast(NbToastStatus.DANGER, 'Error', error );
        }else if(error.error.body.username){
          this.toast.showToast(NbToastStatus.DANGER, 'Error', error);
        }       
      });
  }

}
