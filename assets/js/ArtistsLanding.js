const React = require('react');
const ReactDOM = require('react-dom')
const SearchBar = require('./SearchBar.js')
const H1 = require('./H1.js');

const description = 'Enter the name of an artist to lookup a user-generated list of their most popular albums.'

class ArtistsLanding extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div id="artistsLanding">
					<H1 style={{}} text={'Artist Lookup'} />
					<p>{description}</p>
					<SearchBar 
					artists={this.props.artists}
					url={'../index.php/artists/lookup/'}/>
				
			</div>
		)
	}
}

let container=document.getElementById('artistsLandingContainer');
let artists=container.dataset.react;
ReactDOM.render(<ArtistsLanding artists={JSON.parse(artists)}/>,container)