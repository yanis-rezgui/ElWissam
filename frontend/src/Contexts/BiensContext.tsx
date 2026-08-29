import { createContext, useContext, useEffect, useState } from "react";
import type { Bien, BienFilterType } from "../Types/Types";




interface BiensContextType{
    biens : Bien[];
    loadingBiens : boolean;
    setLoadingBiens : (b : boolean)=>void;
    getAllBiens : ()=>Promise<void>;
    biensFilter : BienFilterType;
    setBiensFilter : (b : BienFilterType)=>void
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    limit: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    total: number;
    totalPages: number;

    getBien : (id : string)=>Promise<void>;
    loadingBien : boolean;
    currentBien : Bien | null;
}


const BiensContext = createContext<BiensContextType | null>(null);

export const BiensProvider = ({children} : {children : React.ReactNode}) => {

    const [biens, setBiens] = useState<Bien[]>([]);
    const [loadingBiens, setLoadingBiens] = useState<boolean>(false);
    const [loadingBien, setLoadingBien] = useState<boolean>(false);
    const [currentBien, setCurrentBien] = useState<Bien | null>(null)

    const [biensFilter, setBiensFilter] = useState<BienFilterType>(()=>{
        const saved = localStorage.getItem('biensFilter');

        return saved ? JSON.parse(saved) : {
              service: "",
              type: "",
            
              prixMin: undefined,
              prixMax: undefined,
              search: ""
        }
    });

    useEffect(()=>{
        localStorage.setItem('biensFilter', JSON.stringify(biensFilter));
    }, [biensFilter])

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


    const getAllBiens = async() => {

        setLoadingBiens(true)
         try{
            const params = new URLSearchParams();

            params.append("page", page.toString());
            params.append("limit", limit.toString());

            if(biensFilter.type){
                params.append("type", biensFilter.type)
            }

            if(biensFilter.service){
                params.append("service", biensFilter.service)
            }

            if (biensFilter.prixMin && biensFilter.prixMin >= 0) {
                params.append("prixMin", biensFilter.prixMin.toString());
            }

            if (biensFilter.prixMax && biensFilter.prixMax >= 0) {
                params.append("prixMax", biensFilter.prixMax.toString());
            }

            if (biensFilter.search?.trim()) {
                params.append("search", biensFilter.search.trim());
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/biens?${params.toString()}`, {
                method : "GET",
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in fetching data")
            }

            setBiens(data.data)
            console.log("Biens : ", data.data)
            setTotal(data.pagination.total);
            setTotalPages(data.pagination.totalPages);

            
         }catch(err){
            console.error(err);
         }finally{
            setLoadingBiens(false)
         }

    }


    const getBien = async(id : string) => {

        try{

            setLoadingBien(true);

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/biens/${id}`,{
                method : "GET"
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in getting bien");
            }

            setCurrentBien(data.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingBien(false);
        }
    }

    useEffect(()=>{
        getAllBiens();
    }, [biensFilter])


    return <BiensContext.Provider value={{
    biens,
    loadingBiens,
    setLoadingBiens,
    getAllBiens ,
    biensFilter ,
    setBiensFilter,
    page,
    setPage,
    limit,
    setLimit,
    total,
    totalPages,
    getBien,
    loadingBien,
    currentBien 
    }}>
        {children}
    </BiensContext.Provider>

}

export const useBiensContext = () => {

    const context = useContext(BiensContext);

    if(!context){
        throw new Error("Please use the useBiensContext hook inside the BiensContext Provider");
    }

    return context;
}