import { Component, OnInit } from '@angular/core';
import { DashService } from 'src/app/services/dash.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editapidetails',
  templateUrl: './editapidetails.component.html',
  styleUrls: ['./editapidetails.component.css']
})
export class EditapidetailsComponent implements OnInit {

  constructor(private dashService: DashService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
  }

  apiForm = this.fb.group({
    APIKey:['',Validators.required],
    APISecretKey: ['',Validators.required],
    AccessToken: ['',Validators.required],
    AccessTokenSecret: ['',Validators.required]
  });

  get apikey(){
    return this.apiForm.get('APIKey');
  }
  get apisecretkey(){
    return this.apiForm.get('APISecretKey');
  }
  get accesstoken(){
    return this.apiForm.get('AccessToken');
  }
  get accesstokensecret(){
    return this.apiForm.get('AccessTokenSecret');
  }

  updateAPI(){
    const body = {
      APIKey : this.apikey.value,
      APISecretKey: this.apisecretkey.value,
      AccessToken: this.accesstoken.value,
      AccessTokenSecret: this.accesstokensecret.value
    }
    this.dashService.editapidetails(body).subscribe(
      (res:any)=>{
        this.toastr.success('API details updated successful');
      },
      err=>{
        if(err.status == 400){
          this.toastr.error('All fields are required');
        }else{
          console.log(err)
        }
      }
    )
  }

}
