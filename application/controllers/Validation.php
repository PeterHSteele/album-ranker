<?php

class Validation extends CI_Controller {

        public function index()
        {
                $this->load->helper(array('form', 'url'));

                $this->load->library('form_validation');
                $this->form_validation->set_rules(
                        'username', 'Username', 'callback_username_check'
                );
                $this->form_validation->set_rules('password', 'Password', 'required');
                $this->form_validation->set_rules('passconf', 'Password Confirmation', 'required|matches[password]');
                $this->form_validation->set_rules('email', 'Email', 'required|valid_email|is_unique[users.email]');
                
                if ($this->form_validation->run() == FALSE)
                {
                        $this->load->view('validation/testform.php');
                }
                else
                {
                        $this->load->view('validation/formsuccess.php');
                }
        }

        public function username_check($str)
        {
                if ($str=='test'){
                        $this->form_validation->set_message('username_check','The {field} field cannot be the word "test"');
                        return FALSE;
                }else{
                        return TRUE;
                }
        }
}