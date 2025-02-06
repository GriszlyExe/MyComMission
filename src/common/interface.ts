export interface PostData {
    name: string;
    description?: string | null;
    tags: (string | undefined)[];
    price: number;
    samples: (FilePreview | undefined)[];
}

export interface FilePreview {
    file: File | undefined;
    preview: string | undefined;
}