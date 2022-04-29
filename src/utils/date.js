export function getDate(timestamp) {
    const date = new Date(+timestamp || 0);
    return Intl.DateTimeFormat("en-US", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(date);
}
