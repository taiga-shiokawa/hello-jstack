"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* ロゴ */}
        <Link href="/" className="flex items-center space-x-2 px-4 xl:px-8">
          <span className="font-bold text-[30px]">Hello JStack!</span>
        </Link>

        {/* 右側のドロップダウンメニュー */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link href="/" className="flex items-center xl:px-8 sm:px-6">
            <span className="font-bold">Home</span>
          </Link>
          <Link href="/blog" className="flex items-center xl:px-8 sm:px-6">
            <span className="font-bold">Blog</span>
          </Link>
          <Link href="/about" className="flex items-center xl:px-8 sm:px-6">
            <span className="font-bold">About</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                ライトモード
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                ダークモード
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
