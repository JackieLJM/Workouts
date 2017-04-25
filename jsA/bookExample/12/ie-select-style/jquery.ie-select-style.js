/*global $ jQuery window */
/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, strict: true */
/**
 * Internet Explorer Select Width and Style Bug Workaround.
 * 
 * Copyright (c) 2010 Ewen Elder
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @author: Ewen Elder <glomainn at yahoo dot co dot uk> <ewen at jainaewen dot com>
 * @version: 1.0
**/ 

'use strict';
(function ($)
{
	$.ieSelectStyle = {
		version : '0.9 beta'
	};
	
	
	$.fn.ieSelectStyle = function (options)
	{
		var elements, ieSelectStyle, isIE8, xhr;
		
		elements = $(this);
		isIE8 = false;
		xhr = window.XMLHttpRequest;
		
		
		// Extend the defaults.
		options = $.extend({}, $.ieSelectStyle.defaults, options);
		
		
		ieSelectStyle = {
			
			init : function ()
			{
				var cssRule, element, width;
				
				// Not IE??
				if (!document.all)
				{
					return false;
				}
				
				
				// Loop for each passed element.
				return elements.each
				(
					function ()
					{
						element = $(this);
						
						
						// If the element has multiple set, or has a size higher than 0, continue to the next element (don't add the width open/close methods.)
						if (element.attr('multiple') || element.attr('size') > 0)
						{
							return false;
						}
						
						
						// Is IE 8 and in IE 8 Standards mode.
						if (document.documentMode && document.documentMode > 7)
						{
							isIE8 = true;
						}
						
						
						// If this element doesn't have an ID, apply one.
						if (!element.attr('id').length)
						{
							element.attr('id', String((new Date()).getTime()).replace(/\D/gi, '').substr(8));
						}
						
						
						// Get the CSS rule to use.
						cssRule = ieSelectStyle.styleSheets(element);
						
						
						// Apply width if set by options.
						if (options.width !== '')
						{
							element.css('width', options.width);
						}
						
						
						// Get the innerWidth for IE 8.
						if (isIE8)
						{
							width = element.innerWidth();
						}
						
						// Get the innerWidth for lte IE 7.
						else
						{
							width = ieSelectStyle.innerWidth(element, cssRule);
						}
						
						// Store the original innerWidth.
						element.data('origWidth', width);
						
						
						// Add the container.
						ieSelectStyle.addContainer(element, cssRule);
						
						
						// Add the border mask elements (lte IE 7.)
						if (options.applyStyle)
						{
							ieSelectStyle.addMask(element);
						}
						
						
						if (options.applyWidth)
						{
							// Add the overlay.
							ieSelectStyle.addOverlay(element);
							
							
							// Event listener for opening the select.
							element.bind
							(
								'dblclick mousedown change blur',
								function (event)
								{
									ieSelectStyle.openSelect(event);
								}
							);
							
							
							// Event listener for setting the various classes depending on the current event.
							element.bind
							(
								'mousedown mouseup mouseover mouseout blur change',
								function (event)
								{
									ieSelectStyle.setClass(event);
								}
							);
						}
						
						
						// Check for bgiframe for IE 6.
						if (!xhr && ($.fn.bgIframe || $.fn.bgiframe))
						{
							$('#' + element.attr('id') + '-container').find('span').bgiframe();
						}
					}
				);
			},
			
			
			
			/**
			 * Add and style the container, and all the other additional elements needed to make the select element look like it would in a decent browser.
			**/
			addContainer : function (element, cssRule)
			{
				var selector, background, browserClass, origParent, paddingTop = 0, paddingRight = 0, paddingBottom = 0, paddingLeft = 0, borderTop = 'none', borderRight = 'none', borderBottom = 'none', borderLeft = 'none';
				
				// Which browser??
				if (!xhr)
				{
					browserClass = 'ie6';
				}
				
				else if (xhr && !isIE8)
				{
					browserClass = 'ie7';
				}
				
				else if (isIE8)
				{
					browserClass = 'ie8';
				}
				
				
				// Add a container around the element and all the other styling elements.
				// If apply style is false, then add an additional container, otherwise, in IE 6/7, the select forces the container to open wider.
				element.after('<span id="' + element.attr('id') + '-container" class="' + options.containerClassName + ' ' + (!options.applyStyle ? options.noStyleClassName : '') + ' ' + browserClass + '">' + (!options.applyStyle ? '<span></span>' : '') + '</span>');
				
				if (options.applyStyle)
				{
					selector =  '#' + element.attr('id') + '-container';
				}
				
				else
				{
					selector = '#' + element.attr('id') + '-container.' + options.noStyleClassName + ' span';
				}
				$(selector).append(element);
				
				
				// If the browser is IE8 or if applyStyle is true, use these CSS settings.
				if (options.applyStyle || isIE8)
				{
					paddingTop = (element.css('paddingTop') !== '0px' ? ieSelectStyle.removeUnit(element.css('paddingTop')) - (isIE8 ? 1 : 2) : 0);
					paddingRight = (element.css('paddingRight') !== '0px' ? ieSelectStyle.removeUnit(element.css('paddingRight')) : 0);
					paddingBottom = (element.css('paddingBottom') !== '0px' ? ieSelectStyle.removeUnit(element.css('paddingBottom')) : 0);
					paddingLeft = (element.css('paddingLeft') !== '0px' ? ieSelectStyle.removeUnit(element.css('paddingLeft')) - (isIE8 ? 0 : 1) : 0);
					background = element.css('backgroundColor') !== 'transparent' ? element.css('backgroundColor') : '#fff';
					
					// try catch incase cssRule is null.
					try
					{
						borderTop = element.css('borderTopWidth') + ' ' + cssRule.style.borderTopStyle + ' ' + element.css('borderTopColor');
						borderRight = element.css('borderRightWidth') + ' ' + cssRule.style.borderRightStyle + ' ' + element.css('borderRightColor');
						borderBottom = element.css('borderBottomWidth') + ' ' + cssRule.style.borderBottomStyle + ' ' + element.css('borderBottomColor');
						borderLeft = element.css('borderLeftWidth') + ' ' + cssRule.style.borderLeftStyle + ' ' + element.css('borderLeftColor');
					} catch (err) {}
					
					
					// Remove select elements borders.
					element.css
					({
						border : 'none'
					});
				}
				
				
				// CSS for additional no-style applied span.
				$('#' + element.attr('id') + '-container.' + options.noStyleClassName + ' > span').css
				({
					display : 'block',
					overflow : 'hidden'
				});
				
				
				// Update the original width of the element to reflect padding.
				element.data('origWidth', (element.data('origWidth') - (isIE8 ? paddingRight + paddingLeft : 0)));
				
				
				// Set the container's CSS.
				$('#' + element.attr('id') + '-container').css
				({
					position : element.css('position') === 'static' ? 'relative' : element.css('position'),
					display : 'block',
					top : element.css('top'),
					right : element.css('right'),
					bottom : element.css('bottom'),
					left : element.css('left'),
					overflow : 'hidden',
					width : (element.data('origWidth') + (!options.applyStyle || isIE8 ? 0 : 1)),
					padding : paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft,
					margin : (element.css('marginTop') !== 'auto' ? element.css('marginTop') : 0) + ' ' + 
							 (element.css('marginRight') !== 'auto' ? element.css('marginRight') : 0) + ' ' + 
							 (element.css('marginBottom') !== 'auto' ? element.css('marginBottom') : 0) + ' ' + 
							 (element.css('marginLeft') !== 'auto' ? element.css('marginLeft') : 0),
					borderTop : borderTop,
					borderRight : borderRight,
					borderBottom : borderBottom,
					borderLeft : borderLeft,
					background : background
				});
				
				
				// Remove any positioning attributes from the select element.
				element.css
				({
					position : 'relative',
					top : !options.applyStyle || isIE8 ? 'auto' : -1,
					left : !options.applyStyle || isIE8 ? 'auto' : -1,
					bottom : 'auto',
					right : 'auto',
					zIndex : 1,
					width : (element.data('origWidth') + (!options.applyStyle || isIE8 ? 0 : 3)),
					padding : 0,
					margin : 0
				});
				
				
				// Make the select style elements container have Layout for margin bugs etc.
				origParent = element.parent().parent();
				
				if (!options.applyStyle)
				{
					origParent = origParent.parent();
				}
				
				if (!origParent.css('hasLayout'))
				{
					origParent.css('height', '1%');
				}
				
				
				// Apply container custom CSS.
				if (options.containerCSS !== '')
				{
					$('#' + element.attr('id') + '-container').css(options.containerCSS);
				}
				
				
				// Check for bgiframe for IE 6.
				if (!xhr && ($.fn.bgIframe || $.fn.bgiframe))
				{
					$('#' + element.attr('id') + '-container span').bgiframe();
				}
			},
			
			
			
			/**
			 * Width Specific Method,
			 * Add the overlay, apply bgiframe if present, add event listener, set the overlays's CSS,
			**/
			addOverlay : function (element)
			{
				var backgroundColor, borderRight, childWidth, container, elementId, height, left, margin, overlay, overlayId, paddingRight, paddingLeft, width;
				
				elementId = element.attr('id');
				overlayId = elementId + '-' + options.overlayClassName;
				
				
				// Add the overlay.
				element.after('<a id="' + overlayId + '" class="' + options.overlayClassName + '"><span></span></a>');
				
				
				// Get the overlay.
				overlay = $('#' + overlayId);
				
				
				// If the overlay is clicked, then the element will loose focus, set focus back to the element.
				overlay.bind
				(
					'mousedown',
					function ()
					{
						setTimeout
						(
							function ()
							{
								element.focus();
							},
							1
						);
					}
				);
				
				
				// Get styles for position and size calculations.
				container = $('#' + element.attr('id') + '-container');
				
				childWidth = overlay.children('span').width();
				backgroundColor = container.css('backgroundColor');
				borderRight = element.css('borderRightStyle') !== 'none' ? ieSelectStyle.removeUnit(element.css('borderRightWidth')) : 0;
				paddingRight = ieSelectStyle.removeUnit(container.css('paddingRight'));
				paddingLeft = ieSelectStyle.removeUnit(container.css('paddingLeft'));
				left = (element.outerWidth() - childWidth - (!options.applyStyle || isIE8 ? 0 : 2)) + (isIE8 ? paddingLeft : 0);
				width = childWidth + paddingRight;
				height = element.outerHeight();
				
				
				// Position the overlay to sit where the select's arrow thingie is.
				overlay.css
				({
					position : 'absolute',
					display : 'none',
					top : isIE8 ? element.position().top : 'auto',
					left : left,
					zIndex : 2,
					width : width,
					height : height,
					margin : margin,
					borderRight : borderRight,
					backgroundColor : backgroundColor
				});
				
				
				// Apply overlay custom CSS.
				if (options.overlayCSS !== '')
				{
					overlay.css(options.overlayCSS);
				}
			},
			
			
			
			/**
			 * Width Specific Method,
			 * Open the element and display the overlay.
			**/
			openSelect : function (event)
			{
				var element, elementId, offset, overlay, pageX, pageY, type; // element, id, offset, overlay, pageX, pageY, type
				
				element = $(event.target);
				elementId = element.attr('id');
				offset = element.offset();
				overlay = $('#' + elementId + '-' + options.overlayClassName);
				pageX = event.pageX;
				pageY = event.pageY;
				type = event.type;
				
				
				// If the event is blur, or change then reset the element back to normal,
				// if it is mousedown, and the element's overlay exists, AND the mousedown event happenned on the currently selected option, then reset the element back to normal,
				// ignore the mousedown event in any other circumstances.
				if (type === 'change' || type === 'blur' || type === 'dblclick' || (type === 'mousedown' && overlay.css('display') === 'block' && offset.left < pageX && (offset.left + element.data('origWidth')) > pageX && offset.top < pageY && (offset.top + element.outerHeight()) > pageY))
				{
					return ieSelectStyle.closeSelect(event);
				}
				
				
				// Show the overlay.
				if (overlay.css('display') === 'none')
				{
					overlay.css('display', 'block');
				}
				
				
				// Set the select's width to auto.
				if (!element.data('ignore'))
				{
					element.css('width', 'auto');
					
					
					// If the select's auto width is less than it's original width, then set it back to it's original width
					// and add a flag so that there are no future attempts to resize this element.
					if (element.outerWidth() < element.parent().innerWidth())
					{
						element.css('width', element.data('origWidth'));
						element.data('ignore', true);
					}
				}
			},
			
			
			
			/**
			 * Width Specific Method,
			 * Hide the overlay, and restore the select element's width.
			**/
			closeSelect : function (event)
			{
				var element = $(event.target);
				
				if (!element.data('ignore'))
				{
					setTimeout
					(
						function ()
						{
							element.css
							({
								width : (element.data('origWidth') + (!options.applyStyle || isIE8 ? 0 : 3))
							});
							
							element.siblings('a.' + options.overlayClassName).css('display', 'none');
						},
						1
					);
				}
			},
			
			
			
			/**
			 * Width Specific Method,
			 * Apply class names to represent the current event state, hover, mousedown etc.
			**/
			setClass : function (event)
			{
				var element, offset, overlay, pageX, pageY, type;
				
				element = $(event.target);
				offset = element.offset();
				overlay = $('a#' + element.attr('id') + '-' + options.overlayClassName);
				pageX = event.pageX;
				pageY = event.pageY;
				type = event.type;
				
				if (!overlay.length)
				{
					return false;
				}
				
				if (offset.left < pageX && (offset.left + element.data('origWidth')) > pageX && offset.top < pageY && (offset.top + element.outerHeight()) > pageY)
				{
					if (type === 'mousedown')
					{
						overlay.removeClass().addClass(options.overlayClassName + ' ' + options.overlayClassName + '-mousedown');
					}
					
					else if (type === 'mouseover')
					{
						overlay.removeClass().addClass(options.overlayClassName + ' ' + options.overlayClassName + '-hover');
					}
				}
				
				else
				{
					overlay.removeClass().addClass(options.overlayClassName);
				}
			},
			
			
			
			/**
			 * Style specific method,
			 * Hide the unremovable borders in IE 6/7.
			**/
			addMask : function (element)
			{
				var selector;
				
				if (isIE8)
				{
					return false;
				}
				
				$('#' + element.attr('id') + '-container').append('<span id="' + element.attr('id') + '-border-mask"></span>');
				$('#' + element.attr('id') + '-border-mask').append('<span class="a"></span><span class="b"></span><span class="c"></span><span class="d"></span>');
				$('#' + element.attr('id') + '-border-mask').append(element);
				
				
				// Hide the unstyleable outer borders of the select.
				$('#' + element.attr('id') + '-border-mask').css
				({
					position : 'relative',
					display : 'block',
					top : 1,
					width : element.outerWidth() - 2,
					height : element.outerHeight() - 2,
					overflow : 'hidden'
				});
				
				
				// Hide the unstylable inner borders of the select.
				selector = '#' + element.attr('id') + '-border-mask span.';
				
				$(selector + 'a,' + selector + 'b,' + selector + 'c,' + selector + 'd').css
				({
					position : 'absolute',
					display : 'block',
					top : 0,
					left : 0,
					zIndex : 2,
					width : (element.outerWidth() - 19),
					height : 2,
					backgroundColor : element.css('backgroundColor')
				});
				
				$(selector + 'b').css
				({
					top : 'auto',
					bottom : 0
				});
				
				$(selector + 'c').css
				({
					top : 2,
					width : 2,
					height : (element.outerHeight() - 6)
				});
				
				$(selector + 'd').css
				({
					top : 2,
					left : 'auto',
					right : 17,
					width : 2,
					height : (element.outerHeight() - 6)
				});
			},
			
			
			
			/**
			 * Style specific method,
			 * Find and search each stylesheet for any rules that are relevant to this select element.
			**/
			styleSheets : function (element)
			{
				var styleSheets, highestSpecificity, i, selectors, specificity;
				
				styleSheets = document.styleSheets;
				selectors = [];
				highestSpecificity = [];
				highestSpecificity[0] = 0;
				highestSpecificity[1] = '';
				
				
				// Loop each stylesheet to find the relevant selectors.
				for (i = 0; i < styleSheets.length; i++)
				{
					selectors = selectors.concat(ieSelectStyle.findSelectors(element, styleSheets[i].rules));
				}
				
				
				// Loop each selector found.
				for (i = 0; i < selectors.length; i++)
				{
					// Check it actually selects this element.
					if (!$(selectors[i][0]).length)
					{
						continue;
					}
					
					
					// Calculate the CSS selector specificity.
					specificity = ieSelectStyle.calculateSpecificity(selectors[i][0]);
					
					
					// Store the highest specificity (and the CSS rules that come with it).
					if (specificity > highestSpecificity[0])
					{
						highestSpecificity[0] = specificity;
						highestSpecificity[1] = selectors[i][1];
					}
				}
				
				return highestSpecificity[1];
			},
			
			
			
			/**
			 * Style specific method,
			 * Find the selectorText and rules that apply to this select element.
			**/
			findSelectors : function (element, rules)
			{
				var hasClass, i, selector, selectors;
				
				selectors = [];
				
				// Loop through each CSS rule looking the selectors for the current element.
				for (i = 0; i < rules.length; i++)
				{
					selector = rules[i].selectorText.toLowerCase();
					hasClass = ieSelectStyle.hasClass(element, selector);
					
					
					if ((rules[i].style.borderTopStyle !== '' || rules[i].style.borderRightStyle !== '' || rules[i].style.borderBottomStyle !== '' || rules[i].style.borderLeftStyle !== '') && 
						(selector.indexOf(element.attr('id')) > -1 || selector.indexOf(element.attr('tagName').toLowerCase()) > -1 || selector.indexOf('.') > -1 || hasClass))
					{
						// Add the current selector text to the selectors array.
						selectors.push([selector, rules[i]]);
					}
				}
				
				return selectors;
			},			
			
			
			
			/**
			 * Style specific method,
			 * Calculate the specificity of the passed selector.
			**/
			calculateSpecificity : function (selector)
			{
				var items, specificity, i;
				
				items = selector.split(' ');
				specificity = 0;
				
				// Split each space in the selector to make an array, then loop each 
				// selector peice to calculate it's specificity.
				for (i = 0; i < items.length; i++)
				{
					// ID only (not inc pseudo)
					if (items[i].substr(0, 1) === '#' && items[i].indexOf('.') === -1)
					{
						specificity = specificity + 100;
					}
					
					// Class only (not inc pseudo)
					else if (items[i].substr(0, 1) === '.' && items[i].indexOf('#') === -1)
					{
						// Check for combined classNames, and count them.
						specificity = specificity + (10 * (items[i].split('.').length - 1));
					}
					
					// ID and Class.
					else if (items[i].indexOf('#') > -1 && items[i].indexOf('.') > -1)
					{
						// ID Specificity
						specificity = specificity + 100;
						
						// Class Specificity
						specificity = specificity + (10 * (items[i].split('.').length - 1));
						
						// Element Specificity
						if (items[i].substr(0, 1) !== '#' && items[i].substr(0, 1) !== '.')
						{
							specificity = specificity + 1;
						}
					}
					
					// Element + ID
					else if (items[i].indexOf('#') !== -1)
					{
						specificity = specificity + 101;
						specificity = specificity + (10 * (items[i].split('.').length - 1));
					}
					
					// Element + Class
					else if (items[i].indexOf('.') !== -1)
					{
						specificity = specificity + 1;
						specificity = specificity + (10 * (items[i].split('.').length - 1));
					}
					
					// Element only
					else if (items[i] !== '' && items[i] !== ' ' && items[i].indexOf('*') === -1 && items[i].indexOf('+') === -1 && items[i].indexOf('>') === -1)
					{
						specificity = specificity + 1;
					}
					
					// Pseudo
					if (items[i].indexOf(':') > -1)
					{
						specificity = specificity + 1;
					}
				}
				
				
				return specificity;
			},
			
			
			
			/**
			 * Style specific method,
			 * Check if this element has a class name and that the selector being checked atm matches the classname.
			**/
			hasClass : function (element, selector)
			{
				var classNames, i;
				
				classNames = element.attr('className').split(' ');
				
				if (!classNames.length)
				{
					return false;
				}
				
				for (i = 0; i < classNames.length; i++)
				{
					if (selector.indexOf('.' + classNames[i]) > -1)
					{
						return true;
					}
				}
			},
			
			
			
			/**
			 * Inner width of the select element of IE 6/7.
			**/
			innerWidth : function (element, cssRule)
			{
				var borderLeft, borderRight, width;
				
				try
				{
					borderRight = cssRule.estyle.borderLeftStyle !== 'none' ? ieSelectStyle.removeUnit(element.css('borderRightWidth')) : 0;
					borderLeft = cssRule.style.borderRightStyle !== 'none' ? ieSelectStyle.removeUnit(element.css('borderLeftWidth')) : 0;
				}
				
				catch (err)
				{
					borderRight = 0;
					borderLeft = 0;
				}
				
				if (options.applyStyle)
				{
					width = (element.outerWidth() - ieSelectStyle.removeUnit(element.css('paddingLeft')) - ieSelectStyle.removeUnit(element.css('paddingRight')) - borderRight - borderLeft);
				}
				
				else
				{
					width = element.outerWidth();
				}
				
				return width;
			},
			
			
			
			/**
			 * Remove PX from value.
			**/
			removeUnit : function (value)
			{
				return +value.replace('px', '');
			}
		};
		
		return ieSelectStyle.init();
	};
	
	
	
	$.ieSelectStyle.defaults = {
		width : '',
		containerClassName : 'ie-select-width-container',
		overlayClassName : 'ie-select-width-overlay',
		noStyleClassName : 'no-style',
		containerCSS : '',
		overlayCSS : '',
		applyWidth : true,
		applyStyle : true
	};
})(jQuery);