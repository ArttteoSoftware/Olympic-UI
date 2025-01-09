export default class FormatData {
  static formatDate = (date) => {
    const validateDate = new Date(date)
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      separator: '.'
    }
    return validateDate.toLocaleDateString('en-GB', options).replace(/\//g, '.')
  }

  static formatTime = (props) => {
    const date = new Date(props)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  static formatUTCTime = (props) => {
    const date = new Date(props)
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }
  static formatDistance(code) {
    const parts = code?.split('KM') || []

    if (parts.length < 2) return null

    const distancePart = parts[0].replace(/[^\d.]+$/, '')
    const match = distancePart.match(/\d+(\.\d+)?$/)

    return match ? parseFloat(match[0]) : null
  }

  static isFinal = (unit_code) => {
    const match = unit_code.match(/.*-(\w{3})-/)
    return match ? match[1] === 'FNL' : false
  }
}
