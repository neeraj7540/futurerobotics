import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToastrMessages } from '../../../helpers/toaster.service';
import { MENU_ITEMS } from '../../pages-menu';

import { element } from '@angular/core/src/render3';
@Component({
  selector: 'ngx-adsAdd',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {


  @Output() positionChanged = new EventEmitter<Location>();
  @ViewChild('search')
  public search: ElementRef;
  time: any;
  tcode: string;
  menu: any;
  ckeditorContent:any;

  constructor(
    private formBuilder: FormBuilder,
    private dateService: NbDateService<Date>,
    private http: HttpClient,
    private toast: ToastrMessages,
    
  ) {
  }
  baseUrl = environment.baseUrl;
  spinner = false;
  eventForm: FormGroup;
  submitted = false;
  message: string;

  @ViewChild('form') form;
  ngOnInit() {
  //  this.emailError='';
  var data=[];
  for(let i=0;i < MENU_ITEMS.length; i++){
    if(i==0){

    }
    else if(i==1){

    }
    else if(i==2){

    }
    else{
        data.push(MENU_ITEMS[i])
    }
  }
    
    this.menu=data;
    this.eventForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required,Validators.minLength(15)]],
    });        
  }
 
  get f() { return this.eventForm.controls; }


  addEvent() {

    this.submitted = true;
    if (this.eventForm.invalid) {
      return;
    }

    

    // --------------------------------------------------------------          
    this.spinner = true;
   // this.formError=""
   
    let data={
      title: this.f.title.value,
      content:this.f.content.value,
    }


   
    this.http.post(this.baseUrl + 'api/addpage', data).subscribe(
      (response: any) => {

      
        this.spinner = false;
        if (response.message === 'Page Added Successfully!') {
          this.toast.showToast(NbToastStatus.SUCCESS, 'Page',response.message);
          this.f['title'].setValue('');
          this.f['content'].setValue('');
          this.submitted = false;
         
        }
     },
      (error) => {
         this.spinner = false;
          this.toast.showToast(NbToastStatus.DANGER, 'Error', error.error.message);
            
      });
  }
}
