import { OperatingHour } from '../../../../domain/entities/OperatingHour'

interface BusinessHoursProps {
  hours: Array<OperatingHour>
}

function BusinessHours({ hours }: BusinessHoursProps) {
  return (
    <div>
      <h3>Hours</h3>
      <ul>
        {hours.map((hour) => {
          const { start, end, day } = hour.formatted()

          return <li key={`${day}-${start}-${end}`}>{`${day} ${start} - ${end}`}</li>
        })}
      </ul>
    </div>
  )
}

export default BusinessHours
