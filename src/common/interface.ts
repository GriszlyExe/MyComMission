export interface PostData {
    postDescription: string;
    postTags: (string | undefined)[];
    samples: (FilePreview | undefined)[];
}

export interface FilePreview {
    file: File | undefined;
    preview: string | undefined;
}