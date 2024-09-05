import React, { CSSProperties, useEffect } from 'react'
import { FormCheck, FormGroup, Container, Image } from 'react-bootstrap'
import { Loader } from '@/components/_commons/Loader'
import { TableCell } from '@/components/_commons/SmartTable/TableCell'
import { Column } from '@/components/_commons/SmartTable/SmartTable'
import folderIcon from '@/assets/img/folder_icon.jpg'

type RowSelectionType = {
  [key: string | number]: boolean
}

interface TableProps {
  columns: Column[]
  data: Array<any>
  options: {
    bordered: boolean
    fullWidth: boolean
    mini: boolean
    stripped: boolean
    hoverable: boolean
    blanked: boolean
  }
  fixedHeader?: boolean
  isloading?: boolean
  holiday?: boolean
  selectableRows?: {
    key: string | number
    selectedRows: Array<number | string>
    onSelectRows: (rows: Array<number | string>) => void
  }
  // Total Rows
  totalRows?: Array<{ label: string; value: any }>
  heightTable?: string
  maxHeightTable?: string
  minHeightTable?: string
}

export const Table = ({
  columns,
  data,
  options,
  isloading = false,
  fixedHeader = false,
  holiday = false,
  selectableRows,
  totalRows,
  heightTable = '',
  maxHeightTable = '',
  minHeightTable = ''
}: TableProps) => {
  const tableClassnames = {
    hoverable: options.hoverable ? 'table-hover' : '',
    bordered: options.bordered ? 'table-bordered' : '',
    fullWidth: options.fullWidth ? 'no-padding' : '',
    mini: options.mini ? 'table-condensed' : '',
    stripped: options.stripped ? 'table-striped' : '',
    blanked: options.blanked ? 'table-blanked' : ''
  }

  const isEmpty = !data || data.length === 0

  useEffect(() => {
    if (data.length !== 0 && selectableRows) {
      const rowSelection = {} as RowSelectionType

      data.forEach(data => {
        rowSelection[data[selectableRows.key]] = true
      })
    }
  }, [])

  const handleSelectRow = (value: number | string) => {
    if (selectableRows) {
      const { selectedRows, onSelectRows } = selectableRows
      const isSelected =
        selectableRows && selectableRows.selectedRows?.indexOf(value) > -1

      if (isSelected) {
        onSelectRows(selectedRows.filter(row => row !== value))
      } else {
        onSelectRows([...selectedRows, value])
      }
    }
  }

  const isRowSelected = (value: number) => {
    if (selectableRows) {
      const { selectedRows } = selectableRows
      const exists = selectedRows.find(n => n === value)

      return exists !== undefined && String(exists) === String(value)
    }

    return false
  }

  const getHolidayStyle = (row: any) => {
    let holidayStyle: CSSProperties | undefined

    if (row && row.holiday) {
      if (
        row.holiday === 'Holiday' ||
        row.holiday === 'Sunday' ||
        row.holiday === 'Saturday'
      ) {
        holidayStyle = { background: 'red', color: 'white' }
      }
    }

    return holidayStyle
  }

  return (
    <>
      <div
        className="card-body table-responsive p-0"
        style={{
          height: heightTable,
          maxHeight: maxHeightTable,
          minHeight: minHeightTable
        }}
      >
        <table
          className={`table mb-0
          ${tableClassnames.hoverable}
          ${tableClassnames.bordered}
          ${tableClassnames.fullWidth}
          ${tableClassnames.mini}
          ${tableClassnames.stripped}
          ${tableClassnames.blanked}
          ${fixedHeader && 'position-relative'}
         `}
        >
          <thead
            style={
              fixedHeader
                ? {
                    position: 'sticky',
                    background: '#fff',
                    top: 0
                  }
                : {}
            }
          >
            <tr>
              {selectableRows && (
                <TableCell align="center" as="th">
                  #
                </TableCell>
              )}

              {columns.map((column, index) => {
                return (
                  <th
                    key={index}
                    title={column.label}
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      ...column.headerCellStyle
                    }}
                  >
                    {column.label}
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {!!data && data.length !== 0
              ? data?.map((row, indexRow) => {
                  return (
                    <tr key={indexRow} style={getHolidayStyle(row)}>
                      {/* selectable rows */}
                      {selectableRows && (
                        <TableCell align="center">
                          <FormGroup>
                            <FormCheck
                              type="checkbox"
                              value={row[selectableRows.key]}
                              checked={isRowSelected(row[selectableRows.key])}
                              onChange={() => {
                                handleSelectRow(row[selectableRows.key])
                              }}
                            />
                          </FormGroup>
                        </TableCell>
                      )}

                      {/* render cells */}
                      {Object.entries(row).map((_, indexItem) => {
                        const cellValue = Object.entries(row).filter(
                          el => el[0] === columns[indexItem]?.key
                        )[0] as [string, any]

                        if (cellValue === undefined) return null

                        return React.isValidElement(cellValue[1]) ? (
                          <TableCell key={indexItem}>{cellValue[1]}</TableCell>
                        ) : (
                          <TableCell
                            key={indexItem}
                            value={String(cellValue[1])}
                          />
                        )
                      })}
                    </tr>
                  )
                })
              : null}
          </tbody>
          {!isEmpty && totalRows && (
            <tfoot style={{ background: '#0078d424', fontSize: '12px' }}>
              <tr>
                <td colSpan={columns.length}>
                  <footer className="d-flex justify-content-end">
                    <div className="d-flex flex-row-reverse gap-3">
                      {totalRows.map((item, index) => (
                        <div key={index}>
                          <span style={{ fontWeight: 'bold' }}>
                            {item.label}
                          </span>{' '}
                          {item.value}
                        </div>
                      ))}
                    </div>
                  </footer>
                </td>
              </tr>
            </tfoot>
          )}
        </table>

        {isEmpty && (
          <Container
            fluid
            className="d-flex justify-content-center align-items-center px-2 py-3"
            style={{ height: '200px' }}
          >
            <Loader loading={isloading}>
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
                      Tente mudar sua busca ou ajustar seus filtros para
                      encontrar o que precisa.
                    </small>
                  </p>
                </div>
              </div>
            </Loader>
          </Container>
        )}
      </div>
    </>
  )
}
