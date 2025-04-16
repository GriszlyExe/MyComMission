export type User = {
    userId: string;
    birthDate: Date | string;
    description: string;
    location: string;
    firstName: string;
    lastName: string;
    artistFlag: Boolean;
    email: string;
    displayName: string;
    phone: string;
    profileUrl: string | "/default-profile-2.png";
    age: number;
    banFlag: boolean;
    artistRate: number;
    enabled2FA: boolean;
    createdAt: string;
    updatedAt: string;
}

export type Post = {
    createdAt: string;
    updatedAt: string;
    postId: string;
    postPrice: number;
    isHide: boolean;
    boostExpiredDate: string;
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

export type Artwork = {
    artworkId: string;
    artistId: string;
    imageUrl: string;
    customerHide: boolean;
    artistHide: boolean;
    createdAt: string;
    updatedAt: string;
    artist: User;
    commission: Commission | null; // Include relation with commission if necessary
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
    latestCommission: Commission;
    lastTimeStamp: string;
    latestMessage: string;
    latestMessageType: string;
}

export type ReportStatus =  'PENDING' | 'IN_REVIEW' | 'REJECTED' | 'APPROVED';

export type Report = {
	reportId: string; // UUID
	reporterId: string; // UUID
	reportType: 'POST' | 'USER' | 'COMMISSION' | 'GENERAL';
	reportStatus: ReportStatus;
	reportDescription: string;
	commissionId?: string | null; // UUID or null
	reporteeId?: string | null; // UUID or null
	postId?: string | null; // UUID or null
	moderatorResponse?: string | null;
	createdAt: Date;
    reporter: User;
    reportee?: User;
};

export type Admin = {
    adminId: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}