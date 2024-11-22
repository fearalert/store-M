"use client";

import React, { useState } from 'react'
import { Input } from './ui/input'
import { SearchIcon, UploadCloudIcon } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import UploadFiles from './UploadFiles';
// import { useToast } from '@/hooks/useToast';


interface HeaderProps{
  avatar: string;
  userId: string;
  accountId: string;
}

const Header = ({avatar, userId, accountId}: HeaderProps) => {
    const [value, setValue] = useState<string>("");

    // const { errorToast } = useToast();

    const handleClick = () => {
      // errorToast("Something went wrong!", "bottom-center");
    }
  return (
    <header className='hidden items-center justify-between gap-5 px-8 sm:flex py-4 bg-white'>
      <div className='relative min-w[300px] max-w-[500px] w-full'>
        <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search..."
            style={{ paddingLeft: '60px' }}
            className='border-0 rounded-full dark:bg-black bg-slate-100 text-text placeholder:text-text-half'
        />
      <SearchIcon
        className='text-text-half'
        style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      />
    </div>
    <div className="flex flex-row justify-center items-center gap-2 sm:hidden md:hidden lg:flex xs:hidden">
      <UploadFiles ownerId={userId} accountId={accountId} className={'w-[200px]'} />
      <Image
          src={avatar}
          alt="logo"
          width={32}
          height={24}
          className=" h-12 w-12 bg-primary rounded-full"
      />
      </div>
    </header>
  )
}

export default Header