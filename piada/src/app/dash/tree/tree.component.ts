import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from 'src/app/models/treenode';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  constructor() { }

  @Input() treeData: TreeNode[];

  ngOnInit() {
  }

  toggleChild(node) {
    node.showChildren = !node.showChildren;
  }

}
