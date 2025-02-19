import { createContext, useContext, useState } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketProducts, setBasketProducts] = useState([]);

  return (
    <BasketContext.Provider value={{ basketProducts, setBasketProducts }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  return useContext(BasketContext);
};
