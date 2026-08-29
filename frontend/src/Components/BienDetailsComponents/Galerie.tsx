import { memo, useState } from "react"




const Galerie = ({setShowPop, images} : {setShowPop : (b : boolean)=>void, images : string[] }) => {

    const [currentImg, setCurrentImg] = useState(0);
    return(
         <div onClick={()=>setShowPop(false)} className="fixed inset-0 bg-black/40  p-10 max-[600px]:px-1 flex justify-center z-50">
    
               <div className="flex flex-col relative justify-center items-center shadow-2xl gap-2  w-full h-full bg-gray-50 rounded-[20px] p-5 max-[600px]:px-1" onClick={(e) => e.stopPropagation()}>

                <p className="text-[2em] font-bold underline">La Galerie</p>
                <div className="absolute top-2 right-4 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 text-[2em]"
                onClick={()=>setShowPop(false)}
                > &times;</div>
                  <img src={images[currentImg]} 
                  className="w-[1000px] object-contain h-[500px]  max-[1100px]:w-[700px]   max-[850px]:w-[500px] max-[850px]:h-[300px]  max-[550px]:w-[300px] max-[550px]:h-[300px]"
                  alt="" />

                                  <p className="text-[1.2em] font-bold ">
                   {currentImg + 1}/{images.length}
                </p>

                  <div className="flex flex-wrap justify-center items-center gap-5 mt-5">
                    {images.map((img, index)=>{
                        return(
                            <img src={images[index]}
                            style={{border : index === currentImg ? "2px solid gray" : "none",
                                padding : index === currentImg ? "3px" : ""
                            }}
                            className="h-[70px] w-[70px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-6O"
                            onClick={()=>setCurrentImg(index)} alt="" />
                        )
                    })}
                  </div>
                </div>
                </div>
    )
}

export default memo(Galerie);