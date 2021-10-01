
let regexForClassNamesWithEquals = new RegExp('[a-zA-Z0-9_]+\\(','g');
let regexForKeysWithEquals = new RegExp('(?<!\\S)[a-zA-Z0-9_]+=', 'g');
let regexAllOfTheValuesExceptNulls = new RegExp('(?<=:).*?[a-zA-Z\\d](?=\\n)(?<!null)','g');
let regexForKeysWithoutQuotes = new RegExp('([\\w]+)(: )', 'g');

export function convert(toStringedText: string): string {
	
	let result1;
	while(result1 = regexForClassNamesWithEquals.exec(toStringedText)) {
		let sub = toStringedText.substring(result1.index,result1.index + result1[0].length);
		sub = sub.replace('(', '');
		let first = '"' + sub + '":';
		toStringedText = replaceAt(toStringedText,result1.index, first,sub);
	}

	if(toStringedText.trim().endsWith('"}')) {
		let indexOfLastParanthesis = toStringedText.lastIndexOf('"}');
		replaceAt(toStringedText,indexOfLastParanthesis,"}",'"}');
		toStringedText = replaceAt(toStringedText,indexOfLastParanthesis,"}",'"}');
	}

    toStringedText = toStringedText.replace(new RegExp('\\(','g'),'{');
	toStringedText = toStringedText.replace(new RegExp('\\)','g'),'}');
    
    toStringedText = toStringedText.replace(new RegExp(',','g'), '\n,');
    toStringedText = toStringedText.replace(new RegExp('{','g'), '{\n');
    
	toStringedText = toStringedText.replace(new RegExp('{','g'), '\n{');
	toStringedText = toStringedText.replace(new RegExp('}','g'), '\n}');

	
	
	let result;
	while(result = regexForKeysWithEquals.exec(toStringedText)) {
		let sub = toStringedText.substring(result.index,result.index + result[0].length);
		sub = sub.replace('=', ':');
		let split = sub.split(':');
		let first = '"' + split[0] + '":';
		toStringedText = replaceAt(toStringedText,result.index, first,sub);
	}

	toStringedText = toStringedText.replace(regexForKeysWithEquals, '"$&"');

	
	toStringedText = toStringedText.replace(regexAllOfTheValuesExceptNulls, '"$&"');
	toStringedText = toStringedText.replace(regexForKeysWithoutQuotes,'"$1"$2');
	toStringedText = '{' + toStringedText ;
	let pretty = toStringedText;
	try {
		pretty = JSON.stringify(JSON.parse(toStringedText),null,2);
	} catch (error) {
		return pretty;
	}
	return pretty;
}


function replaceAt (text: string, index: number, replacement: string, sub: string): string {
    return text.substr(0, index) + replacement + text.substr(index + sub.length);
}