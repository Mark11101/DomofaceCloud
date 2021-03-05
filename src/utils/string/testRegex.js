const testRegex = (data, regex) => {
	
	if (data === '') {
		return true
	}

	return new RegExp(regex).test(data);
}

export default testRegex
