import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//import action
import { postCategory } from "../../../actions";

//import css
import "./categories.css";

export default function Categories({ input, setInput, handleChange }) {
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
      dispatch(postCategory(category));
      alert("Category created successfully.");
    } else {
      e.preventDefault();
      alert("That category already exists.");
    }
    setCategory({
      categories: [],
    });
  };
  console.log(options);

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
          {input.categories?.map((el) => {
            function NameInUpperCase(str) {
              return str.charAt(0).toUpperCase() + str.slice(1);
            }
            const name = NameInUpperCase(el);
            return (
              <div
                className="div_li_category_select_add_product"
                onClick={() => handleDeletle(el)}
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
