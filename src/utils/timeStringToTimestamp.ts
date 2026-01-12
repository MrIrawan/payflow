export function timeStringToTimestamp(
    time: string,
    baseDate: Date = new Date()
): number {
    const [hours, minutes] = time.split(":").map(Number);

    if (
        Number.isNaN(hours) ||
        Number.isNaN(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
    ) {
        throw new Error("Invalid time format, expected HH:mm");
    }

    const date = new Date(baseDate);
    date.setHours(hours, minutes, 0, 0);

    return date.getTime();
}