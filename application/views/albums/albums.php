<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
</head>
<body>
<h1><?php echo $title ?></h1>
	<?php foreach($artist as $album):?>
	<p><?php echo $album['name']; ?></p>
	<?php endforeach; ?>
</body>
</html>