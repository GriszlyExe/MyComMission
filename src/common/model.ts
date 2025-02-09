export type User = {
    userId: string;
    birthDate: Date | string;
    firstName: string;
    lastName: string;
    artistFlag: Boolean;
    email: string;
    displayName: string;
    phone: string;
    profileUrl: string | "/default-profile-2.png";
    age: number;
    pdfUrl: string;
    artistRate: number;
    enabled2FA: boolean;
    createdAt: Date,
    updatedAt: Date,
}

export type Post = {
    createdAt: Date;
    updatedAt: Date;
    postId: string;
    price: number;
    artistId: string;
    postName: string;
    postTags: string[];
    likeCounts: number | 0,
    postDescription: string | null;
    picUrl1: string;
    picUrl2: string | null;
    picUrl3: string | null;
    picUrl4: string | null;
}