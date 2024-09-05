import { Pagination as BSPagination } from 'react-bootstrap'

interface PaginationProps {
  current: number
  total: number
  pageSize?: number
  onPaginate: (page: number) => void
}

export const Pagination = ({ current, total, onPaginate }: PaginationProps) => {
  const calPaginate = () => {
    const pagination = []

    // Define o número de páginas vizinhas desejado
    const pagesNeighbors = 4

    // Calcula a página inicial para garantir que haja 10 posições no total
    let start = Math.max(1, current - pagesNeighbors)
    const end = Math.min(total, start + 9)

    // Ajusta o início se estiver próximo do final das páginas
    start = Math.max(1, end - 9)

    // Gera o array de páginas
    for (let i = start; i <= end; i++) {
      pagination.push(i)
    }

    return pagination
  }

  return (
    <div className="d-flex justify-content-center">
      <BSPagination>
        <BSPagination.First onClick={() => onPaginate(0)} />
        <BSPagination.Prev
          onClick={() => current > 1 && onPaginate(current - 1)}
        />

        {calPaginate().map((value, index) => (
          <BSPagination.Item
            key={index}
            active={current === value}
            onClick={() => onPaginate(value)}
          >
            {value}
          </BSPagination.Item>
        ))}

        <BSPagination.Next
          onClick={() => current < total && onPaginate(current + 1)}
        />
        <BSPagination.Last onClick={() => onPaginate(total)} />
      </BSPagination>
    </div>
  )
}
