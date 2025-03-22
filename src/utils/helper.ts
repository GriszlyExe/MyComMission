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


// export const 