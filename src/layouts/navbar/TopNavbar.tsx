import { Button } from "@/components/ui/button";
import { UserData } from "@/types/user";
import { HelpCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export function TopNavbar({
  user,
  logout,
}: {
  user: UserData;
  logout: () => void;
}) {
  const isAdmin = user.role === "ADMIN";
  return (
    <div className="bg-gray-50  px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex justify-end items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-4 h-4" />
          <span>Help</span>
        </div>
        <span className="text-gray-300">|</span>
        {isAdmin ? (
          <Link to={"/dashboard"}>
            <span>Welcome, {user.name}</span>
          </Link>
        ) : (
          <Link to={"/profile"}>
            <span>Welcome, {user.name}</span>
          </Link>
        )}
        <span className="text-gray-300">|</span>

        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="flex items-center space-x-2 hover:bg-transparent">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
