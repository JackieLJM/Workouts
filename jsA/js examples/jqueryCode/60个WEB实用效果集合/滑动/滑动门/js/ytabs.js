var YTabs = function(){
	var D = document, j, len = 0, allTabs;
	// www.codefans.net
	return {
		hasClass: function(elem, className){
			var has = new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)");
			return has.test(elem.className);
		},
		addClass: function(elem, className){
			if (this.hasClass(elem, className)) {
				return;
			}
			elem.className = [elem.className, className].join(" ");
		},
		removeClass: function(elem, className){
			var replace = new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)", "g");
			if (!this.hasClass(elem, className)) {
				return;
			}
			var o = elem.className;
			elem.className = o.replace(replace, " ");
			if (this.hasClass(elem, className)) {
				this.removeClass(elem, className);
			}
		},
		getByClassName: function(className, tag, rootTag){
			var elems = [], i, tempCnt = document.getElementById(rootTag).getElementsByTagName(tag), len = tempCnt.length;
			for (i = 0; i < len; i++) {
				if (YTabs.hasClass(tempCnt[i], className)) {
					elems.push(tempCnt[i]);
				}
			}
			if (elems.length < 1) {
				return false;
			}
			else {
				return elems;
			}
		},
		tabs: function(){
			len = arguments.length;
			for (j = 0; j < len; j += 1) {
				allTabs = arguments[j];
				(function(oTabs){
					var i, tabCnt = (oTabs.tabId) ? D.getElementById(oTabs.tabId) : (oTabs.tabRoot || null), tabs = (oTabs.tTag) ? tabCnt.getElementsByTagName(oTabs.tTag) : (oTabs.tabs || null), contents = (oTabs.cTag) ? tabCnt.getElementsByTagName(oTabs.cTag) : (oTabs.contents || null);
					if (tabs && contents) {
						var length = tabs.length, defaultIndex = oTabs.defaultIndex || 0, lastTab = tabs[defaultIndex], lastTabClass = oTabs.lastTabClass || '', hasLastClassTab = null, lastContent = contents[defaultIndex], evtName = oTabs.evt || 'mouseover';
						YTabs.addClass(lastTab, 'current');
						lastContent.style.display = 'block';
						for (i = 0; i < length; i += 1) {
							if (i !== defaultIndex) {
								YTabs.removeClass(tabs[i], 'current');
								contents[i].style.display = 'none';
							}
							
							tabs[i]['on' + evtName] = function(index){
								return function(event){
									var currentContent = contents[index];
									YTabs.removeClass(lastTab, 'current');
									YTabs.addClass(this, 'current');
									lastContent.style.display = "none";
									currentContent.style.display = "block";
									lastContent = currentContent;
									lastTab = this;
									if (evtName === 'click') {
										var evt = event || window.event;
										if (evt.stopPropagation) {
											evt.stopPropagation();
										}
										else {
											evt.cancelBubble = true;
										}
										if (evt.preventDefault) {
											evt.preventDefault();
										}
										else {
											evt.returnValue = false;
										}
									}
								}
							}(i);
						}
					}
				})(allTabs);
			}
		}
	}
}();