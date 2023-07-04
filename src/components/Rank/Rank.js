import React from 'react';

const Rank = ({ name, entries }) => {
	return (
		<div>
			<div className='white f3'>
				{"Hi, ready to find those faces out there?"}
				{/*
				{`${name}, your current entry count is ....`}
				*/}
			</div>
			<div className='white f1'>
				{/*
				{`#${entries}`}
				*/}
			</div>
		</div>
		);
}

export default Rank;