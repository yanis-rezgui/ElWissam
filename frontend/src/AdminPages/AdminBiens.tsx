import { useNavigate } from "react-router-dom";
import AdminBiensSearch from "../AdminComponents/AdminBiensComponents/AdminBiensSearch";
import AdminBiensTable from "../AdminComponents/AdminBiensComponents/AdminBiensTable";
import AdminFilterComponent from "../AdminComponents/AdminBiensComponents/AdminFilterComponent";
import BiensStats from "../AdminComponents/AdminBiensComponents/BiensStats";
import { useBiensAdminContext } from "../AdminContexts/BiensAdminContext";
import DeleteBienPop from "../AdminComponents/AdminBiensComponents/DeleteBienPop";



const AdminBiens = () => {

  const navigate = useNavigate();
  const {showDeletePop} = useBiensAdminContext();

    return(
      <>
        <section className="flex flex-col min-h-screen w-full items-center bg-gray-100">
          <AdminBiensSearch/>

          <p className="mt-[90px] text-[#222344] font-bold text-center text-[1.8em]">
            Gestion des biens
          </p>

          <p className="text-[16px] text-[#222344] text-center mt-2 w-[400px] leading-5.5
          max-[450px]:text-[15px] max-[450px]:w-[300px]
          ">

            Gérez l'ensemble des biens immobiliers de votre agence.
             Ajoutez, modifiez et suivez facilement leur disponibilité et leur statut.
          </p>

          <button className="bg-[#222344] text-white text-[14px] p-2 rounded-[5px] cursor-pointer
          transition-opacity duration-200 hover:opacity-80 active:opacity-60 mt-3 font-[600]
          "
          onClick={()=>navigate('/admin/addBien')}
          >
            + Ajouter un bien
          </button>

          <BiensStats/>
          <AdminFilterComponent/>
          <AdminBiensTable/>
        </section>

        {showDeletePop && <DeleteBienPop/>}
        </>
    )
}


export default AdminBiens;