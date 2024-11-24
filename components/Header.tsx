"use client";

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import UploadFiles from './UploadFiles';
import { getFiles } from '@/lib/actions/files.actions';
import { formatDateTime } from '@/lib/utils';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Models } from 'node-appwrite';
import { useDebounce } from 'use-debounce';
import Thumbnail from './Thumbnail';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { logOutUser } from '@/lib/actions/user.action';


interface HeaderProps{
  avatar: string;
  userId: string;
  accountId: string;
  email: string;
}

const Header = ({avatar, userId, accountId, email}: HeaderProps) => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [logoutOpen, setLogoutOpen] = useState<boolean>(false);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 300);

  const renderProfile = () => {
    return (
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogTrigger asChild>
          <div></div>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogTitle className="text-lg font-bold">My Profile</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col justify-start items-center text-sm text-half space-y-4 my-4">
                <Image
                  src={avatar}
                  alt="logo"
                  width={60}
                  height={60}
                  className="h-32 w-32 bg-primary rounded-full cursor-pointer"
                />
              <div>
                <strong>Email:</strong> {email}
              </div>
              {/* <div>
                <strong>Account ID:</strong> {accountId}
              </div> */}
              <div>
                <strong>User ID:</strong> {userId}
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  };

  const renderLogout = () => {
    return(
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
      <DialogContent className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-lg">
        <DialogTitle className="text-lg font-semibold text-center">
          Are you sure you want to log out?
        </DialogTitle>
        <DialogDescription className="text-sm text-center text-neutral-500 mt-4">
          You will need to log in again to access your account.
        </DialogDescription>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={async () => {
              await logOutUser();
              setLogoutOpen(false);
            }}
            className="px-4 py-2 bg-accent-red text-white rounded-lg hover:bg-dark-red"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => setLogoutOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            No, Stay Logged In
          </button>
        </div>
      </DialogContent>
    </Dialog>
    );
  }

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }

      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResults(files.documents);
      setOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`,
    );
  };
  return (
    <header className='items-center justify-between gap-5 px-8 sm:flex py-4 bg-white'>
     <div className="relative w-full md:max-w-[480px]">
        <div className='flex h-[52px] flex-1 items-center gap-3 rounded-full px-4 shadow-drop-3'>
          <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              style={{ paddingLeft: '60px' }}
              className='border-0 rounded-full dark:bg-black bg-slate-100 text-text placeholder:text-text-half'
          />
        <SearchIcon
          className='text-text-half'
          style={{
            position: 'absolute',
            left: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        />
        {open && (
          <ul className="absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-[20px] bg-white p-4 ">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  className="flex items-center justify-between"
                  key={file.$id}
                  onClick={() => handleClickItem(file)}
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="font-semibold text-text-half">
                      {file.name}
                    </p>
                  </div>
                  <span className='text-text-half text-sm font-normal'>{formatDateTime(file.$createdAt)}</span>
                </li>
              ))
            ) : (
              <p className="text-center text-text-half">No files found</p>
            )}
          </ul>
        )}
      </div>
    </div>
    <div className="flex flex-row justify-center items-center gap-2 sm:hidden md:hidden lg:flex xl:flex xs:hidden">
      <UploadFiles ownerId={userId} accountId={accountId} className={'w-[200px]'} />
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={avatar}
              alt="logo"
              width={32}
              height={32}
              className="h-12 w-12 bg-primary rounded-full cursor-pointer"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="w-[200px] bg-white rounded-md shadow-lg"
          >
            <DropdownMenuItem
              onSelect={() => setProfileOpen(true)}
              className="cursor-pointer hover:bg-secondary p-2 rounded-md"
            >
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setLogoutOpen(true)}
              className="cursor-pointer hover:bg-accent-red text-dark-red p-2 rounded-md"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
          {renderProfile()}
          {renderLogout()}
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header