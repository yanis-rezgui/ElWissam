import { memo, useState } from "react"
import { useBiensContext } from '../../Contexts/BiensContext';

const FirstDetailsSection = () => {

    const [index,setIndex] = useState<number>(0);
    const {currentBien} = useBiensContext();

    return(
        <div className="flex flex-wrap items-start gap-5 mt-10 justify-center w-full">
           
           <div className="flex flex-col justify-center items-center gap-2">
               <img src={currentBien?.images[index]} 
               className="w-[300px] h-[300px]  object-contain"
               />

               <div 
               className="flex flex-wrap justify-center items-center gap-2"
               >
                {currentBien?.images.map((img, i)=>{
                    return(
                        <img src={img} alt="" key={i}
                        onClick={()=>setIndex(i)}
                        className={`w-[50px] h-[50px] object-cover 
                            ${i === index && "border-2 border-gray-500 p-1"} rounded-[5px]
                            cursor-pointer
                            `}
                        />
                    )
                })}
               </div>
           </div>

           <div className="w-[300px] p-3 bg-white shadow-2xl rounded-[10px] 
           flex flex-col
           gap-2">
            <p className="text-[1.3em] font-bold underline">
                Informations:</p>

            <div className="flex flex-row gap-2 items-center mt-2">
                <p className="font-[600]">Prix:</p>
                <p>
                    {currentBien?.prix} DA
                </p>
            </div>

            <div className="flex flex-row gap-2 items-center">
                <p className="font-[600]">Superficie:</p>
                <p>
                    {currentBien?.superficie} m²
                </p>
            </div>

            <div className="flex flex-row gap-2 items-start">
                <p className="font-[600]">Localisation:</p>
                <p className=" text-[14px]">
                    {currentBien?.localisation} 
                </p>
            </div>

            <div className="flex flex-row gap-2 items-start">
                <p className="font-[600]">Type:</p>
                <p className=" text-[16px]">
                    {currentBien?.type}
                </p>
            </div>

            <div className="flex flex-row gap-2 items-start">
                <p className="font-[600]">Service:</p>
                <p className=" text-[16px]">
                    {currentBien?.service}
                </p>
            </div>
           </div>

           <div className="w-[300px] p-3 bg-white shadow-2xl rounded-[10px] 
           flex flex-col
           gap-4">

                     <p className="text-[1.3em] font-bold underline">
                Localisation Gps:</p>
 
                <iframe src={`${currentBien?.localisationMap}`} 
            className="w-full h-[200px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">

           </iframe>

           </div>

         
        </div>
    )
}

export default memo(FirstDetailsSection);