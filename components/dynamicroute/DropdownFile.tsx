"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { deleteFile, renameFile, updateFileUsers } from "@/lib/actions/files.actions";
import { usePathname } from "next/navigation";
import Image from "next/image";


const DropdownFile = ({file}: {file: Models.Document}) => {

    const [isModalOpen, setisModalOpen] = useState<boolean>(false);
    const [isDropDownOpen, setisDropdownOpen] = useState<boolean>(false);
    const [action, setAction] = useState<DropdownAction | null >(null);
    const [name, setName] = useState(file.name);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [emails, setEmails] = useState<string[]>([]);

    const path = usePathname();


    const closeAllModals = () => {
      setisModalOpen(false);
      setisDropdownOpen(false);
      setAction(null);
      setName(file.name);
      //   setEmails([]);
    };
  
    const handleAction = async () => {
      if (!action) return;
      setIsLoading(true);
      let success = false;
  
      const actions = {
        rename: () =>
          renameFile({ fileId: file.$id, name, extension: file.extension, path }),
        share: () => updateFileUsers({ fileId: file.$id, emails, path }),
        delete: () =>
          deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId, path }),
      };
  
      success = await actions[action.value as keyof typeof actions]();
  
      if (success) closeAllModals();
  
      setIsLoading(false);
    };
  


    const renderDialog = () => {

      if(!action) return null;

      const { value, label } = action;

      return (
        <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row w-full">
            <Button onClick={closeAllModals} className="bg-slate-50 hover:bg-secondary text-black  hover:text-white rounded-full shadow-sm">
              Cancel
            </Button>
            <Button onClick={handleAction} className={`bg-primary hover:bg-accent-blue rounded-full text-white font-medium ${isLoading ? `disabled:true`: `disabled:false`}`}>
              <p className="capitalize">{value}</p>
            </Button>
          </DialogFooter>
        )}
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
                    
                      setAction(actionItem);
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
                            className="flex flex-row gap-4 items-center cursor-pointer">
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