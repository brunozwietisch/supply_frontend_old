import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { Text } from '@/components/_commons/Form/Text'
import { OperationResponse } from '@/core/domain/Operation/Operation.types'
import { Row } from 'react-bootstrap'

interface OperationsProps {
  operation?: OperationResponse
}

export const HeaderCard = ({ operation }: OperationsProps) => {
  return (
    <SimpleCard
      startsClosed
      isCollapsible
      className="mb-3"
      headerTitle="Detalhes da Operação"
      cardFoter={false}
      displayData={[
        {
          title: 'Status da operação:',
          content: operation && String(operation?.status?.stage)
        }
      ]}
    >
      <Row>
        <Text
          label="Data de Inicio"
          name={''}
          value={operation?.start_op}
          grid="col-md-3"
          disabled={true}
        />
        <Text
          label="Data Final"
          name={''}
          value={operation?.end_op}
          grid="col-md-3"
          disabled={true}
        />

        <Text
          label="Tempo total da operação"
          name={''}
          value={operation?.total_time}
          grid="col-md-3"
          disabled={true}
        />

        <Text
          label="Tempo total de pausa"
          name={''}
          value={operation?.tota_pause_duration}
          grid="col-md-3"
          disabled={true}
        />

        <Text
          label="Validador"
          name={''}
          value={operation?.validator?.name}
          grid="col-md-4"
          disabled={true}
        />

        <Text
          label="Aprovador"
          name={''}
          value={operation?.approver?.name}
          grid="col-md-4"
          disabled={true}
        />

        <Text
          label="Status"
          name={''}
          value={operation?.status?.stage}
          grid="col-md-3"
          disabled={true}
        />
      </Row>
    </SimpleCard>
  )
}
