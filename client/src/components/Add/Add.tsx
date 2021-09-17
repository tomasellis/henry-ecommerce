import { useState } from 'react';
import { useDispatch } from 'react-redux';

//import component
import Categories from './Categories/categories';
import OptionsAdd from './Options/Options';

//import action
import { postProduct } from '../../actions';

//import css 
import './Add.css';

declare global {
    interface Window {
        cloudinary:any;
    }
}

export const validate = (input) => {
    let err = {
        name: '',
        size: '',
        color: '',
        price: '',
        stock: '',
    };
    const error = 'This field can not be blank';
    if (!input.name) err.name = error;
    if (!input.options[0].size) err.size = error;
    if (!input.options[0].color) err.color = error;
    if (!input.options[0].stock) err.stock = error;
    if (!input.price) err.price = error;
    return err;
};

export default function Add() {

    const [err, setErr] = useState({
        name: '',
        size: '',
        color: '',
        price: '',
        stock: ''
    })

    const [input, setInput] = useState({
        name: '',
        categories: [],
        image_url: '',
        gender: '',
        price: '',
        options: [{ image_url: '#', color: '', size: '', stock: '' }]
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErr(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleOptions = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            options: [{ ...input.options[0], [e.target.name]: e.target.value }]
        });
        setErr(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        if (!err.name && input.gender && input.price && input.options[0].color && input.options[0].size) {
            e.preventDefault();
            dispatch(postProduct(input))
            setInput({
                name: '',
                categories: [],
                image_url: '',
                gender: '',
                price: '',
                options: [{ image_url: '#', color: '', size: '', stock: '' }]
            });
            alert('Product created successfully');
        } else {
            e.preventDefault();
            alert('There are empty fields');
        }
    };

    let myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dda6r0i60",
          uploadPreset: "henry.pg"
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setInput({
                ...input,
                image_url: result.info.url
            })
          }
        }
      );

    const openWidgetCloudinary = (e) => {
        e.preventDefault();
        myWidget.open();
      }

    return (
        <>  <div className='div_add_product'>
            <div className='image_add_product'>
                <img src="https://images.unsplash.com/photo-1619032561786-ff6c371e0c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=537&q=80" alt="no cargo :(" />
            </div>
            <div className='div_form_add_product'>
                <h1 className='title_add_product'>Create Product</h1>
                <form >
                    <div className='div_name_add_product'>
                        <p className='p_add_product'>Name</p>
                        <input type="text"
                            name='name'
                            value={input.name}
                            onChange={e => handleChange(e)}
                        />
                        {
                            !err.name ? null : <p className='err_add_product'>{err.name}</p>
                        }
                    </div>
                    <div className='div_category_add_product'>
                        <Categories
                            handleChange={handleChange}
                            input={input}
                            setInput={setInput}
                        />
                    </div>
                    <div className='div_image_add_product'>
                        <p className='p_add_product'>Image URL</p>
                        <input type="text"
                            name='image_url'
                            value={input.image_url}
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <button id="upload_widget" className="cloudinary-button" onClick={openWidgetCloudinary}>
                        Upload image
                    </button>
                    <OptionsAdd
                        input={input}
                        setInput={setInput}
                        err={err}
                        setErr={setErr}
                        handleOptions={handleOptions}
                    />
                    <div className='div_input_stock_adn_price'>
                        <div>
                            <p className='p_add_product'>Stock</p>
                            <input type="number"
                                name='stock'
                                min='1'
                                onChange={e => handleOptions(e)}
                            />
                        </div>
                        <div>
                            <p className='p_add_product'>Price</p>
                            <input type="number"
                                min='1'
                                name='price'
                                value={input.price}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                    </div>
                    {
                        !err.price && !err.stock ? null : <p className='err_add_product'>{err.size}</p>
                    }
                    <div className='div_button_add_product'>
                        <button onClick={e => handleSubmit(e)}>Add</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
};