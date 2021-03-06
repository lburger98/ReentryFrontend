import React, { Component } from "react";
import colors from '../lib/colors'


class Button extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	pressedDown: false,
	  };
	}

	render() {
		const props = this.props
		let fontSize = this.state.pressedDown ? (props.fontSize || 18) - 1 : (props.fontSize || 18)
		return (
			<div className="container"
				 onClick={props.onClick}
				 onMouseDown={() => this.setState({pressedDown: true})}
				 onMouseUp={() => this.setState({pressedDown: false})}>
				<h1 className="title">{props.title}</h1>
				<style jsx>{`
					.container {
						opacity: ${this.state.pressedDown ? '0.8': '1.0'};
			    		display: flex;
			    		justify-content: center;
			    		align-items: center;
			    		width: ${props.width}px;
			    		height: ${props.height}px;
			    		border-radius: 8px;
			    		background-color: ${colors.primary};
			    		color: ${colors.white};

					}
					.title {
						font-size: ${fontSize}px;
						font-family: Avenir-Heavy;
					}
			    `}</style>
			</div>
		)
	}
};

export default Button;