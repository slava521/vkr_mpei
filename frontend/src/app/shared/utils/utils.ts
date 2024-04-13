export const formatDate = (date: Date) => {
    let datePart = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    ].map((n, i) => n.toString().padStart(i === 0 ? 4 : 2, "0")).join("-");
    let timePart = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ].map(n => n.toString().padStart(2, "0")).join(":");
    return datePart + " " + timePart;
}