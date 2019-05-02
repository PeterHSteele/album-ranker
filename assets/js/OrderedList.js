const React = require('react');

function OrderedList(props){
	return(
		<ol>
			{props.items.map(e=><li key={e}>{e.replace(/_/g,' ')}</li>)}
		</ol>
	)
}

module.exports=OrderedList;