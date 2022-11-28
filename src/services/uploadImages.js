import imgAPI from "../api/uploadImage";
import { uploadImage } from "./uploadImage";

export async function uploadImages(
  images,
  onSuccess = () => {},
  onError = () => {}
) {
  let finished = [];

  for (const image of images) {
    try {
      const res = await uploadImage(image);
      const imageData = {
        title: res?.title,
        display_url: res?.display_url,
        thumb_url: res?.thumb?.url,
        medium_url: res?.medium?.url,
        delete_url: res?.delete_url,
      };
      finished.push(imageData);
      onSuccess();
    } catch (err) {
      onError();
      break;
    } finally {
      //   setProgress(((finished * 100) / total).toFixed(2));
    }
  }

  return finished;
}
