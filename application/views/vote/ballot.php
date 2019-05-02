<h2>$title</h2>
<?php 
$album_keys=array_keys($albums);
foreach($album_keys as $key):?>
<h4><?php echo $key.' '.$albums[$key]?></h4>
<?php endforeach;?>