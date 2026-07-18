export function toSlug(title: string) {
    return title.toLowerCase().replace(/\s+/g, "-");
}
