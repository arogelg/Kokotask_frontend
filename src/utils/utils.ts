export function formatDate(iso: string) : string {
    const date = new Date(iso)
    const formatter = new Intl.DateTimeFormat('en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formatter.format(date)
}