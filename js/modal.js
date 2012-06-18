(function(w) {
var exports = {};

var event = {
	documentReady: function() {
		$('#root').append(view.main);
		view.button.click(event.showModalWindow);
		view.main.append(view.button);
	},
	showModalWindow: function() {
		model.getDetail(function(detail) {
			view.modalWindow.find('.title').append(detail.title);
			view.modalWindow.find('.description').append(detail.description);
			view.main.append(view.modalWindow);
		});
	}
};

var model = {
	getDetail: function(callback) {
		$.get('./detail.json', function(data) {
			callback(JSON.parse(data));
		});
	}
};

var view = {
	main: $('<div id="main"></div>'),
	button: $('<button>Show Modal Window</button>'),
	modalWindow: $([
		'<div class="modal">',
			'<p class="title"></p>',
			'<p class="description"></p>',
		'</div>'
	].join(''))
};

$(document).ready(event.documentReady);

// テスト用
exports.event = event;
exports.model = model;
exports.view = view;

return exports;
})(window);