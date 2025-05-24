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

  let isLoggedIn;
  if (data.user != null) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
  const navigationItems = [
    { name: "Categories", href: "/categories", icon: <Palette /> },
    { name: "Favorites", href: "/dashboard", icon: <Heart /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Palette className="h-6 w-6 text-primary" />
          <span className="hidden font-bold text-xl sm:inline-block">
            ColorMyPage
          </span>
        </Link>

        {/* Search Component */}
        <SearchBar />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors hover:underline"
            >
              <div className="flex items-center gap-2">
                {item?.icon}
                {item.name}
              </div>
            </Link>
          ))}
          {isLoggedIn ? (
            // <Link
            //   href="/dashboard"
            //   className="text-sm font-medium hover:text-primary transition-colors hover:underline"
            // >
            //   <div className="flex items-center gap-2">
            //     <UserRound />
            //     Account
            //   </div>
            // </Link>
            <form action={logout} className="contents">
              <Button
                variant="outline"
                type="submit"
                className="text-sm font-medium hover:text-primary transition-colors hover:underline cursor-pointer"
              >
                <LogOut />
                Logout
              </Button>
            </form>
          ) : (
            <Link
              href="/account"
              className="text-sm font-medium hover:text-primary transition-colors hover:underline"
            >
              <div className="flex items-center gap-2">
                <LogIn />
                Sign in
              </div>
            </Link>
          )}
        </nav>

        {/* Mobile Menu */}
        <MobileMenu loggedin={isLoggedIn} navigationItems={navigationItems} />
      </div>
    </header>
  );
}
