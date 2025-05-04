// import { useState } from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../../assets/icon/image-bg-remove.svg";
import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../../firebase/firebase.config";
import RichTextEditor from "./RichTextEditor";
import useAddProduct from "../../../hooks/useAddProduct";

const categoryMap = {
  "Chicken & Poultry": "https://i.ibb.co.com/zHtLXC6b/icon-chicken-removebg-preview-1.png",
  "Beef & Mutton": "https://i.ibb.co.com/p6v4f1S2/meat-removebg-preview.png",
  "River & Sea Fish": "https://i.ibb.co.com/NdPR3XKG/frozen-fish-removebg-preview.png",
};

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [buttonText, setButtonText] = useState("Add Product");
  const [description, setDescription] = useState("");

  const { mutate: addProduct } = useAddProduct();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      try {
        setUploading(true);
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const downloadUrl = await getDownloadURL(storageRef);
        setImageUrl(downloadUrl);
        setUploading(false);
      } catch (error) {
        console.error("Image upload error:", error);
        setUploading(false);
      }
    }
  };

  const onSubmit = (data) => {
    const categoryImage = categoryMap[data.category];
    setButtonText("Adding Product...");

    const productData = {
      ...data,
      description,
      image: imageUrl,
      categoryImage,
      sellCount: 0,
      id: Date.now(),
    };

    addProduct(productData);
    reset();
    setDescription("");
    setImageUrl("");
    setButtonText("Add Product");
  };

  return (
    <div className="px-4">
      <h1 className="border-l-[16px] border-l-primary pl-5 text-xl font-medium">
        Add Product
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex gap-5">
          {/* Left side */}
          <div className="mt-8 flex-1">
            <input
              type="text"
              placeholder="Product Title"
              required
              {...register("name", { required: true })}
              className="input focus:border-none focus:outline-none rounded-sm w-full mb-8 bg-[#F5F5F5]"
            />

            <RichTextEditor value={description} onChange={setDescription} />

            <input
              type="text"
              placeholder="$ Price"
              required
              {...register("price", { required: true })}
              className="input mt-28 md:mt-20 focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
            />

            <input
              type="text"
              placeholder="Old Price"
              {...register("oldPrice")}
              className="input mt-5 focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
            />

            <input
              type="number"
              placeholder="Quantity"
              required
              {...register("quantity", { required: true })}
              className="input mt-5 focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
            />

            <select
              required
              {...register("category", { required: true })}
              className="select mt-5 block rounded-sm focus:border-none focus:outline-none select-bordered w-full"
            >
              <option disabled selected value="">
                Select Category
              </option>
              {Object.keys(categoryMap).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Right side */}
          <div className="mt-8">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleImageUpload}
            />
            <div
              onClick={() => document.getElementById("file-upload").click()}
              className="cursor-pointer w-full md:w-[200px] h-[200px] flex justify-center items-center bg-base-200"
            >
              <img
                src={imageUrl || imageUpload}
                alt="Upload Preview"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-center mt-2">Upload Product Image</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn mt-6 btn-error bg-primary text-white rounded-sm"
          disabled={uploading}
        >
          {uploading ? "Uploading Image..." : buttonText}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
