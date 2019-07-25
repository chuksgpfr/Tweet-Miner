import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private homeService: HomeService, private fb: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('piadatoken') != null){
      return this.router.navigate(['/dashboard'])
    }
  }

  regForm = this.fb.group({
    Firstname: ['',Validators.required],
    Lastname: ['',Validators.required],
    Email: ['',[Validators.required, Validators.email]],
    Username: ['',Validators.required],
    Passwords: this.fb.group({
      Password: ['',Validators.required],
      ConfirmPassword: ['',Validators.required]
    })
  });

  get firstname(){
    return this.regForm.get('Firstname');
  }
  get lastname(){
    return this.regForm.get('Lastname');
  }
  get email(){
    return this.regForm.get('Email');
  }
  get username(){
    return this.regForm.get('Username');
  }
  get password(){
    return this.regForm.get('Passwords.Password');
  }
  get confirmPassword(){
    return this.regForm.get('Passwords.ConfirmPassword');
  }

  register(){
    const body = {
      Firstname:this.firstname.value,
      Lastname: this.lastname.value,
      Email: this.email.value,
      Username: this.username.value,
      Password: this.password.value
    }

    this.homeService.registerUsers(body).subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.toastr.success('Registration Successful','Log into your dashboard');
          this.router.navigateByUrl('/login');
        }else{
          res.forEach((element:any) => {
            this.toastr.error(element.description)
            
          });
        }
      },
      err=>{
        console.log(err)
      }
    );
  }

}
