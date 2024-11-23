"use client";

import { LogOut, MenuIcon, UploadCloud } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { sidebarItems, SidebarProps } from './Sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button';
import { logOutUser } from '@/lib/actions/user.action';
import UploadFiles from './UploadFiles';

interface MobileNavProps {
  $id: string;
  fullName: string;
  email: string;
  avatar: string;
  accountId: string;
}

const MobileNavigation = ({$id:ownerId, fullName, email, avatar, accountId}: MobileNavProps) => {

  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname])

  return (
    <header className="flex flex-row justify-between bg-white px-4">
        <Image
                src="/logo-blue.png"
                alt="logo"
                width={222}
                height={80}
                className="h-auto py-8 px-4"
                priority
              />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger><MenuIcon /></SheetTrigger>
        <SheetContent className="w-[400px] flex flex-col justify-start items-start">
            <SheetTitle className=" bg-primary w-full my-2 px-4 rounded-lg">
            <div className="flex flex-row items-center justify-center gap-6 my-2">
              <Image
                  src={avatar}
                  alt="logo"
                  width={32}
                  height={24}
                  className=" h-12 w-12 bg-primary rounded-full"
                />
                <div className="flex flex-col gap-1 py-2">
                    <h5 className="text-white text-md font-bold">{fullName}</h5>
                    <span className="font-medium text-xs text-slate-100">{email}</span>
                </div>
            </div>
            </SheetTitle>
              <ul className='w-full'>
                {sidebarItems.map((item) => {
                  const isActiveTab = pathname === item.link;
                  return(
                  <li key={item.id}>
                    <Link href={item.link} className={`flex flex-row gap-4 rounded-full mx-4 px-4 py-4 ${isActiveTab? `bg-primary` : ``}`}>
                      <item.icons className={`${isActiveTab? `text-white dark:text-black` : `text-text-half`}`} />
                      <span className={`${isActiveTab? `text-white dark:text-black font-bold` : `text-text-half`}`}>
                        {item.name}
                      </span>
                    </Link>
                  </li>
                )})}
            </ul>

            <div className="flex flex-col justify-between gap-5 px-4 pt-20 w-full">
            <UploadFiles ownerId={ownerId} accountId={accountId} className={'w-full'} />
            <Button
              type="submit"
              className="bg-accent-red text-white px-4 py-2 items-center text-center rounded-full h-12"
              onClick={async () => await logOutUser()}
            >
              <LogOut className='text-white'/>
              <p>Logout</p>
            </Button>
          </div>

        </SheetContent>
    </Sheet>
  </header>
  )
}

export default MobileNavigation