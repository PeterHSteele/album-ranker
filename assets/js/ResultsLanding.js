const React = require('react');
const ReactDOM = require('react-dom');
const Results=require('./Results.js');
const colors=require('./theme.js').colors;

class ResultsLanding extends React.Component {
	render(){
		return (
			<div>
				<Results 
				results={this.props.results} 
				height={400}
				width={800}
				background={colors.medium}/>
			</div>
		)
	}
}

const container=document.getElementById('resultsContainer')
console.log(container);
const results=JSON.parse(container.dataset.react);
ReactDOM.render(<ResultsLanding results={results} />,container);