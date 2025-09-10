"use client"

import { headerLinks, adminLinks } from '@/constants';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HARD_CODED_ADMIN } from '@/lib/config/admin';
import { useUser } from '@clerk/nextjs';

const NavItems = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const response = await fetch('/api/users-sync', { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
      }
    };

    checkAdminRole();
  }, []);

  return (
    <nav>
      <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
        {headerLinks.map((link) => {
          const isActive = pathname === link.route;
          const isProtected = link.route === '/events/create' || link.route === '/profile';
          const targetRoute = isProtected && !user ? '/sign-in' : link.route;

          return (
            <li key={link.route}
              className={`${
                isActive ? 'text-primary-500' : 'text-gray-700'
              } flex-center p-medium-16 whitespace-nowrap cursor-pointer`}>
              <Link href={targetRoute} className={isActive ? 'text-blue-500' : ''}>
                {link.label}
              </Link>
            </li>
          )
        })}
        {isAdmin && user?.id === HARD_CODED_ADMIN.clerkId && adminLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <li key={link.route}
              className={`${
                isActive ? 'text-primary-500' : 'text-gray-700'
              } flex-center p-medium-16 whitespace-nowrap cursor-pointer`}>
              <Link href={link.route} className={isActive ? 'text-blue-500' : ''}>
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  );
};

export default NavItems;
