/* eslint-disable import/prefer-default-export */
export function stripIndent(str) {
    if (str && !str.match(/^[^ \t\n]/gm)) {
        return stripIndent(str.replace(/^[ \t]/gm, ''));
    }
    return str && str.replace(/^\s*\n/gm, '');
}
