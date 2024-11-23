

declare interface UploadFileProps {
    file: File;
    ownerId: string;
    accountId: string;
    path: string;
}

declare interface SearchParmsProps {
    params?: Promise<SegmentParams>;
    searchParams?: Promise<{[key: string]: string | string[] | undefined}>;   
}

declare interface DropdownAction {
    value: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }
