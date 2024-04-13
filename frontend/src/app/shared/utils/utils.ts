export const formatDate = (date: Date, ruFormat?: boolean) => {
    const ruDates = [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
    ]
    const enDates = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    ]
    let datePart
    if (ruFormat) {
        datePart = ruDates.map((n, i) => n.toString().padStart(i === 2 ? 4 : 2, "0")).join(".");
    }
    else {
        datePart = enDates.map((n, i) => n.toString().padStart(i === 0 ? 4 : 2, "0")).join("-");
    }
    let timePart = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ].map(n => n.toString().padStart(2, "0")).join(":");
    return datePart + " " + timePart;
}