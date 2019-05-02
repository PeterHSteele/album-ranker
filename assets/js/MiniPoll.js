const React=require('react');
const Album=require('./Album.js'),
	  SubmitButton=require('./SubmitButton.js'),
	  HandleSubmitBallot=require('./methods/HandleSubmitBallot.js');
const colors=require('./theme.js').colors

const rank = require('./methods/HandleAlbumClick')

class MiniPoll extends React.Component{
	constructor(props){
		super(props)
		this.state={
			rankings:[],
			mouseover:-1,
			submitted:false
		}
		this.handleAlbumClick=this.handleAlbumClick.bind(this);
		this.handleMouseEnter=this.handleMouseEnter.bind(this);
		this.handleMouseLeave=this.handleMouseLeave.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}

	handleAlbumClick(e,str){
		let rankings=this.state.rankings;
		const that=this;
		rank(e,str,rankings,that);
	}

	handleMouseEnter(e,i){
		console.log('mouseenter',i)
		this.setState({
			mouseover:i
		})
	}

	handleMouseLeave(){
		this.setState({
			mouseover:-1
		})
	}

	handleSubmit(e){
		let rankings=this.state.rankings
		if (rankings.length){
			HandleSubmitBallot(this.state.rankings);
			this.setState({
				submitted:true
			})
		}
	}

	render(){
		const that=this
		const rankings=this.state.rankings
		const submittedText=this.state.submitted?'Thanks, your vote has been counted.':'';
		return (
			<div>
			<ul className='minipoll'>
				{this.props.albums.map(function(e,i){
					return (
						<li key={e.name}
						onClick={(event)=>that.handleAlbumClick(event,e.name)}
						onMouseEnter={(event)=>that.handleMouseEnter(event,i)}
						onMouseLeave={(event)=>that.handleMouseLeave()}>
							<div>
											{e.name.replace(/_/g,' ')}

							</div>
							<div style={{
											background:rankings.indexOf(e.name)>-1?colors.bronze:colors.gray,
											color:rankings.indexOf(e.name)>-1?colors.light:colors.medium
											}}>{rankings.indexOf(e.name)>-1?rankings.indexOf(e.name)+1:''}</div>
						</li>
					)
				})}
			</ul>
			<SubmitButton 
			value={'Vote'}
			handleClick={(e)=>this.handleSubmit(e)}/>
			<p>{submittedText}</p>
			</div>
		)
	}
}

module.exports=MiniPoll;

/*<Album 
							key={e.name}
							index={i}
							name={e.name}
							image={e.image}
							shade={colors.light}
							display={e.name.replace(/_/g,' ')}
							rank={that.state.rankings.indexOf(e.name)>-1?that.state.rankings.indexOf(e.name)+1:''}
							handleAlbumClick={that.handleAlbumClick}/>
*/