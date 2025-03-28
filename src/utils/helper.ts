export const maskEmail = (email: string) => {
    const emailRegex = /^(.)(.*)(.@gmail\.com)$/;
    return email.replace(emailRegex, (_, first, hidden, last) => {
        return `${first}${"*".repeat(hidden.length)}${last}`;
    });
}

export const formatDate = (isoString: string, locale: string = "en-US") => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
};

export const clipText = (text: string, n: number) => {
    if (text.length <= n) return text;
    return text.slice(0, n) + "...";
}

export const formatMessageTimestamp = (utcDateString: string): string => {
    const date = new Date(utcDateString);

    return date.toLocaleString("en-US", {
        // day: "numeric",
        // month: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

export const formatChatTimestamp = (utcDateString: string): string => {
    const date = new Date(utcDateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) return "now";

    if (diffInMinutes < 60) return `${diffInMinutes}m`;

    if (diffInHours < 24) return `${diffInHours}h`;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const messageDate = new Date(date);
    messageDate.setHours(0, 0, 0, 0);

    const dayDifference = Math.floor((messageDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (dayDifference === 0) return "today";
    if (dayDifference === -1) return "yesterday";
    if (dayDifference === 1) return "tomorrow";

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};



// export const 