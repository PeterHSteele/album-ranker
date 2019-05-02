<?php
class Vote extends CI_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->model('album_model');
		$this->load->helper('form');
		$this->load->helper('security');
	}

	public function index (){
		$data['title']='Vote';

		$data['artists']=$this->album_model->get_artists();

		$this->load->view('templates/header');
		$this->load->view('vote/index.php',$data);
		$this->load->view('templates/footer');
	}

	public function artist($param=false){
		if ($param){
			$artist=$param;
		}else{
			$artist=$this->input->post('artist');
		}
		$data['title']=$artist;
		$data['albums']=$this->album_model->get_albums($artist);
		$this->load->view('templates/header');
		$this->load->view('vote/artist.php',$data);
		$this->load->view('templates/footer');		
	}

	public function ballot($artist=false){
		$stream_clean=$this->security->xss_clean($this->input->raw_input_stream);
		$request=json_decode($stream_clean,true);
		$scores=$request;
		$score_keys=array_keys($scores);
		foreach ($score_keys as $key){
			$update=array(
				'score'=>$scores[$key]==="Never listened"?false:$scores[$key],
				'album'=>$key
			);
			#echo $update['album'].'<br>'.$update['score'].'<br>';
			$this->album_model->updateScore($update);
		}	
		$response = json_encode($scores);
		header('Content-Type: application/json');
		echo $response;
		/*$data['title']='ballot';
		$data['albums']=$scores;

		$this->load->view('templates/header.php');	
		$this->load->view('vote/ballot.php',$data);*/
	}


}