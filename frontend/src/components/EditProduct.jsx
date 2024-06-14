import React, { useState } from 'react';
import Logo from '../assets/Form_Logo.jpg';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import productCategory from '../Helper/ProductCategory';
import uploadImage from '../Helper/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import AllApiUrls from '../services';
import { toast } from 'react-toastify';

const EditProduct = ({ onclose, productData, fetchData }) => {
  const [data, setData] = useState({
    ...productData,
    title: productData?.title,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });
  const [openFullScreenImg, setOpenFullScreenImg] = useState(false);
  const [hoverfullScreenImage, setHoverFullScreenImage] = useState("");

  //upload Product
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (data.productImage.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }
  
    try {
      const response = await fetch(AllApiUrls.updateProduct.url, {
        method: AllApiUrls.updateProduct.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        toast.success(responseData?.message);
        onclose();
        fetchData()
      } else {
        toast.error(responseData?.message);
      }
    } catch (error) {
      toast.error('Failed to upload product');
      console.error('Error:', error);
    }
  };
  

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploloadImageOnCloudinary = await uploadImage(file);
    console.log('uploadImage', uploloadImageOnCloudinary.url);
    setData((prevData) => {
      return {
        ...prevData,
        productImage: [...prevData.productImage, uploloadImageOnCloudinary.url]
      };
    });
  };

  const deleteProductImage = async (index) => {
    console.log(" image index", index);
    const newProductImg = [...data.productImage];
    newProductImg.splice(index, 1);
    setData((prevData) => {
      return {
        ...prevData,
        productImage: [...newProductImg]
      };
    });
  };

  return (
    <div className='fixed w-full h-full bg-black bg-opacity-50 top-0 right-0 left-0 bottom-0 flex justify-center items-center'>
      <div className="bg-white w-full h-full max-h-[90%] max-w-2xl p-4 sm:p-6 flex flex-col items-center shadow-xl rounded-sm overflow-hidden">
        <div className='w-fit text-2xl cursor-pointer ml-auto' onClick={onclose}>
          <CgClose />
        </div>
        <div className="mb-2">
          <img src={Logo} alt='Form Logo' className="w-32 mx-auto" />
        </div>
        <form className="border border-gray-300 w-full p-4 sm:p-6 flex flex-col items-center rounded overflow-y-scroll" onSubmit={handleSubmit}>
          <label className="text-xl mb-4">Edit Product</label>
          <div className="w-full mb-3">
            <label htmlFor='title' className="mb-2 font-semibold">Title :</label>
            <input
              type='text'
              id='title'
              name='title'
              placeholder='Enter product name'
              className="w-full mt-1 p-2 border border-gray-300 rounded bg-slate-50"
              value={data.title}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="w-full mb-3">
            <label htmlFor='brandName' className="mb-2 font-semibold">Brand :</label>
            <input
              type='text'
              id='brandName'
              name='brandName'
              placeholder='Enter product brand name'
              className="w-full mt-1 p-2 mb-1 border border-gray-300 rounded bg-slate-50"
              value={data.brandName}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="w-full mb-3">
            <label htmlFor='category' className="mb-2 font-semibold">Category :</label>
            <select
              id='category'
              name='category'
              className="w-full mt-1 p-2 mb-2 border border-gray-300 rounded bg-slate-50"
              value={data.category}
              onChange={handleOnChange}
              required
            >
              <option value={""} >Select Category </option>
              {
                productCategory.map((e) => (
                  <option value={e.value} key={e.value} required>
                    {e.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full mb-3">
            <label htmlFor='productImage' className="font-semibold">Product Image :</label>
            <label htmlFor='uploadImage'>
              <div className='w-full mt-1 p-2 border border-gray-300 rounded bg-slate-50 h-32 flex items-center justify-center'>
                <div className='text-slate-500 flex items-center justify-center flex-col gap-2'>
                  <span className='text-4xl'><FaCloudUploadAlt /></span>
                  <p className='text-sm'>Upload Product Image</p>
                  <input
                    type="file"
                    id='productImage'
                    name='productImage'
                    className='hidden'
                    onChange={handleUploadProduct}
                  />
                </div>
              </div>
            </label>
            <div className='mt-2 flex justify-center items-center gap-2'>
              {data?.productImage && data.productImage.length > 0 ? (
                data.productImage.map((e, index) => (
                  <div key={index} className='relative group'>
                    <img
                      src={e}
                      alt={`product-${index}`}
                      width="90px"
                      height="90px"
                      className='bg-slate-50 border cursor-pointer'
                      onClick={() => {
                        setOpenFullScreenImg(true);
                        setHoverFullScreenImage(e);
                      }}
                    />
                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-400 rounded-full hidden group-hover:block cursor-pointer' onClick={() => deleteProductImage(index)}>
                      <MdDelete />
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-red-600 text-xs'>Please Upload Image</p>
              )}
            </div>
          </div>
          <div className="w-full mb-3">
            <label htmlFor='price' className="mb-2 font-semibold">Price :</label>
            <input
              type='number'
              id='price'
              name='price'
              placeholder='Enter Price'
              className="w-full mt-1 p-2 mb-1 border border-gray-300 rounded bg-slate-50"
              value={data.price}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="w-full mb-3">
            <label htmlFor='sellingPrice' className="mb-2 font-semibold">Selling Price :</label>
            <input
              type='number'
              id='sellingPrice'
              name='sellingPrice'
              placeholder='Enter Selling Price'
              className="w-full mt-1 p-2 mb-1 border border-gray-300 rounded bg-slate-50"
              value={data.sellingPrice}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="w-full mb-3">
            <label htmlFor='description' className="mb-2 font-semibold">Description :</label>
            <textarea
              placeholder='Enter product description here'
              name="description"
              id="description"
              className='mt-2 h-28 bg-slate-50 border resize-none w-full p-2'
              rows={3}
              onChange={handleOnChange}
              value={data.description}
              required
            ></textarea>
          </div>
          <div className='h-10 w-full flex items-center justify-center'>
            <button className="px-5 py-2 w-full bg-yellow-500 hover:bg-gray-300 border-gray-300 outline-none rounded-lg" type="submit">
              Update Product
            </button>
          </div>
        </form>
      </div>
      {/**display Image */}
      {
        openFullScreenImg && (
          <DisplayImage imgUrl={hoverfullScreenImage} onclose={() => setOpenFullScreenImg(false)} />
        )
      }
    </div>
  );
}

export default EditProduct;