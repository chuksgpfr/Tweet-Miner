import { Component, OnInit } from '@angular/core';
import { DashService } from 'src/app/services/dash.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from 'src/app/services/excel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pulltweets',
  templateUrl: './pulltweets.component.html',
  styleUrls: ['./pulltweets.component.css']
})
export class PulltweetsComponent implements OnInit {

  routeKeyword:string='';
  pullForm:any;
  constructor(private dashService: DashService,private excelService: ExcelService, private toastr: ToastrService, private fb: FormBuilder, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentRoute.paramMap.subscribe(
      params=>{
        let word = params.get('keyword')
        this.routeKeyword = word;
        console.log(word)
        
      });
      //console.log(this.routeKeyword)
    
    this.pullForm = this.fb.group({
      Title: ['',Validators.required],
      Keyword: [this.routeKeyword, Validators.required],
      Quantity: ['',Validators.required],
      From: ['', Validators.required],
      To: ['', Validators.required]
    })
  }

  

  get title(){
    return this.pullForm.get('Title');
  }
  get keyword(){
    return this.pullForm.get('Keyword');
  }
  get quantity(){
    return this.pullForm.get('Quantity');
  }
  get from(){
    return this.pullForm.get('From');
  }
  get to(){
    return this.pullForm.get('To');
  }

  pulltweets(){
    const body ={
      Title : this.title.value,
      Keyword : this.keyword.value,
      Quantity : this.quantity.value,
      From : this.from.value,
      To: this.to.value 
    }
    this.dashService.pulltweet(body).subscribe(
      (res:any)=>{
        
          this.toastr.success('Pull Successful', 'You can download and visualize your data...')
        },

      err=>{
        console.log(err)
      }
    );
  }

}
