<!--<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'>
</head>
<body>
	<h1><?php echo $title?></h1>
	<?php echo form_open('vote/artist'); ?>
		<label for="searchArtist">Search for Artist</label>
		<input type="text" id="searchArtist" name="artist">
		<button type="submit">Submit</button>
	</form>
	<form>
		<label for="searchArtist">Search for Artist</label>
		<input type="text" id="searchArtist">
		<button type="submit">Submit</button>
	
</body>
</html>-->

<div id='voteLandingContainer' data-react=<?php echo json_encode($artists) ?>></div>
<script type="text/javascript" src='http://localhost/ranker/dist/voteLanding.bundle.js'></script>
