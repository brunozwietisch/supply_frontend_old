import { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CardBody } from '@/components/_commons/Card'
import { Card } from '@/components/_commons/Card/Card'
import { Step } from '@/core/hooks/useStepper'
import { useDom } from '@/core/hooks/useDom'

interface StepHeaderProps {
  steps: Step[]
  size?: 'small' | 'spaced'
  statusColor?: any
}

export const StepHeader = ({ steps, size = 'spaced' }: StepHeaderProps) => {
  const { pathname } = useLocation()

  const [currentPath, setCurrentPath] = useState<string>('')

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const { privateContentWidth } = useDom()

  const stepperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (stepperRef && stepperRef.current) {
        setIsExpanded(window.scrollY >= stepperRef.current.offsetTop)
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [window.scrollY])

  useEffect(() => {
    const path = pathname.split('/')
    path.pop()

    setCurrentPath(`${path.join('/')}`)
  }, [pathname])

  return (
    <Card
      ref={stepperRef}
      style={
        isExpanded
          ? {
              width: privateContentWidth + 'px',
              position: 'fixed',
              marginLeft: '-25px',
              top: '50px',
              zIndex: '999',
              transition: 'ease .2s'
            }
          : undefined
      }
    >
      <CardBody>
        <div className="bs-stepper-header" role="tablist">
          {steps.map((step, index) => {
            const isLastItem = steps.length - 1 === steps.indexOf(step)

            const isCurrentItem = pathname.split('/').reverse()[0] === step.path

            return (
              <Fragment key={index}>
                <div className="step">
                  <Link
                    to={`${currentPath}/${step.path}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <button
                      disabled={step.disabled ?? false}
                      type="button"
                      className="step-trigger p-2"
                      role="tab"
                      id={`${step.path}-step`}
                      style={{ textDecoration: 'none' }}
                    >
                      <span
                        style={{
                          color: `${isCurrentItem ? '#0078d4' : 'inherit'}`
                        }}
                      >
                        {size === 'small' || isExpanded ? (
                          <>
                            <span className="bs-stepper-label">
                              {step.icon ? (
                                <i className={String(step.icon)} />
                              ) : (
                                ''
                              )}
                              {`${step.label ?? ''} ${step.name}`}
                            </span>
                          </>
                        ) : (
                          <>
                            <h4 className="text-start m-1 mb-0">
                              {step.icon ? (
                                <i className={String(step.icon)} />
                              ) : (
                                ''
                              )}
                              <div className="d-flex justify-space-between">
                                {step.label ?? ''}
                              </div>
                            </h4>
                            <span className="bs-stepper-label">
                              {step.name}
                            </span>
                          </>
                        )}
                      </span>
                    </button>
                  </Link>
                </div>

                {!isLastItem && <div className="line"></div>}
              </Fragment>
            )
          })}
        </div>
      </CardBody>
    </Card>
  )
}
