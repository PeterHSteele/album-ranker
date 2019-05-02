const React = require('react');

function H1 (props){
	return (
		<h1 style={props.style}>{props.text}</h1>
	)
}

module.exports=H1