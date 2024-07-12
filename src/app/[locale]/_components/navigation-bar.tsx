"use client";
import React, { useState } from "react";
import {
  Avatar,
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
  Button,
} from "@nextui-org/react";
import useStore from "@/api/store";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Logo from "./logo";
import LanguageSelector from "./language-selector";
import useGetAuth from "@/api/hooks/useGetAuth";
import {
  ChevronDown,
  Scale,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
} from "@/components/Icons";
import { createClient } from "@/api/supabase/client";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Menu");
  const pathname = usePathname();
  const router = useRouter();
  const user = useStore();
  const { user: firebaseUser, isLoading } = useGetAuth();
  const supaClient = createClient();

  const menuItems = [
    {
      label: t("menu_home_label"),
      href: `/`,
    },
    {
      label: "Blog",
      href: "/dashboard",
      itemsMobile: [
        <NavbarMenuItem key="blog_canada">
          <Link className="w-full" href={`/${locale}/blog/canada`}>
            Blog - Canada
          </Link>
        </NavbarMenuItem>,
        <NavbarMenuItem key="blog_spain">
          <Link className="w-full" href={`/${locale}/blog/spain`}>
            Blog - Spain
          </Link>
        </NavbarMenuItem>,
      ],
      items: [
        <DropdownItem
          key="blog_canada"
          description="Learn more about Canada, it's people and how to move there."
          onClick={() => router.push(`/${locale}/blog/canada`)}
          startContent={
            <Avatar
              alt="Canada"
              className="w-6 h-6"
              src="https://flagcdn.com/ca.svg"
            />
          }
        >
          Canada
        </DropdownItem>,
        <DropdownItem
          key="usage_metrics"
          description="Land of wine, siesta and the good life."
          onClick={() => router.push(`/${locale}/blog/spain`)}
          startContent={
            <Avatar
              alt="Spain"
              className="w-6 h-6"
              src="https://flagcdn.com/es.svg"
            />
          }
        >
          Spain
        </DropdownItem>,
        <DropdownItem
          key="99_uptime"
          description="Good and relax life, family oriented, friendly people, learn more here."
          onClick={() => router.push(`/${locale}/blog/mexico`)}
          startContent={
            <Avatar
              alt="USA"
              className="w-6 h-6"
              src="https://flagcdn.com/mx.svg"
            />
          }
        >
          Mexico
        </DropdownItem>,
        <DropdownItem
          key="production_ready"
          description="Want to move to America? Read more here."
          onClick={() => router.push(`/${locale}/blog/usa`)}
          startContent={
            <Avatar
              alt="USA"
              className="w-6 h-6"
              src="https://flagcdn.com/us.svg"
            />
          }
        >
          United States
        </DropdownItem>,
      ],
    },
  ];

  const loggedItems = [
    ...menuItems,
    {
      label: t("menu_dashboard_label"),
      href: `/${locale}/dashboard`,
    },
    {
      label: t("menu_profile_label"),
      href: `/${locale}/dashboard/profile`,
      itemsMobile: [
        <NavbarMenuItem
          key="Profile"
          onClick={() => router.push(`/${locale}/dashboard/profile`)}
        >
          {t("menu_check_profile_label")}
        </NavbarMenuItem>,
        <NavbarMenuItem key="Logout" onClick={() => handleLogout()}>
          {t("menu_logout_label")}
        </NavbarMenuItem>,
      ],
      items: [
        <DropdownItem
          key="Profile"
          onClick={() => router.push(`/${locale}/dashboard/profile`)}
        >
          {t("menu_check_profile_label")}
        </DropdownItem>,
        <DropdownItem key="Logout" onClick={() => handleLogout()}>
          {t("menu_logout_label")}
        </DropdownItem>,
      ],
    },
  ];

  async function handleLogout() {
    await supaClient.auth.signOut();
    router.replace("/");
  }

  console.log("firebaseUser", firebaseUser);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="lg:max-w-[60px]">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <Link color="foreground" href="/">
            {t("menu_home_label")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
              >
                Blog
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded">
              <DropdownItem
                key="blog_canada"
                description="Learn more about Canada, it's people and how to move there."
                onClick={() => router.push(`/${locale}/blog/canada`)}
                startContent={
                  <Avatar
                    alt="Canada"
                    className="w-6 h-6"
                    src="https://flagcdn.com/ca.svg"
                  />
                }
              >
                Canada
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="Land of wine, siesta and the good life."
                onClick={() => router.push(`/${locale}/blog/spain`)}
                startContent={
                  <Avatar
                    alt="Spain"
                    className="w-6 h-6"
                    src="https://flagcdn.com/es.svg"
                  />
                }
              >
                Spain
              </DropdownItem>
              <DropdownItem
                key="99_uptime"
                description="Good and relax life, family oriented, friendly people, learn more here."
                onClick={() => router.push(`/${locale}/blog/mexico`)}
                startContent={
                  <Avatar
                    alt="USA"
                    className="w-6 h-6"
                    src="https://flagcdn.com/mx.svg"
                  />
                }
              >
                Mexico
              </DropdownItem>
              <DropdownItem
                key="production_ready"
                description="Want to move to America? Read more here."
                onClick={() => router.push(`/${locale}/blog/usa`)}
                startContent={
                  <Avatar
                    alt="USA"
                    className="w-6 h-6"
                    src="https://flagcdn.com/us.svg"
                  />
                }
              >
                United States
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        {firebaseUser && (
          <>
            <NavbarItem>
              <Link color="foreground" href={`/${locale}/dashboard`}>
                {t("menu_dashboard_label")}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href={`/${locale}/dashboard/profile`}>
                {t("menu_check_profile_label")}
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarContent justify="end" as="div" className="items-center">
        {firebaseUser && (
          <NavbarItem>
            <Button
              color="primary"
              variant="flat"
              onClick={() => handleLogout()}
            >
              {t("menu_logout_label")}
            </Button>
          </NavbarItem>
        )}
        <NavbarItem>
          <LanguageSelector />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              className="w-full"
              href="#"
            >
              {/* {item} */}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

interface ItemsType {
  label: string;
  href: string;
  items?: React.JSX.Element[];
}
function handleLoggedItems(
  items: ItemsType[],
  pathname: string,
  locale: string
) {
  return items.map((data, key) => {
    if (data.items) {
      return (
        <Dropdown key={`${data.label}-${key}`}>
          <DropdownTrigger>
            <Button
              key={`${data.label}-${key}`}
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent"
              endContent={<ChevronDown fill="currentColor" size={16} />}
              radius="sm"
              variant="light"
            >
              {data.label}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {data.items}
          </DropdownMenu>
        </Dropdown>
      );
    }
    return (
      <NavbarItem
        key={`${data.label}-${key}`}
        isActive={pathname === data.href}
      >
        <Link color="foreground" href={`${data.href}`}>
          {data.label}
        </Link>
      </NavbarItem>
    );
  });
}

const icons = {
  chevron: <ChevronDown fill="currentColor" size={16} />,
  scale: <Scale className="text-warning" fill="currentColor" size={30} />,
  lock: <Lock className="text-success" fill="currentColor" size={30} />,
  activity: (
    <Activity className="text-secondary" fill="currentColor" size={30} />
  ),
  flash: <Flash className="text-primary" fill="currentColor" size={30} />,
  server: <Server className="text-success" fill="currentColor" size={30} />,
  user: <TagUser className="text-danger" fill="currentColor" size={30} />,
};
