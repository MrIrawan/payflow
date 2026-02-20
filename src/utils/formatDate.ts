export function formatDate(date: string) {
    const stringToDate = new Date(date).toLocaleDateString("id-ID", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    return stringToDate;
}