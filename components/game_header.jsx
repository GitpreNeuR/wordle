"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Trophy, KeyRound, XCircle, GamepadIcon, Menu } from "lucide-react"
import Link from "next/link"
import { useMobile } from "@/hooks/use_mobile"
import { createClient } from "@/lib/supabase/client"
import toast from "react-hot-toast"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { useRouter } from "next/navigation"


export default function GameHeader({ username, avatarUrl, gameWins, gameLosses, gameEntries }) {
  const isMobile = useMobile()
  const supabase = createClient();
  const router = useRouter();
  const [navMobile, setNavMobile] = useState(false);

  const avatarLetter = username?.charAt(0)?.toUpperCase();
  const getRandomColor = (str) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500',
      'bg-yellow-500', 'bg-purple-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
    ]
    const hash = str?.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0) || 0
    return colors[hash % colors.length]
  }
  const bgColor = getRandomColor(username);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      toast.success('Logged out successfully')
      router.push('/')
      router.refresh()
    } catch (error) {
      toast.error(error.message)
    }
  };

  const closeMobileNav = () => {
    setNavMobile(false)
  }



  return (
    <header className="w-full py-4 px-4 md:px-6 bg-background">
      <div className="container mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded bg-secondary/20">
            <KeyRound className="h-5 w-5 text-foreground" />
          </div>
          <span className="text-xl font-medium text-foreground">Wordle</span>
        </div>

        {isMobile && (
          <Sheet open={navMobile} onOpenChange={setNavMobile}>
            <SheetTrigger asChild>
              <Menu className="h-8 w-8 cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle className="flex  text-base items-center">
                  <KeyRound className="h-6 w-6 mr-2" />
                  Wordle
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col space-y-2">


                <div className="px-4 py-2 mt-4 text-base text-muted-foreground">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="h-6 w-6 text-green-500" />
                    <span>Wins: {gameWins}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <XCircle className="h-6 w-6 text-red-500" />
                    <span>Losses: {gameLosses}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GamepadIcon className="h-6 w-6 text-blue-500" />
                    <span>Entries: {gameEntries}</span>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        )}

        <div className="flex items-center space-x-8">
          {!isMobile && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-base">
                <Trophy className="h-6 w-6 text-green-500" />
                <span>{gameWins}</span>
              </div>
              <div className="flex items-center gap-3 text-base">
                <XCircle className="h-6 w-6 text-red-500" />
                <span>{gameLosses}</span>
              </div>
              <div className="flex items-center gap-3 text-base">
                <GamepadIcon className="h-6 w-6 text-blue-500" />
                <span>{gameEntries}</span>
              </div>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="h-12 w-12 border-primary border-2">
                <AvatarImage className="cursor-pointer" src={avatarUrl || "/placeholder.svg"} alt={username} />
                <AvatarFallback className={`cursor-pointer ${bgColor} text-white font-bold text-xl`}>
                  {avatarLetter}
                </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5 text-base font-medium">{username}</div>
              <DropdownMenuSeparator />
              {isMobile && (
                <>
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="h-3 w-3 text-green-500" />
                      <span>Wins: {gameWins}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <XCircle className="h-3 w-3 text-red-500" />
                      <span>Losses: {gameLosses}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GamepadIcon className="h-3 w-3 text-blue-500" />
                      <span>Entries: {gameEntries}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem asChild className="cursor-pointer text-base">
                <Link href="/profile">
                  <User className="mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-base">
                <LogOut className="mr-2 text-destructive" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
