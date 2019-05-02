function rank(e,str,arr,context){
		if (arr.indexOf(str)>-1){
			arr=arr.slice(0,arr.indexOf(str))
		}else{
			arr.push(str)
		}
		context.setState({
			rankings:arr,
		})
	}

module.exports=rank;