import React from 'react'

interface BreadcrumbProps {
  children: React.ReactNode
}

export const Breadcrumb = (props: BreadcrumbProps) => {
  return (
    <div aria-label="breadcrumb">
      <ol className={'breadcrumb m-0'}>{props.children}</ol>
    </div>
  )
}
