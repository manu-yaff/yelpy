import { ReactNode } from 'react'
import { OperatingHour } from '../../../../domain/entities/OperatingHour'

interface BusinessHoursProps {
  hours: Array<OperatingHour>
}

function BusinessHours({ hours }: BusinessHoursProps): ReactNode {
  return (
    <>
      <p className="business-hours-header">Hours</p>
      <div className="business-hours-container">
        {hours.length === 0 ? (
          <p className="no-hours">Hours not provided</p>
        ) : (
          <ul className="hours-list">
            {hours.map((hour) => {
              const formatted = hour.formatted()
              return (
                <li key={formatted} className="hour-item">
                  {formatted}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}

export default BusinessHours
