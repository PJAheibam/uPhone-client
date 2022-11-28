import imgAPI from "../api/uploadImage";

export async function uploadImages(
  images,
  onSuccess = () => {},
  onError = () => {}
) {
  let finished = [];

  await images.map(async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await imgAPI.post("", formData);
      const imageData = {
        title: res.data?.data?.title,
        display_url: res.data?.data?.display_url,
        thumb_url: res.data?.data?.thumb?.url,
        medium_url: res.data?.data?.medium?.url,
        delete_url: res.data?.data?.delete_url,
      };
      finished.push(imageData);
      onSuccess();
    } catch (err) {
      onError();
    } finally {
      //   setProgress(((finished * 100) / total).toFixed(2));
    }
  });
  return finished;
}
