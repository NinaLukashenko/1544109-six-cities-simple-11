import { MAX_RATE_PERCENT, MAX_RATE_POINTS } from '../consts/app';
import { months } from '../consts/date';
import { StarRateValue } from '../consts/offer';

export const getRatePercent = (rate: number): number => Math.round(rate) * MAX_RATE_PERCENT / MAX_RATE_POINTS;

export const setFirstLetterUpper = (text: string): string => text.charAt(0).toLocaleUpperCase() + text.slice(1);

export const isNotEmpty = (text: string): boolean => text !== '' && text.trim() !== '';

export const isRated = (rating: number): boolean => rating !== StarRateValue.None;

export const isCommentLengthCorrect = (text: string): boolean => text.length >= 50 && text.length <= 300;

export const getMonthNameAndYear = (date: string): string => {
  const newDate = new Date(date);
  const month = months[newDate.getMonth()];
  const year = newDate.getFullYear();

  return `${month} ${year}`;
};

export const getMachineReadableDate = (date: string): string => {
  const newDate = new Date(date);

  const year = newDate.getFullYear();
  let month: number | string = newDate.getMonth() + 1;
  let day: number | string = newDate.getDate();

  if (String(month).length < 2) {
    month = `0${month}`;
  }

  if (String(day).length < 2) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

export const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
