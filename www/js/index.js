// 控制用户下拉菜单位置
$(function(){
$('body').on('click','.user-name',function(){
		$('.user-info').css({
		top:50+'px',
		right:-10+'px'
	})
	$('.user-info').slideToggle()
})


})