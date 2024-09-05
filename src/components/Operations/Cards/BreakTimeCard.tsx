import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { Text } from '@/components/_commons/Form/Text'
import { TextArea } from '@/components/_commons/Form/TextArea'
import { OperationResponse } from '@/core/domain/Operation/Operation.types'
import { Row } from 'react-bootstrap'

interface OperationsProps {
  operation?: OperationResponse
}

export const BreakTimeCard = ({ operation }: OperationsProps) => {
  return operation &&
    operation.break_time &&
    operation.break_time.length > 0 ? (
    <SimpleCard
      startsClosed
      isCollapsible
      className="mt-3"
      headerTitle="Detalhes das Pausas"
      displayData={[
        {
          title: 'Tempo total de pausa:',
          content: operation && String(operation?.tota_pause_duration)
        }
      ]}
    >
      <Row>
        {operation.break_time.map(item => (
          <>
            <Text
              label="Inicio da Pausa"
              name={''}
              value={item?.start_at}
              grid="col-md-3"
              disabled
            />

            <Text
              label="Final da Pausa"
              name={''}
              value={item?.end_at}
              grid="col-md-3"
              disabled
            />

            <TextArea
              name={''}
              label={'Descrição'}
              value={item?.description}
              disabled
            />
            <hr />
          </>
        ))}
      </Row>
    </SimpleCard>
  ) : (
    <></>
  )
}
