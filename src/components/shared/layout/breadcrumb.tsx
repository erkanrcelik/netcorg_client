"use client";
import React from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {getMenuList} from "@/lib/menu-list";

const CustomBreadCrumb = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);
  const menuList = getMenuList(pathname);
  const getPageConfig = (pathname: string) => {
    for (const group of menuList) {
      for (const menu of group.menus) {
        if (menu.href === `/${pathname}`) {
          return menu;
        }
      }
    }
    return null;
  };

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {pathnames.length > 0 ? (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={menuList[0].menus[0].href}>{menuList[0].menus[0].label}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>{menuList[0].menus[0].label}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
        {pathnames.map((pathname, index) => {
          const href = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const pageConfig = getPageConfig(pathname);
          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {pageConfig?.label || decodeURIComponent(pathname)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>
                      {pageConfig?.label || decodeURIComponent(pathname)}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadCrumb;
