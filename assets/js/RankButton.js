const React =require('react');
const CheckMarkIcon=require('./CheckMarkIcon.js')
/*const library= require('@fortawesome/fontawesome-svg-core').library;
const fas = require('@fortawesome/free-solid-svg-icons').fas;
library.add(fas);
const findIconDefinition=require('@fortawesome/fontawesome-svg-core').findIconDefinition,icon=require('@fortawesome/fontawesome-svg-core').icon;
const check=findIconDefinition({ prefix: 'fas', iconName: 'check' });
const i=icon(check).html;
console.log(i)*/

function RankButton (props){
		return(
		 <button 
		 type='button'
		 onClick={(e)=>props.handleClick(e,props.name)}>
		 	{
		 		props.rank?<CheckMarkIcon />:'Select'
		 	}
		</button>
		)
}

module.exports=RankButton;