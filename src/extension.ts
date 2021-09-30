// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('extension "javatostringtojsonconverter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('javatostringtojsonconverter.convert', () => {
		// The code you place here will be executed every time your command is executed
		
		let regexForClassNamesWithEquals = new RegExp('[a-zA-Z0-9_]+\\(','g');
		let regexForKeysWithEquals = new RegExp('[a-zA-Z0-9_]+=', 'g');
		let regexAllOfTheValuesExceptNulls = new RegExp('(?<=:).*?[a-zA-Z\\d](?=\\n)(?<!null)','g');
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			try {
				const document = editor.document;
				const selection = editor.selection;
				var toStringedText = document.getText(selection);
				let matches = toStringedText.match(regexForClassNamesWithEquals);
				matches?.forEach(item => {
					toStringedText = toStringedText.replace(item, "{");
				});
				matches = toStringedText.match(regexForKeysWithEquals);
				matches?.forEach(item => {
					toStringedText = toStringedText.replace(item, "\"" + item.substr(0,item.length-1) + "\":");
				});
				toStringedText = toStringedText.replace(new RegExp('\\(','g'),'{');
				toStringedText = toStringedText.replace(new RegExp('\\)','g'),'}');
				toStringedText = toStringedText.replace(new RegExp('}"','g'), "}");

				if(toStringedText.startsWith("\"")) {
					let indexOfFirstParanthesis = toStringedText.indexOf("{");
					toStringedText = toStringedText.substring(indexOfFirstParanthesis, toStringedText.length);
				}
				toStringedText = toStringedText.replace(new RegExp(',','g'), '\n,');
				toStringedText = toStringedText.replace(new RegExp('{','g'), '\n{');
				toStringedText = toStringedText.replace(new RegExp('}','g'), '\n}');
				toStringedText = toStringedText.replace(regexAllOfTheValuesExceptNulls, '"$&"');
				var jsonPretty = JSON.stringify(JSON.parse(toStringedText),null,2); 
				editor.edit(editBuilder => {
					editBuilder.replace(selection, jsonPretty);
				});
				vscode.window.showInformationMessage('Sucessfully converted to json.');
			} catch (error) {
				vscode.window.showErrorMessage((error as Error).message);
			}
		}
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
