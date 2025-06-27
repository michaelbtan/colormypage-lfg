import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
  return (
    <div className="container mx-auto px-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href || "/"}>
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

// Utility functions for common breadcrumb patterns
export const createHomeBreadcrumb = (): BreadcrumbItem => ({
  label: "Home",
  href: "/",
});

export const createCategoriesBreadcrumb = (): BreadcrumbItem => ({
  label: "Categories",
  href: "/categories",
});

export const createCategoryBreadcrumb = (categoryTitle: string): BreadcrumbItem => ({
  label: decodeURI(categoryTitle),
  href: `/categories/${categoryTitle}`,
});

export const createDashboardBreadcrumb = (): BreadcrumbItem => ({
  label: "Dashboard",
  href: "/dashboard",
});