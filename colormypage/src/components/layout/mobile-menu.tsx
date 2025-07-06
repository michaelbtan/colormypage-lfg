import type React from "react";
import Link from "next/link";
import { Menu, LogIn, LogOut, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface MobileMenuProps {
  loggedin: boolean;
  navigationItems?: {
    name: string;
    href: string;
    icon?: React.ReactNode;
  }[];
  logoutAction?: () => Promise<void>;
}

export function MobileMenu({
  loggedin,
  navigationItems,
  logoutAction,
}: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-cyan-50"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-gradient-to-b from-cyan-50 to-white border-l border-cyan-100 w-80"
      >
        <div className="flex flex-col gap-8 py-6">
          {/* Logo */}
          <SheetClose asChild>
            <Link
              href="/"
              className="flex items-center gap-3 pb-4 border-b border-cyan-100"
            >
              <div className="flex items-center justify-center gap-2 pl-4">
                <Palette className="h-6 w-6 text-[#9d84ff]" />
                <h1 className="text-3xl font-bold">
                  <span className="text-[#9d84ff]">Color</span>
                  <span className="text-gray-800">My</span>
                  <span className="text-gray-800">Page</span>
                </h1>
              </div>
            </Link>
          </SheetClose>

          {/* Navigation Items */}
          <div className="flex flex-col gap-2 p-4">
            {navigationItems?.map((item) => (
              <SheetClose key={item.name} asChild>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-lg font-semibold text-gray-700 hover:text-[#9d84ff] hover:bg-white/80 rounded-xl transition-all duration-200 border border-transparent hover:border-cyan-100 hover:shadow-sm"
                >
                  <span className="text-gray-500 hover:text-[#9d84ff] transition-colors">
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              </SheetClose>
            ))}

            {/* Authentication Button */}
            {loggedin ? (
              <form action={logoutAction} className="contents">
                <SheetClose asChild>
                  <Button
                    type="submit"
                    className="flex items-center gap-3 px-4 py-3 mt-4 text-lg font-semibold cursor-pointer bg-[#9d84ff]/20 backdrop-blur-sm border border-[#9d84ff]/30 text-[#9d84ff] rounded-xl transition-all duration-200 shadow-md hover:scale-105 h-auto justify-start"
                  >
                    <LogOut className="h-6 w-6" />
                    Logout
                  </Button>
                </SheetClose>
              </form>
            ) : (
              <SheetClose asChild>
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 mt-4 text-lg font-semibold cursor-pointer bg-[#9d84ff]/20 backdrop-blur-sm border border-[#9d84ff]/30 text-[#9d84ff] rounded-xl transition-all duration-200 shadow-md hover:scale-105 h-auto justify-start"
                >
                  <LogIn className="h-6 w-6" />
                  Sign in
                </Link>
              </SheetClose>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-cyan-100">
            <p className="text-sm text-gray-500 text-center">
              Free, high-quality coloring pages for kids, parents, and teachers.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
