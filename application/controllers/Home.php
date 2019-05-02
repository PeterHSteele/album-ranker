<?php 
	class Home extends CI_Controller{

		public function __construct(){
			parent::__construct();
			$this->load->model('album_model');
		}


		public function index(){
			function date_compare($a,$b){
				$t1 = strtotime($a['release_date']);
				$t2 = strtotime($b['release_date']);
				return $t1-$t2;
			}

			$artists=$this->album_model->get_artists();
			$data['artists']=$artists;
			$artist_length=sizeof($artists)-1;
			$random_artist=rand(0,$artist_length);
			$artist_keys=array_keys($artists);
			$artist=$artists[$artist_keys[$random_artist]];

			$data['albums']=$this->album_model->get_albums($artist['name']);

			$albums=$this->album_model->get_albums('Deerhunter');

			usort($albums,'date_compare');
			$data['random']=$albums;

			$this->load->view('templates/header');
			$this->load->view('home/index',$data);
			$this->load->view('templates/footer');
		}

	}
?>