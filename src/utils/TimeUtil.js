export const formatDuration = ({duration}) => {
  if(duration > 3600) {
    const hours = Math.floor(duration / 3600)
    const minutes = ((duration - (hours * 3600))/60).toFixed()
    return `${hours}h ${minutes}min`
  } else if (duration == 3600) {
    return "1 hour"
  } else if (duration < 60) {
    return `${duration} seconds`
  } else if (duration === 60) {
    return "1 minute"
  } else {
    return `${(duration / 60).toFixed()} minutes`
  }
}