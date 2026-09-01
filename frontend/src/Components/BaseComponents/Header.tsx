import { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const pages = [
    {
      name: "Accueil",
      href: "/",
    },
    {
      name: "Nos Biens",
      href: "/biens",
    },
    {
      name: "Services",
      href: "/services",
    },
    {
      name: "Favoris",
      href: "/favoris",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Mon Profil",
      href: "/profile",
    },
  ];

  const currentPage = useLocation();

  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <header
        className="
          w-full bg-[#222344] text-[#cdad7d] shadow-2xl
          fixed top-0 flex flex-row justify-between
          h-[60px] items-center px-3 z-50
        "
      >
        <Link to="/" className="text-[1.7em] font-bold">
          EL AHLEM
        </Link>



        {/* Desktop navigation */}
        <nav className="flex flex-row items-center gap-5 max-[1000px]:gap-4 max-[700px]:hidden">
          {pages.map((p) => (
            <Link
              key={p.href}
              to={p.href}
              className={`
                cursor-pointer transition-opacity duration-200
                hover:opacity-80 active:opacity-60
                font-['Playfair_Display']
                ${
                  currentPage.pathname === p.href
                    ? "text-[17px] underline font-semibold"
                    : "text-[15px] font-medium"
                }
              `}
            >
              {p.name}
            </Link>
          ))}
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
            {/* Line 1 */}
            <motion.span
              className="absolute left-0 top-0 w-7 h-[2px] bg-[#cdad7d] rounded"
              variants={{
                closed: {
                  rotate: 0,
                  y: 0,
                },
                open: {
                  rotate: 45,
                  y: 10,
                },
              }}
              transition={{
                duration: 0.3,
              }}
            />

            {/* Line 2 */}
            <motion.span
              className="absolute left-0 top-[10px] w-7 h-[2px] bg-[#cdad7d] rounded"
              variants={{
                closed: {
                  opacity: 1,
                  x: 0,
                },
                open: {
                  opacity: 0,
                  x: -10,
                },
              }}
              transition={{
                duration: 0.2,
              }}
            />

            {/* Line 3 */}
            <motion.span
              className="absolute left-0 top-[20px] w-7 h-[2px] bg-[#cdad7d] rounded"
              variants={{
                closed: {
                  rotate: 0,
                  y: 0,
                },
                open: {
                  rotate: -45,
                  y: -10,
                },
              }}
              transition={{
                duration: 0.3,
              }}
            />
          </motion.div>
        </button>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.nav
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="
              hidden max-[700px]:flex
              flex-col
              fixed top-[60px] left-0
              w-full
              bg-[#222344]
              text-[#cdad7d]
              z-40
              p-5
              gap-4
              shadow-xl
            "
          >
            {pages.map((p, index) => (
              <motion.div
                key={p.href}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.25,
                }}
              >
                <Link
                  to={p.href}
                  onClick={() => setShowNav(false)}
                  className={`
                    block cursor-pointer
                    transition-opacity duration-200
                    hover:opacity-80 active:opacity-60
                    font-['Playfair_Display']
                    ${
                      currentPage.pathname === p.href
                        ? "text-[17px] underline font-semibold"
                        : "text-[15px] font-medium"
                    }
                  `}
                >
                  {p.name}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Header);