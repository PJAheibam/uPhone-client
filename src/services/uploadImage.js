import imgAPI from "../api/uploadImage";

export const uploadImage = async (imageFile) => {
  if (!imageFile) throw { message: "No image file received!" };

  const formData = new FormData();
  formData.append("image", imageFile);
  const res = await imgAPI.post("", formData);

  return res.data?.data;
};
