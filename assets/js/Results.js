const React=require('react'),
	  ReactDOM=require('react-dom');

const {scaleLinear}=require('d3-scale'),
	  {scaleBand}=require('d3-scale'),
	  {max}=require('d3-array'),
	  {axisLeft}=require('d3-axis'),
	  {select,Selection,selectAll}=require('d3-selection'),
	  {dispatch}=require('d3-dispatch'),
	  {transition}=require('d3-transition');

const themeColors=require('./theme.js').colors;
require('../scss/appstyles.scss')
const primary=themeColors.gold

const Tooltip=require('./Tooltip.js'),
	  List=require('./List.js')
	  CheckBoxInput=require('./CheckBoxInput'),
	  Chart=require('./Chart.js');

const margin={
	top:100,
	left:150,
	bottom:30,
	right:30
};
let height=400,
width=800;

let y,x,yAxis,setScales=function(arr){
	x=scaleLinear()
		.domain([0,max(arr.map(album=>(album.points/album.votes)))])
		.range([0,width-margin.right-margin.left])

	y=scaleBand()
		.domain(arr.map(e=>e.name))
		.range([0,height-margin.top-margin.bottom])
		.padding(.1)
};




class Results extends React.Component {
	constructor(props){
		super(props);
		
		this.state={
			active:0,
			x:0,
			y:0,
			tooltip:false,
			scoreSort:false,
			results:this.props.results,
			mouseover:false
		}

		this.svg=null;

		this.bindSVG=e=>{
			this.svg=e;
		}

		this.createChart=this.createChart.bind(this);
		this.setActiveAlbum=this.setActiveAlbum.bind(this);
		this.resetActiveAlbum=this.resetActiveAlbum.bind(this);
		this.handleCheckBoxChange=this.handleCheckBoxChange.bind(this);
		this.updateChart=this.updateChart.bind(this);
	}

	componentDidMount(){
		height=this.props.height;
		width=this.props.width;
		this.props.results.forEach((e,i)=>e.index=i)
		this.createChart();
	}

	componentDidUpdate(){
		this.updateChart();
	}


	handleCheckBoxChange(e){
		let sortByScore=function(arr){
			let scoreSort=arr.sort(function(a,b){
				return b.points-a.points;
			})
		return scoreSort
		}

		let sortByIndex=function(arr){
			let indexSort=arr.sort(function(a,b){
				return a.index-b.index
			})
			return indexSort;
		}

		let results=this.state.scoreSort?sortByIndex(this.state.results):sortByScore(this.state.results);
		console.log(this.state.scoreSort,this.props.results)
		this.setState({
			[e.target.name]:!this.state[e.target.name],
			results:results,
			mouseover:false
		})
		
	}

	setActiveAlbum(d,i,e){
		console.log('mouseenter',this.state.mouseover)
		this.setState({
			active:i,
			x:e.pageX,
			y:e.pageY,
			tooltip:true,
			mouseover:true
		})
	}

	resetActiveAlbum(){
		console.log('mouseleave',this.state.mouseover)
		this.setState({
			tooltip:false,
		})
	}

	updateChart(){
		let results=this.state.results;

		setScales(results);

		selectAll('.tick').select('text')
			.data(results)
			.text((d)=>d.name.replace(/_/g," "))

		let bars=select(this.svg).selectAll('rect')

		bars
			.data(results)
			.attr('y',(d,i)=>y(d.name))
			.attr('width',(d)=>this.state.mouseover?x(d.points/d.votes):0)
			.attr('fill',primary)
			.attr('height',(d)=>y.bandwidth())

	if(!this.state.mouseover){
		bars
		.transition()
		.attr('width',(d)=>x(d.points/d.votes))
	}
}

	createChart(){
		let svg=this.svg,results=this.props.results;

		setScales(results);

		yAxis=axisLeft(y)
			.tickFormat((d)=>d.replace(/_/g,' '))
			.tickSizeOuter([0])


		const group=select(svg)	
						.attr('height',height)
						.attr('width',width)
						.style('font-family','sans-serif')
						.style('background',this.props.background)
					.append('g')
						.attr('transform','translate('+margin.left+','+margin.top+')')
						.attr('fill',themeColors.light)

		const titleGroup=select(svg)
						  .append('g')
						  .attr('transform','translate('+(width/2.5)+',50)')

		const title=titleGroup.append('text')
						.text('Most Popular '+results[0].artist.replace(/_/g,' ')+' Albums' )
						.attr('font-size',20)


		const desc=titleGroup.append('text')
					.text('Inverse of Average Ranking')
					.style('font-size','.7em')
					.attr('transform','translate(30,15)')				
 
		group
					.selectAll('rect')
					.data(results)
				   .enter().append('rect')

				   group
				   	.selectAll('rect')
				   	.data(results)
				   	.exit()
				   	.remove()	
				   /*
				   bars.append('rect')
				   	.attr('y',(d)=>y(d.name))
				   	.attr('x',3)
				   	.attr('height',(d)=>y.bandwidth())
				   	.attr('width',(d)=>(x(d.points/d.votes))) 
				   	.style('fill',themeColors.colors.dark)
					*/
				   	group
				   	.selectAll('rect')
				   	.attr('y',(d,i)=>y(d.name))
				   	.attr('width',0)
				   	.attr('fill',primary)
				   	.attr('height',(d)=>y.bandwidth())
				   	.on('mouseenter',(d,i)=>this.setActiveAlbum(d,i,event))
				   	.on('mouseleave',(d)=>this.resetActiveAlbum())
				 
				   	group.transition()
				   	.selectAll('rect')
				   	.attr('width',(d)=>x(d.points/d.votes))
				  /* bars 	
				   	.append('text')
				   	.attr('x',(d,i)=>x(d.points/d.votes)+5)
				   	.attr('y',(d,i)=>(i*y.bandwidth()+(y.bandwidth()/2)))
				   	.text((d,i)=>d.name.replace(/_/g,' '))*/

				   	const axis=group.append('g')
				   		.call(yAxis)

	}

	render(){
		let results=this.state.results,active=this.state.active;
		return(
			<div className='results'>
				
				<div className="contentBlock" id="svgWrapper">
					
					<svg ref={this.bindSVG}></svg>

					<Tooltip
					show={this.state.tooltip}
					top={this.state.y}
					left={this.state.x+40}
					content={['Release Date: '+results[active].release_date,(results[active].points/results[active].votes).toFixed(2)+' of '+results.length+' points']}/>
				</div>

				<div className="contentBlock">

					<CheckBoxInput 
					label='Sort by score'
					id="scoreSort"
					checked={this.state.scoreSort}
					handleChange={this.handleCheckBoxChange}/>

				</div>

			</div>
			
		)
	}
}
/*
const container=document.getElementById('resultsContainer');
const results=JSON.parse(container.dataset.react);
ReactDOM.render(<Results results={results}/>,container);*/

module.exports=Results;