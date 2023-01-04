export const findCounterById: any = (id: any, counters: any) => {
	return counters.find((f: any) => f.id === id)
}

export const filterCounterEqualToId = (id: any, counters: any) => {
	return counters.filter((f: any) => f.id === id)
}

export const filterCounterNotEqualToId = (id: any, counters: any) => {
	return counters.filter((f: any) => f.id !== id)
}

export const addMinusCounter = (
	id: any,
	counters: any,
	setCounters: any,
	add: boolean = false,
	multiServices: any = undefined,
	setValue: any = undefined
) => {
	var ctr = findCounterById(id, counters)
	var filteredCtr = filterCounterNotEqualToId(id, counters)
	let combined: any = [...filteredCtr, ctr]
	if (add) {
		ctr.counter = ctr.counter + 1
	} else {
		if (ctr.counter === 1) {
			combined = [...filteredCtr]
			const newServices = multiServices.filter(
				(f: any) => f != String(id)
			)
			console.log('test', newServices)
			setValue('multiServices', newServices)
		} else {
			ctr.counter = ctr.counter - 1
		}
	}

	setCounters(combined)
}
