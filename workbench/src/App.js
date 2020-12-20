import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './App.css';
class App extends Component {
  state = {
		diagram:{borders:{top: 66, left:60, bottom: 866, right: 1060, height:800, width: 1000}},
		reservedPosition: {top:50, left: 50},
		draggables: [],
		templates:[],
		allowed: true
  };

  onStart = (e) => {
		let element = document.getElementById("Diagram1");
		let rect = element.getBoundingClientRect();
		console.log("top: ", rect.top,"right: ", rect.right,"bottom: ", rect.bottom,"left: ", rect.left);
	
  };

 handleCreate = (e , ui) => {
		console.log(ui);
			
		let draggables = this.state.draggables;	
		let draggable = null;
		if(this.releasingAllowed(ui)){
			draggable = { id: draggables.length+1 , t:ui.y, l:ui.x }
   		draggables = [...draggables, draggable];
		}     
		this.setState({draggables});
		this.forceUpdate();
  };

	handlePreCreate = (e, ui) =>{
		if( this.releasingAllowed(ui) ) {
			
			this.setState({allowed:true});
			console.log("ok");
		}else{
			console.log("not ok");
			this.setState({allowed:false});
		}
	}

  onStop = (e , ui) => {
		console.log({event: e});
		console.log(ui);
		let draggables = this.state.draggables.filter(d => parseInt(d.id, 10)!==parseInt(ui.node.id, 10));	
		let draggable = null;
		if(this.releasingAllowed(ui)){
			draggable = {id: ui.node.id, t: this.state.reservedPosition.top, l: this.state.reservedPosition.left}
   		draggables = [...draggables, draggable];
		} else {
		  draggable = this.state.draggables.filter(d => parseInt(d.id, 10)===parseInt(ui.node.id, 10))[0];	
   		draggables = [...draggables, draggable];
		}
    this.setState({draggables});
		this.forceUpdate();
  };

  releasingAllowed = (ui) =>{
		let isInDiagram = this.isInDiagram(ui);
		console.log( isInDiagram )
		let doesNotOverlapWithOtherModules = this.doesNotOverlapWithOtherModules(ui);
		console.log( doesNotOverlapWithOtherModules )
		return isInDiagram && doesNotOverlapWithOtherModules;	
	}
	doesNotOverlapWithOtherModules = (ui) => {
		let notOverlap = true;
		let element = ui.node;	
		let rect = element.getBoundingClientRect();
		let otherElements = this.state.draggables;
		if( otherElements.length === 0) return notOverlap;
		notOverlap = otherElements.every( draggable => {
			let staticDraggable = document.getElementById(draggable.id);
			let blocked = staticDraggable.getBoundingClientRect();
			let rightOverlapping = rect.right > blocked.right && rect.left > blocked.right;
			let leftOverlapping = rect.left < blocked.left && rect.right < blocked.left;
			let bottomOverlapping = rect.bottom > blocked.bottom && rect.top > blocked.bottom;
			let topOverlapping = rect.top < blocked.top && rect.bottom < blocked.top;
			console.log({blocked:blocked});
			console.log({right:rightOverlapping,left: leftOverlapping , bottom: bottomOverlapping , top: topOverlapping});
			return (leftOverlapping || rightOverlapping || bottomOverlapping || topOverlapping); 
		});
		return notOverlap;
	}

	isInDiagram = (ui) => {
		let allowed = false;
		let element = ui.node;	
		let rect = element.getBoundingClientRect();
		let leftBorderMatches = rect.left > this.state.diagram.borders.left;
		let rightBorderMatches = rect.right < this.state.diagram.borders.right;
		let bottomBorderMatches = rect.bottom < this.state.diagram.borders.bottom;
		let topBorderMatches = rect.top > this.state.diagram.borders.top;
		allowed = leftBorderMatches && rightBorderMatches && bottomBorderMatches && topBorderMatches; 
		return allowed;	
	}	

  render() {
    return (
      <div>
        <h1>Process Engine</h1>
       <div 
					id="Diagram1" 
					className="box" 
					style={{
						height: this.state.diagram.borders.height + 'px',
					  width: this.state.diagram.borders.width + 'px',
					  overflow: 'auto',
					  padding: '0'}}>
          {this.state.draggables.map(draggable => {return (
						<Module 
							key={draggable.id} 
							module_id={draggable.id}
							onStart={this.onStart}
							onStop={this.onStop}
							position={{x: draggable.l, y:draggable.t}}
						/>
						)
					})}
        </div>
				<Template 
					onStart={this.onStart}
					onStop={this.handleCreate}
					onDrag={this.handlePreCreate}
					position={{x: 1100, y:100}}
					module_id="BlubTemplate"
					releasingAllowed={this.state.allowed}
				/>

      </div>
    );
  }
}
class Template extends Component {
	formatReleasingAllowedColor = () => {return (this.props.releasingAllowed)? "green": "red";} 
	render() {
		return(						
			<Draggable  
				onStart={ this.props.onStart}
				onStop={ this.props.onStop}
				onDrag={ this.props.onDrag}
				position={this.props.position}
				defaultPosition={this.props.position}>
         <div 
					className="box" 
					id={this.props.module_id}>
        		Activity
					<svg> 
						<circle 
							id="circle" 
							fill={this.formatReleasingAllowedColor() }
							r="40" 
							cx="50" 
							cy="50"
						 />
					</svg>
         </div>
      </Draggable>
		)	
	}

}

class Module extends Component{
	render() {
		return(						
			<Draggable  
				bounds="parent"
				onStart={ this.props.onStart}
				onStop={ this.props.onStop}
				position={this.props.position}
				defaultPosition={this.props.position}>
         <div 
					id={this.props.module_id}
					className="box" >
        		Activity
         </div>
      </Draggable>
		)	
	}
}
export default App;
