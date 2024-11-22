import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));


export const getFileType = (fileName: string) => {
  const extension =  fileName.split('.').pop()?.toLowerCase();

  if(!extension) return { fileType: "other", extension: ""};

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "csv",
    "rtf",
    "ods",
    "ppt",
    "odp",
    "md",
    "html",
    "htm",
    "epub",
    "pages",
    "fig",
    "psd",
    "ai",
    "indd",
    "xd",
    "sketch",
    "afdesign",
    "afphoto",
    "afphoto",
  ];

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = ["mp4", "avi", "mov", "mkv", "webm"];
  const audioExtensions = ["mp3", "wav", "ogg", "flac"];


  if(documentExtensions.includes(extension)){
    return {fileType: "Document", fileName}
  }

  if (imageExtensions.includes(extension)){
    return {fileType: "Images", fileName}
  }

  if (videoExtensions.includes(extension)){
    return {fileType: "Video", fileName}
  }

  if (audioExtensions.includes(extension)){
    return {fileType: "Audio", fileName}
  }

  return {fileType: "other", fileName}
}

export const getFileIcon = (
  extension: string | undefined,
  fileType: string,
)=> {
  switch (extension) {
    // Document
    case "pdf":
      return "/assets/icons/file-pdf.svg";
    case "doc":
      return "/assets/icons/file-doc.svg";
    case "docx":
      return "/assets/icons/file-docx.svg";
    case "csv":
      return "/assets/icons/file-csv.svg";
    case "txt":
      return "/assets/icons/file-txt.svg";
    case "xls":
    case "xlsx":
      return "/assets/icons/file-document.svg";
    // Image
    case "svg":
      return "/assets/icons/file-image.svg";
    // Video
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return "/assets/icons/file-video.svg";
    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return "/assets/icons/file-audio.svg";

    default:
      switch (fileType) {
        case "image":
          return "/assets/icons/file-image.svg";
        case "document":
          return "/assets/icons/file-document.svg";
        case "video":
          return "/assets/icons/file-video.svg";
        case "audio":
          return "/assets/icons/file-audio.svg";
        default:
          return "/assets/icons/file-other.svg";
      }
  }
}


export const getFileParams = (fileType: string) => {
  switch(fileType){
    case "documents":
      return["document"];
    case "images":
      return["image"];
    case "media":
      return["video", "audio"];
    case "other":
      return["other"];
    default:
      break;
  }
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const constructFileUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIX_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};