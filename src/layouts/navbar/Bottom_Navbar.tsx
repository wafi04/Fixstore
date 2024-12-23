import { Badge } from "@/components/ui/badge";
import { CategoryData } from "@/types/categories";
import { UserData } from "@/types/user";
import { Bell, ShoppingBag } from "lucide-react";
import HeaderDropdown from "./HeaderDropdown";
import { Link } from "react-router-dom";

interface BottomNavbarProps {
  user: UserData;
  onMobile: () => void;
  categories: CategoryData[];
}
export function BottomNavbar({ categories }: BottomNavbarProps) {
  return (
    <div className="flex justify-between items-center mx-4 md:mx-10 ">
      <Link
        to={"/"}
        className="font-bebas text-3xl  md:text-4xl font-semibold ">
        FIXSTORE
      </Link>

      <nav className="hidden md:flex justify-center flex-grow font-bebas text-xl">
        {categories &&
          categories.map((item) => (
            <HeaderDropdown key={item.id} categories={item}>
              <Link key={item.id} to={`/c/${item.name}`} className=" p-2 ">
                <p className="hover:border-black border-b-2 border-transparent">
                  {item.name}
                </p>
              </Link>
            </HeaderDropdown>
          ))}
      </nav>

      <div className="flex items-center gap-2">
        {/* <SearchInput /> */}
        <Link
          to="/cart"
          className="relative hover:text-primary transition-colors">
          <ShoppingBag className="w-6 h-6" />
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 px-2 py-0.5 text-xs"></Badge>
          {/* )} */}
        </Link>
        <Link
          to="/dashboard/notifications"
          className="relative hover:text-primary transition-colors">
          <Bell className="w-6 h-6" />
          {/* {user && (notifications?.total_unread as number) > 0 && ( */}
          <Badge
            variant="default"
            className="absolute -top-2 -right-2 px-2 py-0.5 text-xs ">
            {/* {notifications?.total_unread} */}1
          </Badge>
          {/* )} */}
        </Link>
      </div>
    </div>
  );
}
