const React=require('react')

function NavLink(props){
	return <a href={props.href}>{props.text}</a>
}

module.exports=NavLink