/*!
 * JavaScript Components pc-better-pagination
 * @author : chenyangdamon
 * @email  : 645230634@qq.com
 * @github : https://github.com/chenyangdamon
 * @Date   : 2017-02-28 22:08:02
 */
;
(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		// AMD模式
		define(["jquery"], function() {
			factory.apply(root, arguments)
		});
	} else {
		// 全局模式
		factory.call(root, root.$);
	}
})(window, function($) {

	var Pagination = function(userOption) {
		/**
		 * [defaultOption description]
		 * @type {Object}
		 */
		this.defaultOption = {
			//放置分页组件的容器
			container: "",
			// 当前页码
			curPage: 1,
			// 总页码
			totalPage: 1,
			// 页码区间范围
			range: 4,
			// 是否显示其他
			showBox: false,
			//文本信息
			lang: {
				first: "首页",
				prev: "上一页",
				next: "下一页",
				last: "尾页"
			},
			//点击页码后的回调
			click: function(){}
		};
		this.init.call(this, userOption);
	};
	/**
	 * [prototype description]
	 * @type {Object}
	 */
	Pagination.prototype = {
		/**
		 * [constructor description]
		 * @type {String}
		 */
		constructor: "Pagination",
		/**
		 * [init description]
		 * @param  {[type]} userOption [description]
		 * @return {[type]}            [description]
		 */
		init: function(userOption) {
			var _this = this;
			_this.option = $.extend({}, _this.defaultOption, userOption);
			if (_this.option.curPage <= 0) return;
			if (_this.option.totalPage <= 0) return;
			if (_this.option.curPage > _this.option.totalPage) _this.option.curPage = _this.option.totalPage;
			_this.makeData();
			_this.bindEvent();
		},
		/**
		 * [bindEvent description]
		 * @return {[type]} [description]
		 */
		bindEvent: function() {
			var _this = this;
			// 点击事件
			_this.option.container.on("click", ".pag", function() {
				// 当前点击的页码
				var curValue = parseInt(this.getAttribute("data-value")) || 1;

				// 再次点击当前页码时视为无效操作
				if (_this.option.curPage === curValue) return;

				_this.option.curPage = curValue;
				// 重新生成数据
				_this.makeData();
				// 用户点击回调处理
				typeof _this.option.click === "function" && _this.option.click.call(_this, curValue);

			});

			//输入页码跳转
			_this.option.container.on("click", ".button", function() {
				var val = parseInt($.trim(_this.option.container.find("input").val()));

				if (!val) return;

				_this.option.curPage = val;
				//重新生成数据
				_this.makeData();
			});
		},
		/**
		 * 生成分页数据
		 */
		makeData: function() {
			var _this = this,
				// 首页、上一页
				pageLeft = [],
				// 页码
				pageCenter = [],
				//下一页、尾页
				pageRight = [],
				minPage = 0,
				maxPage = 0;

			_this.option.range = _this.option.range > _this.option.totalPage ? _this.option.totalPage : _this.option.range;

			//文本信息
			var sFirst = _this.option.lang.first,
				sPrev = _this.option.lang.prev,
				sNext = _this.option.lang.next,
				sLast = _this.option.lang.last;

			//是否是第一页
			if (_this.option.curPage === 1) {
				pageLeft.push({
					text: sFirst,
					value: 1,
					isActive: false,
					isFirst: true
				}, {
					text: sPrev,
					value: 1,
					isActive: false,
					isPrev: true
				});
			} else {
				pageLeft.push({
					text: sFirst,
					value: 1,
					isActive: true,
					isFirst: true
				}, {
					text: sPrev,
					value: _this.option.curPage - 1,
					isActive: true,
					isPrev: true
				});
			}

			//是否是最后一页
			if (_this.option.curPage === _this.option.totalPage) {
				pageRight.push({
					text: sNext,
					value: _this.option.totalPage,
					isActive: false,
					isNext: true
				}, {
					text: sLast,
					value: _this.option.totalPage,
					isActive: false,
					isLast: true
				});
			} else {
				pageRight.push({
					text: sNext,
					value: _this.option.curPage + 1,
					isActive: true,
					isNext: true
				}, {
					text: sLast,
					value: _this.option.totalPage,
					isActive: true,
					isLast: true
				});
			}

			//页码区间范围（ 核心重点 ）
			var min = (_this.option.curPage - Math.floor(_this.option.range / 2));
			minPage = min < 1 ? 1 : min;

			// 如果max大于totalPage,则maxPage的值应为totalPage
			var max = (minPage + _this.option.range - 1);

			maxPage = max > _this.option.totalPage ? _this.option.totalPage : max;

			// if (this.option.curPage < this.option.range) {
			//     minPage = 1;
			//     maxPage = this.option.range;
			// }

			if (_this.option.curPage === _this.option.totalPage) {
				minPage = _this.option.totalPage - _this.option.range + 1;
				maxPage = _this.option.totalPage;
			}

			//生成区间页码
			for (var i = minPage; i <= maxPage; i++) {
				pageCenter.push({
					text: i,
					value: i,
					isActive: true,
					isCur: _this.option.curPage === i
				});
			}

			//如果最小页码star大于2,则要添加省略号和第一页
			if (minPage > 2) {
				pageCenter.unshift({
					text: 1,
					value: 1,
					isActive: true
				}, {
					text: "...",
					isActive: false,
					isEllipsis: true
				});
			}

			//  如果最小页码star等于2,则要添加第一页
			if (minPage === 2) {
				pageCenter.unshift({
					text: 1,
					value: 1,
					isActive: true
				});
			}

			// 如果最大页码maxPage小于倒数第二页,则要添加省略号和尾页
			if (maxPage < _this.option.totalPage - 1) {
				pageCenter.push({
					text: "...",
					isActive: true,
					isEllipsis: true
				}, {
					text: _this.option.totalPage,
					value: _this.option.totalPage,
					isActive: true
				});
			}

			//如果最大页码maxPage等于倒数第二页,则要添加尾页
			if (maxPage === (_this.option.totalPage - 1)) {
				pageCenter.push({
					text: _this.option.totalPage,
					value: _this.option.totalPage,
					isActive: true
				});
			}
			// 渲染分页组件
			_this.renderPagerHtml(pageLeft.concat(pageCenter, pageRight));
		},

		/**
		 * 渲染分页组件
		 * @param array
		 */
		renderPagerHtml: function(array) {

			var _this = this,
				result = [],
				$span = "";

			for (var i = 0; i < array.length; i++) {

				var strclass = [];

				//首页
				if (array[i].isFirst) {
					strclass.push(" first");
				}

				//上一页
				if (array[i].isPrev) {
					strclass.push(" prev");
				}

				/*
				 * 下一页
				 * */
				if (array[i].isNext) {
					strclass.push(" next");
				}

				/*
				 * 尾页
				 * */
				if (array[i].isLast) {
					strclass.push(" last");
				}

				//当前页
				if (array[i].isCur) {
					strclass.push(" cur");
				}

				//禁用
				if (!array[i].isActive) {
					strclass.push(" disabled");
				}

				//省略号
				if (array[i].isEllipsis) {
					strclass = ["ellipsis"];
				} else {
					strclass.push(" pag");
				}


				if (array[i].isEllipsis) {
					$span = "<span class='" + strclass.join("") + "'>" + array[i].text + "</span>";
				} else {
					$span = "<span class='" + strclass.join("") + "' data-value='" + array[i].value + "'>" + array[i].text + "</span>";
				}

				result.push($span);

			}

			// 分页外壳，可以实现居中对齐效果，如果不需要可以直接获取result值
			var str = "<table width='100%'>\n" +
				"    <tr>\n" +
				"        <td align='center'>\n" +
				"            <table>\n" +
				"                <tr>\n" +
				"                    <td><div class='pb-pagination'>" + result.join("") + "" + (_this.option.showBox ? _this.createBox() : "") + "</div></td>\n" +
				"                </tr>\n" +
				"            </table>\n" +
				"        </td>\n" +
				"    </tr>\n" +
				"</table>";

			//渲染到指定容器中
			if (_this.option.container instanceof jQuery) {
				_this.option.container.html(str);
			}

		},

		/**
		 * 生产其他信息
		 * @returns {string}
		 */
		createBox: function() {
			var _this = this;
			return "<div class='pag-box'>" +
				"    <em>当前第<i>" + _this.option.curPage + "</i>页<cite>/</cite>共<i>" + _this.option.totalPage + "</i>页</em>" +
				"    <em>跳到<input><a class='button button-h-26 button-blue'>确定</a></em>" +
				"</div>";
		},

		/**
		 * 重置分页组件，当前页要置为1，总页码要动态传入，再重新渲染分页组即可
		 * @param totalPage
		 */
		reset: function(totalPage) {
			var _this = this;
			_this.option.curPage = 1;
			_this.option.totalPage = parseInt(totalPage) || _this.option.totalPage;
			_this.makeData();
		}
	};
	/**
	 * [Pagination description]
	 * @type {[type]}
	 */
	this.Pagination = Pagination;

});