import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t ">
      {/* the "border-t" class is used to add a top border to the footer and SHOW the footer otherwise its undistinguishable */}
      <div className='flex-center wrapper flex-between flex flex-col gap-4 p-6 text-center sm:flex-row'>
        <Link href="/">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={128}
          height={38}
        />
        </Link>
        <p> 2025 SEC NEXUS. All Rights Reserved by @SAM because i making bohut mushkil se :( and this IS THE 15TH TIME AND DOING THIS</p>

      </div>
    </footer>
  )
}

export default Footer
