const React = require('react');

function SubmitButton (props){
	return(
		<input 
			type='button' 
			className="submitButton"
			value={props.value} 
			role='submit' 
			onClick={(e)=>props.handleClick(e)}/>
	)
}

module.exports=SubmitButton;