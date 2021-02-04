interface IApiErrorDetail {
  code: string
  customState: any
  propertyName: string
}

export interface IApiError {
  response: {
    data: {
      errorCode: string
      errorMessage: string
      errorDetails: IApiErrorDetail[]
    }
  }
}
