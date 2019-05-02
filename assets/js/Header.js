const React = require('react')
const ReactDOM = require('react-dom')
const Navbar=require('./Navbar.js')
require('../scss/appStyles.scss');

const navItems = [
	{
		text:"Home",
		href:"http://localhost/ranker/index.php/"
	},
	{
		text:"Vote",
		href:"/ranker/index.php/vote"
	},
	{
		text:"Artists",
		href:"/ranker/index.php/artists"
	}
]

class Header extends React.Component {
	render(){
		return (
			<header>
				<Navbar navItems={this.props.navItems} />
			</header>
		)
	}
}

const container=document.getElementById('header')
ReactDOM.render(<Header navItems={navItems}/>,container)