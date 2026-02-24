export const calculatePercentage = (part: number, total: number): string => {
    if (total === 0 || part === 0) return "0";

    const percentage = (part / total) * 100;

    return Number(percentage.toFixed(1)).toString();
};