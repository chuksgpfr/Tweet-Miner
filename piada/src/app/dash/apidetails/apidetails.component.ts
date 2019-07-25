import { Component, OnInit } from '@angular/core';
import { DashService } from 'src/app/services/dash.service';

@Component({
  selector: 'app-apidetails',
  templateUrl: './apidetails.component.html',
  styleUrls: ['./apidetails.component.css']
})
export class ApidetailsComponent implements OnInit {
  apiDetails=[];
  constructor(private dashService: DashService) { }

  ngOnInit() {
    this.dashService.getapidetails().subscribe(
      (res:any)=>{
        this.apiDetails = res;
      },
      err=>{
        console.log(err)
      }
    )
  }

}
