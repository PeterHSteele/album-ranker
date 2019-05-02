let HandleSubmitBallot=function(arr){
			let rankings=arr,
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
		}
}

module.exports = HandleSubmitBallot;