import { findDataById, filterDataNotEqualToId } from 'common/Util'

export const addMinusCounter = (
	id: any,
	counters: any,
	setCounters: any,
	add: boolean = false,
	multiServices: any = undefined,
	setValue: any = undefined
) => {
	var ctr = findDataById(id, counters)
	var filteredCtr = filterDataNotEqualToId(id, counters)
	let combined: any = [...filteredCtr, ctr]
	if (add) {
		ctr.counter = ctr.counter + 1
	} else {
		if (ctr.counter === 1) {
			combined = [...filteredCtr]
			const newServices = multiServices.filter(
				(f: any) => f != String(id)
			)
			setValue('multiServices', newServices)
		} else {
			ctr.counter = ctr.counter - 1
		}
	}

	setCounters(combined)
}
