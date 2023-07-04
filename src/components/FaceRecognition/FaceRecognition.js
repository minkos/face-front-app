import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {

	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
					{
						box.map(target => 
									 <div key={`${target.topRow}_${target.rightCol}`} 
											 className='bounding-box' 
											 style={{top: target.topRow, right: target.rightCol, 
													bottom: target.bottomRow, left: target.leftCol}}
									>
									</div>
												)
					}
			</div>
		</div>
		);

	{/*
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
				<div className='bounding-box' 
					 style={{top: box.topRow, right: box.rightCol, 
							 bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
		);
	*/}

}

export default FaceRecognition;
   