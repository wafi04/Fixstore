import { useCallback, useEffect, useState } from "react";
import { TopNavbar } from "./TopNavbar";
import { BottomNavbar } from "./Bottom_Navbar";
import { UserData } from "@/types/user";
import { useAuth } from "@/hooks/auth/userAuthStore";
import { useHandleLogout } from "@/features/api/auth/auth";
import { useGetCategory } from "@/features/api/categories/category.query";

export function Navbar() {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const { user } = useAuth();
  const logout = useHandleLogout();
  const { category } = useGetCategory();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const controlNavbar = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [controlNavbar, lastScrollY]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);
  return (
    <header
      className={`fixed top-0  left-0 right-0 transition-all duration-300 cursor-pointer bg-white z-50 ${
        !isNavVisible && "-translate-y-full"
      }`}>
      <div className="mx-auto">
        {user && <TopNavbar logout={() => logout.mutate()} user={user} />}

        <BottomNavbar
          categories={category}
          onMobile={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          user={user as UserData}
        />
      </div>
    </header>
  );
}
