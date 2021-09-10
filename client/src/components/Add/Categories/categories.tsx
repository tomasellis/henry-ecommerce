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
            <div className = 'div_category_add_product'>
                            <select name="categories" id="" onChange = {e => handleSelect(e)}>
                                <option>Categories</option>
                                <option value='tshirts'>T-shirt</option>
                                <option value='pants'>Pants</option>
                                <option value='jackets'>Jacket</option>
                                {/* <option value='divers'>Diver</option> */}
                            </select>
                            {/* <button>+</button> */}
                        </div>
        </>
    )
};