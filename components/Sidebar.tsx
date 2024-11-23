"use client"

import { icons } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export interface SidebarProps {
  fullName: string;
  email: string;
  avatar: string;
}

export const sidebarItems = [
  { id: 1, name: 'Dashboard', link: '/home', icons: icons.LayoutDashboard },
  { id: 2, name: 'Documents', link: '/documents', icons: icons.FileBox },
  { id: 3, name: 'Images', link: '/images', icons: icons.Image },
  { id: 4, name: 'Audio/Video', link: '/video', icons: icons.Video },
  { id: 5, name: 'Others', link: '/others', icons: icons.ShipWheel },
]

const Sidebar = ({fullName, email, avatar}: SidebarProps) => {

  const pathname = usePathname();
 
  return (
    <aside className='hidden md:flex lg:flex flex-col max-h-screen w-[300px] justify-between bg-white dark:bg-black'>
      <div className='flex flex-col'>
        <Image
            src="/logo-blue.png"
            alt="logo"
            width={224}
            height={82}
            className="h-auto py-8 px-4"
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
            className="h-auto py-8 px-4 object-contain bg-slate-100 mx-4"
          />
      <div className="flex flex-row items-center justify-center gap-2 bg-slate-100 px-6 mx-4 my-4 rounded-md">
        <Image
            src={avatar}
            alt="logo"
            width={32}
            height={24}
            className=" h-8 w-8 bg-primary rounded-full"
          />
          <div className="flex flex-col gap-1 py-2">
              <h5 className="text-black text-md font-bold">{fullName}</h5>
              <span className="font-normal text-xs text-text-half">{email}</span>
          </div>
      </div>
    </aside>
  )
}

export default Sidebar