import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

//import action
import { getOptions } from "../../../actions"
import { validate } from "../Add"


export default function OptionsAdd({input, setInput, handleOptions, err, setErr}){

    const dispatch = useDispatch();
    const options = useSelector((state : any) => state.options);
    useEffect(() => {
        dispatch(getOptions());
    }, [dispatch]);
    
    return(
        <>
            <p className = 'p_add_product'>Size</p>
                {
                    options.size?.map(e => {                         
                        return(
                            <div className = 'div_size_add_product'>
                                <button
                                key = {e.name}
                                className = {input.options[0].size === e.name ? 'select' : null}
                                name = 'size' 
                                value = {e.name}
                                onClick = {e => handleOptions(e)}
                                >{e.name}</button>
                            </div>
                        )
                    })
                }
                {
                    !err.size ? null : <p className = 'err_add_product'>{err.size}</p>
                }
            <p className = 'p_add_product'>Color</p>
            {
                options.colors?.map(e => {
                    const colorsButton = {
                        backgroundColor: e.name,
                    }
                    return(
                        <div className = 'div_colors_add_product'>
                            <button 
                            key = {e.name}
                            style = {colorsButton}
                            className = {input.options[0].color === e.name ? 'color_select color_one_filter' : 'color_one_filter color_filter'}
                            name = 'color' 
                            value = {e.name}
                            onClick = {e => handleOptions(e)}
                            />
                        </div>
                    )
                })
            }
            {
                !err.color ? null : <p className = 'err_add_product'>{err.color}</p>
            }

            {/* <div className = 'div_size_add_product'>
                <p className = 'p_add_product'>Size</p>
                <button 
                className = {input.options[0].size === 'X' ? 'select' : null} 
                name = 'size' 
                value = 'X' 
                onClick = {e => handleOptions(e)}>X</button>  
                <button  
                className = {input.options[0].size === 'S' ? 'select' : null} 
                name = 'size' 
                value = 'S' 
                onClick = {e => handleOptions(e)}>S</button>
                <button    
                className = {input.options[0].size === 'M' ? 'select' : null} 
                name = 'size' 
                value = 'M' 
                onClick = {e => handleOptions(e)}>M</button>
                <button    
                className = {input.options[0].size === 'L' ? 'select' : null} 
                name = 'size' 
                value = 'L' 
                onClick = {e => handleOptions(e)}>L</button>
                <button   
                className = {input.options[0].size === 'XS' ? 'select' : null}  
                name = 'size' 
                value = 'XS' 
                onClick = {e => handleOptions(e)}>XS</button>
                <button    
                className = {input.options[0].size === 'XL' ? 'select' : null} 
                name = 'size' 
                value = 'XL' 
                onClick = {e => handleOptions(e)}>XL</button>
            </div> */}
            {/* <div className = 'div_colors_add_product'>
                <p className = 'p_add_product'>Color</p>
                <button 
                className = {input.options[0].color === 'white' ? 'color_select color_one_filter' : 'color_one_filter color_filter'}
                name = 'color' 
                value = 'white'
                onClick = {e => handleOptions(e)}
                />
                <button
                className = {input.options[0].color === 'black' ? 'color_select color_two_filter' : 'color_two_filter color_filter'}
                name = 'color' 
                value = 'black'
                onClick = {e => handleOptions(e)}
                />
                <button
                className = {input.options[0].color === 'grey' ? 'color_select color_three_filter' : 'color_three_filter color_filter'}
                name = 'color' 
                value = 'grey'
                onClick = {e => handleOptions(e)}
                />
                <button
                className = {input.options[0].color === 'green' ? 'color_select color_four_filter' : 'color_four_filter color_filter'}
                name = 'color' 
                value = 'green'
                onClick = {e => handleOptions(e)}
                />
                <button
                className = {input.options[0].color === 'yellow' ? 'color_select color_five_filter' : 'color_five_filter color_filter'}
                name = 'color' 
                value = 'yellow'
                onClick = {e => handleOptions(e)}
                />
                <button
                className = {input.options[0].color === 'pink' ? 'color_select color_six_filter' : 'color_six_filter color_filter'}
                name = 'color' 
                value = 'pink'
                onClick = {e => handleOptions(e)}
                />
                <button
                className = {input.options[0].color === 'sienna' ? 'color_select color_seven_filter' : 'color_seven_filter color_filter'}
                name = 'color' 
                value = 'sienna'
                onClick = {e => handleOptions(e)}
                />
            </div> */}

        </>
    )
}