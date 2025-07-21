import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';
import { StarIcon, BookmarkIcon } from '@heroicons/react/24/solid';

const UserCard = ({ user }) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(user.id);
  const [promoted, setPromoted] = useState(false);

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(user.id);
    } else {
      addBookmark(user);
    }
  };

  const handlePromote = () => {
    setPromoted(!promoted);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white dark:bg-gray-800 flex flex-col 
                transition-all duration-300 ease-in-out
                hover:border-b-black hover:shadow-xl hover:scale-105 hover:bg-blue-50 dark:hover:bg-gray-700 
                hover:ring-2 hover:ring-blue-400">

      <div className="flex items-center mb-4">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div className="min-w-0">
          <h2 className="text-xl font-bold truncate">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 break-words">
            {user.email}
          </p>
          <p className="text-gray-500 dark:text-gray-400">Age: {user.age}</p>
        </div>

      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{user.department}</span>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${i < user.performanceRating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto pt-4 flex flex-col gap-2">
        <div className="flex gap-2">
          <Link
            to={`/employee/${user.id}`}
            className="flex-1 text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View
          </Link>
          <button
            onClick={handleBookmark}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
          >
            <BookmarkIcon
              className={`h-5 w-5 ${bookmarked ? 'text-blue-500' : 'text-gray-500'}`}
            />
          </button>
        </div>
        <button
          onClick={handlePromote}
          className={`w-full text-sm px-4 py-2 rounded ${promoted ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'
            } hover:opacity-90`}
        >
          {promoted ? 'Promoted ✅' : 'Promote'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
