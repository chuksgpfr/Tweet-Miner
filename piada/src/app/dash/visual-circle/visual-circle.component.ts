import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashService } from 'src/app/services/dash.service';

@Component({
  selector: 'app-visual-circle',
  templateUrl: './visual-circle.component.html',
  styleUrls: ['./visual-circle.component.css']
})
export class VisualCircleComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute, private dashService: DashService) { }
  fileData:any = [];
  check = true;
  filename:string='';

  ngOnInit() {
    this.currentRoute.paramMap.subscribe(
      params=>{
        let word = params.get('filename')
        this.filename = word;
        console.log(word)
      });
  this.dashService.getvisual(this.filename).subscribe(
    (data:any)=>{
      this.fileData = data;
      //console.log(data);
      console.log(this.fileData);
    },
    err=>{
      console.log(err)
    }
    
  );
  }

}
