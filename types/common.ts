export interface LocationFilters {
    maxAdultsForNight?: number
    priceForNight?: number
}

export interface PaginationParams {
    skip?: number
}

export interface ResponseDTO<T> {
    data?: T
    message?: string
    errors?: ValidationErrors
}

export type ValidationErrors = Record<string, { message: string, type: string }>
