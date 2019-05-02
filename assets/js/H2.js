const React = require('react');

function H2 (props){
	return (
		<h2 style={props.style}>{props.text}</h2>
	)
}

module.exports=H2