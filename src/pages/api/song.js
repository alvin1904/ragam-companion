import { uploadSongDetails, uploadSongImage } from ".";

export const uploadSongDetailsApi = async (formdata) => {
  try {
    const response = await uploadSongDetails(formdata);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const uploadSongImageApi = async (formdata, songId) => {
  try {
    const response = await uploadSongImage(formdata, songId);
    return response.data;
  } catch (error) {
    return error;
  }
};
