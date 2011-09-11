//-------------------------------------------------------------------------------
// search_keyword.js - Keyword search for HSP
//-------------------------------------------------------------------------------
//
// Copyright(c) 2008,2011 sharkpp All rights reserved.
//
// The MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
//-------------------------------------------------------------------------------
// HSPのキーワードヘルプを呼び出す
// ※ファイル名を見てHSPではない場合は外部HTMLヘルプを呼び出します

(function(){

	// 初期化処理 ----------------------------------------------
	var sPluginName = Plugin.GetDef("Plugin", "Name");
	// HSPのインストール先ディレクトリを取得
	var sHspDir = Plugin.GetOption("HSPde", "Path");
	// チェック
	if( !sHspDir ) {
		var shell = new ActiveXObject("WScript.Shell");
		shell.Popup(
				"HSPのインストール先が指定されていません\n" +
				"設定→共通設定→プラグイン→" + sPluginName + "→設定 から指定してください。",
				0, sPluginName
			);
		Editor.OptionCommon();
		return;
	}

	// ---------------------------------------------------------
	// メイン

	// タイプ別設定がHSPかどうかを調べる
	if( Editor.IsCurTypeExt("hsp") ||
		Editor.IsCurTypeExt("as") )
	{
		var isSelected = Editor.IsTextSelected();
		if( !isSelected ) {
			// 現在位置を移動履歴に登録
			Editor.MoveHistSet();
			// キーワードを取得します
			Editor.SelectWord();
		}
		var sKeyword = Editor.GetSelectedString(0);
		// キーワードヘルプを呼び出します
		var shell = new ActiveXObject("WScript.Shell");
		shell.Run("\"" + sHspDir + "\\hdl.exe\"" + sKeyword);
		//
		if( !isSelected ) {
			// 移動履歴： 前へ
			Editor.MoveHistPrev();
		}
	} else {
		// 外部HTMLヘルプを呼び出します
		Editor.ExtHtmlHelp();
	}

})();
