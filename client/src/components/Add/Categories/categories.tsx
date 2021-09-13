import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//import componet
import AddCategory from '../AddCategory/AddCategory'

//import action
import { postCategory } from '../../../actions'

//import css
import './categories.css'

export default function Categories({input, setInput, handleChange}){

    const[category, setCategory] = useState({
        categories : [],
    })

    const dispatch = useDispatch();
    const options = useSelector((state : any) => state.options)
    
    const handleSelect = (e) => {        
        setInput({
            ...input,
            categories : [...input.categories, e.target.value]
        })
    };

    const handleCategoryChange = (e) => {
        setCategory({
            categories :[{name : e.target.value}]
        })
    };

    const handleButton = (e) => {
        e.preventDefault();
        const repeat = options.categories?.find(e => e.name.toUpperCase() === category.categories[0]?.name.toUpperCase());
        if(!repeat){
            dispatch(postCategory(category));
            alert('Category created successfully.')
        }
        else {
            alert('That category already exists.')
        }
        setCategory({
            categories : [],
        })
    };
    console.log(options);
    

    return(
        <>
        <div className = 'div_categories_add'>
             <select 
             className = 'select_category_add_product' 
             name="gender"
             onChange = {e => handleChange(e)}
             >
                <option>Gender</option>
                <option value="women">Woman</option>
                <option value="men">Men</option>
                <option value="kids">Kids</option>
            </select>
            <select 
            className = 'select_category_add_product' 
            name="categories"
            onChange = {e => handleSelect(e)}
            >
                <option>Collection</option>
                <option value='spring'>Spring</option>
                <option value='summer'>Summer</option>
                <option value='autumn'>Autumn</option>
                <option value="winter">Winter</option>
                {/* <option value='divers'>Diver</option> */}
            </select>
            <select 
            className = 'categories_collection_add' 
            name="collection"
            onChange = {e => handleSelect(e)}
            >
                <option> Categories</option>
                <option value="tshirts">T-shirt</option>
                <option value="pants">Pants</option>
                <option value="jackets">Jacket</option>
            </select>
            <input 
            type="text" 
            name="categories"
            placeholder = 'add category'
            onChange = {e => handleCategoryChange(e)}
            />
            <button
            onClick = {e => handleButton(e)}
            >Add</button>
        </div>
        </>
    )
};