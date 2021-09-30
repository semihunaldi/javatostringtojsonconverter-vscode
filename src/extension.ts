// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { convert } from './convert';


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
		
		
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			try {
				const document = editor.document;
				const selection = editor.selection;
				var toStringedText = document.getText(selection);
				var jsonPretty = convert(toStringedText);
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
