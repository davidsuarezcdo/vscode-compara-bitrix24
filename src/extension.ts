import * as vscode from "vscode";
import { resolveUrl, UrlEnvironment, UrlType } from "./resolveUrl";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("vscode-compara-bitrix24.bitrix24DevUrlGenFolder", () =>
      resolveBitrixUrl(UrlEnvironment.dev, UrlType.folder)
    ),
    vscode.commands.registerCommand("vscode-compara-bitrix24.bitrix24DevUrlGenFile", () =>
      resolveBitrixUrl(UrlEnvironment.dev, UrlType.file)
    ),
    vscode.commands.registerCommand("vscode-compara-bitrix24.bitrix24ProdUrlGenFolder", () =>
      resolveBitrixUrl(UrlEnvironment.prod, UrlType.folder)
    ),
    vscode.commands.registerCommand("vscode-compara-bitrix24.bitrix24ProdUrlGenFile", () =>
      resolveBitrixUrl(UrlEnvironment.prod, UrlType.file)
    )
  );
}

function resolveBitrixUrl(env: UrlEnvironment, type: UrlType) {
  const filepath = vscode.window.activeTextEditor?.document.fileName;
  const url = resolveUrl(filepath, env, type);
  vscode.commands.executeCommand("vscode.open", url);
}

export function deactivate() {}
