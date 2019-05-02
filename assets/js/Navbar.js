const React = require('react')
const ReactDOM = require ('react-dom')
const List = require('./List.js')
const NavLink=require('./NavLink.js');
require('../scss/appStyles.scss');



class Navbar extends React.Component{
	render(){
		return (
			<nav>
				<List 
				items={this.props.navItems.map(e=><NavLink 
													key={e.text} 
													text={e.text} 
													href={e.href}/>
												)} /> 

				<a href="http://localhost/ranker/index.php/">
					<img width="45" height='45' src="http://localhost/ranker/assets/img/logo.svg"/>
				</a>

			</nav>
		)
	}
}

module.exports=Navbar