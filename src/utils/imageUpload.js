import axios from "axios";

export const imageUpload = async (images) => {
  let imageArr = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", process.env.CLOUD_PRESET_UPDATE);
    formData.append("cloud_name", process.env.CLOUD_NAME);
    try {
      const res = await axios.post(process.env.CLOUD_API, formData);
      imageArr.push({
        public_id: res?.data?.public_id,
        url: res?.data?.secure_url,
        name: res?.data?.original_filename,
      });
    } catch (error) {
      console.log({ error });
    }
  }
  return imageArr;
};
