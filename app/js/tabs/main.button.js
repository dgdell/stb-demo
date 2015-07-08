/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Button    = require('../stb/ui/button'),
	Panel     = require('../stb/ui/panel'),
	preloader = require('../stb/preloader'),
	panel     = new Panel({
		$node: document.getElementById('pageMainTabButton'),
		visible: false
	});


preloader.addListener('done', function () {
	debug.log('ready');
});


panel.add(
	new Panel({
		$node: document.getElementById('pageMainTabButtonSimple'),
		children: [
			new Button({
				value: 'preload images',
				events: {
					click: function () {
						debug.log('click');

						preloader.add([
							'http://pic.uuhy.com/uploads/2011/09/01/Painting-Of-Nature.png',
							'https://perishablepress.com/wp/wp-content/themes/wire/img/jeff-starr.jpg',
							{url: 'http://www.phpied.com/files/reflow/dyna1.png', group:'qwe'},
							{url: 'http://www.phpied.com/files/reflow/dyna3.png', group:'qwe'},
							'http://www.phpied.com/files/reflow/render.pn'
						]);
					}
				}
			}),
			new Button({
				value: 'show heavy image',
				events: {
					click: function () {
						debug.log('click');

						panel.$node.style.background = 'url("http://pic.uuhy.com/uploads/2011/09/01/Painting-Of-Nature.png") center center';
					}
				}
			})
		]
	}),
	new Panel({
		$node: document.getElementById('pageMainTabButtonIcon'),
		children: [
			new Button({
				icon: 'menu'
			})
		]
	}),
	new Panel({
		$node: document.getElementById('pageMainTabButtonIconText'),
		children: [
			new Button({
				icon: 'menu',
				value: 'press me'
			})
		]
	})
);


// public
module.exports = panel;
