export const maskEmail = (email: string) => {
    const emailRegex = /^(.)(.*)(.@gmail\.com)$/; 
    return email.replace(emailRegex, (_, first, hidden, last) => {
        return `${first}${"*".repeat(hidden.length)}${last}`;
    });
}

// export const 