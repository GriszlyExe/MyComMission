export interface PostData {
    postName: string;
    postDescription?: string | null;
    postTags: (string | undefined)[];
    price: number;
    samples: (FilePreview | undefined)[];
}

export interface FilePreview {
    file: File | undefined;
    preview: string | undefined;
}