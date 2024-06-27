import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosClient.js";


const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const [categories, setCategories] = useState([]);

    const fetchData = async () => {
        const { data: categoriesData } = await axios.get(`/categories`);
        setCategories(categoriesData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <GlobalContext.Provider value={{
            categories
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobal = () => {
    const value = useContext(GlobalContext);

    if (value === undefined) {
        throw new Error('Non sei dentro al Global Provider!');
    }
    return value;
}

export { GlobalProvider, useGlobal }