"use client";

import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MAX_FILE_SIZE } from '@/constants/constants';
import { useToast } from '@/hooks/useToast';
import { convertFileToUrl, getFileType } from '@/lib/utils';
import Thumbnail from './Thumbnail';
import { uploadFile } from '@/lib/actions/files.actions';

interface Props {
    ownerId: string;
    accountId: string;
    className: string;
}

export default function UploadFilesComponent({ownerId, accountId, className}: Props) {
    const path = usePathname();
    const [files, setFiles] = useState<File[]>([]);

    const { errorToast } = useToast();

    const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name),
          );

          errorToast("Max File Size is 50MB")
        }

        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name),
              );
            }
          },
        );
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path],
  );

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button className={`bg-primary hover:bg-primary text-white relative rounded-full h-12 w-full font-bold text-md ${className}`}>Upload Files
            <UploadCloud
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
                {
                    files.length > 0 && <ul className='fixed bottom-10 right-10 z-50 flex size-full h-fit max-w-[400px] flex-col gap-3 rounded-lg bg-white p-7 shadow-drop-3'>
                     <h4 className="h4 text-text-half">Uploading File</h4>

                    {files.map((file, index) => {
                        const { fileType, extension } = getFileType(file.name);

                        const handleRemoveFile = (
                            e: React.MouseEvent<HTMLImageElement, MouseEvent>,
                            fileName: string,
                        ) => {
                            e.stopPropagation();
                            setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
                        };
                    return (
                        <li
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between gap-3 rounded-xl p-3 shadow-drop-3"
                        >
                        <div className="flex items-center gap-3">
                            <Thumbnail
                                type={fileType}
                                extension={extension}
                                url={convertFileToUrl(file)}
                            />
                            <div className="mb-2 max-w-[300px]">
                            {file.name}
                            <Image
                                src="/assets/icons/file-loader.gif"
                                width={80}
                                height={26}
                                alt="Loader"
                            />
                            </div>
                        </div>

                        <Image
                            src="/remove.svg"
                            width={24}
                            height={24}
                            alt="Remove"
                            onClick={(e) => handleRemoveFile(e, file.name)}
                        />
                        </li>
                    );
                    })}
                </ul>
            }
      {/* {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      } */}
    </div>
  )
}