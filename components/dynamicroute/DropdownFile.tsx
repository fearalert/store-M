"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { constructDownloadUrl, convertFileSize, formatDateTime } from "@/lib/utils";
import { DeleteIcon, EllipsisVerticalIcon } from "lucide-react";
import Link from "next/link";
import { Models } from "node-appwrite";


import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { deleteFile, renameFile, updateFileUsers } from "@/lib/actions/files.actions";
import { usePathname } from "next/navigation";
import Thumbnail from "../Thumbnail";

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <Thumbnail type={file.type} extension={file.extension}/>

      <div>
        <p className="pl-1 text-text-half">
          Share file with other users
        </p>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="text-slate-300">Shared with</p>
            <p className="text-text-half">
              {file.users.length} users
            </p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="font-normal text-text">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="bg-accent-red"
                >
                  <DeleteIcon />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

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
  

    const handleRemoveUser = async (email: string) => {
      const updatedEmails = emails.filter((e) => e !== email);
  
      const success = await updateFileUsers({
        fileId: file.$id,
        emails: updatedEmails,
        path,
      });
  
      if (success) setEmails(updatedEmails);
      closeAllModals();
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
          {
            value === "details" && (
              <div className='flex flex-col gap-4 px-4 py-8 bg-white rounded-md w-full'>
                    <div className='flex flex-row text-center justify-between gap-8 bg-slate-50 rounded-lg px-4 py-4'>
                        <Thumbnail type={file.type} extension={file.extension} url={file.url} className="rounded-full bg-white"/>
                        <div className='flex flex-col gap-4'>
                          <h1 className='text-md font-bold text-text'>{file.name.toLocaleUpperCase()}</h1>
                          <h6 className='text-text-half text-sm font-normal'>{formatDateTime(file.$updatedAt)}</h6>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 justify-start items-start w-full">
                        <div className="flex flex-row justify-between w-full">
                            <p className="text-text-half font-normal">Extension</p>
                            <p className="text-secondary font-semibold">{file.extension}</p>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                            <p className="text-text-half font-normal">Owner Name</p>
                            <p className="text-primary font-semibold">{file.owner.fullName}</p>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                            <p className="text-text-half font-normal">File Size</p>
                            <p className="text-accent-green font-semibold">{convertFileSize(file.size)}</p>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                            <p className="text-text-half font-normal">Created At</p>
                            <p className="text-accent-yellow font-semibold">{formatDateTime(file.$createdAt)}</p>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                            <p className="text-text-half font-normal">Updated At</p>
                            <p className="text-dark-yellow font-semibold">{formatDateTime(file.$updatedAt)}</p>
                        </div>
                    </div>
                </div>
            )
          }
          {
            value === "share" && (
              <ShareInput file={file} onInputChange={setEmails} onRemove={handleRemoveUser} />
            )
          }
          {value === "delete" && (
            <p className="text-text-half font-bold">
              Are you sure you want to delete{` `}
              <span className="text-accent-red">{file.name}</span>?
            </p>
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