import React from 'react'
import Rating from '@mui/material/Rating';

const RatingAverage = ({ p }) => {
    if (p && p?.ratings) {
        let ratingsArray = p && p.ratings;
        let total = []
        let length = ratingsArray.length;

        ratingsArray.map((r) => total.push(r.star));
        let totalReduced = total.reduce((p, n) => p + n, 0);
        let highest = length * 5;
        let result = (totalReduced * 5) / highest;

        return (
            <>
                <Rating
                    readOnly
                    sx={{ m: 1 }}
                    name="simple-controller"
                    size="medium"
                    value={result}
                />
            </>
        )
    }
}

export default RatingAverage;