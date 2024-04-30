"use client";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Logo from "../_components/logo";
import useGetAuth from "@/api/hooks/useGetAuth";
import store from "@/api/store";
import { signOut } from "firebase/auth";
import { auth } from "@/api/firebase";
import { useEffect } from "react";

const menuItems = [
  {
    label: "Home",
    href: "/dashboard",
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useGetAuth();
  const userStore = store();
  const router = useRouter();

  useEffect(() => {
    function handleAccess() {
      if (!user && !userStore.user) router.replace("/");
    }
    handleAccess();
  }, [user, userStore.user, router]);

  async function handleLogout() {
    await signOut(auth);
    router.replace("/");
  }
  return (
    <>
      <Navbar
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
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
          {menuItems.map((item, key) => {
            if (item.label === "Profile") {
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
                    <DropdownItem
                      key="profile"
                      onClick={() => router.push("/dashboard/profile")}
                    >
                      Check Profile
                    </DropdownItem>
                    <DropdownItem key="logout" onClick={handleLogout}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              );
            }
            return (
              <NavbarItem
                key={`${item.label}-${key}`}
                isActive={pathname === item.href}
              >
                <Link color="foreground" href={item.href}>
                  {item.label}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem>
            <Link className="w-full" href="/dashboard">
              Home
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" href="/dashboard/profile">
              Profile
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem onClick={handleLogout}>Logout</NavbarMenuItem>
        </NavbarMenu>
        <NavbarContent as="div" justify="end">
          {/*  */}
        </NavbarContent>
      </Navbar>
      {children}
    </>
  );
}
