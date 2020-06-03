
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
    content: ['', [Validators.required,Validators.minLength(15)]]
   
  });

   this.getAllContents();
   
  }

  get f() { return this.eventForm.controls; }

  getAllContents(){
    this.http.get(this.baseUrl + 'admin/contents').subscribe(
      (response: any) => {

        response.body.forEach(element => {
        
          element['id'] = parseInt(element._id.substring(0, 8), 16)
                    
        });
       
        this.source.load(response.body);
       },
      (error) => {
  });    

  }
  onDelete(event): void {
    if (confirm('Are you sure to delete this Page?')) {
      this.http.delete(this.baseUrl + 'admin/contents/' + event.data._id+"/delete")
        .subscribe(
          (response: any) => {
            if (response.message == 'Page deleted successfully') {
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
      content:item.data.content,
   

   });  
    
    this.modalService.open(modelId);    
  }


  updatePage() {
     this.submitted = true;
    if (this.eventForm.invalid) {
    
      return;
    }
    //    // --------------------------------------------------------------          
     this.spinner = true;
 
    const formData = new FormData();
    formData.append('title', this.f.title.value);
    formData.append('content', this.f.content.value);
    
   
        this.http.patch(this.baseUrl + "admin/contents/"+this.selectedItem.data._id+"/edit", formData).subscribe(
      (response: any) => {
        this.modalService.dismissAll();
        this.spinner = false;
        if (response.message === 'Exists' || response.message === 'Error') {
       
        } else if (response.message === 'Page updated successfully') {
          this.toast.showToast(NbToastStatus.SUCCESS, 'Page',response.message);
       
          for (const i in this.eventForm.controls) {
            this.eventForm.controls[i].setErrors(null);
          }
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
