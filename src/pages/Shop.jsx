import * as React from 'react';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import ProductItem from '../components/ProductItem';
import LoadingCard from '../components/LoadingCard';
import { getProductByFilter, getProductCount, getProductList } from '../api/product';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '@mui/material/Slider';
import { searchQuery } from '../store/slices/searchSlice';
import { getCategory, getSub } from '../api/category';
import Star from '../components/forms/Star';
import RadioGroup from '@mui/material/RadioGroup';

export default function Shop() {
    const dispatch = useDispatch()
    const { text } = useSelector(state => state.search);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState(["Apple", "Microsoft", "Sony", "Samsung", "Lenovo", "Nintendo"]);
    const [colors, setColors] = useState(["Black", "White", "Red", "Green", "Yellow"]);
    const [color, setColor] = useState();
    const [brand, setBrand] = useState();
    const [subs, setSubs] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);
    const [value, setValue] = React.useState([20, 37]);
    const [categoryId, setCategoryId] = React.useState([]);
    const [time, setTime] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategory();
        loadSubs();
        loadProducts();
    }, [page]);

    const loadProductsByFilter = (arg) => {
        getProductByFilter(arg)
            .then((res) => {
                setProducts(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    const loadCategory = () => {
        setLoading(true);
        getCategory()
            .then((res) => {
                setCategories(res.data);
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }

    const loadSubs = () => {
        setLoading(true);
        getSub()
            .then((res) => {
                setSubs(res.data);
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }

    const loadProducts = () => {
        setLoading(true);
        getProductList("createdAt", "desc")
            .then((res) => {
                setProducts(res.data);
                setProductsCount(res.data.length);
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }

    useEffect(() => {
        const delayed = setTimeout(() => {
            loadProductsByFilter({ text });
        }, 300)
        return () => clearTimeout(delayed);
    }, [text]);



    useEffect(() => {
        if (time) {
            loadProductsByFilter({ price: value });
        }
    }, [time]);


    const loadProductsCount = () => {
        getProductCount()
            .then((res) => {
                setProductsCount(res.data.length);
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    const priceChange = (event, newValue) => {
        dispatch(searchQuery({ text: "" }));
        setValue(newValue);
        setTimeout(() => {
            setTime(!time)
        }, 300)
    };

    const categoryChange = (e) => {
        let inTheState = [...categoryId];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked);

        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundInTheState, 1);
        }
        setCategoryId(inTheState);
        loadProductsByFilter({ category: inTheState })
    };

    const starChange = (stars) => {
        loadProductsByFilter({ stars });
    };

    const subChange = (subs) => {
        loadProductsByFilter({ subs });
    };

    const brandChange = (e) => {
        setBrand(e.target.value);
        loadProductsByFilter({ brand: e.target.value });
    };

    const colorChange = (e) => {
        setColor(e.target.value);
        loadProductsByFilter({ color: e.target.value });
    };

    const renderProducts = products.map((item) => {
        return <ProductItem key={item._id} product={item} />
    })


    const renderSubs = subs.map((s) => (
        <span key={s._id} className="cursor-pointer inline-flex m-1 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
            onClick={() => subChange(s._id)}
        >
            {s.name}
        </span>
    ))



    return (
        <div className="flex flex-row m-5 flex-wrap  md:flex-nowrap md:m-5">
            <div className='md:basis-1/5'>
                <h1>Search / Filter</h1>
                <div>
                    {value[0]}  - {value[1]}
                    <Slider
                        value={value}
                        onChange={priceChange}
                        valueLabelDisplay="auto"
                        min={1}
                        max={1000}
                    />
                </div>
                <FormGroup>
                    <h1>Categories</h1>
                    {categories.map((c) => (
                        <FormControlLabel
                            key={c._id}
                            control={<Checkbox />}
                            label={c.name}
                            value={c._id}
                            onChange={categoryChange}
                        />
                    ))}
                </FormGroup>
                <div>
                    <h1 className='mt-2 mb-2'>Rating</h1>
                    <Star numberOfStars={5} starClick={starChange} />
                    <Star numberOfStars={4} starClick={starChange} />
                    <Star numberOfStars={3} starClick={starChange} />
                    <Star numberOfStars={2} starClick={starChange} />
                    <Star numberOfStars={1} starClick={starChange} />
                </div>
                <div>
                    <h1 className='mt-2 mb-2'>Sub Categories</h1>
                    {renderSubs}
                </div>
                <FormGroup>
                    <h1>Brand</h1>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        {brands.map((c, index) => (
                            <FormControlLabel
                                key={index}
                                control={<Radio />}
                                label={c}
                                value={c}
                                checked={brand === c}
                                onChange={brandChange}
                            />
                        ))}
                    </RadioGroup>
                </FormGroup>
                <FormGroup>
                    <h1>Color</h1>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        {colors.map((c, index) => (
                            <FormControlLabel
                                key={index}
                                control={<Radio />}
                                label={c}
                                value={c}
                                checked={color === c}
                                onChange={colorChange}
                            />
                        ))}
                    </RadioGroup>
                </FormGroup>
            </div>
            <div className='md:basis-10/12 mt-5 md:ml-5'>
                <Typography className='text-start' variant="h4" color="initial">
                    Products
                </Typography>
                <div className='divider' />
                {loading &&
                    <LoadingCard count={products.length} />
                }
                <Grid className='mt-5' container spacing={2}>
                    {renderProducts.map((product, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                            {product}
                        </Grid>
                    ))}
                </Grid>
            </div>

        </div>
    );
}