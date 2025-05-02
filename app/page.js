import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'

function HomePage() {
  return (
    <>
    <Link href="/main">
    <Button>DASHBOARD</Button>
    </Link>
     
    </>
  )
}

export default HomePage
