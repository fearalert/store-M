import { icons } from "lucide-react";

export const defaultAvatarUrl = "https://th.bing.com/th/id/OIP.5kU_nQdgEEPluSjSXhKZSAHaHa?w=177&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7";

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/;

export const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const dropdownActions = [
    {
        value : "rename",
        label : "Rename",
        icon : icons.FilePenLine
    },
    {
        value : "details",
        label : "Details",
        icon : icons.NotebookTabs
    },
    {
        value : "share",
        label : "Share",
        icon : icons.Share2
    },
    {
        value : "download",
        label : "Download",
        icon : icons.Download
    },
    {
        value : "delete",
        label : "Delete",
        icon : icons.Delete
    }
]