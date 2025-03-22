export type User = {
    userId: string;
    birthDate: Date | string;
    bio: string;
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
    createdAt: string;
    updatedAt: string;
}

export type Post = {
    createdAt: string;
    updatedAt: string;
    postId: string;
    price: number;
    isHide: boolean;
    boostExpiredDate: Date;
    artistId: string;
    postName: string;
    postTags: string[];
    likeCounts: number | 0,
    postDescription: string | null;
    picUrl1: string;
    picUrl2: string | null;
    picUrl3: string | null;
    picUrl4: string | null;
    artist: User;
}

export type Review = {
    reviewId: string;
    reviewerId: string;
    revieweeId: string;
    rating: number;
    description: string | null;
    createdAt: string;
}

export type Commission = {
    commissionId: string;
    customerId: string;
    artistId: string;
    chatRoomId: string;
    state: "BRIEF" | "BRIEF_REJECTED" | "PROPOSAL" | "PROPOSAL_REJECTED" | "WORKING" | "FINISHED" | "CANCELLED";
    transactionId: string;
    artworkId: string;
    commissionName: string;
    briefDescription: string;
    budget: number;
    deadline: string;
    commercialUse: boolean;
    expectedDate: string;
    proposalPrice: number;
}

export type Message = {
    messageId: string;
    chatRoomId: string;
    senderId: string;
    messageType: "MESSAGE" | "COMMISSION" | "IMAGE";
    content: string;
    createdAt: string;
}

export type ChatRoom = {
    chatRoomId: string;
    user1: User;
    user2: User;
}