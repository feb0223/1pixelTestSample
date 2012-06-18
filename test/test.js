(function(w) {
var slice = Array.prototype.slice;
$.test = $.test || {};

function isObject(o) {
	return o instanceof Object;
}

// テスト対象のJSを動的に読み込むための関数
$.test.require = function() {
	var args = slice.apply(arguments);
	var callback = args.pop();
	var len = args.length;
	
	var i = 0;
	var scripts = {};
	var exec = function() {
		var url = args[i];
		var beforeEval = null;
		var name = null;
		if (isObject(url)) {
			beforeEval = url.beforeEval;
			name = url.name;
			url = url.path;
		}
		$.get(url, function(script) {
			if (beforeEval) {
				script = beforeEval(script);
			}
			var resEval = eval(script);
			scripts[name || url] = resEval;
			i++;
			if (i === len && callback) {
				callback(scripts);
			} else {
				exec();
			}
		});
	};
	exec();
};

// テストの実行
$.test.exec = function() {
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;
	var htmlReporter = new jasmine.HtmlReporter();
	jasmineEnv.addReporter(htmlReporter);
	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};
	jasmineEnv.execute();
};


})(window);