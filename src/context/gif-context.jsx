import { createContext, useContext } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useState } from "react";
import { useEffect } from "react";

const GifContext = createContext();
const GifProvider = ({ children }) => {

        const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);




        const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

        const addToFavorites = (id) => {
              
                if (favorites.includes(id)) {
                  // If the item is already in favorites, remove it
                  const updatedFavorites = favorites.filter((itemId) => itemId !== id);
                  localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
                  setFavorites(updatedFavorites);
                } else {
                  // If the item is not in favorites, add it
                  const updatedFavorites = [...favorites];
                  updatedFavorites.push(id);
                  localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
                  setFavorites(updatedFavorites);
                }
        };
        
        useEffect(() => {
                const favorites = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
                setFavorites(favorites);
              }, []);

return <GifContext.Provider value={{gf, gifs, setGifs, filter, setFilter, favorites,addToFavorites}}>{children}</GifContext.Provider>;
};


export const GifState = () => {
        return useContext(GifContext)
}
export default GifProvider;