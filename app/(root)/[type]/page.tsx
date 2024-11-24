import DropdownFile from '@/components/dynamicroute/DropdownFile';
import SortComponent from '@/components/SortComponent';
import Thumbnail from '@/components/Thumbnail';
import { getFiles } from '@/lib/actions/files.actions';
import { convertFileSize, formatDateTime, getFileParams, getFileType, getUsageSummary } from '@/lib/utils';
import Link from 'next/link';
import { Models } from "node-appwrite";

import React from 'react'

const DynamicPage = async({searchParams, params}: SearchParmsProps) => {

    const type = ((await params)?.type as string) || "";
    const searchText = ((await searchParams)?.query as string) || "";
    const sort = ((await searchParams)?.sort as string) || "";

    const types = getFileParams(type) as FileType[];

    const files = await getFiles({ types, searchText, sort });

    return (
        <div className='page-container-css'>
            <section className='w-full'>
                <h1 className='text-3xl font-bold'>{type.toLocaleUpperCase()}</h1>
                <div className='flex mt-2 flex-col justify-between sm:flex-row sm:items-center'>
                    <p className='text-text-half font-bold'>
                        Total: <span className='text-text-half text-opacity-80 font-semibold'>{"0 MB"}</span>
                    </p>
                    
                    <div className='mt-5 flex items-center sm:mt-0 sm:gap-3'>
                        <p className='hidden sm:block text-text-half w-full'>
                            Sort By:
                        </p>
                        <SortComponent />
                    </div>
                </div>
            </section>

            {/* Render Files here */}
           {files.total > 0 ? (
                <section className='grid w-full gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4'>
                        {files.documents.map((file: Models.Document) => (
                            <div key={file.$id} className='flex flex-col gap-4 px-4 py-8 bg-white rounded-2xl shadow-md shadow-slate-200 w-full'>
                                <div className='flex flex-row text-center justify-between gap-8'>
                                        <Link href={file.url} target="_blank">
                                            <Thumbnail type={file.type} extension={file.extension} url={file.url}/>
                                        </Link >
                                        <DropdownFile file={file} />
                                    </div>
                                <div className='flex flex-col gap-4'>
                                    <h1 className='text-md font-bold text-text'>{file.name.toLocaleUpperCase()}</h1>
                                    <div className='flex flex-row text-center justify-between gap-8'>
                                        <span className='text-text-half text-sm font-normal'>{formatDateTime(file.$createdAt)}</span>
                                        <h6 className='text-text text-sm font-bold'>{convertFileSize(file.size)}</h6>
                                    </div>
                                    <p className="text-xs text-text-half">
                                            By: {file.owner.fullName}
                                    </p>
                                </div>
                            </div>
                        )
                        )}
                </section>
           ):
           <p className='flex items-center justify-center text-center text-secondary text-lg px-12'>No files found</p> 
           }
        </div>
    )
}

export default DynamicPage