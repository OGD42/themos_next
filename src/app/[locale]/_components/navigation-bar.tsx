"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import useStore from "@/api/store";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { signOut } from "firebase/auth";
import { auth } from "@/api/firebase";
import Logo from "./logo";
import LanguageSelector from "./language-selector";
import useGetAuth from "@/api/hooks/useGetAuth";

export default function NavigationBar() {
  const locale = useLocale();
  const t = useTranslations("Menu");
  const pathname = usePathname();
  const router = useRouter();
  const user = useStore();
  const authUser = useGetAuth();

  const menuItems = [
    {
      label: t("menu_home_label"),
      href: "/dashboard",
    },
    {
      label: "Blog",
      href: "/dashboard",
      items: [
        {
          key: "canada",
          label: "Canada",
          action: () => router.push("/blog/canada"),
        },
        {
          key: "spain",
          label: "Spain",
          action: () => router.push("/blog/spain"),
        },
      ],
    },
    {
      label: t("menu_profile_label"),
      href: "/dashboard/profile",
      items: [
        {
          key: "profile",
          label: t("menu_check_profile_label"),
          action: () => router.push("/dashboard/profile"),
        },
        {
          key: "logout",
          label: t("menu_logout_label"),
          action: () => handleLogout(),
        },
      ],
    },
  ];

  async function handleLogout() {
    await signOut(auth);
    router.replace("/");
  }
  return (
    <Navbar
      position="static"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <Link color="foreground" href={`/${locale}/dashboard`}>
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <Link color="foreground" href={`/${locale}/dashboard`}>
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </Link>
        {menuItems.map((item, key) => {
          if (item.items) {
            return (
              <Dropdown key={`${item.label}-${key}`}>
                <DropdownTrigger>
                  <NavbarItem
                    key={`${item.label}-${key}`}
                    isActive={pathname === item.href}
                    className="cursor-pointer"
                  >
                    {item.label}
                  </NavbarItem>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  {item.items.map((subMenu, subKey) => (
                    <DropdownItem
                      key={`${subMenu.key}_${subKey}`}
                      onClick={subMenu.action}
                    >
                      {subMenu.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            );
          }
          return (
            <NavbarItem
              key={`${item.label}-${key}`}
              isActive={pathname === item.href}
            >
              <Link color="foreground" href={`/${locale}/${item.href}`}>
                {item.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((items, key) => {
          if (items.items) {
            return items.items.map((subItem, subKey) => (
              <NavbarMenuItem key={`${subItem.label}_${subKey}`}>
                <Link className="w-full" onClick={subItem.action} href="">
                  {items.label} - {subItem.label}
                </Link>
              </NavbarMenuItem>
            ));
          } else {
            return (
              <NavbarMenuItem key={`${items.label}_${key}`}>
                <Link className="w-full" href={items.href}>
                  {items.label}
                </Link>
              </NavbarMenuItem>
            );
          }
        })}
        {/* <NavbarMenuItem>
          <Link className="w-full" href="/dashboard">
            {t("menu_home_label")}
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" href="/dashboard/profile">
            {t("menu_profile_label")}
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem onClick={handleLogout}>Logout</NavbarMenuItem> */}
      </NavbarMenu>
      <NavbarContent justify="end">
        <NavbarItem className="min-w-[250px]">
          <LanguageSelector />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
