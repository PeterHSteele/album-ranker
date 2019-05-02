<?php 
	class Albums extends CI_Controller {

		public function __construct()
        {
                parent::__construct();
                $this->load->model('album_model');
                $this->load->helper('url_helper');
        }

		public function index(){
			$data['title']='Albums';

			$this->load->view('templates/header');
			$this->load->view('albums/index',$data);
			$this->load->view('templates/footer');
		}

		public function artist($artist=false){
			if ($artist===false){
				$data['title']='Albums';

				$this->load->view('templates/header');
				$this->load->view('albums/index',$data);
				$this->load->view('templates/footer');
			}else {
				$data['title']='Albums';
				$data['artist']=$this->album_model->get_albums($artist);

				$this->load->view('templates/header');
				$this->load->view('albums/albums',$data);
				$this->load->view('templates/footer');
			}
		}
	}
?>