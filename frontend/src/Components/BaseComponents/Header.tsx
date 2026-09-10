import { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const pages = [
    { name: "Accueil", href: "/" },
    { name: "Nos Biens", href: "/biens" },
    { name: "Services", href: "/services" },
    { name: "Favoris", href: "/favoris" },
    { name: "Mon Profil", href: "/profile" },
  ];

  const currentPage = useLocation();

  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <header
        className="
          w-full bg-[#222344]/95 backdrop-blur-sm text-[#cdad7d]
          shadow-[0_2px_15px_rgba(0,0,0,0.25)]
          fixed top-0 flex flex-row justify-between
          h-[60px] items-center px-5 z-50
          border-b border-[#cdad7d]/10
        "
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-[1.5em] font-bold font-['Playfair_Display']"
        >
          <img
            src="logo2.jpeg"
            alt="El Ahlem"
            className="w-[36px] h-[36px] object-cover rounded-full border border-[#cdad7d]/40"
          />
          EL AHLEM
        </Link>

        {/* Desktop navigation */}
        <nav className="flex flex-row items-center gap-1 max-[1000px]:gap-1 max-[700px]:hidden">
          {pages.map((p) => {
            const isActive = currentPage.pathname === p.href;

            return (
              <Link
                key={p.href}
                to={p.href}
                className={`
                  relative cursor-pointer px-3 py-2 rounded-[5px]
                  transition-colors duration-200
                  font-['Playfair_Display'] text-[15px] font-medium
                  ${isActive ? "text-[#cdad7d]" : "text-gray-100 hover:text-[#cdad7d]"}
                `}
              >
                {p.name}

                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute left-3 right-3 -bottom-[1px] h-[2px] bg-[#cdad7d] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          <Link
            to="/contact"
            className="
              ml-3 bg-[#cdad7d] text-[#222344]
              text-[14px] font-[600]
              px-4 py-1.5 rounded-[5px]
              transition-transform duration-200
              hover:scale-105 active:scale-95
            "
          >
            Contactez-nous
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="
            hidden max-[700px]:flex
            w-10 h-10
            items-center justify-center
            cursor-pointer
          "
          onClick={() => setShowNav((prev) => !prev)}
          aria-label="Ouvrir le menu"
        >
          <motion.div
            animate={showNav ? "open" : "closed"}
            className="relative w-7 h-6"
          >
            <motion.span
              className="absolute left-0 top-0 w-7 h-[2px] bg-[#cdad7d] rounded"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 10 },
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute left-0 top-[10px] w-7 h-[2px] bg-[#cdad7d] rounded"
              variants={{
                closed: { opacity: 1, x: 0 },
                open: { opacity: 0, x: -10 },
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 top-[20px] w-7 h-[2px] bg-[#cdad7d] rounded"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -10 },
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </button>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.nav
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="
              hidden max-[700px]:flex
              flex-col
              fixed top-[60px] left-0
              w-full
              bg-[#222344]
              text-[#cdad7d]
              z-40
              p-5
              gap-1
              shadow-xl
              border-t border-[#cdad7d]/10
            "
          >
            {pages.map((p, index) => {
              const isActive = currentPage.pathname === p.href;

              return (
                <motion.div
                  key={p.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.25 }}
                >
                  <Link
                    to={p.href}
                    onClick={() => setShowNav(false)}
                    className={`
                      flex items-center justify-between
                      cursor-pointer px-3 py-3 rounded-[5px]
                      transition-colors duration-200
                      font-['Playfair_Display']
                      ${
                        isActive
                          ? "bg-[#cdad7d]/10 text-[#cdad7d] font-semibold"
                          : "text-gray-200 font-medium hover:bg-white/5"
                      }
                    `}
                  >
                    {p.name}
                    {isActive && <span className="w-[6px] h-[6px] rounded-full bg-[#cdad7d]" />}
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: pages.length * 0.07, duration: 0.25 }}
              className="mt-2"
            >
              <Link
                to="/contact"
                onClick={() => setShowNav(false)}
                className="
                  flex items-center justify-center
                  bg-[#cdad7d] text-[#222344]
                  text-[15px] font-[600]
                  px-3 py-3 rounded-[5px]
                "
              >
                Contactez-nous
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Header);