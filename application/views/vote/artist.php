<!--<h2><?php echo $title ?></h2>
<?php echo form_open('vote/artist/'.$title) ?>
	<?php 
	$options=sizeof($albums);
	foreach($albums as $album):?>
		<div class="album">
			<h3><?php echo $album['display_name']?></h3>
			<label for="rank"><?php echo 'Rank in Catalogue'?></label>
			<select name=<?php echo 'scores['.$album['name'].']'?> id='rank'>
				<?php for ($x=1;$x<=$options;$x++){
					echo '<option>'.$x.'</option>';
				}?>
				<option>Never listened</option>
			</select>
		</div>
	<?php endforeach; ?>
	<button type="submit">Submit</button>
</form>
</div>-->

<div id='vote-album' data-react=<?php echo json_encode($albums)?>></div>
<script type='text/javascript' src='http://localhost/ranker/dist/voteAlbum.bundle.js'></script>