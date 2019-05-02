const React=require('react')

class Chart extends React.Component {
	constructor(props){
		super(props)
	}

	
	render(){
		let svg=this.svg;
		let results=this.props.data;
		const x=scaleLinear()
			.domain([0,max(results.map(album=>(album.points/album.votes)))])
			.range([0,width-margin.right-margin.left])

		y=scaleBand()
			.domain(results.map(e=>e.name))
			.range([0,150+results.length*10])
			.padding(.1)

		console.log('y',y)

		const yAxis=axisLeft(y)
			.tickFormat((d)=>d.replace(/_/g,' '))
			.tickSizeOuter([0])

		
		const group=select(svg)	
						.attr('height',150+results.length*25)
						.attr('width',width)
						.style('font-family','sans-serif')
						.style('background',themeColors.colors.gold)
					.append('g')
						.attr('transform','translate('+margin.left+','+margin.top+')')
						.attr('fill',themeColors.colors.gray)

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
 
		const bars=group
					.selectAll('rect')
					.data(results)
				   .enter().append('g')	

				   bars.append('rect')
				   	.attr('y',(d)=>y(d.name))
				   	.attr('x',3)
				   	.attr('height',(d)=>y.bandwidth())
				   	.attr('width',(d)=>(x(d.points/d.votes))) 
				   	.style('fill',themeColors.colors.dark)

				   	bars
				   	.append('rect')
				   	.attr('y',(d,i)=>y(d.name))
				   	.attr('width',(d)=>x(d.points/d.votes))
				   	.attr('fill','teal')
				   	.attr('height',(d)=>y.bandwidth())
				   	.on('mouseenter',(d,i)=>this.setActiveAlbum(d,i,event))
				   	.on('mouseleave',()=>this.resetActiveAlbum())

				  /* bars 	
				   	.append('text')
				   	.attr('x',(d,i)=>x(d.points/d.votes)+5)
				   	.attr('y',(d,i)=>(i*y.bandwidth()+(y.bandwidth()/2)))
				   	.text((d,i)=>d.name.replace(/_/g,' '))*/

				   	const axis=group.append('g')
				   		.call(yAxis)

		return (
			<svg ref={this.props.svg}></svg>
		)
	}
}

module.exports=Chart