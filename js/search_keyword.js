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
// HSP�̃L�[���[�h�w���v���Ăяo��
// ���t�@�C����������HSP�ł͂Ȃ��ꍇ�͊O��HTML�w���v���Ăяo���܂�

(function(){

	// ���������� ----------------------------------------------
	var sPluginName = Plugin.GetDef("Plugin", "Name");
	// HSP�̃C���X�g�[����f�B���N�g�����擾
	var sHspDir = Plugin.GetOption("HSPde", "Path");
	// �`�F�b�N
	if( !sHspDir ) {
		var shell = new ActiveXObject("WScript.Shell");
		shell.Popup(
				"HSP�̃C���X�g�[���悪�w�肳��Ă��܂���\n" +
				"�ݒ聨���ʐݒ聨�v���O�C����" + sPluginName + "���ݒ� ����w�肵�Ă��������B",
				0, sPluginName
			);
		Editor.OptionCommon();
		return;
	}

	// ---------------------------------------------------------
	// ���C��

	// �^�C�v�ʐݒ肪HSP���ǂ����𒲂ׂ�
	if( Editor.IsCurTypeExt("hsp") ||
		Editor.IsCurTypeExt("as") )
	{
		var isSelected = Editor.IsTextSelected();
		if( !isSelected ) {
			// ���݈ʒu���ړ������ɓo�^
			Editor.MoveHistSet();
			// �L�[���[�h���擾���܂�
			Editor.SelectWord();
		}
		var sKeyword = Editor.GetSelectedString(0);
		// �L�[���[�h�w���v���Ăяo���܂�
		var shell = new ActiveXObject("WScript.Shell");
		shell.Run("\"" + sHspDir + "\\hdl.exe\"" + sKeyword);
		//
		if( !isSelected ) {
			// �ړ������F �O��
			Editor.MoveHistPrev();
		}
	} else {
		// �O��HTML�w���v���Ăяo���܂�
		Editor.ExtHtmlHelp();
	}

})();
