function updateNavbarClass(className) {
	$('nav')
		.removeClass(function (index, css) {
			return (css.match(/(^|\s)fixed-\S+/g) || []).join(' ')
		})
		.addClass(className)

	fixBodyMargin(className)
}

function fixBodyMargin(className) {
	if (/fixed-(left)/.test(className)) {
		$('body').removeAttr('style')
		if (className === 'fixed-left') {
			$('body').css('marginRight', 0)
		}
	} else {
		$('body').css({
			'margin-right': 0,
			'margin-left': 0,
			'padding-top': '90px',
		})
	}
}
