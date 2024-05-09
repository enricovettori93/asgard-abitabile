export function getCookie(name: string) {
    const re = new RegExp(name + "=([^;]+)");
    const value = re.exec(document.cookie);
    return (value != null) ? decodeURI(value[1]) : null;
}
