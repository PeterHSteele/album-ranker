const React =require('react')
const RankButton=require('./RankButton.js');
const themeColors=require('./theme.js').colors

class Album extends React.Component {

	render (){
		
		return (
			<div 
			//onMouseover={(e)=>this.handleMouseOver(e,index)}
			className="album" 
			style={{
				background:this.props.shade,
				//border:this.props.rank?'5px solid ' + themeColors.dark:''
			}} 
			>
				<div className='albumCol title'>
					<h3>
						{this.props.display}
					</h3>
				</div>
				<div className='albumCol rank'>
					<span>
						{this.props.rank}
					</span>
				</div>
				<div className='albumCol button'>
					<RankButton 
					rank={this.props.rank}
					handleClick={this.props.handleClick}
					name={this.props.name}/>
				</div>
			</div>
		)
	}
}

module.exports=Album;