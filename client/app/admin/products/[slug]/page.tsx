"use client";

import AdminHeader from "@/components/AdminHeader";
import Loading from "@/components/Loading";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { RootState } from "@/redux/store";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from
 "react-redux";

const ProductPage = () => {
  const {} = useFetchProducts();
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();

  const products = useSelector((state: RootState) => state.products.products);
  console.log(products)
  const product = products.find(prd => prd._id === slug)

  useEffect(() => {
    if (!product) {
      router.push("/admin/products")
    }
  }, [])

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>(product!.image)
  const [loading, setLoading] = useState<boolean>(false)
  const [form, setForm] = useState({
    name: product!.name,
    description: product!.description,
    price: product!.price,
    category: product!.category
  });

  const updateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!form.name || !form.price || !form.category || !form.description) {
      toast.error("All Field are required")
      return
    }

    const formData = new FormData();
    formData.append("name", form.name)
    formData.append("description", form.description!)
    formData.append("price", String(form.price))
    formData.append("category", form.category)

    if (file) {
      formData.append("file", file)
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/products/${product?._id}/update`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        },
        body: formData,
        credentials: "include"
      });

      const response = await res.json()

      if (!res.ok) {
        toast.error(response.message)
        return
      }
      
      toast.success(response.message)
      setTimeout(() => {
        router.push("/admin/products")
      }, 2500)
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = e.target.files![0];
    setFile(fileUploaded)

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(fileUploaded)
  }

  return (
    <main className="pt-22 px-4 bg-gray-50">
      <AdminHeader />
      {loading && <Loading />}
      <Toaster />

      <h1 className="text-xl font-jsans text-center">Update Product</h1>

      <form
        className='bg-white p-6 rounded-md border-1 border-gray-200 mt-6 sm:w-[500px] mx-auto'
      >
        <div>
          <p className='font-jsans-light text-sm mb-4'>Product Image</p>
          <label 
            htmlFor="file"
            className='block h-60 w-full border-1 border-gray-200 border-dashed flex-center cursor-pointer'
          >
            {preview ? 
              <img
                src={preview} 
                alt='product image' 
                className='h-full w-full object-center object-cover'             
              />
            :
              <p className='text-[12px] font-jsans-light h-full flex-center'>
                <Plus />
              </p>
            }
          </label>
          <input 
            type="file" 
            id="file" 
            className='hidden' 
            onChange={handleFileChange} 
            accept='image/*' 
            required
          />
        </div>

        <div className='mt-6'>
          <label
            className="font-jsans-light text-sm" 
            htmlFor="name"
          >
            Product Name
          </label>
          <input 
            type="text" 
            id="name" 
            name='name'
            className="block p-3 border-1 border-gray-100 rounded-md w-full mt-2 font-jsans text-sm focus:outline-none"
            placeholder="Nike Sneakers"
            value={form.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mt-4">
          <label
            className="font-jsans-light text-sm" 
            htmlFor="desc"
          >
            Product Description
          </label>
          <textarea 
            rows={4}
            id="desc" 
            name='description'
            className="block p-3 border-1 border-gray-100 rounded-md w-full mt-2 font-jsans text-sm resize-none focus:outline-none"
            placeholder="A description about the product"
            value={form.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="mt-4">
          <label
            className="font-jsans-light text-sm" 
            htmlFor="price"
          >
            Price
          </label>
          <div className='relative'>
            <div className='absolute font-jsans-light top-[10px] left-3'>
              &#x20A6;
            </div>
            <input 
              type="number" 
              id="price" 
              name='price'
              className="block p-3 border-1 border-gray-100 rounded-md w-full mt-2 font-jsans-light text-sm pl-7 focus:outline-none"
              placeholder="45000"
              value={form.price}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className='mt-4'>
          <label
            className="font-jsans-light text-sm" 
            htmlFor="category"
          >
            Category
          </label>
          <select 
            id="category"
            name='category'
            className="block p-3 border-1 border-gray-100 rounded-md w-full mt-2 font-jsans text-sm focus:outline-none cursor-pointer"
            value={form.category}
            onChange={handleInputChange}
            required
          >
            <option value="footwears">Footwears</option>
            <option value="phones">Phones</option>
            <option value="laptops">Laptops</option>
            <option value="watches">Watches</option>
            <option value="gadgets">Car Gadgets</option>
          </select>
        </div>

        <button onClick={updateProduct} 
          className='btn-primary py-2 w-full mt-8 font-jsans text-sm rounded-md'>
          Edit
        </button>
      </form>
    </main>
  )
}

export default ProductPage