import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TagsInput } from "react-tag-input-component";
import TinyEditor from '../TextEditor/Editor';
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
    createBlog,createBlogAsDraft
} from "../../Redux/blog"
import useCloudinaryUpload from "../../customHook/useCloudinaryHook";
import { toast,ToastContainer } from "react-toastify";
const CreateBlog = () => {
  const location = useLocation();
  const navigate=useNavigate();
    const [img, setImage] = useState(null);
    const[makeDraft,setMakeDraft]=useState(false);
    const dispatch = useDispatch();
    const {
        uploadImage,
        imgError,
        imageUploading,
        imageUrl,
      } = useCloudinaryUpload();
  const [formData, setFormData] = useState({
    blogId: "",
    blog_Title: "",
    blog_Type: "",
    blog_Description: "",
    image: "",
    blog_Body: "",
    wordCount: 0,
    readingTime: 0,
    imagePreview: "",
    selectedTag: ["Business", "Technology"],
    Draft:false
  });
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleImageUpload = () => {
    uploadImage(img).then(() => {
      console.log("Image uploaded successfully");
    });
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

 
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    console.log(formData); 
   
    try {
     
      await dispatch(createBlog(formData)).unwrap(); 
      navigate('/blogDashboard');
    } catch (error) {
      toast.error("Error creating blog:", error);
    }
  };
  const handleTemplateBodyChange = (content,words) => {
     console.log("word",words)
    const calculatedReadingTime = Math.ceil(words / 200);
    console.log("calculatedReadingTime",calculatedReadingTime)
    const readingTime = calculatedReadingTime < 1 ? 1 : calculatedReadingTime;
    console.log(readingTime,"readingTime")
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

  const saveAsDraft= async()=>{
        // setSavingDraft(true); 
        console.log("formData.blog_Title:", formData);
        let newObj = {
          blog_Title: formData.blog_Title || 'No Title',
          blog_Type: formData.blog_Type,
          blog_Description: formData.blog_Description || 'No Description',
          image:formData.image,
          blog_Body: formData.blog_Body,
          wordCount: formData.wordCount,
          readingTime: formData.readingTime,
          selectedTag: formData.selectedTag,
          Draft:true
        };
        console.log(newObj);
        console.log("Draft added!", newObj);
      
        try {
     
          await  dispatch(createBlogAsDraft(newObj)).unwrap(); 
          navigate('/draftDashboard');
        } catch (error) {
          toast.error("Error creating draft:", error);
        }
        
        
  }

  useEffect(() => {
    if (location.state && location.state.draftData) {
      console.log("draftdt",location.state.draftData)
  
      setFormData({
        blog_Title: location.state.draftData?.blog_Title,
        blog_Type: location.state.draftData?.blog_Type,
        blog_Description: location.state.draftData?.blog_description,
        image: location.state.draftData?.image,
        blog_Body: location.state.draftData?.blog_Body,
        wordCount: location.state.draftData?.blog_wordCount,
        readingTime: location.state.draftData?.blog_readingTime,
        selectedTag: location.state.draftData?.tags,
        blogId:location.state.draftData?._id
      })
    
    }
  }, [location.state]);
 return (
    <div className="p-6 flex justify-center items-start space-y-8">
    <ToastContainer/>
    <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-7xl space-y-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
  <form className="mb-4 space-y-4">
    
       <div className="lg:flex lg:flex-row md:flex-col sm:flex-col mb-4">
            <label htmlFor="blog_Title" className="block text-sm font-semibold text-left lg:w-1/3 md:w-full sm:w-full">Blog Title</label>
        <input
          type="text"
          id="blog_Title"
          name="blog_Title"
          value={formData.blog_Title}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm lg:w-2/3 md:w-full sm:w-full"
             placeholder="Enter Blog Title"
        />
      </div>

      <div className="lg:flex lg:flex-row md:flex-col sm:flex-col mb-4">
            
        <label htmlFor="blog_Type" className="block text-sm font-semibold text-left lg:w-1/3 md:w-full sm:w-full">Blog Type</label>
        <input
          type="text"
          id="blog_Type"
          name="blog_Type"
          value={formData.blog_Type}
          onChange={handleInputChange}
          placeholder="Enter Blog Type"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm lg:w-2/3 md:w-full sm:w-full"
            
        />
      </div>
    

      <div className="lg:flex lg:flex-row md:flex-col sm:flex-col mb-4">
            
        <label htmlFor="image" className="block text-sm font-semibold text-left lg:w-1/3 md:w-full sm:w-full">Image URL</label>
       <> 
  <div className="w-1/2">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
  <div className="w-1/4 flex items-center justify-center">
    {formData.image && (
      <img
        className="w-20 h-10 border border-indigo-600"
        style={{ borderRadius: "10px" }}
        src={formData?.image}
        alt={formData?.name}
      />
    )}
  </div>
  <div className="w-1/4">
    <button
      onClick={handleImageUpload}
      disabled={!img || imageUploading}
      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md w-full"
    >
      {imageUploading ? "Uploading..." : "Upload"}
    </button>
    {imgError && (
      <div className="mt-2 text-red-600">{imgError}</div>
    )}
  </div>
  </>
</div>



      <div className="lg:flex lg:flex-row md:flex-col sm:flex-col mb-4">
            
        <label className="block text-sm font-semibold text-left lg:w-1/3 md:w-full sm:w-full">Selected Tags</label>
        <div className="lg:w-2/3 md:w-full sm:w-full">
          <TagsInput
            name="tags"
            placeHolder="Enter Tags"
            onChange={onChangeFormTagData}
            value={formData.selectedTag}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm lg:w-2/3 md:w-full sm:w-full"
            
          />
        </div>
      </div>
  

      <div className="lg:flex lg:flex-row md:flex-col sm:flex-col mb-4">
            
      <label htmlFor="blog_Description" className="block text-sm font-semibold text-left lg:w-1/3 md:w-full sm:w-full">Blog Description</label>
      <textarea
        id="blog_Description"
        name="blog_Description"
        value={formData.blog_Description}
        onChange={handleInputChange}
        rows="3"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm lg:w-2/3 md:w-full sm:w-full"
        placeholder="Enter Blog Description"
      ></textarea>
    </div>

    <div className="lg:flex lg:flex-row md:flex-col sm:flex-col mb-4">
            
      <label htmlFor="blog_Body" className="block text-sm font-semibold text-left lg:w-1/3 md:w-full sm:w-full">Blog Body</label>
      <div className="lg:w-2/3 md:w-full sm:w-full">
      <TinyEditor
        onChange={handleTemplateBodyChange}
        initialValue={formData.blog_Body || 'Enter Blog'}
        style={{ backgroundColor: '#eff2f9' }}
      />
      </div>
    </div>

    <div className="flex items-center justify-end space-x-2">
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Create Blog
      </button>

      <button
        type="submit"
        onClick={saveAsDraft}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Save As Draft
      </button>
    </div>
  </form>
</div>
</div>

  );
};

export default CreateBlog;
