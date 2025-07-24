export function getStartOfLastDay(): Date {
  let date = new Date();
  date.setDate(date.getDate() - 1); // Subtract one day
  date.setHours(0, 0, 0, 0); // Set time to start of the day
  return date;
}

export function getStartOfLastWeek(): Date {
  let date = new Date();
  let dayOfWeek = date.getDay();
  date.setDate(date.getDate() - dayOfWeek - 6); // Go back to the start of last week
  date.setHours(0, 0, 0, 0); // Set time to start of the day
  return date;
}

export function getStartOfLastMonth(): Date {
  let date = new Date();
  date.setMonth(date.getMonth() - 1); // Go back one month
  date.setDate(1); // Set to the first day of the month
  date.setHours(0, 0, 0, 0); // Set time to start of the day
  return date;
}

export function getVeryOldDate(): Date {
  let date = new Date();
  date.setFullYear(date.getFullYear() - 1000);
  return date;
}
