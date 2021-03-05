import moment from 'moment'

const deleteZoneFromISOString = (data) => {

	return (
		data.indexOf('+') !== -1
		?
			data.substring(0, data.indexOf('+'))
		:
			data.substring(0, data.indexOf('-'))
	)
}

const getDateTimeExcludingTimeZone = (data, initialSign, calcSign) => {
	let dateTimeExcludingTimeZone = data;
	
	let dateTimeZone = dateTimeExcludingTimeZone.split(initialSign)[1];

	dateTimeExcludingTimeZone = dateTimeExcludingTimeZone.substring(0, dateTimeExcludingTimeZone.indexOf(initialSign));
	dateTimeExcludingTimeZone = moment(dateTimeExcludingTimeZone).format('YYYY-MM-DD HH:mm')
	dateTimeExcludingTimeZone = moment(dateTimeExcludingTimeZone).utcOffset(calcSign + dateTimeZone);
	dateTimeExcludingTimeZone = moment(dateTimeExcludingTimeZone._d).format();

	return dateTimeExcludingTimeZone
}

const convertTimeZone = (initialDatetime) => {

	let dateTime = initialDatetime;

  dateTime.indexOf('+') !== -1
  ?
    dateTime = getDateTimeExcludingTimeZone(dateTime, '+', '-')
  :  
    dateTime = getDateTimeExcludingTimeZone(dateTime, '-', '+')
    
  return deleteZoneFromISOString(dateTime)
}

export default convertTimeZone
