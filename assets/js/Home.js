const React = require('react');
const ReactDOM = require('react-dom');
const colors=require('./theme.js').colors
require('../scss/appStyles.scss');
const Results = require('./Results.js'),
	  H1 = require('./H1.js'),
	  H2 = require('./H2.js'),
	  MiniPoll = require('./MiniPoll.js');

const homepageStyles={
	
},

h1Style={
	background:colors.dark,
	color:colors.gold,
	fontSize:'2em',
	textAlign:'center',
	paddingTop:'.5em',
	margin:'0'
},

h2Style={
	background:colors.dark,
	color:colors.light,
	fontSize:'1.5em',
	textAlign:'center',
	borderBottom:'3px solid '+colors.gold,
	margin:'0',
	paddingBottom:'.5em',
	fontWeight:'500'
};

let h2FromRecordStyle={};

for (let prop in h2Style){
	h2FromRecordStyle[prop]=h2Style[prop]
}
h2FromRecordStyle.margin='1em 0 0';
h2FromRecordStyle.float='left';
h2FromRecordStyle.width='100%';
h2FromRecordStyle.padding='.5em 0';
h2FromRecordStyle.borderBottom='none';

textStyle={
	color:colors.light
}

let height;

class Home extends React.Component{
	constructor(props){
		super(props)
	}


	render(){
		return (
			<div id="homepage" style={homepageStyles}>

				<H1 text={'Ranker'} style={h1Style}/>
				<H2 text={'A polling site for music'} style={h2Style} />

				<section className='main'>

					<div className="contentBlock homepageBlock">
						<h3>Look up Artists</h3>
						<p>
						{'Do you enjoy debating your favorite musical artist\'s best albums with your friends?'+
						' Search our database to see user-generated popularity rankings for albums in that artist\'s catalogue.'}
						</p> 
						<a href='../index.php/artists'>Search</a>
					</div>

					<div className="contentBlock homepageBlock">
						<h3>Participate</h3>
						<p>
						{'Share your opinions! Pick an artist and list your favorite albums by that musician.'+
						' Afterwards, you can see where your thoughts differ from other voters.'}
						</p> 
						<a href='../index.php/vote'>Vote</a>
					</div>

								

					<H2 text={'From Our Records'} style={h2FromRecordStyle} />

					<div className='banner' style={{float:'left',width:'100%',background:colors.dark,borderBottom:'4px solid '+colors.gold}}>
					<Results 
						results={this.props.random} 
						height={300}
						width={600}
						background={colors.dark}/>
					</div>

				</section>

				<aside>
					<h3>{'Quick Poll: '+this.props.albums[0].artist.replace(/_/g,' ')}</h3>
					<MiniPoll 
					albums={this.props.albums}/>
				</aside>	


			</div>
		)
	}
}

const container=document.getElementById('homeContainer');
const artists=JSON.parse(container.dataset.artists),
	  random=JSON.parse(container.dataset.random),
	  albums=JSON.parse(container.dataset.albums);
ReactDOM.render(<Home artists={artists} random={random} albums={albums}/>,container);
/*
<div className="contentBlock homepageBlock" id='minipoll' style={{background:colors.gold}}>
					<h3 style={{color:colors.dark}}>{'Flash Poll: '+this.props.albums[0].artist.replace(/_/g,' ')}</h3>
					<MiniPoll 
					albums={this.props.albums}
					height={height}/>
				</div>
*/