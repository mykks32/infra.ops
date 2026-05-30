export const HttpErrorCodeMessage = {
  serverError: 'Internal server error',
  inputValidationFailed: 'Input validation failed',
  bookNotFound: 'Book not found',
  bookAlreadyExists: 'Book already exists',
} as const
export type HttpErrorCodeTypes = keyof typeof HttpErrorCodeMessage

export const HttpErrorCode = Object.keys(HttpErrorCodeMessage).reduce(
  (acc, k) => {
    acc[k as HttpErrorCodeTypes] = k as HttpErrorCodeTypes
    return acc
  },
  {} as Record<HttpErrorCodeTypes, HttpErrorCodeTypes>,
)
