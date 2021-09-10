//import componet
import AddCategory from '../AddCategory/AddCategory'

//import css
import './categories.css'

export default function Categories({input, setInput}){

    const handleSelect = (e) => {        
        setInput({
            ...input,
            categories : [...input.categories, e.target.value]
        })
    }

    return(
        <>
            <select className = 'select_category_add_product' name="categories" id="" onChange = {e => handleSelect(e)}>
                <option>Categories</option>
                <option value='tshirts'>T-shirt</option>
                <option value='pants'>Pants</option>
                <option value='jackets'>Jacket</option>
                {/* <option value='divers'>Diver</option> */}
            </select>
            <select className = 'categories_collection_add' name="collection" id="" onChange = {e => handleSelect(e)}>
                <option> Collection</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
                <option value="winter">Winter</option>
            </select>
            <button className = 'add_category_button_product'>Add category</button>
            <AddCategory />
        </>
    )
};