const React=require('react');
const OrderedList=require('./OrderedList'),
	  SubmitButton=require('./SubmitButton.js');

function Modal(props){
	return props.open?
	(
		<div 
		className="modalBackdrop"
		onClick={(e)=>props.handleBackgroundClick(e)}>	
			
			<div className='modalContent'>
				
				<h2 style={{textAlign:'center'}}>
					{props.title}
				</h2>
				
				<OrderedList items={props.content}/>
			
				<SubmitButton
					value='confirm'
					handleClick={(e)=>props.handleSubmit(e)}/>
			</div>
		</div>
	):
	null;
}

module.exports=Modal;