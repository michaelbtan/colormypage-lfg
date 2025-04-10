import Link from "next/link";
import { Menu, LogIn, Palette } from "lucide-react";
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
}

export function MobileMenu({ loggedin, navigationItems }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col gap-6 py-6">
          <Link href="/" className="flex items-center gap-2">
            <Palette className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ColorMyPage</span>
          </Link>
          <div className="flex flex-col gap-4">
            {navigationItems?.map((item) => (
              <SheetClose key={item.name} asChild>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
                >
                  {item.icon}
                  {item.name}
                </Link>
              </SheetClose>
            ))}
            <SheetClose asChild>
              <Link
                href={loggedin ? "/dashboard" : "/login"}
                className="flex py-2 text-lg font-medium hover:text-primary transition-colors items-center gap-2"
              >
                <LogIn className="h-5 w-5" />
                {loggedin ? "Account" : "Sign in"}
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
