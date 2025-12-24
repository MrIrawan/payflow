export function filterByKeys<T>(
    data: T[],
    search: string,
    keys: (keyof T)[]
) {
    const keyword = search.toLowerCase();

    return data.filter((item) =>
        keys.some((key) =>
            String(item[key]).toLowerCase().includes(keyword)
        )
    );
}