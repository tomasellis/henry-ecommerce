import {  useState } from 'react';
import { useDispatch } from 'react-redux';

//import component
import Categories from './Categories/categories';
import OptionsAdd from './Options/Options';

//import action
import { postProduct } from '../../actions';

//import css 
import './Add.css'

export default function Add(){

    const [input, setInput] = useState({
        name: '',
        categories : [],
        image_url : '',
        gender : '',
        price : '',
        options : [{image_url : '#', color : '', size : '', stock : ''}]
    })
    
    const dispatch = useDispatch();
    
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    
    const handleOptions = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            options : [{ ...input.options[0], [e.target.name] : e.target.value}]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postProduct(input))
        console.log(input);
        setInput({
            name: '',
            categories : [],
            image_url : '',
            gender: '',
            price : '',
            options : [{image_url : '#', color : '', size : '', stock : ''}]
        })
    }

    return(
        <>  <div className = 'div_add_product'>
                <div className = 'image_add_product'>
                    <img src="https://images.unsplash.com/photo-1619032561786-ff6c371e0c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=537&q=80" alt="" />
                </div>
                <div className = 'div_form_add_product'>
                    <h1 className = 'title_add_product'>Create Product</h1>
                    <form >
                        <div className = 'div_name_add_product'>
                            <p className = 'p_add_product'>Name</p>
                            <input type="text" 
                            name = 'name' 
                            value = {input.name} 
                            onChange = {e => handleChange(e)}
                            />
                        </div>
                        <div className = 'div_category_add_product'>
                            <Categories
                            handleChange = {handleChange}
                            input = {input}
                            setInput = {setInput} 
                            />
                        </div>
                        <div className = 'div_image_add_product'>
                            <p className = 'p_add_product'>Image URL</p>
                            <input type="text" 
                            name = 'image_url' 
                            value = {input.image_url}
                            onChange = {e => {
                                handleChange(e);
                            }}
                            />
                        </div>
                        <OptionsAdd 
                        input = {input}
                        setInput = {input}
                        handleOptions = {handleOptions}
                        />
                        <div className = 'div_input_stock_adn_price'>
                            <div>
                                <p className = 'p_add_product'>Stock</p>
                                <input type="number" 
                                name = 'stock' 
                                min = '1'
                                onChange = {e => handleOptions(e)}
                                />
                            </div>
                            <div>
                                <p className = 'p_add_product'>Price</p>
                                <input type="number" 
                                min = '1'
                                name = 'price' 
                                value = {input.price} 
                                onChange = {e => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className = 'div_button_add_product'>
                            <button onClick = {e => handleSubmit(e)}>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};