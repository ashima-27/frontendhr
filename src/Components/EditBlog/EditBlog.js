import React, { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import TinyEditor from '../TextEditor/Editor';
import useCloudinaryUpload from "../../customHook/useCloudinaryHook";

const EditBlog = ({ blogDetail, onCancel, onSubmit }) => {
  const [img, setImage] = useState(null);

  const { uploadImage, imgError, imageUploading, imageUrl } = useCloudinaryUpload();

  const [formData, setFormData] = useState({
    blogId: "",
    blog_Title: "",
    blog_Type: "",
    blog_Description: "",
    image: "",
    blog_Body: "",
    wordCount: "",
    readingTime: "",
    imagePreview: "",
    selectedTag: [],
    Draft: false,
  });

  useEffect(() => {
    if (blogDetail) {
      setFormData((prevData) => ({
        ...prevData,
        ...blogDetail,
        blog_Description: blogDetail?.blog_description,
        selectedTag: blogDetail?.tags,
        blogId: blogDetail?._id
      }));
    }
  }, [blogDetail]);

  const handleImageUpload = () => {
    uploadImage(img).then(() => {
      console.log("Image uploaded successfully");
    });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (imageUrl) {
      setFormData((prevEditableEmployee) => ({
        ...prevEditableEmployee,
        image: imageUrl,
      }));
    }
  }, [imageUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleTemplateBodyChange = (content, words) => {
    console.log("words",words)
    const calculatedReadingTime = Math.ceil(words / 200);
    console.log("calculatedReadingTime",calculatedReadingTime)
    const readingTime = calculatedReadingTime < 1 ? 1 : calculatedReadingTime;
    setFormData((prevData) => ({
      ...prevData,
      blog_Body: content,
      wordCount: words,
      readingTime: readingTime,
    }));
  };

  const onChangeFormTagData = (newTags) => {
    setFormData({
      ...formData,
      selectedTag: newTags,
    });
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50 p-4 sm:p-8">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-11/12 mx-auto ">
          <h2 className="text-xl font-bold bg-gray-200 px-3 py-2 rounded-t-lg">Edit Blog</h2>
          <form className="px-4 py-2 space-y-4 overflow-x-scroll h-96 hide-scrollbar ">
            <div className="space-y-4 sm:flex sm:space-x-2 sm:space-y-0">
              <div className="flex-1 flex flex-col">
                <label htmlFor="blog_Title" className="text-sm font-semibold">Blog Title</label>
                <input
                  type="text"
                  id="blog_Title"
                  name="blog_Title"
                  value={formData.blog_Title}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              <div className="flex-1 flex flex-col">
                <label htmlFor="blog_Type" className="text-sm font-semibold">Blog Type</label>
                <input
                  type="text"
                  id="blog_Type"
                  name="blog_Type"
                  value={formData.blog_Type}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-4 sm:flex sm:space-x-2 sm:space-y-0 items-center">
              <div className="flex-1 flex flex-col">
                <label htmlFor="image" className="text-sm font-semibold">Image URL</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="py-2 w-full px-3 bg-white text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  />
                  <img
                    className="w-10 h-10 border border-indigo-600 rounded-md"
                    style={{ objectFit: "cover" }}
                    src={formData?.image}
                    alt={formData?.name}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleImageUpload}
                  disabled={!img || imageUploading}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md"
                >
                  {imageUploading ? "Uploading..." : "Upload Image"}
                </button>
                {imgError && (
                  <div className="mt-2 text-red-600">{imgError}</div>
                )}
              </div>

              <div className="flex-1 flex flex-col">
                <label className="text-sm font-semibold">Selected Tags</label>
                <div className="mt-1">
                  <TagsInput
                    name="tags"
                    placeHolder="Enter Tags"
                    onChange={onChangeFormTagData}
                    value={formData.selectedTag}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="blog_Description" className="text-sm font-semibold">Blog Description</label>
              <textarea
                id="blog_Description"
                name="blog_Description"
                value={formData.blog_Description}
                onChange={handleInputChange}
                rows="2"
                className="border border-gray-300 px-3 py-2 mt-1 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-200"
                required
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label htmlFor="blog_Body" className="text-sm font-semibold">Blog Body</label>
              <TinyEditor
                onChange={handleTemplateBodyChange}
                initialValue={formData.blog_Body}
                style={{ backgroundColor: '#eff2f9' }}
              />
            </div>

            
          </form>
          <div className="flex items-center justify-end space-x-2">
              <button
                onClick={onCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Edit Blog
              </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
