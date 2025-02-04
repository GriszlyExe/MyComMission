export interface PostData {
    name: string;
    description: string;
    tags: string[];
    price: string;
    samples: FilePreview[];
}

export interface FilePreview {
    file: File;
    preview: string;
}