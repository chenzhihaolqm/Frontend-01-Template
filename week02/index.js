// 写一个正则表达式 匹配所有 Number 直接量
// 写一个 UTF-8 Encoding 的函数
// 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

function testNumber(str="") {
    var decimalIntegerLiteral = '(0|[1-9][0-9]*)';
    var decimalDigitals = '([0-9]+)';
    var exponentPart =`([e|E](${decimalDigitals}|\\+${decimalDigitals}|\\-${decimalDigitals}))`;
    var decimalRegStr = `((${decimalIntegerLiteral}\\.${decimalDigitals}?${exponentPart}*)|(\\.${decimalDigitals}${exponentPart}?)|(${decimalIntegerLiteral}${exponentPart}*))`;
    var isDecimalReg = new RegExp('^'+decimalRegStr+'$')
    var isBinaryReg = /^0[b|B][0-1]+$/;
    var isOctalReg = /^0[o|O][0-7]+$/;
    var isHexReg = /^0[x|X][0-9a-eA-E]+$/;
    return isDecimalReg.test(str) || isBinaryReg.test(str) || isOctalReg.test(str) || isHexReg.test(str)
}
/*
*    Unicode符号范围     |        UTF-8编码方式
*    (十六进制)        |              （二进制）
*    ----------------------+---------------------------------------------
*    0000 0000-0000 007F | 0xxxxxxx
*    0000 0080-0000 07FF | 110xxxxx 10xxxxxx
*    0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
*    0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
*/
function UTF8_Encoding(str = ' ') {
    let retVal;
    const codeVal = str.codePointAt() || 0;
	const step = [{
	    maxVal: 0x007F,
        template: '0xxxxxxx',
    },{
        maxVal: 0x07FF,
        template: '110xxxxx 10xxxxxx',
    },{
        maxVal: 0xFFFF,
        template: '1110xxxx 10xxxxxx 10xxxxxx',
    },{
        maxVal: 0x10FFFF,
        template: '11110xxx 10xxxxxx 10xxxxxx 10xxxxxx',
    }];
	for(let i = 0; i < step.length; i++){
	    const item = step[i];
        const binaryStr = codeVal.toString(2);
	    if(codeVal <= item.maxVal) {
            const xNum = item.template.match(/x/g).length;
            const binaryArr = binaryStr.padStart(xNum,'0').split('');
            retVal = item.template.replace(/x/g, function(){
                return binaryArr.shift();
            });
	        break;
        }
    }
	return retVal;
}

function testString(str="") {
    var singleEscapeCharacter = `['"\\\b\f\n\r\t\v\u2028\u2029]`;
    var lineTerminator = '[\f\r\u2028\u2029]'
    var lineContinuation = '\[\f\r\u2028\u2029]'
    var decimalGigit = '[0-9]'
    var escapeCharacter = `${singleEscapeCharacter}|${decimalGigit}|x|u`
    var nonEscapeCharacter = `[^${escapeCharacter}${lineTerminator}]`;
    var characterEscapeSequence = `${singleEscapeCharacter}|${nonEscapeCharacter}`
    var escapeSequence = `${characterEscapeSequence}|0` // 此处漏了16进制跟 unicodeEscapeSequence
    var singleStringCharacter = `([^'\\${lineTerminator}]|[\u2028\u2029]|[\\${escapeSequence}|${lineContinuation}])`
    var doubleStringCharacter = `([^"\\${lineTerminator}]|[\u2028\u2029]|[\\${escapeSequence}|${lineContinuation}])`
    var singleStringCharacters = `(${singleStringCharacter}+)`
    var doubleStringCharacters = `(${doubleStringCharacter}+)`
    var stringLiteral = `'${singleStringCharacters}*'|"${doubleStringCharacters}*"`
    var isStringReg = new RegExp('^'+stringLiteral+'$')
    return !isStringReg.test(str)
}