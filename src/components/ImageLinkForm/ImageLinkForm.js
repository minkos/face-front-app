import React from 'react';
import './ImageLinkForm.css';

// .center is imported in App.js (parent), its available for all the jsx components (i.e. used here)
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<p className='f3'>
				{'This application will detect faces in your pictures. The image link MUST end with .jpeg or .jpg!'}
				{'For example, https://www.online-tech-tips.com/wp-content/uploads/2022/02/faces.jpeg'}
				{'or, https://st4.depositphotos.com/6903990/27898/i/450/depositphotos_278981062-stock-photo-beautiful-young-woman-clean-fresh.jpg'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={ onInputChange } />
					<button 
						className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
						onClick={ onButtonSubmit }
					>Detect</button>
				</div>
			</div>
		</div>
		);
}

export default ImageLinkForm;