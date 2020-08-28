import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrMessages } from '../../helpers/toaster.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
@Component({
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  spinner = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastrMessages,

  ) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.router.navigate(['/pages/dashboard']);
    }
  }

  ngOnInit() {
    localStorage.removeItem('authToken');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  ////// ========================== super admin login function =========================== //////
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner = true;
    this.authService.login(this.f.email.value, this.f.password.value).subscribe(
      (response: any) => {
        if (response.message === 'User doesn`t exits.') {
          this.spinner = false;
          this.toast.showToast(NbToastStatus.DANGER, 'Credentials', 'Invalid User!');

        } else if (response.message === 'Password is not correct.') {
          this.spinner = false;
          this.toast.showToast(NbToastStatus.DANGER, 'Credentials', 'Invalid Password!');
        } else if (response.message == 'Login successfully') {

          localStorage.setItem('authToken', response.body.token);
          localStorage.setItem('userImage', response.body.image);
          localStorage.setItem('userName', response.body.name);
        

          Object.entries(response.body).forEach(([key, value]) => {
            //console.log(key + ' - ' +value) // key - value
            if(value==false ){
                console.log(key);
               // data.body.delete[key];
               delete response.body[key]
              }
        })
        localStorage.setItem('userData', JSON.stringify(response.body));

        this.router.navigate(['/pages/dashboard']);
        
        }
      }
      ,
      (error) => {
        console.log(error);
        this.spinner = false;
        this.toast.showToast(NbToastStatus.DANGER, 'Error', error.error.message);

      });
  }
}
