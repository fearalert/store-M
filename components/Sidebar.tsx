"use client"

import { icons } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {

  const pathname = usePathname();
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const sidebarItems = [
    { id: 1, name: 'Dashboard', link: '/home', icons: icons.LayoutDashboard },
    { id: 2, name: 'Documents', link: '/documents', icons: icons.FileBox },
    { id: 3, name: 'Images', link: '/images', icons: icons.Image },
    { id: 4, name: 'Audio/Video', link: '/video', icons: icons.Video },
    { id: 5, name: 'Others', link: '/others', icons: icons.ShipWheel },
  ]
  return (
    <div className='hidden md:flex lg:flex flex-col h-screen w-[280px] justify-between bg-white dark:bg-black'>
      <div className='flex flex-col'>
        <Image
            src="/logo-blue.png"
            alt="logo"
            width={224}
            height={82}
            className="h-auto py-12 px-4"
          />
          <ul>
        {sidebarItems.map((item) => {
          const isActiveTab = pathname === item.link;
          return(
          <li key={item.id}>
            <Link href={item.link} className={`flex flex-row gap-4 rounded-full mx-4 px-4 py-4 ${isActiveTab? `bg-primary` : ``}`}>
              <item.icons className={`${isActiveTab? `text-white dark:text-black` : `text-text-half`}`} />
              <p className={`${isActiveTab? `text-white dark:text-black font-bold` : `text-text-half`}`}>
                {item.name}
              </p>
            </Link>
          </li>
        )})}
      </ul>
      </div>
      <Image
            src="/file.png"
            alt="logo"
            width={280}
            height={82}
            className="h-auto py-12 px-4"
          />
    </div>
  )
}

export default Sidebar