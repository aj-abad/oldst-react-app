const getDateDiff = (date) => {
  if (!(date instanceof Date)) throw new Error("Must pass a date");

  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const HOUR_MILLIS = 1000 * 60 * 60;
  const DAY_MILLIS = HOUR_MILLIS * 24;
  const WEEK_MILLIS = DAY_MILLIS * 7;

  const getDaysDiff = (diff) => Math.floor(diff / DAY_MILLIS);
  const getHoursDiff = (diff) => Math.floor(diff / HOUR_MILLIS);

  //return the number of hours elapsed if less than a day ago
  if (diff < DAY_MILLIS) {
    const hoursDiff = getHoursDiff(diff);
    if (hoursDiff === 0) return `less than an hour ago`;
    return `${hoursDiff} hour${hoursDiff !== 1 ? "s" : ""} ago`;
  }

  //return the number of days elapsed if less than a week ago
  if (diff < WEEK_MILLIS) {
    const daysDiff = getDaysDiff(diff);
    return `${daysDiff} day${daysDiff !== 1 ? "s" : ""} ago`;
  }

  //return a formatted date if more than a week ago
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default getDateDiff;
