import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex items-center justify-between py-4'>
        <Link href="/" className='w-36'>
          <Image src="/assets/images/logo.svg" width={160} height={38} alt="SEC NEXUS Logo" />
        </Link>

        <div className='flex w-32 justify-end gap-3'>
            
          </div>
      </div>
    </header>
  )
}

export default Header
