import { useState } from 'react'

//import css 
import './Add.css'

export default function Add(){

    const [input, setInput] = useState({
        name: '',
        category : '',
        size : '',
        colors : '',
        price : '',
        stock : '',
        image : ''
    })
    console.log(setInput);
    
    return(
        <>  <div className = 'div_add_product'>
                <div className = 'image_add_product'>
                    <img src="https://images.unsplash.com/photo-1619032561786-ff6c371e0c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=537&q=80" alt="" />
                </div>
                <div className = 'div_form_add_product'>
                    <h1 className = 'title_add_product'>Create Product</h1>
                    <form action="">
                        <div className = 'div_name_add_product'>
                            <p className = 'p_add_product'>Name</p>
                            <input type="text" />
                        </div>
                        <div className = 'div_category_add_product'>
                            <select name="" id="">
                                <option value="category">Category</option>
                                <option value="shirt">T-shirt</option>
                                <option value="pants">Pants</option>
                                <option value="jacket">Jacket</option>
                                <option value="diver">Diver</option>
                            </select>
                            <button>+</button>
                        </div>
                        <div className = 'div_size_add_product'>
                            <p className = 'p_add_product'>Size</p>
                            <button id = 'x'>X</button>
                            <button id = 's'>S</button>
                            <button id = 'm'>M</button>
                            <button id = 'l'>L</button>
                            <button id = 'xs'>XS</button>
                            <button id = 'xl'>XL</button>
                        </div>
                        <div className = 'div_colors_add_product'>
                            <p className = 'p_add_product'>Colors</p>
                            <button className = 'color_one_filter color_filter' id = 'white'></button>
                            <button className = 'color_two_filter color_filter' id = 'black'></button>
                            <button className = 'color_three_filter color_filter' id = 'grey'></button>
                            <button className = 'color_four_filter color_filter' id = 'green'></button>
                            <button className = 'color_five_filter color_filter' id = 'yellow' ></button>
                            <button className = 'color_six_filter color_filter' id = 'pink'></button>
                            <button className = 'color_seven_filter color_filter' id = 'sienna'></button>
                        </div>
                        <div className = 'div_image_add_product'>
                            <p className = 'p_add_product'>Image URL</p>
                            <input type="text" />
                        </div>
                        <div className = 'div_button_add_product'>
                            <button>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};