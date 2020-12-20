import React, { Component } from 'react';

class Counter extends Component {
	render () {
		return (
			<div>
				<span className={this.setBadgeColor()} >{this.props.counter.value}</span>
				<button 
					onClick={() => this.props.onIncrement(this.props.counter)}
					className="btn btn-secondary btn-sm"
				>
					Increment
				</button>
				<button
					className="btn btn-danger m-2 btn-sm"
					onClick={() => this.props.onDelete(this.props.counter)}
				>
					Delete
				</button>
			</div>
		);
	}


	setBadgeColor = () => {
		let classes = "badge m-2 badge-";
		classes += this.props.counter.value===0 ? "warning" : "primary";
		return classes;
	}
}

export default Counter;
