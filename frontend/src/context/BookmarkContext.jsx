import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookmarkContext = createContext();

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);

  const addBookmark = (user) => {
    if (!bookmarks.some(b => b.id === user.id)) {
      setBookmarks(prevBookmarks => [...prevBookmarks, user]);
    }
  };

  const removeBookmark = (userId) => {
    setBookmarks(prevBookmarks => prevBookmarks.filter(b => b.id !== userId));
  };

  const isBookmarked = (userId) => {
    return bookmarks.some(b => b.id === userId);
  };

  const value = {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};