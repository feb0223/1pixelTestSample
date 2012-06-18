(function() {

var modal = null;
var event = null;
var model = null;
var views = null;

$.test.require(
	// modal.jsの読み込み
	{name:'modal', path:'../js/modal.js', beforeEval:function(script) {
			// veiw.mainの#rootへのappendが実行されないようコードを削除
			return script.replace("$('#root').append(view.main);", '');
		}
	},
	function(module) {
		modal = module.modal;
		// moda.jsでexportsしておいたオブジェクトをここで取得できる
		event = modal.event;
		model = modal.model
		view = modal.view;
		// テストの実行
		$.test.exec();
	}
);

describe('モーダルウィンドウテスト', function() {
	var temp = null;
	var cnt = 0;
	
	beforeEach(function() {
		// １度だけ実行されるようにする
		if (cnt > 0) { return; }
		
		// 詳細データ取得用の関数を一時的に書き換え
		temp = model.getDetail;
		model.getDetail = function(callback) {
			callback({title:'テスト・タイトル', description:'テスト・説明'});
		};
		// ボタンのクリック
		view.button.click();
		model.getDetail = temp;
		cnt++;
	});
	
	describe('表示チェック', function() {
		it('ウィンドウ', function() {
			expect(view.main.find('.modal').length === 1).toBe(true);
		});
		it('タイトル', function() {
			var title = view.modalWindow.find('.title').text()
			expect(title === 'テスト・タイトル').toBe(true);
		});
		it('説明', function() {
			var description = view.modalWindow.find('.description').text();
			expect(description === 'テスト・説明').toBe(true);
		});
	});});

})();