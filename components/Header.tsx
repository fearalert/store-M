"use client";

import React, { useState } from 'react'
import { Input } from './ui/input'
import { SearchIcon, UploadCloudIcon } from 'lucide-react';
import { Button } from './ui/button';
// import { useToast } from '@/hooks/useToast';

const Header = () => {
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
        <Button onClick={handleClick} className='bg-primary hover:bg-primary text-white relative w-[200px] rounded-full h-12 font-bold text-md'>Upload 
            <UploadCloudIcon
                className='text-white hover:bg-primary bg-primary'
                width={24}
                height={24}
                style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                }}
            />
      </Button>
        <div className='flex items-center justify-center bg-primary text-white font-bold rounded-full w-12 h-12 text-center'>R</div>
      </div>
    </header>
  )
}

export default Header