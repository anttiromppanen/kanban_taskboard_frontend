import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

export function timeAgoFromDate(date: Date) {
  const now: Date = new Date();
  const past: Date = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 2592000; // Approximate

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} seconds ago`;
  }
  if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} minutes ago`;
  }
  if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} hours ago`;
  }
  if (diffInSeconds < secondsInMonth) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} days ago`;
  }
  const months = Math.floor(diffInSeconds / secondsInMonth);
  return `${months} months ago`;
}

export function formatAxiosError(
  error: AxiosError,
  setErrorText: Dispatch<SetStateAction<string>>,
) {
  if (error?.response && error?.response.data) {
    const errorResponse = error.response.data as { error: string };
    setErrorText(errorResponse.error);
  } else {
    setErrorText(error.message);
  }
}
