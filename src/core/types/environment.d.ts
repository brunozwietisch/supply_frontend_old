/* eslint-disable no-unused-vars */
export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string
      REACT_APP_API_STORAGE_URL: string
      REACT_APP_MSA_API_URL: string
    }
  }
}
