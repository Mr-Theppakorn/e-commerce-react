import { Container, Typography, Box, TextField, Button, Select, InputLabel, MenuItem, FormControl } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { createCategory, createSub, getCategory, getSub } from '../../../api/category';
import { toast } from 'react-toastify'
import CategoryItem from './CategoryItem';
import SubItem from './SubItem';

const CategoryForm = ({ user: { token } }) => {
    const [category, setCategory] = useState("");
    const [sub, setSub] = useState("");
    const [selectCategory, setSelectCategory] = useState("");
    const [keywordC, setKeywordC] = useState("");
    const [keywordS, setKeywordS] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [subList, setSubList] = useState([]);

    useEffect(() => {
        loadingCategory();
        loadingSub();
    }, []);
    const handleUpdateCategoryList = (updatedCategory) => {
        const updatedCategories = categoryList.map(c => {
            if (c._id === updatedCategory._id) {
                return { ...c, ...updatedCategory };
            }
            return c;
        });
        setCategoryList(updatedCategories);
    };

    const handleRemoveCategoryList = (_id) => {
        setCategoryList(categoryList.filter(c => c._id !== _id));
    };

    const handleUpdateSubList = (updatedSub) => {
        const updatedSubList = subList.map(c => {
            if (c._id === updatedSub._id) {
                return { ...c, ...updatedSub };
            }
            return c;
        });
        setSubList(updatedSubList);
    };

    const handleRemoveSubList = (_id) => {
        setSubList(subList.filter(s => s._id !== _id));
    };

    const loadingCategory = () => {
        getCategory()
            .then((res) => {
                setCategoryList(res.data)
            }).catch((err) => {
                console.log(err);
            });
    }
    console.log(subList);

    const loadingSub = () => {
        getSub()
            .then((res) => {
                setSubList(res.data)
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory(token, category)
            .then((res) => {
                const updated = [
                    ...categoryList,
                    res.data
                ];
                setCategoryList(updated);
                toast.success(`${res.data.name} is created successfully`);
                setCategory("");
            }).catch((err) => {
                console.log(err);
            });
    }

    const onSubmitSub = (e) => {
        e.preventDefault();
        createSub(token, { sub, parent: selectCategory })
            .then((res) => {
                const updated = [
                    ...subList,
                    res.data
                ];
                setSubList(updated);
                toast.success(`${res.data.name} is created successfully`);
                setSub("");
            }).catch((err) => {
                console.log(err);
            });
    }

    const filteredCategories = categoryList.filter((category) => {
        return category.name.toLowerCase().includes(keywordC.toLowerCase());
    });

    const filteredSub = subList.filter((s) => {
        return s.name.toLowerCase().includes(keywordS.toLowerCase());
    });

    const renderCategory = filteredCategories.map((category) => {
        return <CategoryItem token={token} key={category._id} category={category} onUpdateCategoryList={handleUpdateCategoryList} onRemoveCategoryList={handleRemoveCategoryList} />
    });

    const renderSub = filteredSub.map((sub) => {
        return <SubItem token={token} key={sub._id} sub={sub} onUpdateSubList={handleUpdateSubList} onRemoveSubList={handleRemoveSubList} />
    });

    return (
        <Container className='mt-10'>
            <Typography variant="h5" color="initial">Category</Typography>
            <Box component="form" className='flex' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <div className='w-5/6'>
                    <TextField

                        name="category"
                        label="Category"
                        placeholder="Add Category"
                        variant="outlined"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required


                    />
                </div>
                <Button
                    className="bg-green-500 hover:bg-green-600 w-1/6 ml-5"
                    variant="contained"
                    type="submit"
                >
                    Add
                </Button>
            </Box>
            <Typography className='mt-5' variant="h5" color="initial">Sub Category</Typography>
            <Box component="form" className='flex flex-col gap-2 md:flex-row' onSubmit={onSubmitSub} noValidate sx={{ mt: 1 }}>
                <FormControl className='w-full mr-4 md:w-1/4'>
                    <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                    <Select
                        name="select-category"
                        label="Select Category"
                        value={selectCategory}
                        onChange={(e) => setSelectCategory(e.target.value)}
                    >
                        {categoryList.map(c => (
                            <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className='md:w-9/12'>
                    <TextField
                        name="category"
                        label="Sub"
                        placeholder="Add Category"
                        variant="outlined"
                        fullWidth
                        value={sub}
                        onChange={(e) => setSub(e.target.value)}
                        required
                    />
                </div>
                <Button
                    className="bg-green-500 hover:bg-green-600 w-1/6 ml-5"
                    variant="contained"
                    type="submit"
                >
                    Add
                </Button>
            </Box>
            <div className='flex mb-5 mt-5'>
                <Typography variant="h5" color="initial" className='mt-5 mr-5'>
                    Category List
                </Typography>
                <TextField
                    className='w-1/3 mt-1'
                    name="keyword"
                    label="Search..."
                    placeholder="Search"
                    variant="standard"
                    value={keywordC}
                    onChange={(e) => setKeywordC(e.target.value).toLowerCase()}
                    required
                />
            </div>
            <div className='sm:flex'>
                {renderCategory}
            </div>
            <div className='flex mb-5 mt-5'>
                <Typography variant="h5" color="initial" className='mt-5 mr-5'>
                    Sub List
                </Typography>
                <TextField
                    className='w-1/3 mt-1'
                    name="keyword"
                    label="Search..."
                    placeholder="Search"
                    variant="standard"
                    value={keywordS}
                    onChange={(e) => setKeywordS(e.target.value).toLowerCase()}
                    required
                />
            </div>
            <div className='sm:flex flex-wrap'>
                {renderSub}
            </div>
        </Container>
    )
}

export default CategoryForm