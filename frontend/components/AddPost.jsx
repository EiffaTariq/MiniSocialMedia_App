import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoClose, IoImageOutline, IoVideocamOutline } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineTag } from "react-icons/ai";


const AddPost = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("post");
  const [location, setLocation] = useState("");
  const [showLocationInput, setShowLocationInput] = useState(false);
  const MAX_CAPTION = 2200;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
      name: file.name,
    }));

    setMediaFiles((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeMedia = (index) => {
    URL.revokeObjectURL(previews[index].url);
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!mediaFiles.length && !caption.trim()) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("location", location);
      formData.append("type", activeTab);
      mediaFiles.forEach((file) => formData.append("media", file));

      // Replace with your actual API endpoint
      const res = await fetch("/api/post/new?type=post", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        navigate("/");
      } else {
        alert("Failed to create post. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl text-gray-800 hover:text-black transition"
        >
          <IoArrowBack />
        </button>
        <h1 className="text-base font-semibold text-gray-900">New Post</h1>
        <button
          onClick={handleSubmit}
          disabled={isLoading || (!mediaFiles.length && !caption.trim())}
          className={`text-sm font-semibold transition ${
            isLoading || (!mediaFiles.length && !caption.trim())
              ? "text-blue-300 cursor-not-allowed"
              : "text-blue-500 hover:text-blue-700"
          }`}
        >
          {isLoading ? "Sharing..." : "Share"}
        </button>
      </div>

      {/* Tab Toggle */}
      <div className="flex border-b border-gray-200">
        {["post", "reel"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-1 py-2 text-sm font-medium transition capitalize ${
              activeTab === t
                ? "border-b-2 border-black text-black"
                : "text-gray-400"
            }`}
          >
            {t === "post" ? "Post" : "Reel"}
          </button>
        ))}
      </div>

      {/* Media Preview */}
      {previews.length > 0 && (
        <div className="flex gap-2 p-3 overflow-x-auto">
          {previews.map((preview, index) => (
            <div key={index} className="relative flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden bg-gray-100">
              {preview.type === "video" ? (
                <video src={preview.url} className="w-full h-full object-cover" />
              ) : (
                <img src={preview.url} alt="preview" className="w-full h-full object-cover" />
              )}
              <button
                onClick={() => removeMedia(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-0.5 text-xs"
              >
                <IoClose />
              </button>
            </div>
          ))}

          {/* Add more */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex-shrink-0 w-28 h-28 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 transition"
          >
            <IoImageOutline className="text-2xl mb-1" />
            <span className="text-xs">Add more</span>
          </button>
        </div>
      )}

      {/* Upload Button (when no media) */}
      {previews.length === 0 && (
        <button
          onClick={() => fileInputRef.current.click()}
          className="mx-4 mt-4 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center py-12 gap-3 hover:border-gray-400 transition"
        >
          <div className="flex gap-4 text-gray-400 text-4xl">
            <IoImageOutline />
            <IoVideocamOutline />
          </div>
          <p className="text-sm text-gray-500 font-medium">Add photos or videos</p>
          <p className="text-xs text-gray-400">Tap to select from gallery</p>
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={activeTab === "reel" ? "video/*" : "image/*,video/*"}
        multiple={activeTab !== "reel"}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Caption */}
      <div className="px-4 mt-4">
        <div className="flex items-start gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <textarea
              value={caption}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CAPTION) setCaption(e.target.value);
              }}
              placeholder="Write a caption..."
              rows={4}
              className="w-full text-sm text-gray-800 placeholder-gray-400 resize-none outline-none"
            />
            <div className="flex items-center justify-between mt-1">
              <button className="text-xl text-gray-400 hover:text-gray-600 transition">
                <BsEmojiSmile />
              </button>
              <span className="text-xs text-gray-400">{caption.length}/{MAX_CAPTION}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 mx-4 mt-2" />

      {/* Options */}
      <div className="flex flex-col">
        <button className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition">
          <div className="flex items-center gap-3 text-gray-800">
            <AiOutlineTag className="text-xl" />
            <span className="text-sm">Tag people</span>
          </div>
          <span className="text-gray-400 text-sm">›</span>
        </button>

        <div className="border-t border-gray-100 mx-4" />

        <button
          onClick={() => setShowLocationInput(!showLocationInput)}
          className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-3 text-gray-800">
            <MdOutlineLocationOn className="text-xl" />
            <span className="text-sm">{location || "Add location"}</span>
          </div>
          <span className="text-gray-400 text-sm">›</span>
        </button>

        {showLocationInput && (
          <div className="px-4 pb-3">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
            />
          </div>
        )}
      </div>

      {/* Bottom padding for nav bar */}
      <div className="h-20" />
    </div>
  );
};

export default AddPost;