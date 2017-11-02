# What is best-loading ?
This is a loading component that focuses on the PC side of web applications. It's simple, compact, lightweight, efficient, and portable. Helps reduce the amount of development effort.
# Dependence 
- jquery.1.11.x
# Installation
## script
```html
// import jquery.js
<script type="text/javascript" src="js/jquery.js"></script>
// import best-loading.js
<script type="text/javascript" src="js/best-loading.js"></script>
```
# Useage
index.js
```html
<script type="text/javascript">
$(function(){
  
  // instantiation Loading
  var loading=new Loading();
  
  // open
  loading.open();
  
  // close
  loading.close();
  
});
</script>
```
# Constructor
## Options
|key|description|default|options|
|:---|---|---|---|
| `container`|Container for carrying components.|`$("body")`|`String`|
| `uclass`|Custom class.|`""`|`String`|
| `effect`|Dynamic type, built-in three kinds of `micrsoft`、`recycle`、`flat`.|`micrsoft`|`String`|
| `url`|Custom dynamic address.|`""`|`String`|
| `show`|Whether to display text.|`true`|`Boolean`|
| `text`|Text information.|`Being processed...`|`String`|

## methods
#### open(conf)
open the loading component
- conf.container
- conf.uclass
- conf.mode 
- conf.effect
- conf.url
- conf.show
- conf.text

#### close()
remove loading components
