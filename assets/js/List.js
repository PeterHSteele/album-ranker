const React=require('react')

function List ({items,key,handleClick}){
	return (
		<ul>
			{items.map((e,i)=><li key={e.key?e.key:e} >{e}</li>)}
		</ul>
	)
}

module.exports=List