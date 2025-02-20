import { createContext, useContext, useState } from "react";

const LikedContext = createContext();

export const LikedProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  return (
    <LikedContext.Provider value={{ likedProducts, setLikedProducts }}>
      {children}
    </LikedContext.Provider>
  );
};

export const useLiked = () => {
  return useContext(LikedContext);
};
