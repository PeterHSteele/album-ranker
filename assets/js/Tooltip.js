const React=require('react');
const List=require('./List.js')

function Tooltip (props) {
	return (
		<div className='tip' style={{display:props.show?'block':'none',position:'absolute',left:props.left,top:props.top}}>
		 	<List items={props.content}/>
		</div>
	)
}

module.exports=Tooltip;