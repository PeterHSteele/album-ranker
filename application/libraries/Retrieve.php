<?php 
defined('BASEPATH') OR exit('no direct script access allowed');

class Retrieve {

	public function __construct(){
			parent::__construct();
			$this->load->model('album_model');
		}

	public function lookup ($artist){
			function date_compare($a,$b){
				$t1 = strtotime($a['release_date']);
				$t2 = strtotime($b['release_date']);
				return $t1-$t2;
			}

			$albums=$this->album_model->get_albums($artist);
			if (count($albums)===0){
				$data['searchTerm']=$artist;

				$this->load->view('templates/header');
				$this->load->view('artists/no_record',$data);
				$this->load->view('templates/footer');
			
			}else{

			usort($albums,'date_compare');
			$data['albums']=$albums;

			$this->load->view('templates/header');
			$this->load->view('artists/results',$data);
			$this->load->view('templates/footer');

			}
		}

	public function artistNames(){
		
	}

}
	
?>