import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashService } from '../services/dash.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  details:any=[];
  constructor(private dashService: DashService) { }

  ngOnInit() {
    this.dashService.index().subscribe(
      (res:any)=>{
        this.details = res;
      },
      err=>{
        console.log(err)
      }
    )
  }

  

}
