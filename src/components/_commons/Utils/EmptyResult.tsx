import { Image } from 'react-bootstrap'
import folderIcon from '@/assets/img/folder_icon.jpg'

export const EmptyResult = () => {
  return (
    <div className="text-center align-self-baseline">
      <Image
        rounded
        roundedCircle
        style={{
          width: '120px',
          height: '120px'
        }}
        src={folderIcon}
      />
      <div>
        <h5 className="mt-2">Nenhum Resultado Encontrado</h5>
        <p className="mt-2">
          <small>
            Tente mudar sua busca ou ajustar seus filtros para encontrar o que
            precisa.
          </small>
        </p>
      </div>
    </div>
  )
}
