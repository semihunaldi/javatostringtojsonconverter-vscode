
let regexForClassNamesWithEquals = new RegExp('[a-zA-Z0-9_]+\\(','g');
let regexForKeysWithEquals = new RegExp('[a-zA-Z0-9_]+=', 'g');
let regexAllOfTheValuesExceptNulls = new RegExp('(?<=:).*?[a-zA-Z\\d](?=\\n)(?<!null)','g');

export function convert(toStringedText: string): string {
	var matches = toStringedText.match(regexForClassNamesWithEquals);
	matches?.forEach(item => {
		toStringedText = toStringedText.replace(item, "{");
	});
	matches = toStringedText.match(regexForKeysWithEquals);
	matches?.forEach(item => {
		toStringedText = toStringedText.replace(item, "\"" + item.substr(0,item.length-1)+"\":");
	});
	toStringedText = toStringedText.replace(new RegExp('\\(','g'),'{');
	toStringedText = toStringedText.replace(new RegExp('\\)','g'),'}');
	toStringedText = toStringedText.replace(new RegExp('}"','g'), "}");
	toStringedText = toStringedText.replace(new RegExp('"}','g'), "}");

	if(toStringedText.startsWith("\"")) {
		let indexOfFirstParanthesis = toStringedText.indexOf("{");
		toStringedText = toStringedText.substring(indexOfFirstParanthesis, toStringedText.length);
	}
	toStringedText = toStringedText.replace(new RegExp(',','g'), '\n,');
	toStringedText = toStringedText.replace(new RegExp('{','g'), '\n{');
	toStringedText = toStringedText.replace(new RegExp('}','g'), '\n}');
	toStringedText = toStringedText.replace(regexAllOfTheValuesExceptNulls, '"$&"');
	return JSON.stringify(JSON.parse(toStringedText),null,2);
}
