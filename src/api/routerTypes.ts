export type TResponse = {
    status: number,
    responseText: string
    reason?: string
}

export type TOptionsAPI = {
    baseUrl: string,
    headers: {
        'Accept': string
        'Content-Type': string
    }
}
