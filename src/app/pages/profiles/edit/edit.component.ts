import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrMessages } from '../../../helpers/toaster.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as JWT from 'jwt-decode';

@Component({
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  profileForm: FormGroup;
  submitted = false;
  spinner = false;
  UNameError: string;
  validEmail: boolean;
  emailError: string;
  defineRole: any;
  imagesUrl = environment.imagesUrl;
  newmenu = [];
  menu2 = [];
  userId: any;
  formError: string;
   currentImage = "";
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toast: ToastrMessages,
    private route: ActivatedRoute,
  ) {
// feting user details
    this.userId = JSON.parse(localStorage.getItem('userData'))._id;
   // 5ec68e79a293ba4d8d5e9394
    this.http.get(this.baseUrl + 'admin/user/' + this.userId+"/view").subscribe(
      (response: any) => {
        console.log(response);
         this.f['name'].setValue(response.body.username);
         this.f['email'].setValue(response.body.email);
         this.f['image'].setValue('');
         this.imgURL = environment.imagesUrl + response.body.profile_image;
         this.currentImage = response.body.profile_image;
      }, (error) => {
        this.toast.showToast(NbToastStatus.DANGER, 'Invalid User!', 'Please Check User Id');
      },
    );

  }
  baseUrl = environment.baseUrl;

  imagePath;
  fileData: File = null;
  eventForm: FormGroup;
  imgURL: any;
  message: string;
  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', {disabled: true}],
      image: [''],
      password : ['', [Validators.required, Validators.minLength(8)]],
    });
   
    
  }



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
  // convenience getter for easy access to form fields
  get f() { return this.eventForm.controls; }
   ////// ========================== update profile data function =========================== //////
   updateprofile() {
  this.submitted = true;

  if (this.eventForm.invalid) {
    return;
  }

  

  // --------------------------------------------------------------
  this.spinner = true;
  const formData = new FormData();
  formData.append('name', this.f.name.value);
  formData.append('username', this.f.name.value);


  if (this.f.password.value != ''){
    formData.append('password', this.f.password.value);
  }
  formData.append('email', this.f.email.value);
  formData.append('image', this.fileData);
  formData.append('profile_image', this.currentImage);
    if (this.fileData){
    formData.append('imagechnaged', 'yes');
  } else{
    formData.append('imagechnaged', 'no');
  }
  //alert("process it");
  this.http.put(this.baseUrl + 'admin/user/'+ this.userId+"/edit", formData).subscribe(
    (response: any) => {
      this.spinner = false;
      if (response.message === 'User updated successfully') {
        this.toast.showToast(NbToastStatus.SUCCESS, 'Profile', response.message);
        localStorage.setItem('userData', JSON.stringify(response.body));
         for (const i in this.eventForm.controls) {
          this.eventForm.controls[i].setErrors(null);
        }
      }
    },
    (error) => {
      this.spinner = false;
      this.toast.showToast(NbToastStatus.DANGER, 'Error', 'Something Went Wrong.Please Try Again!');
    });
}
}
