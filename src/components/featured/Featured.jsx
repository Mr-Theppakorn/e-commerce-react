import React from 'react'
import useFetch from '../../components/hook/useFetch'

const Featured = () => {

    const { data, loading, error } = useFetch("hotel-city?cities=Thai")
    console.log(data);
    return (
        <div>Featured</div>
    )
}

export default Featured