import { InputHTMLAttributes } from 'react'

import NotFoundImage from '@/assets/img/not_found.png'
import PdfLogo from '@/assets/img/pdf_logo.png'

interface ImageProps extends InputHTMLAttributes<HTMLInputElement> {
  fallbackImage?: string
  grid?: string
  src?: string
  fileType?: string
  fluid?: boolean
  openOnClick?: boolean
}

export const Image = ({
  fallbackImage,
  grid,
  src,
  fluid = true,
  openOnClick = true,
  fileType,
  ...rest
}: ImageProps) => {
  return (
    <div className={'mb-2 form-group ' + grid}>
      {fileType?.includes('pdf') ? (
        <>
          <img
            onClick={() => {
              if (openOnClick) {
                window.open(`${process.env.REACT_APP_API_STORAGE_URL}/${src}`)
              }
            }}
            style={{ objectFit: 'cover', aspectRatio: '1/1' }}
            src={PdfLogo}
            alt={src ? { ...rest }.alt : 'Imagem não encontrada'}
            className={`img-fluid  ${fluid ?? 'img-fluid'} ${src} my-3`}
          />
          <p className="text-center">{{ ...rest }.alt}</p>
        </>
      ) : (
        <img
          onClick={() => {
            if (openOnClick) {
              window.open(`${process.env.REACT_APP_API_STORAGE_URL}/${src}`)
            }
          }}
          style={{ objectFit: 'cover', aspectRatio: '1/1' }}
          src={
            src
              ? `${process.env.REACT_APP_API_STORAGE_URL}/${src}`
              : NotFoundImage
          }
          alt={src ? { ...rest }.alt : 'Imagem não encontrada'}
          className={`img-fluid  ${fluid ?? 'img-fluid'} ${src}`}
        />
      )}
    </div>
  )
}
