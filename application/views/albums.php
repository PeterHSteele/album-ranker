<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
</head>
<body>
<h1><?php echo $title ?></h1>
<ul>
	<?php foreach ($artist as $album): ?>
	<li><?php echo $album['name']?></li>
	<?php endforeach; ?>
</ul>
</body>
</html>