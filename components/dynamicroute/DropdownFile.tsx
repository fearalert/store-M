"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { dropdownActions } from "@/constants/constants";
import { constructDownloadUrl } from "@/lib/utils";
import { EllipsisVerticalIcon, Icon } from "lucide-react";
import Link from "next/link";
import { Models } from "node-appwrite";


import { useState } from "react";


const DropdownFile = ({file}: {file: Models.Document}) => {

    const [isModalOpen, setisModalOpen] = useState<boolean>(false);
    const [isDropDownOpen, setisDropdownOpen] = useState<boolean>(false);
    const [action, setAction] = useState<DropdownAction | null >(null);


    const renderDialog = () => {

      if(!action) return null;

      const { value, label } = action;
      
      return (
        <DialogContent className="rounded-lg max-w-[400px] w-full">
          <DialogHeader className="flex flex-col gap-3">
            <DialogTitle className="text-center text-text-half">Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      );
    }
    
    return(
        <Dialog open={isModalOpen} onOpenChange={setisModalOpen}>
           <DropdownMenu open={isDropDownOpen} onOpenChange={setisDropdownOpen}>
            <DropdownMenuTrigger className="h-8 w-auto">
              <EllipsisVerticalIcon className="text-text-half h-6"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="max-w-[200px] truncate">{file.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {
                dropdownActions.map((actionItem) => (
                  <DropdownMenuItem key={actionItem.value} className='w-auto' 
                    onClick={() => {
                    
                      setAction(action);
                      if(["rename", "share", "delete", "details"].includes(actionItem.value)){
                        setisModalOpen(true);
                      }
                      }}>
                      {
                        actionItem.value.includes("download") ?
                        (
                          <Link href={constructDownloadUrl(file.bucketFileId)} 
                            download={file.name}
                            className="flex flex-row gap-4 items-center">
                                <actionItem.icon className="w-6 h-6 text-secondary" />
                              <p className="text-text-half font-medium">{actionItem.label}</p>
                          </Link>
                        ):
                        (
                          <div
                            className="flex flex-row gap-4 items-center">
                              {actionItem.value.includes("rename") && 
                                <actionItem.icon className="w-6 h-6 text-accent-yellow" />
                              }
                              {actionItem.value.includes("details") && 
                                <actionItem.icon className="w-6 h-6 text-accent-green" />
                              }
                              {actionItem.value.includes("share") && 
                                <actionItem.icon className="w-6 h-6 text-accent-blue" />
                              }
                              {actionItem.value.includes("delete") && 
                                <actionItem.icon className="w-6 h-6 text-accent-red" />
                              }
                              <p className="text-text-half font-medium">{actionItem.label}</p>
                          </div>
                        )
                      }
                  </DropdownMenuItem>

                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
          {renderDialog()}
        </Dialog>
    );
}

export default DropdownFile