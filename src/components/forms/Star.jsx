import React from 'react'
import Rating from '@mui/material/Rating';

const Star = ({ starClick, numberOfStars }) => {


    return (
        <div className='cursor-pointer' onClick={() => starClick(numberOfStars)}>
            <Rating
                value={numberOfStars}
                readOnly
            />
        </div>
    )
}

export default Star;