declare module '*.css' {
    const content: Record<string, string>
    export default content
}

declare module '*.svg' {
    const content: any
    export default content
}

declare module '*.json'
