const React = require('react');
const ReactDOM = require('react-dom')
const SearchBar = require('./SearchBar.js'),
	  H1 = require('./H1.js');

const description = 'Search by artist to find a list of their albums. Then choose your favorites!'

class VoteLanding extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div id="voteLanding">

				<H1 style={{}} text={'Vote'}/>

				<p>{description}</p>

				<SearchBar 
				artists={this.props.artists}
				url='../index.php/vote/artist/'/>
			</div>
		)
	}
}

let container=document.getElementById('voteLandingContainer');
let artists=container.dataset.react;
ReactDOM.render(<VoteLanding artists={JSON.parse(artists)}/>,container)