export function getRandomId(name: string, quantity: number = 6) {
    return `${name}-${(Math.random() * 10 ** quantity).toFixed()}`
}
