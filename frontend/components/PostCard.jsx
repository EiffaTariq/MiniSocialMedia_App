import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoChatbubbleOutline, IoShareSocialOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { UserData } from "../context/UserContext";

const PostCard = ({ value, type }) => {
  const { user } = UserData();
  const [liked, setLiked] = useState(value.likes?.includes(user?._id) || false);
  const [likeCount, setLikeCount] = useState(value.likes?.length || 0);
  const [following, setFollowing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(value.comments || []);

  const isOwner = user?._id === value.owner?._id;

  const handleLike = async () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    try {
      await fetch(`/api/post/like/${value._id}`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
    }
  };

  const handleFollow = async () => {
    setFollowing((prev) => !prev);
    try {
      await fetch(`/api/user/follow/${value.owner._id}`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      setFollowing((prev) => !prev);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Check out this post!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleDelete = async () => {
    setShowMenu(false);
    if (!window.confirm("Delete this post?")) return;
    try {
      await fetch(`/api/post/${value._id}`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch (err) {
      alert("Failed to delete post.");
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    const newComment = { comment: commentText, user: { name: user?.name } };
    setComments((prev) => [...prev, newComment]);
    setCommentText("");
    try {
      await fetch(`/api/post/comment/${value._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ comment: commentText }),
      });
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  return (
    <div className="bg-white border-b border-gray-100 mb-2">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-pink-400 to-purple-500">
            {value.owner?.profilePic?.url && (
              <img
                src={value.owner.profilePic.url}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Username */}
          <span className="text-sm font-semibold text-gray-900">
            {value.owner?.name || "unknown"}
          </span>

          {/* Follow button — only show if not the owner */}
          {!isOwner && (
            <>
              <span className="text-gray-300 text-xs">•</span>
              <button
                onClick={handleFollow}
                className={`text-xs font-semibold transition ${
                  following ? "text-gray-400" : "text-blue-500"
                }`}
              >
                {following ? "Following" : "Follow"}
              </button>
            </>
          )}
        </div>

        {/* 3-dot menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-xl text-gray-700 p-1"
          >
            <BsThreeDots />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-xl shadow-lg z-20 w-36 overflow-hidden">
              {isOwner && (
                <>
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 transition"
                  >
                    Delete
                  </button>
                </>
              )}
              <button
                onClick={() => setShowMenu(false)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition"
              >
                Report
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Media */}
      {value.post?.url && (
        <div className="w-full aspect-square bg-gray-100">
          {type === "reel" ? (
            <video
              src={value.post.url}
              className="w-full h-full object-cover"
              controls
            />
          ) : (
            <img
              src={value.post.url}
              alt="post"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-4 px-3 pt-3 pb-1">
        <button onClick={handleLike} className="text-2xl transition">
          {liked ? (
            <AiFillHeart className="text-red-500" />
          ) : (
            <AiOutlineHeart className="text-gray-800" />
          )}
        </button>
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="text-2xl text-gray-800"
        >
          <IoChatbubbleOutline />
        </button>
        <button onClick={handleShare} className="text-2xl text-gray-800">
          <IoShareSocialOutline />
        </button>
      </div>

      {/* Like Count */}
      <div className="px-3 pb-1">
        <span className="text-sm font-semibold text-gray-900">
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </span>
      </div>

      {/* Caption */}
      {value.caption && (
        <div className="px-3 pb-1">
          <span className="text-sm font-semibold text-gray-900 mr-1">
            {value.owner?.name}
          </span>
          <span className="text-sm text-gray-800">{value.caption}</span>
        </div>
      )}

      {/* Comments Section */}
      {showComments && (
        <div className="px-3 pb-2">
          {comments.length > 0 && (
            <div className="mt-1 mb-2 flex flex-col gap-1">
              {comments.map((c, i) => (
                <p key={i} className="text-sm">
                  <span className="font-semibold mr-1">
                    {c.user?.name || "user"}
                  </span>
                  {c.comment}
                </p>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 border-t border-gray-100 pt-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              placeholder="Add a comment..."
              className="flex-1 text-sm outline-none placeholder-gray-400"
            />
            <button
              onClick={handleAddComment}
              disabled={!commentText.trim()}
              className={`text-sm font-semibold transition ${
                commentText.trim() ? "text-blue-500" : "text-blue-300"
              }`}
            >
              Post
            </button>
          </div>
        </div>
      )}

      <div className="h-2" />
    </div>
  );
};

export default PostCard;