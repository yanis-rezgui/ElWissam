import  { memo, useState } from "react"
import { useBiensContext } from "../../Contexts/BiensContext";
import Galerie from "./Galerie";


const DetailsHero = () => {

    const {currentBien} = useBiensContext();
    const [openGalerie, setOpenGalerie] = useState<boolean>(false);

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const slideLeft = () => {

        if( currentIndex - 1 < 0){
            setCurrentIndex(((currentBien?.images.length || 1) - 1) || 0)
        }else{
            setCurrentIndex(prev => prev - 1)
        }
    }

    const slideRight = () => {

        if(currentIndex + 1 >= (currentBien?.images.length || 1)){
            setCurrentIndex(0)
        }else{
            setCurrentIndex(prev => prev + 1)
        }
    }

    return(
        <>
           <div className="w-full bg-[#222344] flex flex-col items-center">
               <p className="text-gray-50 text-[1.7em] font-bold mt-10">{currentBien?.nom}</p>
                <p className="mt-5 text-gray-50 text-[1.3em] font-[600] underline">Galerie d'images</p>

               <div className="flex flex-col items-center gap-1 mt-5">
                <div className="flex fex-row items-center gap-1">
                    <i onClick={slideLeft}
                     className="fa-solid fa-chevron-left
                     text-gray-50 text-[2em] font-bold cursor-pointer transition-opacity duration-200 
                     hover:opacity-80 active:opacity-60
                     "></i>
                    <img src={currentBien?.images[currentIndex]} alt="" 
                    className="w-[500px] h-[500px] object-contain"
                    />
                    <i 
                    onClick={slideRight}
                    className="fa-solid fa-chevron-right
                     text-gray-50 text-[2em] font-bold cursor-pointer transition-opacity duration-200 
                     hover:opacity-80 active:opacity-60
                    "></i>
                </div>
                <p className="text-[1.2em] font-bold text-gray-50">
                   {currentIndex + 1}/{currentBien?.images.length}
                </p>
               </div>

               <div className="flex flex-wrap items-center gap-2 mt-5 ">
                {currentBien?.images.map((im, i)=>{
                    return(
                        <img src={im} alt="" 
                        className="w-[50px] h-[50px] object-cover cursor-pointer transition-opacity duration-200 
                     hover:opacity-80 active:opacity-60"
                        style={{border : currentIndex === i ? "2px solid lightgray" :"none",
                            padding : currentIndex === i ? "2px" : "none",
                            borderRadius : "3px"
                        }}
                        onClick={()=>setCurrentIndex(i)}
                        />
                    )
                })}
               </div>

               <button className="text-[#222344] bg-gray-50 font-bold text-[15px] p-2 rounded-[5px] mt-7
               mb-10 transition-opacity duration-200 hover:opacity-80 active:opacity-60
               "
               onClick={()=>setOpenGalerie(true)}
               >
                Ouvrir la Galerie en Détails
               </button>
           </div>

           {openGalerie && <Galerie setShowPop={setOpenGalerie} images={currentBien!.images}/>}

           </>
    )
}

export default memo(DetailsHero);