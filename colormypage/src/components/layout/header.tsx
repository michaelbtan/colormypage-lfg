import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Palette, Heart, LogIn, LogOut } from "lucide-react";
import { SearchBar } from "./search-bar";
import { MobileMenu } from "./mobile-menu";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/supabase/actions/auth";

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
      {/* increased h-24 and extra py */}
      <div className="container mx-auto px-4 flex h-24 items-center justify-between py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center gap-2">
            <Palette className="h-6 w-6 text-[#9d84ff]" />
            <h1 className="text-3xl font-bold">
              <span className="text-[#9d84ff]">Color</span>
              <span className="text-gray-800">My</span>
              <span className="text-gray-800">Page</span>
            </h1>
          </div>
        </Link>

        {/* Search Component */}
        <SearchBar />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.map(({ name, href, icon }) => (
            <Link
              key={name}
              href={href}
              className="text-lg font-semibold hover:text-primary transition-colors hover:underline flex items-center gap-2"
            >
              {icon}
              {name}
            </Link>
          ))}

          {isLoggedIn ? (
            <form action={logout} className="contents">
              <Button
                variant="outline"
                type="submit"
                className="text-lg font-semibold hover:text-primary transition-colors hover:underline flex items-center gap-2"
              >
                <LogOut className="h-6 w-6" />
                Logout
              </Button>
            </form>
          ) : (
            <Link
              href="/account"
              className="text-lg font-semibold hover:text-primary transition-colors hover:underline flex items-center gap-2"
            >
              <LogIn className="h-6 w-6" />
              Sign in
            </Link>
          )}
        </nav>

        {/* Mobile Menu */}
        <MobileMenu loggedin={isLoggedIn} navigationItems={navigationItems} />
      </div>
    </header>
  );
}
