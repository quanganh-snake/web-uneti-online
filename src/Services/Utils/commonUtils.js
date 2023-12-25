export const checkConditionObject = (currentObject, newObject) => {
	for (let key in newObject) {
		if (key in currentObject && currentObject[key] !== newObject[key]) {
			return true;
		}
	}
	return false;
}
