import { createContext, useContext, useState } from "react";

// 1️⃣ Kontekst yaratamiz
const LikedContext = createContext();

// 2️⃣ Provider komponenti
export const LikedProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  return (
    <LikedContext.Provider value={{ likedProducts, setLikedProducts }}>
      {children}
    </LikedContext.Provider>
  );
};

// 3️⃣ Contextdan foydalanish uchun custom hook
export const useLiked = () => {
  return useContext(LikedContext);
};
