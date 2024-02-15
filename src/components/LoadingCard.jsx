import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const LoadingCard = ({ count }) => {
    const renderCards = () => {
        const cards = [];

        for (let i = 0; i < count; i++) {
            cards.push(
                <Box key={i} sx={{ width: 275 }}>
                    <Skeleton variant="rectangular" width={275} height={150} />
                    <Skeleton animation="wave" width={200} />
                    <Skeleton animation={false} width={100} />
                </Box>
            );
        }

        return cards;
    };

    return <div className='mt-5 flex flex-wrap gap-4'>{renderCards()}</div>;
};

export default LoadingCard;