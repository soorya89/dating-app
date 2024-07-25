import React, { useState } from 'react';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL,token } from '../../config';

const UpdatePhoto = ({ user, onUpdate }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([null, null, null]);
  const [previews, setPreviews] = useState({
    profilePic: user.profilePic,
    additionalImages: user.additionalImages || [null, null, null],
  });

  const handleFileChange = async (event, index = null) => {
    const file = event.target.files[0];

    if (file) {
      const uploadedImage = await uploadImageToCloudinary(file);
      const imageUrl = uploadedImage.secure_url;

      if (index === null) {
        setProfilePic(imageUrl);
        updatePreview(imageUrl, 'profilePic');
      } else {
        const newAdditionalImages = [...additionalImages];
        newAdditionalImages[index] = imageUrl;
        setAdditionalImages(newAdditionalImages);
        updatePreview(imageUrl, 'additionalImages', index);
      }
    }
  };

  const updatePreview = (imageUrl, type, index = null) => {
    if (imageUrl) {
      if (type === 'profilePic') {
        setPreviews((prev) => ({ ...prev, profilePic: imageUrl }));
      } else {
        const newPreviews = [...previews.additionalImages];
        newPreviews[index] = imageUrl;
        setPreviews((prev) => ({ ...prev, additionalImages: newPreviews }));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateData = {
      profilePic,
      additionalImages,
    };

    try {
      // Replace with the actual API endpoint and method for updating the profile pictures
      const response = await fetch(`${BASE_URL}/user/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        onUpdate();
      } else {
        console.error('Failed to update profile pictures');
      }
    } catch (error) {
      console.error('Error updating profile pictures:', error);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-xl mb-4">Update Photos</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, null)}
              className="hidden"
              id="profilePic"
            />
            <label htmlFor="profilePic" className="cursor-pointer">
              {previews.profilePic ? (
                <img
                  src={previews.profilePic}
                  alt="Profile"
                  className="sm:h-[220px] sm:w-[100%] xl:h-[350px] object-cover rounded-lg object-center"
                />
              ) : (
                <div className="sm:h-[220px] sm:w-[100%] xl:h-[350px] flex items-center justify-center border-2 border-dashed rounded-lg text-gray-400">
                  <span>+ Add Photo</span>
                </div>
              )}
            </label>
            {previews.profilePic && (
              <button
                type="button"
                onClick={() => document.getElementById('profilePic').click()}
                className="absolute bottom-2 right-2 bg-white text-black text-xs px-2 py-1 rounded shadow"
              >
                Replace
              </button>
            )}
          </div>
          {['Additional Image 1', 'Additional Image 2', 'Additional Image 3'].map((label, index) => (
            <div className="relative" key={index}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, index)}
                className="hidden"
                id={`additionalImage${index}`}
              />
              <label htmlFor={`additionalImage${index}`} className="cursor-pointer">
                {previews.additionalImages[index] ? (
                  <img
                    src={previews.additionalImages[index]}
                    alt={`Additional ${index + 1}`}
                    className="sm:h-[220px] sm:w-[100%] xl:h-[350px] object-cover rounded-lg object-center"
                  />
                ) : (
                  <div className="sm:h-[220px] lg:w-[100%] xl:h-[350px] flex items-center justify-center border-2 border-dashed rounded-lg text-gray-400">
                    <span>+ Add Photo</span>
                  </div>
                )}
              </label>
              {previews.additionalImages[index] && (
                <button
                  type="button"
                  onClick={() => document.getElementById(`additionalImage${index}`).click()}
                  className="absolute bottom-2 right-2 bg-white text-black text-xs px-2 py-1 rounded shadow"
                >
                  Replace
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdatePhoto;
