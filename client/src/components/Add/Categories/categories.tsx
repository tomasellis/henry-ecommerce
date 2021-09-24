import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert'

//import action
import { postCategory } from "../../../actions";

//import css
import "./categories.css";

export default function Categories({ input, setInput, handleChange }) {
  const alertReact = useAlert()
  const [category, setCategory] = useState({
    categories: [],
  });

  const dispatch = useDispatch();
  const options = useSelector((state: any) => state.options);

  const handleSelect = (e) => {
    setInput({
      ...input,
      categories: [...input.categories, e.target.value],
    });
  };

  let selectNewCategory = category.categories[0]?.name;

  const handleCategoryChange = (e) => {
    setCategory({
      categories: [{ name: e.target.value }],
    });
  };

  const handleDeletle = (el) => {
    setInput({
      ...input,
      categories: input.categories.filter((e) => e !== el),
    });
  };

  const handleButton = (e) => {    
    const repeat = options.categories?.find(
      (e) => e.name.toUpperCase() === category.categories[0]?.name.toUpperCase()
    );
    if (!repeat) {
      e.preventDefault();
      dispatch(postCategory(category));
      alertReact.success("Category created successfully.");
      setInput({
        ...input,
        categories : [...input.categories , selectNewCategory]
      })      
    } else {
      e.preventDefault();
      alertReact.error("That category already exists.");
    }
    setCategory({
      categories: [],
    });
  };
  
  return (
    <>
      <div className="div_categories_add">
        <select
          className="select_category_add_product"
          name="gender"
          onChange={(e) => handleChange(e)}
        >
          <option>Gender</option>
          <option value="women">Woman</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
        <select
          className="categories_collection_add"
          name="collection"
          onChange={(e) => handleSelect(e)}
        >
          <option> Categories</option>
          {options.categories?.map((e) => {
            function NameInUpperCase(str) {
              return str.charAt(0).toUpperCase() + str.slice(1);
            }
            const name = NameInUpperCase(e.name);
            return <option value={e.name}>{name}</option>;
          })}
        </select>
        <ul>
          {!input.categories ? null : input.categories?.map((el,index) => {
            function NameInUpperCase(str) {
              return str.charAt(0).toUpperCase() + str.slice(1);
            }
            const name = NameInUpperCase(el);
            console.log('soyname', name);
            
            return (
              <div
                className="div_li_category_select_add_product"
                onClick={() => handleDeletle(el)}
                key={index}
              >
                <li>{name}</li>
                <p>x</p>
              </div>
            );
          })}
        </ul>
        <input
          type="text"
          name="categories"
          placeholder="add category"
          onChange={(e) => handleCategoryChange(e)}
        />
        <button onClick={(e) => handleButton(e)}>Add</button>
      </div>
    </>
  );
}
