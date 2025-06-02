import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Palette, LogIn, LogOut } from "lucide-react";
// import { SearchBar } from "./search-bar";
import { MobileMenu } from "./mobile-menu";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/supabase/actions/auth";
import logo from "@/assets/logo.png";

export async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const isLoggedIn = data.user != null;

  const navigationItems = [
    {
      name: "Categories",
      href: "/categories",
      icon: <Palette className="h-6 w-6" />,
    },
    {
      name: "Favorites",
      href: "/dashboard",
      icon: <Heart className="h-6 w-6" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-24 items-center justify-between py-2">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-center gap-2">
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-3xl font-bold">
              <span className="text-[#9d84ff]">Color</span>
              <span className="text-gray-800">My</span>
              <span className="text-gray-800">Page</span>
            </h1>
          </div>
        </Link>

        {/* Search Component */}
        {/* <SearchBar /> */}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/cateogories"
            className="text-lg font-semibold transition-transform duration-300 hover:scale-110 flex items-center gap-2"
          >
            <Palette className="h-6 w-6" />
            Categories
          </Link>
          {isLoggedIn && <Link
            href="/dashboard"
            className="text-lg font-semibold transition-transform duration-300 hover:scale-110 flex items-center gap-2"
          >
            <Heart className="h-6 w-6" />
            Favorites
          </Link>}
          {isLoggedIn ? (
            <form action={logout} className="contents">
              <Button
                type="submit"
                className="text-lg font-semibold cursor-pointer bg-[#9d84ff]/20 hover:bg-[#9d84ff]/20 backdrop-blur-sm border border-[#9d84ff]/30 text-[#9d84ff] transition-transform duration-300 hover:scale-105"
              >
                <LogOut className="h-6 w-6" />
                Logout
              </Button>
            </form>
          ) : (
            <Link href="/account">
              <Button className="text-lg font-semibold cursor-pointer bg-[#9d84ff]/20 hover:bg-[#9d84ff]/20 backdrop-blur-sm border border-[#9d84ff]/30 text-[#9d84ff] transition-transform duration-300 hover:scale-105">
                <LogIn className="h-6 w-6" />
                Sign in / Register
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu */}
        <MobileMenu loggedin={isLoggedIn} navigationItems={navigationItems} />
      </div>
    </header>
  );
}
