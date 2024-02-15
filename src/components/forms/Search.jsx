import React from 'react'
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { searchQuery } from '../../store/slices/searchSlice';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { text } = useSelector(state => state.search);

    const handleChange = (e) => {
        dispatch(searchQuery({ text: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/shop?${text}`);
    }

    return (
        <form className='mr-2' onSubmit={handleSubmit} >
            <input type="text"
                placeholder="Search"
                className="text-black input input-ghost w-full max-w-xs"
                value={text}
                onChange={handleChange}
            />
        </form>
    )
}

export default Search;