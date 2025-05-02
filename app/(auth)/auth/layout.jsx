
import { KeyRound } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

export default function AuthLayout({ children }) {
  return (
    <>
    <div className="flex min-h-dvh">
      <div className="flex w-full flex-col justify-center bg-background p-8 md:w-1/2 lg:p-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-12 flex items-center ">
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded bg-secondary/20">
              <KeyRound className="h-5 w-5 text-foreground" />
            </div>
            <span className="text-xl font-medium text-foreground">Wordle</span>
          </div>

          {children}
        </div>

      </div>

      <div className="relative hidden overflow-hidden md:flex md:w-1/2 md:flex-col md:items-center md:justify-center">
        <div className="absolute inset-0 bg-secondary/20"/>
          
        

        <div className="absolute inset-0 backdrop-blur-md bg-background/10"></div>

        <div className="relative z-10 max-w-md space-y-4 p-12 text-foreground">
          <h2 className="text-3xl font-bold">Play Wordle Daily</h2>
          <p className="text-emerald-100">Guess the hidden word in 6 tries. A new puzzle is available each day.</p>
          <div className="flex space-x-2 pt-4">
            <div className="flex h-12 w-12 items-center justify-center rounded border-2 border-emerald-500 bg-emerald-500 text-xl font-bold text-white">
              W
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded border-2 border-yellow-500 bg-yellow-500 text-xl font-bold text-white">
              O
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded border-2 border-gray-500 bg-gray-500 text-xl font-bold text-white">
              R
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded border-2 border-gray-500 bg-gray-500 text-xl font-bold text-white">
              D
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded border-2 border-emerald-500 bg-emerald-500 text-xl font-bold text-white">
              S
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toaster/>
    </>
  )
}
