import React, { useState } from "react";
import { useCreateProductMutation } from "../../redux/ApiSlices/productApiSlice";
const CreateProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    // description: "",
  });

  const [image, setImage] = useState(null);

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // File object
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    // formData.append("description", form.description);
    formData.append("image", image); // KEY PART
    
    await createProduct(formData);

    // clear form 
    setForm({
      name: "",
      price: "",
      category: "",
      // description: "",
    });
    setImage(null);
  }
  return (
  <form onSubmit={handleSubmit}>

    <input
      placeholder="name"
      name="name"
      value={form.name}
      onChange={handleChange}
    />

    <input
      type="number"
      name="price"
      value={form.price}
      placeholder="enter price"
      onChange={handleChange}
    />

    <input
      name="category"
      value={form.category}
      placeholder="enter category"
      onChange={handleChange}
    />

    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
    />

    <button disabled={isLoading}>Create</button>

  </form>
);

};

export default CreateProductForm;