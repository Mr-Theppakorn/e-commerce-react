import { Container } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const user = useSelector((state) => state.user);

    return (
        <Container>Home</Container>
    )
}

export default Home