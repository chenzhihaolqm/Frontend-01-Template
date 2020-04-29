/*
* @params {string} chars
* @params {number} x
* @return {number}
*/
function converStringToNumber(chars, x = 10) {
	if (!/^(0|[1-9][0-9]*\.([0-9]+)?|\.[0-9]+|(0|[1-9][0-9]*))$/.test(chars)) {
		console.log(`${chars}不是一个十进制数字`)
		return false;
	}
    const zeroCode = '0'.codePointAt();
    let i = 0, j = chars.length -1;
    let integer = 0, fraction = 0;
    while(i <= j) {
      let c = chars[i++];
      if(c === '.') {
        break;
      } 
      let number = c.codePointAt() - zeroCode;
      integer = integer * x + number;
    }
    while(i <= j) {
        let c = chars[j--];
        let number = c.codePointAt() - zeroCode;
        fraction = (fraction + number) / x;
    }
    return integer + fraction;
}


/*
* @params {number} number
* @params {number} x
  @params {number} fractionMaxLength
* @return {string}
*/
function converNumberToString(number, x = 10, fractionLength = 20) {
	let zoom = x ** fractionLength;
	if(zoom * number === Infinity || zoom * number === -Infinity) {
		zoom = 1;
	}
    let integer = Math.floor(number);
    let fraction = number - integer;
    let str = integer ? '' : '0';
    while(integer > 0) {
        str = integer % x + str;
        integer = Math.floor(integer / x)
    }
    if (fraction > 0) {
        str = str + '.';
        let count = 0;
        while(fraction > 0) {
            const tmp = fraction * x;
			const floorTmp = Math.floor(tmp);
            str =  str + floorTmp;
            fraction = tmp - floorTmp;
            count++;
            if (count > fractionLength){
                break;
            }
        }
    }
    return str;
}