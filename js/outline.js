//-------------------------------------------------------------------------------
// outline.js - Outline analyze for HSP
//-------------------------------------------------------------------------------
//
// Copyright(c) 2011 sharkpp All rights reserved.
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

// リストの種別はツリー表示
Outline.SetListType(100);
// タイトル
Outline.SetTitle(Plugin.GetDef("Plug", "Outline.Label"));
// アウトライン解析処理
var lineNum = Editor.GetLineCount(0);
var module = "";
var depth = 0;
for(var lineNo = 1; lineNo <= lineNum; lineNo++) {
	var lineData = Editor.GetLineStr(lineNo);
	// ラベル追加
	if( lineData.match(/^(\s*)(\*[^\s,.:;\/()=0-9][^\s,.:;\/]*)/) ||
		lineData.match(/^(.+?:\s*)(\*[^\s,.:;\/()=0-9][^\s,.:;\/]*)/) )
	{
		Outline.AddFuncInfo2(lineNo, RegExp.$1.length + 1, RegExp.$2, depth);
	} else
	// ユーザー定義関数・命令、モジュール関数・命令
	if( lineData.match(/^(\s*(#defc?func)\s+local\s+)([^\s,.:;\/()=0-9][^\s,.:;\/]*)/) ||
		lineData.match(/^(\s*(#modc?func)\s+local\s+)([^\s,.:;\/()=0-9][^\s,.:;\/]*)/) ||
		lineData.match(/^(\s*(#defc?func)\s+)([^\s,.:;\/()=0-9][^\s,.:;\/]*)/) ||
		lineData.match(/^(\s*(#modc?func)\s+)([^\s,.:;\/()=0-9][^\s,.:;\/]*)/) )
	{
		depth = "" != module ? 1 : 0;
	//	Outline.AddFuncInfo2(lineNo, RegExp.$1.length + 1, RegExp.$2 + " " + RegExp.$3, depth);
		Outline.AddFuncInfo2(lineNo, RegExp.$1.length + 1, RegExp.$3, depth);
		depth++;
	} else
	// モジュール開始
	if( lineData.match(/^(\s*(#module)\s+)"([^\s,.:;\/()=0-9][^\s,.:;\/]*)"/) ||
		lineData.match(/^(\s*(#module)\s+)([^\s,.:;\/()=0-9][^\s,.:;\/]*)/) )
	{
		module = (RegExp.$3 ? RegExp.$3 : "");
	//	module = RegExp.$2 + " " + (RegExp.$3 ? RegExp.$3 : "");
		Outline.AddFuncInfo2(lineNo, RegExp.$1.length + 1, module, 0);
		depth = 1;
	} else
	// モジュール終了
	if( lineData.match(/^(\s*)(#global).*/) )
	{
		Outline.AddFuncInfo2(lineNo, RegExp.$1.length + 1, RegExp.$2, 1);
		module = "";
		depth = 0;
	}
}
