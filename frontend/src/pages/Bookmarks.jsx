import React from 'react';
import { useBookmarks } from '../context/BookmarkContext';
import UserCard from '../components/UserCard';

const Bookmarks = () => {
  const { bookmarks } = useBookmarks();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bookmarked Employees</h1>
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarks.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <p>You haven't bookmarked any employees yet.</p>
      )}
    </div>
  );
};

export default Bookmarks;