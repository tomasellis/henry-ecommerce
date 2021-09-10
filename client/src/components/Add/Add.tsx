import {  useState } from 'react'
import { useDispatch } from 'react-redux'

//import component
import Categories from './Categories/categories'

//import action
import { postProduct } from '../../actions'

//import css 
import './Add.css'

export default function Add(){

    const [input, setInput] = useState({
        name: '',
        categories : [],
        image_url : '',
        gender : '',
        price : '',
        options : [{image_url : '', color : '', size : '', stock : ''}]
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
            options : [{image_url : '', color : '', size : '', stock : ''}]
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
                            <select name="gender" id="" onChange = {e => handleChange(e)}>
                                <option>Gender</option>
                                <option value="woman">Woman</option>
                                <option value="men">Men</option>
                                <option value="kids">Kids</option>
                            </select>
                        </div>
                        <Categories
                        input = {input}
                        setInput = {setInput} 
                        />
                        <div className = 'div_size_add_product'>
                            <p className = 'p_add_product'>Size</p>
                            <button 
                            // className = {/*input.size === 'x' ? 'select' : null*/} 
                            name = 'size' 
                            value = 'X' 
                            onClick = {e => handleOptions(e)}>X</button >
                            <button  
                            // className = {/*input.size === 's' ? 'select' : null*/} 
                            name = 'size' 
                            value = 'S' 
                            onClick = {e => handleOptions(e)}>S</button>
                            <button    
                            // {/*input.size === 'm' ? 'select' : null*/}  
                            name = 'size' 
                            value = 'M' 
                            onClick = {e => handleOptions(e)}>M</button>
                            <button    
                            // {/*input.size === 'l' ? 'select' : null*/}  
                            name = 'size' 
                            value = 'L' 
                            onClick = {e => handleOptions(e)}>L</button>
                            <button   
                            // {/*input.size === 'xs' ? 'select' : null*/} 
                            name = 'size' 
                            value = 'XS' 
                            onClick = {e => handleOptions(e)}>XS</button>
                            <button    
                            // {/*input.size === 'xl' ? 'select' : null*/}
                            name = 'size' 
                            value = 'XL' 
                            onClick = {e => handleOptions(e)}>XL</button>
                        </div>
                        <div className = 'div_colors_add_product'>
                            <p className = 'p_add_product'>Color</p>
                            <button /*{input.color === 'white' ? 'color_select color_one_filter' : 'color_one_filter color_filter'}*/
                             name = 'color' 
                             value = 'white'
                             onClick = {e => handleOptions(e)}
                             />
                            <button /*{input.color === 'black' ? 'color_select color_two_filter' :'color_two_filter color_filter'}*/
                             name = 'color' 
                             value = 'black'
                             onClick = {e => handleOptions(e)}
                             />
                            <button /*{input.color === 'grey' ? 'color_select color_three_filter' : 'color_three_filter color_filter'}*/
                            name = 'color' 
                            value = 'grey'
                            onClick = {e => handleOptions(e)}
                            />
                            <button /*{input.color === 'green' ? 'color_select color_four_filter' :'color_four_filter color_filter'}*/
                            name = 'color' 
                            value = 'green'
                            onClick = {e => handleOptions(e)}
                            />
                            <button  /*{input.color === 'yellow' ? 'color_select color_five_filter' :'color_five_filter color_filter'}*/
                            name = 'color' 
                            value = 'yellow'
                            onClick = {e => handleOptions(e)}
                            />
                            <button /*{input.color === 'pink' ? 'color_select color_six_filter' :'color_six_filter color_filter'}*/ 
                            name = 'color' 
                            value = 'pink'
                            onClick = {e => handleOptions(e)}
                            />
                            <button /*{input.color === 'sienna' ? 'color_select color_seven_filter' :'color_seven_filter color_filter'}*/ 
                            name = 'color' 
                            value = 'sienna'
                            onClick = {e => handleOptions(e)}
                            />
                        </div>
                        <div className = 'div_image_add_product'>
                            <p className = 'p_add_product'>Image URL</p>
                            <input type="text" 
                            name = 'image_url' 
                            onChange = {e => {
                                handleOptions(e);
                                handleChange(e);
                            }}
                            />
                        </div>
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