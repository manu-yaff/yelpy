import { ReactNode } from 'react'
import { OperatingHour } from '../../../../domain/entities/OperatingHour'

interface BusinessHoursProps {
  hours: Array<OperatingHour>
}

function BusinessHours({ hours }: BusinessHoursProps): ReactNode {
  return (
    <div>
      <ul>
        {hours.map((hour) => {
          const formatted = hour.formatted()

          return <li key={formatted}>{formatted}</li>
        })}
      </ul>
    </div>
  )
}

export default BusinessHours
