import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from 'src/app/models/treenode';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  imageUrl = "assets/icons/plus.png";
  constructor() { }

  ret = "Num of retweet";
  @Input() treeData: TreeNode[];

  ngOnInit() {
  }

  toggleChild(node) {
    node.showChildren = !node.showChildren;
    if(node.showChildren){
      this.imageUrl = "assets/icons/minus.png";
    }else{
      this.imageUrl = "assets/icons/plus.png";
    }
  }


}
