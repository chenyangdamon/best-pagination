# What is best-pagination ?
This is a pagination component that focuses on the PC side of web applications. It's simple, compact, lightweight, efficient, and portable. Helps reduce the amount of development effort.
# Dependence 
- jquery.1.11.x
# Installation
## script
```html
// import jquery.js
<script type="text/javascript" src="js/jquery.js"></script>
// import best-pagination.js
<script type="text/javascript" src="js/best-pagination.js"></script>
```
# Useage
index.js
```html
<script type="text/javascript">
$(function(){
  
  	// instantiation pagination
	var pagination = new Pagination({
		container: $("#J-pagination1"),
		curPage: 21,
		totalPage: 20,
		handler: function(value) {
			console.log(value);
		}
	});
  
});
</script>
```
# Constructor
## Options
|key|description|default|options|
|:---|---|---|---|
| `container`|Container for carrying components.|`$("body")`|`String`|
| `curPage`|What page is it now.|`1`|`Number`|
| `totalPage`|Page count.|``|`Number`|
| `range`|Range of motion.|`4`|`Number`|
| `showBox`| Do you want to show other information.|`false`|`Boolean`|
| `lang`|Text information.|`first: "首页",prev: "上一页",next: "下一页",last: "尾页"`|`String`|
| `handler`|Callback processing.|`null`|`Function`|
## methods
#### reset(totalPage)
reset the pagination component
