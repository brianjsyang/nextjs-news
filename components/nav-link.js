'use client'; // this JS is outsourced to reduce the client compoenent to smallest part.

import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function NavLink({href, children}) {
  const path = usePathname();
  
  return (
    <Link 
      href={href} 
      className={path.startsWith(href) ? 'active' : undefined}
    >
        {children}
    </Link>
  );
}