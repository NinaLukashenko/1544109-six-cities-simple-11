import { MAX_RATE_PERCENT, MAX_RATE_POINTS } from '../consts/app';

export const getRatePercent = (rate: number): number => Math.round(rate) * MAX_RATE_PERCENT / MAX_RATE_POINTS;

export const setFirstLetterUpper = (text: string): string => text.charAt(0).toLocaleUpperCase() + text.slice(1);
