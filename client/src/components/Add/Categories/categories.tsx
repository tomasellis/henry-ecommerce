//import css
import './categories.css'

export default function Categories({input, setInput}){

    const handleSelect = (e) => {        
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    return(
        <>
            <div className = 'div_category_add_product'>
                            <select name="gender" id="" onChange = {e => handleSelect(e)}>
                                <option>Gender</option>
                                <option value="woman">Woman</option>
                                <option value="men">Men</option>
                                <option value="kids">Kids</option>
                            </select>
                            <select name="categories" id="" onChange = {e => handleSelect(e)}>
                                <option>Categories</option>
                                <option value='t-shirt'>T-shirt</option>
                                <option value='pants'>Pants</option>
                                <option value='jacket'>Jacket</option>
                                <option value='diver'>Diver</option>
                            </select>
                            {/* <button>+</button> */}
                        </div>
        </>
    )
};