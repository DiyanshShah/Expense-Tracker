export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if(!name) return "";

    const word = name.split(" ");
    let initials = "";

    for(let i = 0 ; i < Math.min(word.length, 2); i++){
        initials +=  word[i][0];
    }

    return initials.toUpperCase();
};

export const addThousandsSeperator = (number) => {
    if (number == null || isNaN(number)) return "";
    
    const [integerPart, fractionPart] = number.toString().split('.');

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return fractionPart
        ? `${formattedInteger}.${fractionPart}`
        : formattedInteger;
}