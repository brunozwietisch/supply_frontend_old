import React from 'react'
import { Table } from '@/components/_commons/SmartTable/Table'
import { Pagination } from '@/components/_commons/SmartTable/Pagination'
import './styles.scss'

export type Column = {
  key: string
  label: string
  headerCellStyle?: React.CSSProperties
}

interface SmartTableProps {
  columns: Column[]
  data?: Record<string, any>[]
  title?: string
  loading?: boolean

  fixedHeader?: boolean
  variant?: 'card' | 'default'

  // Pagination
  pagination?: {
    current: number
    total: number
    pageSize?: number
    onPaginate: (page: number) => void
  }

  // Selection
  selectableRows?: {
    key: string | number
    selectedRows: Array<number | string>
    onSelectRows: (rows: Array<number | string>) => void
  }

  // Total Rows
  totalRows?: Array<{ label: string; value: any }>
  // Styles
  bordered?: boolean
  fullWidth?: boolean
  mini?: boolean
  stripped?: boolean
  hoverable?: boolean
  blanked?: boolean

  heightTable?: string
  maxHeightTable?: string
  minHeightTable?: string

  holiday?: boolean
}

export const SmartTable = ({
  columns,
  data,
  title,
  pagination,
  selectableRows,
  totalRows,
  variant = 'default',
  fixedHeader = false,
  loading = false,
  fullWidth = true,
  bordered = false,
  mini = false,
  stripped = false,
  hoverable = false,
  blanked = false,
  holiday = false,
  heightTable = '',
  maxHeightTable = '',
  minHeightTable = ''
}: SmartTableProps) => {
  const styleOptions = {
    bordered: bordered,
    fullWidth: fullWidth,
    mini: mini,
    stripped: stripped,
    hoverable: hoverable,
    blanked: blanked
  }

  return variant === 'card' ? (
    <>
      <div className="card mb-3 px-0">
        <div
          className="card-header"
          style={{
            background: 'transparent',
            padding: title ? '1rem' : '0',
            borderBottom: title ? '2px solid #f4f4f4' : '0'
          }}
        >
          {title && <h5 className="card-title m-0">{title}</h5>}
        </div>

        <Table
          columns={columns}
          data={data || []}
          options={styleOptions}
          isloading={loading}
          fixedHeader={fixedHeader}
          heightTable={heightTable}
          totalRows={totalRows}
          maxHeightTable={maxHeightTable}
          minHeightTable={minHeightTable}
          holiday={holiday}
          selectableRows={
            selectableRows
              ? {
                  ...selectableRows,
                  onSelectRows: rows => selectableRows.onSelectRows(rows.sort())
                }
              : undefined
          }
        />
      </div>

      {/* Paginação */}
      {pagination && (
        <Pagination
          current={pagination.current}
          total={pagination.total}
          onPaginate={page => pagination.onPaginate(page)}
        />
      )}
    </>
  ) : (
    <>
      <Table
        columns={columns}
        data={data || []}
        options={styleOptions}
        heightTable={heightTable}
        minHeightTable={minHeightTable}
        isloading={loading}
        fixedHeader={fixedHeader}
        totalRows={totalRows}
        selectableRows={
          selectableRows
            ? {
                ...selectableRows,
                onSelectRows: rows => selectableRows.onSelectRows(rows.sort())
              }
            : undefined
        }
      />

      <br />
      {/* Paginação */}
      {pagination && (
        <Pagination
          current={pagination.current}
          total={pagination.total}
          pageSize={pagination.pageSize}
          onPaginate={page => pagination.onPaginate(page)}
        />
      )}
    </>
  )
}
