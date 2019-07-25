import { Component, OnInit } from '@angular/core';
import { DashService } from 'src/app/services/dash.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {

  details:any=[];
  location = "";
  constructor(private dashService: DashService, private toastr: ToastrService ) { }

  ngOnInit() {
      const body ={
        WoeID: "1"
      }
      this.dashService.gettrends(body).subscribe(
        (res:any)=>{
          if(res.status == 200){
            this.details = res.trending;
            this.location = res.location;
            
            console.log("The data is "+this.details)
          }else{
            this.details = res.trending;
            this.location = res.location;
            console.log(this.details)
          }
        },
        err=>{
          console.log(err)
        }
      )
    
  
  }

  getTrends(woeid){
    const body ={
      WoeID: woeid
    }
    
    this.dashService.gettrends(body).subscribe(
      (res:any)=>{
        if(res.status == 200){
          this.details = res;
          
          console.log("The data is "+this.details)
        }else{
          this.details = res.trending;
          this.location = res.location;
          console.log(this.details)
        }
      },
      err=>{
        console.log(err)
      }
    )


  }

}
