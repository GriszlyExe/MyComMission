export interface PostData {
    name: string;
    description?: string | null;
    tags: any[];
    price: number;
    samples: any[];
}

export interface FilePreview {
    file: File;
    preview: string;
}