// utils/dateFormat.js

export const formatDate = (dateValue) => {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  const day = date.getDate();
  const year = date.getFullYear();

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const month = months[date.getMonth()];

  // Day suffix logic
  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) return "th";

    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getDaySuffix(day)} ${month} ${year}`;
};
