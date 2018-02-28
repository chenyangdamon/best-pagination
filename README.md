# best-pagination 是什么?
应用于web开发(仅支持PC)的异步分页组件
# 演示
[demo](https://chenyangdamon.github.io/best-pagination/dist/)
# 依赖 
- jquery
# 安装
## script
```html
// import jquery.js
<script type="text/javascript" src="js/jquery.js"></script>
// import best-pagination.js
<script type="text/javascript" src="js/best-pagination.js"></script>
```
# 使用
index.js
```html
<script type="text/javascript">
$(function(){

  	// 实例化Pagination
	var pagination = new Pagination({
		container: $("#J-pagination1"),
		curPage: 1,
		totalPage: 1,
		handler: function(curPage) {
		 // curPage 当前页码,
		 // $.ajax()
		 // TODO...
		}
	});
  
});
</script>
```
# 结构
## 配置
|属性|说明|默认值|字段类型|
|:---|---|---|---|
| `container`|放置分页组件的容器.|`$("body")`|`jQuery object`|
| `curPage`|当前页码|`1`|`Number`|
| `totalPage`|总页码,当总页码为0时，组件不显示|`1`|`Number`|
| `range`|页码区间范围|`4`|`Number`|
| `showBox`|是否显示其他分页信息|`false`|`Boolean`|
| `lang`|按钮文本.|`first: "首页",prev: "上一页",next: "下一页",last: "尾页"`|`String`|
| `handler`|点击页码后的回调|function(){}|`Function`|
## 方法
#### reset(totalPage)
重置组件，常用于页面无刷新情况下，数据源变更，如更改了筛选条件。
```html
// totalPage总页码
pagination.reset(totalPage);
```