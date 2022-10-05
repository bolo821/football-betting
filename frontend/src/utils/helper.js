import * as BigNumber from 'bignumber.js';

export const getReducedAddressString = address => {
    let len = address.length;
    return `${address.substring(0, 5)}...${address.substring(len-3, len)}`;
}

const getFormatedNumber = num => {
    if (num < 10) return `0${num}`;
    else return num;
}

export const getTimeDifference = (date1, date2) => {
    let diff = new Date(date2).getTime() - new Date(date1).getTime();
    diff = parseInt(diff / 1000);

    let dayCount = parseInt(diff / (24 * 60 * 60));
    diff -= 24 * 60 * 60 * dayCount;
    let hourCount = parseInt(diff / (60 * 60));
    diff -= 60 * 60 * hourCount;
    let minCount = parseInt(diff / 60);
    diff -= 60 * minCount;
    let secCount = diff;

    return {
        day: getFormatedNumber(dayCount),
        hour: getFormatedNumber(hourCount),
        minute: getFormatedNumber(minCount),
        second: getFormatedNumber(secCount),
    }
}

export const calculateGasMargin = (value) => {
	return BigNumber(value).multipliedBy(BigNumber(13)).dividedToIntegerBy(BigNumber(10));
}

export const getRoundedNumber = float_num => {
    return Math.round(float_num * 1000) / 1000;
}

const get2DigitString = digit => {
    if (digit < 10) return `0${digit}`;
    else return digit;
}

export const getTimeString = time => {
    let t = new Date(time);
    let year = t.getFullYear();
    let month = t.getMonth() + 1;
    let date = t.getDate();
    let hour = t.getHours();
    let min = t.getMinutes();
    let sec = t.getSeconds();

    return `${year}-${get2DigitString(month)}-${get2DigitString(date)} ${get2DigitString(hour)}:${get2DigitString(min)}:${get2DigitString(sec)}`;
}