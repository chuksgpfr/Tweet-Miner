import { Component, OnInit } from '@angular/core';
import { DashService } from 'src/app/services/dash.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-yourfolder',
  templateUrl: './yourfolder.component.html',
  styleUrls: ['./yourfolder.component.css']
})
export class YourfolderComponent implements OnInit {
  details:any=[]
  constructor(private dashService: DashService, private toastr: ToastrService) { }

  ngOnInit() {
    this.dashService.index().subscribe(
      (res:any)=>{
        this.details = res;
        console.log(this.details)
      },
      err=>{
        console.log(err)
      }
    )
  }

  download(filename:string){
    this.dashService.downloadfile(filename).subscribe(
      (data:any)=>{
        // if(data.status == 200)
        //   this.toastr.success('Download in progress...')
        //var blob = new Blob([data.blob], {type: '.xlsx'});
        saveAs(data,filename+".xlsx")
      }
    );
  }


}
