export function stripIndent(str) {
    if (str && !str.match(/^[^ \t\n]/gm)) {
        str = str.replace(/^[ \t]/gm, '');
        return stripIndent(str);
    }
    return str && str.replace(/^\s*\n/gm, '');
}
