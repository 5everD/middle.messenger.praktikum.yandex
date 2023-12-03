export type TResponse = {
    status: number,
    responseText: string
}

export type TOptionsAPI = {
    baseUrl: string,
    headers: {
        'Accept': string
        'Content-Type': string
    }
}
