export const getReducedAddressString = address => {
    let len = address.length;
    return `${address.substring(0, 5)}...${address.substring(len-3, len)}`;
}