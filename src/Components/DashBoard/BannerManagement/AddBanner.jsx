import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../../firebase/firebase.config";
import imageUploadIcon from "../../../assets/icon/image-bg-remove.svg";

const AddBanner = () => {
  const { register, handleSubmit, reset } = useForm();
  const [banners, setBanners] = useState([
    { image: "", uploading: false, link: "" },
    { image: "", uploading: false, link: "" },
    { image: "", uploading: false, link: "" },
  ]);

  const handleImageUpload = async (e, index) => {
    const image = e.target.files[0];
    if (!image) return;

    const updatedBanners = [...banners];
    updatedBanners[index].uploading = true;
    setBanners(updatedBanners);

    try {
      const storage = getStorage(app);
      const storageRef = ref(storage, `banners/${Date.now()}-${image.name}`);
      await uploadBytes(storageRef, image);
      const downloadUrl = await getDownloadURL(storageRef);
      updatedBanners[index].image = downloadUrl;
    } catch (error) {
      console.error("Image upload error:", error);
    } finally {
      updatedBanners[index].uploading = false;
      setBanners(updatedBanners);
    }
  };

  const onSubmit = async (data) => {
    const submittedBanners = banners.map((banner, index) => ({
      image: banner.image,
      link: data[`link${index}`],
    }));

    const missingImage = submittedBanners.some((b) => !b.image);
    if (missingImage) {
      return Swal.fire("Error", "Please upload all banner images", "error");
    }

    try {
      const res = await axios.post("http://localhost:5000/banner", submittedBanners);
      if (res.data.insertedId || res.data.insertedCount > 0) {
        Swal.fire("Success", "Banners added successfully", "success");
        reset();
        setBanners([
          { image: "", uploading: false, link: "" },
          { image: "", uploading: false, link: "" },
          { image: "", uploading: false, link: "" },
        ]);
      }
    } catch (error) {
      console.error("Add banners error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Multiple Banners</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {banners.map((banner, index) => (
          <div key={index} className="border p-4 rounded-md shadow-sm">
            {/* Image Upload */}
            <input
              type="file"
              id={`banner-image-${index}`}
              className="hidden"
              onChange={(e) => handleImageUpload(e, index)}
            />
            <div
              onClick={() => document.getElementById(`banner-image-${index}`).click()}
              className="cursor-pointer w-full h-[160px] flex justify-center items-center bg-gray-100 rounded-md overflow-hidden"
            >
              <img
                src={banner.image || imageUploadIcon}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
            {banner.uploading && <p className="text-blue-500 text-sm mt-2">Uploading...</p>}

            {/* Link Input */}
            <div className="mt-4">
              <label className="block mb-1 font-medium">Banner Link</label>
              <input
                {...register(`link${index}`, { required: true })}
                type="text"
                placeholder={`/link-${index + 1}`}
                className="input input-bordered w-full"
              />
            </div>
          </div>
        ))}

        <div className="md:col-span-3 mt-6">
          <button type="submit" className="btn btn-primary w-full">
            Add All Banners
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBanner;
