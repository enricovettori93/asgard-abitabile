export interface PaginationParams {
    skip?: number
}

export interface ResponseDTO<T> {
    data?: T
    message?: string
    errors?: {[p: string]: string}
}
