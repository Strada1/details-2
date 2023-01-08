export const storage = {
  saveDate(date, time) {
    localStorage.setItem("date", date);
    localStorage.setItem("time", time);
  },
  getDateCalendar() {
    return localStorage.getItem("date");
  },
  getTimeCalendar() {
    return localStorage.getItem("time");
  },
};
