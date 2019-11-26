import { Component, OnInit } from '@angular/core';
 import { BsModalRef } from 'ngx-bootstrap';
 import { Subject } from 'rxjs';
 import * as d3 from 'd3';

@Component({
  selector: 'app-account-tree',
  templateUrl: './account-tree.component.html',
  styleUrls: ['./account-tree.component.scss']
})
export class AccountTreeComponent implements OnInit {
  treeData:any =
  {
    "name": "Top Level",
    "children": [
      { 
        "name": "Level 2: A",
        "children": [
          { "name": "Son of A" },
          { "name": "Daughter of A" }
        ]
      },
      { "name": "Level 2: B" }
    ]
  };
// Set the dimensions and margins of the diagram
margin:any = {top: 20, right: 90, bottom: 30, left: 90};
    width :any= 960 - this.margin.left - this.margin.right;
    height :any= 500 - this.margin.top - this.margin.bottom;
    svg:any;
data:any;
i:any = 0;
    duration:any = 750;
    root;
    treemap:any;
public onClose: Subject<boolean>;

  constructor( private _bsModalRef: BsModalRef) {


    this.svg = d3.select("#chart").append("svg")
    .attr("width", this.width + this.margin.right +this.margin.left)
    .attr("height", this.height + this.margin.top + this.margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + this.margin.left + "," + this.margin.top + ")");

// declares a tree layout and assigns the size
  this.treemap = d3.tree().size([this.height, this.width]);
// Assigns parent, children, height, depth
this.root = d3.hierarchy(this.treeData, function(d) { return d.children; });
this.root.x0 = this.height / 2;
this.root.y0 = 0;
// Collapse after the second level
this.root.children.forEach(collapse);
this.update(this.root);
// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}
   }
   update(source) {
     
    // Assigns the x and y position for the nodes
    var treeData = this.treemap(this.root);
    // Compute the new tree layout.
    var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);
    // Normalize for fixed-depth.
    nodes.forEach(function(d){ d.y = d.depth * 180});
    // ****************** Nodes section ***************************
    // Update the nodes...
    var node = this.svg.selectAll('g.node')
        .data(nodes, function(d) {return d.id || (d.id = ++this.i); });
    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .on('click', click);
    // Add Circle for the nodes
    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function(d) {
            return d._children ? "lightsteelblue" : "#fff";
        });
    // Add labels for the nodes
    nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function(d) {
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d) { return d.data.name; });
    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);
    // Transition to the proper position for the node
    nodeUpdate.transition()
      .duration(this.duration)
      .attr("transform", function(d) { 
          return "translate(" + d.y + "," + d.x + ")";
       });
    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      })
      .attr('cursor', 'pointer');
    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
        .duration(this.duration)
        .attr("transform", function(d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();
    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);
    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);
    // ****************** links section ***************************
    // Update the links...
    var link = this.svg.selectAll('path.link')
        .data(links, function(d) { return d.id; });
    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function(d){
          var o = {x: source.x0, y: source.y0}
          return diagonal(o, o)
        });
    // UPDATE
    var linkUpdate = linkEnter.merge(link);
    // Transition back to the parent element position
    linkUpdate.transition()
        .duration(this.duration)
        .attr('d', function(d){ return diagonal(d, d.parent) });
    // Remove any exiting links
    var linkExit = link.exit().transition()
        .duration(this.duration)
        .attr('d', function(d) {
          var o = {x: source.x, y: source.y}
          return diagonal(o, o)
        })
        .remove();
    // Store the old positions for transition.
    nodes.forEach(function(d){
      d.x0 = d.x;
      d.y0 = d.y;
    });
    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {
       
      return  `M ${s.y} ${s.x}
      C ${(s.y + d.y) / 2} ${s.x},
        ${(s.y + d.y) / 2} ${d.x},
        ${d.y} ${d.x}`
    }
    // Toggle children on click.
    function click(d) {
      if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
      this.update(d);
    }
  }
  

  ngOnInit() {
    this.onClose = new Subject();

  }

}
