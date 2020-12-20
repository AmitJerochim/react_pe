import React, { Component } from 'react';
import NavBar from './components/navbar';
import Counters from './components/counters';
import Draggable from 'react-draggable';
class App extends Component {

	state = { 
		counters: [
			{id: 1 , value: 4},
			{id: 2 , value: 0},
			{id: 3 , value: 0},
			{id: 4 , value: 0}
		]
  };
	
	
	handleDelete = counter => {
		const counters = this.state.counters.filter(c => c.id !== counter.id);
		this.setState( { counters } );
	}
	
	handleIncrement = counter => {
		const counters = this.state.counters.map( c => {
			if ( c.id === counter.id ){
				c.value++;
				return c;
			}else{
				return c;
			}
		} );
		this.setState( { counters} );	
	}

	handleReset = () => {
		const counters = this.state.counters.map( c => {
			c.value=0;
			return c;	
		} );
		this.setState( { counters } );
	}	


	render () {
		return (
			<React.Fragment>
				<NavBar  
					totalCounters={this.state.counters.filter(c => c.value > 0).length}
				/>
				<main className="container">
					<Counters 
						onDelete={this.handleDelete}
						onIncrement={this.handleIncrement}
						onReset={this.handleReset}
						counters={this.state.counters}
					/>
				</main>
				<div 
					style={{
						border:"solid black",
						height:"800px",
						width:"1000px",
						margin:"200px"
					}}
				>
					<Draggable><div><h1>Hallo Welt!!</h1></div></Draggable>
				</div>
			</React.Fragment>
		);
	}


}

export default App;
