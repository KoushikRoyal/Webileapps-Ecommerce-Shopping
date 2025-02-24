import { useState, useEffect } from "react";
import { assets } from "../adminassets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../admincomponents/Sidebar";

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (image1) {
      const objectUrl = URL.createObjectURL(image1);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Cleanup URL
    }
  }, [image1]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png"].includes(file.type) && file.size <= 2 * 1024 * 1024) {
      setImage1(file);
    } else {
      toast.error("Invalid file type or size exceeds 2MB");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes));
      if (image1) formData.append("image1", image1);

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/product/add`, formData);
      
      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding product");
    }
    setLoading(false);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("Men");
    setSubCategory("Topwear");
    setBestseller(false);
    setSizes([]);
    setImage1(null);
    setImagePreview(null);
    document.getElementById("image1").value = "";
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-80 min-h-screen bg-gray-200">
                    <Sidebar />
                </div>

      {/* Main Content (Form) */}
      <div className="w-4/5 flex flex-col items-center p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={onSubmitHandler} className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
          {/* Image Upload */}
          <div className="mb-4">
            <p className="mb-2">Upload Image</p>
            <label htmlFor="image1" className="cursor-pointer">
              <img className="w-20" src={imagePreview || assets.upload_area} alt="Upload Preview" />
              <input onChange={handleImageChange} type="file" id="image1" hidden />
            </label>
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <p className="mb-2">Product Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              placeholder="Type Here"
              required
            />
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <p className="mb-2">Product Description</p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Write Content Here"
              required
            />
          </div>

          {/* Category, Subcategory, Price */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="mb-2">Category</p>
              <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full px-3 py-2 border rounded-md">
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <p className="mb-2">Sub Category</p>
              <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className="w-full px-3 py-2 border rounded-md">
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div>
              <p className="mb-2">Price ($)</p>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="w-full px-3 py-2 border rounded-md"
                type="number"
                placeholder="25"
                required
              />
            </div>
          </div>

          {/* Sizes Selection */}
          <div className="mb-4">
            <p className="mb-2">Product Sizes</p>
            <div className="flex gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
                    )
                  }
                  className={`px-3 py-1 cursor-pointer border rounded-md ${
                    sizes.includes(size) ? "bg-blue-200" : "bg-gray-100"
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller Checkbox */}
          <div className="flex items-center gap-2 mb-4">
            <input
              onChange={() => setBestseller((prev) => !prev)}
              checked={bestseller}
              type="checkbox"
              id="bestseller"
            />
            <label className="cursor-pointer" htmlFor="bestseller">
              Add to Bestseller
            </label>
          </div>

          {/* Submit Button */}
          <button className="w-full py-3 bg-black text-white rounded-md" type="submit" disabled={loading}>
            {loading ? "Adding..." : "ADD PRODUCT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
