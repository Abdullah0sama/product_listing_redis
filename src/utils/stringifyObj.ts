export function stringifyObj(obj: object): string {
    let str = ''
    Object.entries(obj).map(entry => {
        if(str != '') str += ':'
        str += `${entry[0]}:${entry[1]}`
    })
    return str
}