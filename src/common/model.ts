export type User = {
    userId: string | null;
    birthDate: Date | null;
    firstName: string | null;
    lastName: string | null;
    artistFlag: Boolean;
    email: string | null;
    displayName: string | null;
    phone: string | null;
    profileUrl: string | "/default-profile-2.png";
    age: number | null;
    pdfUrl: string | null;
    artistRate: number | null;
    enabled2FA: boolean | null;
    createdAt: Date | null,
    updatedAt: Date | null,
}

export type Post = {
    createdAt: Date;
    updatedAt: Date;
    postId: string;
    artistId: string;
    postName: string;
    likeCounts: number | 0,
    postDescription: string | null;
    picUrl1: string;
    picUrl2: string | null;
    picUrl3: string | null;
    picUrl4: string | null;
}