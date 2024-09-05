import { useLocation, useNavigate } from 'react-router-dom'
import { useRoutes } from 'react-router-context'

import { RouteParamProps } from '@/core/routes'

export type Step = {
  icon?: string
  name: string
  path: string
  disabled?: boolean
  label?: string | number
}

interface useStepperContext {
  steps: Step[]
  currentStep: Step
  nextStep: () => void
}

export const useStepper = (paths?: Array<string | number>) => {
  let steps: Step[] = []

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const routes = useRoutes<RouteParamProps>(paths)[0]?.children?.filter(
    route => route.path && route.params && route.params.name
  )

  if (routes) {
    const stepRoutes = routes.map(route => {
      return {
        name: route.params!.name,
        path: route.path!,
        label: route.params?.label,
        icon: route.params?.icon
      }
    })

    steps = stepRoutes
  }

  function findCurrentStep(): Step {
    const locationPath = pathname.split('/').reverse()[0]

    const filteredSteps: Step[] = steps.filter(
      step => step.path === locationPath
    )

    if (filteredSteps.length !== 0 && steps.length !== 0) {
      return filteredSteps[0]
    }

    return {} as Step
  }

  function navigateToNextStep() {
    const currentStep = findCurrentStep()
    let currentStepIndex = 0

    const splitedRoute = pathname.split('/')
    let redirectPath = splitedRoute.slice(0, splitedRoute.length - 1).join('/')

    if (Object.keys(currentStep).length !== 0) {
      currentStepIndex = steps.findIndex(obj => {
        return obj.path === currentStep.path
      })
    }

    if (currentStepIndex + 1 > steps.length) return

    redirectPath += '/' + steps[currentStepIndex + 1].path

    navigate(redirectPath)
  }

  return {
    steps: steps,
    currentStep: findCurrentStep(),
    nextStep: navigateToNextStep
  } as useStepperContext
}
