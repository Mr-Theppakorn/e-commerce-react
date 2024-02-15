import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Box, TextField, OutlinedInput, Stack, FormControl, Select, MenuItem, Button, InputLabel } from '@mui/material'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import FileUpload from '../../../components/forms/FileUpload'
import { getProduct, updatedProduct } from '../../../api/product';
import { getCategory, getCategorySub } from '../../../api/category';

const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "White", "Red", "Green", "Yellow"],
    brands: ["Apple", "Microsoft"],
    color: "",
    brand: "",
}

function ProductEdit() {
    const { _id } = useParams();
    const { token } = useSelector(state => state.user)
    let navigate = useNavigate();
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subsOption, setSubsOption] = useState([]);
    const [arrOption, setArrOption] = useState([]);
    const [arrOption2, setArrOption2] = useState([]);
    const [selected, setSelected] = useState("");
    const { title, description, price, category, subs, shipping, quantity, images, colors, brands, color, brand } = values;

    useEffect(() => {
        loadCategory();
        loadProduct();
    }, []);

    const loadProduct = () => {
        getProduct(_id)
            .then((res) => {
                setValues({ ...values, ...res.data })
                setSelected(res.data.category._id);
                getCategorySub(res.data.category._id)
                    .then((sub) => {
                        setSubsOption(sub.data);
                    });
                let arr = [];
                res.data.subs.map((s) => {
                    arr.push(s._id);
                });
                setArrOption((prev) => arr);
                setArrOption2((prev) => arr);
            }).catch((err) => {
                console.log(err);
            })
    }

    const loadCategory = () => {
        getCategory()
            .then((res) => {
                setCategories(res.data)
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubChange = (e) => {
        setArrOption(e.target.value);
    }

    const handleCategoryChange = (e) => {
        const category_id = e.target.value;
        setSelected(e.target.value);
        setSelected(category_id);
        getCategorySub(category_id)
            .then((res) => {
                setSubsOption(res.data);
                setArrOption([]);
            }).catch((err) => {
                console.log(err);
            });
        if (values.category._id === e.target.value) {
            getCategorySub(values.category._id)
                .then((sub) => {
                    setSubsOption(sub.data);
                    setArrOption(arrOption2);
                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        values.subs = arrOption;
        values.category = selected.trim().length !== 0 ? selected : values.category;
        updatedProduct(token, _id, values)
            .then((res) => {
                console.log(res.data);
                navigate("/user/product/list");
            }).catch((err) => {
                console.log(err);
            });
    };
    console.log(values, 'data');

    return (
        <Container className='mt-10'>
            <Typography className='text-center' variant="h4" color="initial">Product Create</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <div className='mt-10'>
                    <TextField
                        id="title"
                        name='title'
                        label="Name"
                        placeholder='Enter Product Name'
                        value={title}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        className='ml-5'
                        multiline
                        maxRows={4}
                        id="description"
                        name="description"
                        label="Description"
                        placeholder='Enter Description'
                        value={description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mt-5'>
                    <TextField
                        type='number'
                        id="price"
                        name='price'
                        label="Price"
                        placeholder='Enter Price'
                        value={price}
                        onChange={handleChange}
                        required
                    />
                    <FormControl className='w-1/3 ml-5'>
                        <InputLabel>Shipping</InputLabel>
                        <Select
                            id='shipping'
                            name="shipping"
                            label="Select Category"
                            value={shipping}
                            onChange={handleChange}

                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='mt-5'>
                    <TextField
                        type='number'
                        id="quantity"
                        name='quantity'
                        label="Quantity"
                        placeholder='Enter a quantity'
                        value={quantity}
                        onChange={handleChange}
                        required
                    />
                    <FormControl className='w-1/3 ml-5'>
                        <InputLabel>Color</InputLabel>
                        <Select
                            id="color"
                            name="color"
                            label="Select Category"
                            onChange={handleChange}
                            value={color}
                        >
                            {colors.map(c => (
                                <MenuItem key={c} value={c}>{c}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <FormControl className='w-1/2 mt-5'>
                        <InputLabel>Brand</InputLabel>
                        <Select
                            fullWidth
                            id="brand"
                            name="brand"
                            label="Select Category"
                            value={brand}
                            onChange={handleChange}
                        >
                            {brands.map(b => (
                                <MenuItem key={b} value={b}>{b}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl className='w-1/2 mt-5'>
                        <InputLabel>Category</InputLabel>
                        <Select
                            fullWidth
                            id="category"
                            name="category"
                            label="Select Category"
                            value={selected}
                            onChange={handleCategoryChange}
                        >
                            {categories.map(c => (
                                <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                {subsOption.length > 0 && <div>
                    <FormControl className='w-1/2 mt-5'>
                        <InputLabel>Sub</InputLabel>
                        <Select
                            fullWidth
                            multiple
                            id="subs"
                            name="subs"
                            label="Select Category"
                            value={arrOption}
                            onChange={handleSubChange}
                            input={<OutlinedInput label="Tag" />}

                        >
                            {subsOption.map(s => (
                                <MenuItem key={s._id} value={s._id}>
                                    {s.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>}


                <FileUpload values={values} setValues={setValues} setLoading={setLoading} />

                <Button className='mt-5' variant="contained" type='submit'>
                    Update
                </Button>
            </Box>

        </Container>
    )
}

export default ProductEdit