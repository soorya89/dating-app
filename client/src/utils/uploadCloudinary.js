const upload_preset =import.meta.env.VITE_UPLOAD_PRESET
const cloud_name = import.meta.env.VITE_CLOUD_NAME


const uploadImageToCloudinary = async file =>{
    const uploadData =new FormData()
    uploadData.append('file',file)
    uploadData.append('upload_preset', upload_preset)
    uploadData.append('cloud_name', cloud_name)
    try{

    const res=await fetch(`http://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{
        method:'post',
        body: uploadData,
    }
    )
    if (!res.ok) {
        throw new Error('Failed to upload image');
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
}
export default uploadImageToCloudinary