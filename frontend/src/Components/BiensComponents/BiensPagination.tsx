import { memo } from "react";
import {
ChevronLeft,
ChevronRight,
} from "lucide-react";

import { useBiensContext } from "../../Contexts/BiensContext";

const getPageNumbers = (
page: number,
totalPages: number
): (number | string)[] => {
const pages: (number | string)[] = [];
const delta = 2;

for (let i = 1; i <= totalPages; i++) {
if (
i === 1 ||
i === totalPages ||
(i >= page - delta && i <= page + delta)
) {
pages.push(i);
} else if (pages[pages.length - 1] !== "...") {
pages.push("...");
}
}

return pages;
};

const BiensPagination = () => {
const {
page,
setPage,
totalPages,
total,
} = useBiensContext();

// Pas besoin d'afficher la pagination
// s'il n'y a qu'une seule page
if (totalPages <= 1) return null;

const handlePageChange = (newPage: number) => {
setPage(newPage);


window.scrollTo({
  top: 0,
  behavior: "smooth",
});


};

return ( 
<div className="flex flex-col items-center gap-5 mt-14">


  <p className="text-sm text-gray-500 text-center">
    {total} bien{total > 1 && "s"} trouvé
    {total > 1 && "s"} • Page {page} sur {totalPages}
  </p>

  {/* PAGINATION */}

  <div className="flex items-center gap-2 flex-wrap justify-center">
    {/* PREVIOUS */}

    <button
      aria-label="Page précédente"
      disabled={page === 1}
      onClick={() => handlePageChange(page - 1)}
      className="
        w-10 h-10
        flex items-center justify-center

        border border-gray-300
        bg-white

        text-[#222344]

        rounded-md

        transition-all duration-200

        hover:border-[#222344]
        hover:bg-[#222344]
        hover:text-[#cdad7d]

        disabled:opacity-40
        disabled:cursor-not-allowed
        disabled:hover:bg-white
        disabled:hover:text-[#222344]
        disabled:hover:border-gray-300
      "
    >
      <ChevronLeft size={18} />
    </button>

    {/* PAGE NUMBERS */}

    {getPageNumbers(page, totalPages).map(
      (currentPage, index) =>
        currentPage === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="
              w-8
              text-center
              text-gray-400
              select-none
            "
          >
            ...
          </span>
        ) : (
          <button
            key={currentPage}
            onClick={() =>
              handlePageChange(currentPage as number)
            }
            className={`
              w-10 h-10
              flex items-center justify-center

              rounded-md
              font-medium

              transition-all duration-200

              ${
                currentPage === page
                  ? `
                    bg-[#222344]
                    text-[#cdad7d]
                    border border-[#222344]
                  `
                  : `
                    bg-white
                    text-[#222344]
                    border border-gray-300

                    hover:border-[#222344]
                    hover:bg-[#222344]
                    hover:text-[#cdad7d]
                  `
              }
            `}
          >
            {currentPage}
          </button>
        )
    )}

 

    <button
      aria-label="Page suivante"
      disabled={page === totalPages}
      onClick={() => handlePageChange(page + 1)}
      className="
        w-10 h-10
        flex items-center justify-center

        border border-gray-300
        bg-white

        text-[#222344]

        rounded-md

        transition-all duration-200

        hover:border-[#222344]
        hover:bg-[#222344]
        hover:text-[#cdad7d]

        disabled:opacity-40
        disabled:cursor-not-allowed
        disabled:hover:bg-white
        disabled:hover:text-[#222344]
        disabled:hover:border-gray-300
      "
    >
      <ChevronRight size={18} />
    </button>
  </div>
</div>


);
};

export default memo(BiensPagination);
