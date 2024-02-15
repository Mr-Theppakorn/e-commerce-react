import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, TextField, OutlinedInput, Stack, FormControl, Select, MenuItem, Button, InputLabel } from '@mui/material'
import { useSelector } from 'react-redux';
import { createProduct, getProduct, getProductList, updatedProduct } from '../../api/product'
import { getCategory, getCategorySub } from '../../api/category'
import FileUpload from '../../components/forms/FileUpload'
import LinearProgress from '@mui/material/LinearProgress';
import AdminLayout from '../../components/layout/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    colors: ["Black", "White", "Red", "Green", "Yellow"],
    brands: ["Apple", "Microsoft", "Sony", "Samsung", "Lenovo", "Nintendo"],
    color: "",
    brand: "",
}

const ProductCreate = () => {
    let navigate = useNavigate();
    const { _id } = useParams();
    const { token } = useSelector(state => state.user)
    const [values, setValues] = useState(initialState);
    const [images, setImages] = useState([]);
    const [mode, setMode] = useState('Create');
    const [cate, setCate] = useState([]);
    const [subsOption, setSubsOption] = useState([]);
    const [selected, setSelected] = useState("");
    const [selectedSubs, setSelectedSubs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { title, description, price, category, subs, shipping, quantity, colors, brands, color, brand } = values;

    useEffect(() => {
        loadCategories();
        if (_id) {
            setMode('Update');
            loadProduct()
            console.log(values, 'Update Mode');
        }

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
                setSelectedSubs(arr);
            }).catch((err) => {
                console.log(err);
            })
    }


    const loadCategories = () => {
        getCategory().then((c) => setCate(c.data));
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleCategoryChange = (e) => {
        const _id = e.target.value;
        setValues({ ...values, category: _id });
        setSelected(_id);
        getCategorySub(_id).then((s) => setSubsOption(s.data))
    }

    const handleSubChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '') return;
        if (mode === 'Create') {
            createProduct(token, values)
                .then((res) => {
                    setSubsOption([]);
                    setValues({ ...initialState });
                    setImages([]);
                    navigate("/admin/products");
                }).catch((err) => {
                    console.log(err);
                });
        } else {
            updatedProduct(token, _id, values)
                .then((res) => {
                    console.log(res.data);
                    navigate("/admin/products");
                }).catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <AdminLayout>
            <Container className='mx-auto mt-2 p-10 border border-base-300 shadow-xl rounded'>
                <Typography className='text-center' variant="h4" color="initial">{mode} Product</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <div className='mt-10 grid grid-cols-2 gap-5'>
                        <TextField
                            id="title"
                            name='title'
                            label="Name"
                            value={title}
                            placeholder='Enter Product Name'
                            helperText={title.length > 0 ? "" : "Product Name is required"}
                            onChange={handleChange}
                            required
                        />
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
                        <FormControl>
                            <InputLabel>Color</InputLabel>
                            <Select
                                id="color"
                                name="color"
                                label="Select Category"
                                onChange={handleChange}
                                value={color}
                            >
                                {colors.map((c, index) => (
                                    <MenuItem key={index} value={c}>{c}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl >
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
                        <FormControl>
                            <InputLabel>Brand</InputLabel>
                            <Select
                                fullWidth
                                id="brand"
                                name="brand"
                                label="Select Category"
                                value={brand}
                                onChange={handleChange}
                            >
                                {brands.map((b, index) => (
                                    <MenuItem key={index} value={b}>{b}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Category</InputLabel>
                            <Select
                                fullWidth
                                id="category"
                                name="category"
                                label="Select Category"
                                value={mode === 'Create' ? category : selected}
                                onChange={handleCategoryChange}
                            >
                                {cate.map((c) => (
                                    <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {subsOption.length > 0 &&
                            <FormControl >
                                <InputLabel>Sub</InputLabel>
                                <Select
                                    fullWidth
                                    multiple
                                    id="subs"
                                    name="subs"
                                    label="Select Category"
                                    value={mode === 'Create' ? subs : selectedSubs}
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
                        }
                    </div>
                    <TextField
                        className='w-full mt-5'
                        multiline
                        rows={4}
                        id="description"
                        name="description"
                        label="Description"
                        placeholder='Enter Description'
                        value={description}
                        onChange={handleChange}
                        required
                    />
                    <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
                    <div className='flex justify-center'>
                        <Button className='mt-5 p-2 w-48' variant="contained" type='submit'>
                            {mode}
                        </Button>
                    </div>
                </Box>
                {loading && <LinearProgress className='mt-16' />}
            </Container>
        </AdminLayout>

    )
}

export default ProductCreate;