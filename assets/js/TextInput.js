const React=require('react');

function TextInput (props){
	return <input type='text'
			className='textInput'
			style={props.style} 
			value={props.value} 
			onChange={props.handleChange}/>
}

module.exports=TextInput;

