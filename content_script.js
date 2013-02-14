chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
			var pageParts = window.document.childNodes;
			var retVal = {
				charset: document.characterSet,
				builtDom: ''
			};
			for (var i = 0; i< pageParts.length; i++){
				if(pageParts[i].toString() === '[object DocumentType]'){
					retVal.builtDom+= '<!DOCTYPE ' +
						document.doctype.name +
						(document.doctype.publicId?' PUBLIC "' +  document.doctype.publicId + '"':'') +
						(document.doctype.systemId?' "' + document.doctype.systemId + '"':'') + '>';
				}else if(pageParts[i].toString() === "[object Comment]"){
					retVal.builtDom+= '<!--'+pageParts[i].nodeValue+'-->';
				}else if(pageParts[i].toString() === "[object HTMLHtmlElement]"){
					retVal.builtDom+= pageParts[i].outerHTML;
				}else{
					alert('awww :( something went wrong and I couldn\'t build the page.');
				}
			}
			sendResponse(retVal);
			if(retVal.charset === "UTF-8"){
				var subfrm = '<form id="activeHtmlValidatorForm" name="activeHtmlValidatorForm" '+
					'style="width: 1px; height: 1px; overflow: hidden;" method="post" '+
					'action="http://validator.w3.org/check"><textarea name="fragment"></textarea>'+
					'<input type="hidden" value="1" name="verbose"><input type="submit" value="Submit">'+
					'</form>';
				$('body').append(subfrm);
				$('#activeHtmlValidatorForm > textarea[name="fragment"]').val(retVal.builtDom);
				$('#activeHtmlValidatorForm').submit();
			}
	});
