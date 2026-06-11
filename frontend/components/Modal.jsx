import React from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Modal = ({ value, title, setShow }) => {
  const navigate = useNavigate();

  return (
    // Dark overlay background
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={() => setShow(false)} // clicking outside closes it
    >
      {/* Modal box — stop click from bubbling to overlay */}
      <div
        className="bg-white rounded-2xl w-80 max-h-96 flex flex-col overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button
            onClick={() => setShow(false)}
            className="text-xl text-gray-500 hover:text-black transition"
          >
            <IoClose />
          </button>
        </div>

        {/* User List */}
        <div className="overflow-y-auto flex-1">
          {value && value.length > 0 ? (
            value.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  navigate(`/user/${user._id}`);
                  setShow(false);
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-pink-400 to-purple-500 flex-shrink-0">
                  {user.profilePic?.url && (
                    <img
                      src={user.profilePic.url}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Name and email */}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-400">{user.email}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-400 py-8">
              No {title} yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;