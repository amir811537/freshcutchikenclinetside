import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../../firebase/firebase.config";
import Swal from "sweetalert2";
import RichTextEditor from "./RichTextEditor";
import imageUpload from "../../../assets/icon/image-bg-remove.svg";

const categoryMap = {
  "Chicken & Poultry": "https://i.ibb.co.com/zHtLXC6b/icon-chicken-removebg-preview-1.png",
  "Beef & Mutton": "https://i.ibb.co.com/p6v4f1S2/meat-removebg-preview.png",
  "River & Sea Fish": "https://i.ibb.co.com/NdPR3XKG/frozen-fish-removebg-preview.png",
};

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const selectedCategory = watch("category");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [buttonText, setButtonText] = useState("Update Product");

  // Auto-update category image based on selected category
  useEffect(() => {
    if (selectedCategory && categoryMap[selectedCategory]) {
      setValue("categoryImage", categoryMap[selectedCategory]);
    }
  }, [selectedCategory, setValue]);

  // Fetch product data
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
  });

  // Prefill form with product data
  useEffect(() => {
    if (product) {
      reset(product);
      setDescription(product.description);
      setImageUrl(product.image);
    }
  }, [product, reset]);

  // Firebase image upload handler
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

  // Update product mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedProduct) => {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: () => {
      Swal.fire("Success!", "Product updated successfully.", "success");
      queryClient.invalidateQueries(["products"]);
      navigate("/dashboard/allProduct");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update product.", "error");
    },
  });

  const onSubmit = (data) => {
    setButtonText("Updating...");
    const updatedData = {
      ...data,
      description,
      image: imageUrl,
      categoryImage: categoryMap[data.category],
    };
    updateMutation.mutate(updatedData);
  };

  if (isLoading) return <p className="p-4">Loading product...</p>;

  return (
    <div className="px-4">
      <h1 className="border-l-[16px] border-l-primary pl-5 text-xl font-medium">
        Update Product
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:flex gap-5">
  {/* Left side */}
  <div className="mt-8 flex-1">
    <label className="block mb-1">Product Name</label>
    <input
      type="text"
      placeholder="Product Title"
      {...register("name", { required: true })}
      className="input focus:outline-none rounded-sm w-full mb-5 bg-[#F5F5F5]"
    />

    <label className="block mb-1">Description</label>
    <RichTextEditor value={description} onChange={setDescription} />

    <label className="block mt-8 mb-1">$ Price</label>
    <input
      type="text"
      placeholder="$ Price"
      {...register("price", { required: true })}
      className="input focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
    />

    <label className="block mt-5 mb-1">Old Price</label>
    <input
      type="text"
      placeholder="Old Price"
      {...register("oldPrice")}
      className="input focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
    />

    <label className="block mt-5 mb-1">Quantity</label>
    <input
      type="number"
      placeholder="Quantity"
      {...register("quantity", { required: true })}
      className="input focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
    />

    <label className="block mt-5 mb-1">Category</label>
    <select
      {...register("category", { required: true })}
      className="select block rounded-sm focus:outline-none select-bordered w-full"
    >
      <option disabled value="">
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
    <label className="block mb-1">Product Image</label>
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

    {/* Show selected category image */}
    {selectedCategory && categoryMap[selectedCategory] && (
      <div className="mt-4">
        <label className="block font-semibold mb-1">Category Image</label>
        <img
          src={categoryMap[selectedCategory]}
          alt="Category"
          className="w-20 h-20 object-contain border rounded"
        />
      </div>
    )}
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

export default UpdateProduct;
