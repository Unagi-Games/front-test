const convertIsoTimeToNormalDate = (date: string) => {
	const newDate = new Date(date);
	const localedateformat = newDate.toLocaleDateString('en-GB');
	return localedateformat;
};

export { convertIsoTimeToNormalDate };
