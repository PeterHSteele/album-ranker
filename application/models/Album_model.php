<?php
class Album_model extends CI_Model {
		public function __construct(){
			
			$this->load->database();
		}

		public function get_artists(){
			$query=$this->db->query('SELECT name, id FROM artists');
			return $query->result_array();
		}

		public function get_albums($artist=false){
			if ($artist==false){
				return;
			}
			$this->db->select('name ,artist, release_date, points, id, image,votes');
			$query=$this->db->get_where('albums',array('artist'=>$artist));
			return $query->result_array();
		}

		public function get_albums_and_sort($artist=false){
			if ($artist==false){
				return;
			}
			$this->db->select('name ,artist, release_date, points, id, image,votes');
			$query=$this->db->get_where('albums',array('artist'=>$artist));
			return $query->result_array();
		}

		public function updateScore($data){
			if ($data['score']!=false){
				$this->db->where('name',$data['album']);
				$this->db->set('points','points+'.$data['score'],false);
				$this->db->set('votes','votes+1',false);
				$this->db->update('albums');
			}
		}

}