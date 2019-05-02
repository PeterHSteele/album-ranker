const path=require('path')
const { SRC, DIST, ASSETS } =require('./paths.js')
const sass=require('node-sass');
const sassUtils=require('node-sass-utils')(sass);

const sassVars=path.resolve(__dirname,'..','assets/js/theme.js')

var HTMLWebpackPlugin = require('html-webpack-plugin');
let HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template:'application/views/albums.php',
	inject:'body',

})

module.exports={
	entry:{
		header:path.resolve(SRC,'Header.js'),
		voteAlbum:path.resolve(SRC,'VoteAlbum.js'),
		voteLanding:path.resolve(SRC,'VoteLanding.js'),
		artistsLanding:path.resolve(SRC,'ArtistsLanding.js'),
		resultsLanding:path.resolve(SRC,'ResultsLanding.js'),
		home:path.resolve(SRC,"Home.js")
	},
	module:{
		rules:[
			{
				test:/.js$/,
				exclude:/node_modules/,
				use:'babel-loader'
			},
				{
				    test: /\.scss$/,
				    use: [{
				        loader: "style-loader"
				    }, {
				        loader: "css-loader"
				    }, {
				        loader: "sass-loader",
				        options: {
				          functions: {
				            "get($keys)": function(keys) {
				              keys = keys.getValue().split(".");
				              let result = sassVars;
				              let i;
				              for (i = 0; i < keys.length; i++) {
				                result = result[keys[i]];
				              }
				              result = sassUtils.castToSass(result);
				              return result;
				            }
				          }
				        }
				    }]
  				},
  			{
  				test:/.svg$/,
  				use:'svg-inline-loader'
  			}
		]
	},
	output:{
		path:DIST,
		filename:'[name].bundle.js',
		publicPath:ASSETS
	}
}