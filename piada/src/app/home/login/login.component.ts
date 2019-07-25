import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private homeService: HomeService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem('piadatoken') != null){
      return this.router.navigate(['/dashboard'])
    }
  }

  loginForm = this.fb.group({
    Email : ['',[Validators.required, Validators.email]],
    Password : ['', Validators.required]
  })

  get email(){
    return this.loginForm.get('Email');
  }
  get password(){
    return this.loginForm.get('Password');
  }

  login(){
    const body = {
      Email: this.email.value,
      Password: this.password.value
    }

    this.homeService.loginUser(body).subscribe(
      (res:any)=>{
          localStorage.setItem('piadatoken', res.token)
          this.toastr.success('Login Successful')
          this.router.navigateByUrl('/dashboard')
      },
      err=>{
        if(err.status == 400)
          this.toastr.error('Incorrect username or password','Authentication error')
        else
          console.log(err)
      }
    )
  }

}
