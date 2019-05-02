const React=require('react')
const colors=require('./theme.js').colors

function CheckBoxInput (props){
	return (
		<label id={props.id}>
			<div className='wrapper' style={{display:'inline-block',position:'relative'}}>
				<div className="checkbox"
				style={{background:props.checked?colors.bronze:colors.light,position:'absolute',top:'-16px',left:'-5px'}}></div>
			</div>

			<div className='checkBoxLabel' style={{display:'inline',marginLeft:'20px'}}>{props.label}</div>
			<input 
			type="checkbox" 
			name={props.id} 
			onChange={(e)=>props.handleChange(e)}
			checked={props.checked}/>

		</label>
	)
}

module.exports=CheckBoxInput;