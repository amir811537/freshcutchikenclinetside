import { useForm } from "react-hook-form";
import imageUpload from "../../../assets/icon/image-bg-remove.svg";
import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../../firebase/firebase.config";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateBanner = ({ bannerId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

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

const onSubmit = async (data) => {
  const bannerData = {};
  if (imageUrl) bannerData.image = imageUrl;
  if (data.link) bannerData.link = data.link;

  try {
    const res = await axios.patch(`http://localhost:5000/banner/${bannerId}`, bannerData);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", "Banner updated successfully", "success");
      reset();
      setImageUrl("");
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Image Upload */}
        <div>
          <input type="file" id="file-upload" className="hidden" onChange={handleImageUpload} />
          <div
            onClick={() => document.getElementById("file-upload").click()}
            className="cursor-pointer w-full h-[200px] flex justify-center items-center bg-base-200"
          >
            <img
              src={imageUrl || imageUpload}
              alt="Upload Preview"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-center mt-2">Upload Banner Image</p>
        </div>

        {/* Banner Link */}
        <div>
          <input
            {...register("link", { required: true })}
            type="text"
            placeholder="Banner Link (e.g. /product/123)"
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Banner
        </button>
      </form>
    </div>
  );
};

export default UpdateBanner;
