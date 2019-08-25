import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashService } from 'src/app/services/dash.service';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent implements OnInit {

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

  

toggleChildren(node){
      //console.log('open')
      node.showChildren = !node.showChildren;
  }

//   youTree = [
//     {
//       name: 'first elem',
//       id: 1234567890,
//       childrens: [
//         {
//           name: 'first child elem',
//           id: 0987654321,
//           childrens: []
//         }
//       ]
//     },
//   ];

  node = this.fileData;
  nodes = [
    {
        name: 'Africa',
        showChildren: false,
        children:[
            {
                name : 'Algeria',
                showChildren: false,
                children:[
                    {
                        name : 'Algeris',
                        showChildren: false,
                        children:[]
                    },
                    {
                        name : 'Algeria child 2',
                        showChildren: false,
                        children:[
                            
                        ]
                    },
                ]
            },
            {
                name : 'Angola',
                showChildren: false,
                children:[]
            },
            {
                name : 'Benin',
                showChildren: false,
                children:[]
            },

        ]
     },
     {
        name: 'Asia',
        showChildren: false,
        children:[
            {
                name : 'Afghanistan',
                showChildren: false,
                children:[
                    {
                        name : 'Kabul',
                        showChildren: false,
                        children:[]
                    }
                ]
            },
            {
                name : 'Armenia',
                showChildren: false,
                children:[]
            },
            {
                name : 'Azerbaijan',
                showChildren: false,
                children:[]
            },

        ]
     },
     {
        name: 'Europe',
        showChildren: false,
        children:[
            {
                name : 'Romania',
                showChildren: false,
                children:[
                    {
                        name : 'Bucuresti',
                        showChildren: false,
                        children:[]
                    }
                ]
            },
            {
                name : 'Hungary',
                showChildren: false,
                children:[]
            },
            {
                name : 'Benin',
                showChildren: false,
                children:[]
            },
        ]
     },
     {
        name: 'North America',
        showChildren: false,
        children: []
     }


]

}
