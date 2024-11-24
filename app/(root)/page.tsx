import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";

import { Thumbnail } from "@/components/Thumbnail";
import { convertFileSize, formatDateTime, getUsageSummary } from "@/lib/utils";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/files.actions";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Chart } from "@/components/dashboard/Chart";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="flex w-full sm:max-w-7xl md:max-w-7xl lg:max-w-[80vw] xl:max-w-[80vw] flex-col items-start justify-start gap-8">
        <h1 className='text-3xl font-bold'>{"Dashboard".toLocaleUpperCase()}</h1>
        <div className="w-full sm:max-w-7xl md:max-w-7xl lg:max-w-[80vw] xl:max-w-[80vw] flex xl:flex-row lg:flex-row sm:flex-col md:flex-col xs:flex-col gap-8 justify-between">
        <section className="flex flex-col items-start justify-start max-w-[800px] min-w-[360px] w-full">
            <Chart used={totalSpace.used} />

            <ul className="grid grid-cols-2 gap-4 xl:mt-10 xl:grid-cols-2 w-full" >
            {usageSummary.map((summary: any) => (
                <Link
                href={summary.url}
                key={summary.title}
                className="relative rounded-2xl bg-white p-5 transition-all hover:scale-90"
                >
                <div className="space-y-2">
                    <div className="flex justify-between gap-2 px-4 py-4">
                    <Image src={summary.icon} className="z-10 bg-slate-50 p-2 object-contain rounded-full" alt={"icon"} width={60} height={60} priority/>
                    <h4 className="h4 relative z-20 w-full text-right">
                        {convertFileSize(summary.size) || 0}
                    </h4>
                    </div>

                    <h5 className="font-bold text-xl relative z-20 text-start">{summary.title}</h5>
                    <Separator className="bg-slate-400 w-full" />
                    <span className='text-text-half text-sm font-normal'>{formatDateTime(summary.$updatedAt)}</span>
                </div>
                </Link>
            ))}
            </ul>
        </section>

        <section className="h-full rounded-[20px] bg-white p-5 xl:p-8 max-w-[680px] min-w-[360px] w-full">
            <h2 className="font-bold text-lg text-text">Recent files uploaded</h2>
            {files.documents.length > 0 ? (
            <ul className="mt-5 flex flex-col gap-5">
                {files.documents.map((file: Models.Document) => (
                <Link
                    href={file.url}
                    target="_blank"
                    className="flex items-center gap-3"
                    key={file.$id}
                >
                    <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                    />

                    <div className="flex w-full flex-col xl:flex-row xl:justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="w-full text-light-100 sm:max-w-[200px] lg:max-w-[250px] text-half font-bold">{file.name}</p>
                        <span className='text-text-half text-sm font-normal'>{formatDateTime(file.$createdAt)}</span>
                    </div>
                    {/* <ActionDropdown file={file} /> */}
                    </div>
                </Link>
                ))}
            </ul>
            ) : (
            <p className="empty-list">No files uploaded</p>
            )}
        </section>

        </div>
    </div>
  );
};

export default Dashboard;