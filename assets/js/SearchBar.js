const React = require('react');
//const ReactDOM=require('react-dom');
const SubmitButton=require('./SubmitButton.js'),
	  TextInput=require('./TextInput.js'),
	  List=require('./List.js');
require('../scss/appStyles.scss');

class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.state={
			searchTerm:'',
			listBoxItems:[]
		}

		this.handleChange=this.handleChange.bind(this);
		this.search=this.search.bind(this);
		this.handleKeyPress=this.handleKeyPress.bind(this);
	}

	componentDidMount(){
		document.addEventListener('keypress',this.handleKeyPress)
	}

	handleChange(e){
		let searchTerm=e.target.value;
		let listBoxItems=searchTerm.length>0?this.props.artists.map(e=>e.name.replace(/_/g,' ')).filter(e=>e.slice(0,searchTerm.length)===searchTerm):[];
		this.setState({
			searchTerm:e.target.value,
			listBoxItems:listBoxItems
		})
	}

	handleKeyPress(e){
		console.log(e.key)
		if(e.key=='Enter'){
			this.search()
		}
	}


	search(event){
		if (!this.state.searchTerm){return;}
		let url=this.props.url+this.state.searchTerm;
		url=url.replace(/\s/g,'_')
		window.location.href=url;
	}

	render(){
		const listBoxItems=this.state.listBoxItems.map(e=>{
			return (
				<div 
				key={e} 
				onClick={(event)=>this.search(event,e)}>
					<a 
					href={this.props.url+e.replace(/\s/g,'_')}
					>
						{e}
					</a>
				</div>
			)}
		)

		return (
			<form className="searchForm">
				
				<TextInput 
				style={this.state.searchTerm.length>0?{borderBottom:'none'}:null}
				value={this.state.searchTerm}
				handleChange={this.handleChange}/>

				<div style={{width:'100%'}} className='listBoxDiv'>
					<List 
						items={listBoxItems} />
				</div>

				<input type='text' style={{display:'none'}}/>

				<SubmitButton 
				value='Search'
				handleClick={this.search}/>
			
			</form>
		)
	}
}

module.exports=SearchBar;
/*let container=document.getElementById('searchBarContainer');
let artists=container.dataset.react;
ReactDOM.render(<SearchBar artists={JSON.parse(artists)}/>,container);*/
