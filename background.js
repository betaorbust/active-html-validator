// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// chrome.extension.onConnect.addListener(function(port) {
//	var tab = port.sender.tab;

//	// This will get called by the content script we execute in
//	// the tab as a result of the user pressing the browser action.
//	port.onMessage.addListener(function(info) {
//		console.log(info.html);
//	});
// });

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
	// We can only inject scripts to find the title on pages loaded with http
	// and https so for all other pages, we don't ask for the title.
	if (tab.url.indexOf('http:') !== 0 &&
			tab.url.indexOf('https:') !== 0) {
		alert('Only http and https are allowed!');
	} else {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
				if(response.charset !== 'UTF-8'){
					window.setTimeout(function(){alert('Sorry, this only works for UTF-8 pages at the moment :\'(');}, 100);
				}
				console.log(response);
			});
		});
		//chrome.tabs.executeScript(null, {file: 'content_script.js'});
	}
});
