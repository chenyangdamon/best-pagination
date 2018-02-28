/*
 * @Author: chenyang_pc
 * @Date:   2017-10-28 22:08:02
 * @Last Modified by:   chenyang_pc
 * @Last Modified time: 2018-02-28 11:28:38
 */

$(function() {
	
	// best-pagination使用演示
	
	var pagination = new Pagination({
		container: $("#J-pagination1"),
		curPage: 1,
		totalPage: 20,
		handler: function(value) {
			console.log(value);
		}
	});

	var pagination = new Pagination({
		container: $("#J-pagination2"),
		curPage: 20,
		totalPage: 20,
		range:6, // 修改范围 
		handler: function(value) {
			console.log(value);
		}
	});

	var pagination = new Pagination({
		container: $("#J-pagination3"),
		curPage: 13,
		totalPage: 20,
		range:6, // 修改范围 
		handler: function(value) {
			console.log(value);
		}
	});
	var pagination = new Pagination({
		container: $("#J-pagination4"),
		curPage: 1,
		totalPage: 1,
		handler: function(value) {
			console.log(value);
		}
	});
	var pagination = new Pagination({
		container: $("#J-pagination5"),
		curPage: 20,
		totalPage: 20,
		showBox:true,
		handler: function(value) {
			console.log(value);
		}
	});

});