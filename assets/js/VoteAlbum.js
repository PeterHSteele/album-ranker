const React = require('react');
const ReactDOM = require('react-dom');
const Album = require('./Album.js'), 
	  SubmitButton=require('./SubmitButton.js'),
	  Modal=require('./Modal.js'),
	  HandleSubmitBallot=('./methods/HandleSubmitBallot.js');
require('../scss/appStyles.scss');
const {colors}=require('./theme.js');

const findColor=function(album,ranking){
	let color;
;
	switch (ranking.indexOf(album)){
		case 0:color=colors.gold;break;
		case 1:color=colors.silver;break;
		case 2:color=colors.bronze;break;
		case -1:color=colors.dark;break;
		default:color=colors.dark;
	}
	return color;
}

class VoteAlbum extends React.Component{
	constructor(props){
		super(props);
		this.state={
			rankings:[],
			modal:false,
			mousedOver:-1
		}
		this.handleAlbumClick=this.handleAlbumClick.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleToggleModal=this.handleToggleModal.bind(this);
		//this.handleMouseOverAlbum=this.handleMouseOverAlbum.bind(this);
	}

	handleSubmit(e){
		HandleSubmitBallot(this.state.rankings);
		/*let rankings=this.state.rankings,
			buildRankingsObject=function(rankings){
				let rankingsObj={};
				rankings.forEach(function(e,i,a){
					rankingsObj[e]=a.length-i;
				})
				return rankingsObj;
			};

		if (rankings.length){
			let url = 'http://localhost/ranker/index.php/vote/ballot',
				data=buildRankingsObject(rankings);
				console.log(rankings)
			fetch(url,{
				method:'POST',
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(data)
			})
			.then(function(response){
				return response.json();
			})
			.then(json=>console.log(json))
			.catch(err=>console.log(err));
		}*/
	}

	handleToggleModal(e){
		e.preventDefault();
		this.setState({
			modal:!this.state.modal,
		})
	}

/*
	handleMouseOverAlbum(e,num){
		this.setState(){
			mousedOver:num
		}
	}

	handleMouseLeaveAlbum(){
		this.setState(){

		}
	}
*/

	handleAlbumClick(e,str){
		let rankings=this.state.rankings;
		if (rankings.indexOf(str)>-1){
			rankings=rankings.slice(0,rankings.indexOf(str))
		}else{
			rankings.push(str)
		}
		this.setState({
			rankings:rankings,
		})
	}

	render(){
		const albums=this.props.albums.map((e,i)=>{
						return(
							<li key={e.name}>
							<Album 
								index={i}
								name={e.name}
								image={e.image}
								display={e.name.replace(/_/g,' ')} 
								shade={findColor(e.name,this.state.rankings)}
								rank={this.state.rankings.indexOf(e.name)>-1?this.state.rankings.indexOf(e.name)+1:''}
								handleClick={this.handleAlbumClick}/>
							</li>
						)
					}
				);

		return (
			<div id='voteAlbum'>
				<p>Click on an album to rank it.</p>
				
				<ul id='albumList'>
					{albums}
				</ul>
				
				<SubmitButton 
				value="Submit"
				handleClick={this.handleToggleModal}/>
				
				<Modal 
				open={this.state.modal}
				content={this.state.rankings}
				title={'My favorite '+this.props.albums[0].artist+' albums'}
				handleBackgroundClick={this.handleToggleModal}
				handleSubmit={this.handleSubmit}/>

			</div>
			
		)
	}
}



const container=document.getElementById('vote-album');
const data=JSON.parse(container.dataset.react);
ReactDOM.render(<VoteAlbum albums={data}/>,container);