export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const appendZero = input => {
	const inputStr = input.toString();
  	return inputStr.length < 2 ? `0${inputStr}` : inputStr;
};

export const formatDate = dateObj => {
  	return `${dateObj.getFullYear()}-${appendZero(dateObj.getMonth() + 1)}-${appendZero(dateObj.getDate())}`;
}

export function objectToArray(coordsObject) {
  return Object.values(coordsObject);
}

export function middleValueOfArray(arr) {
  if (arr!==0){
    const middleIndex = Math.floor(arr.length / 2);
    return arr[middleIndex];
  }
  else {
    return []; // Tracking not started
  }
}

