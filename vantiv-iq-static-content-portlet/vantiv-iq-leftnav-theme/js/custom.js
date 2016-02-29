if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  };
}

function vantivIqGlobalSearch(url,site) {
	var criteria = document.getElementById("globalSearch").value.trim();
	if (criteria) {
	    if (typeof selected_search_type === 'undefined' || !selected_search_type) window.selected_search_type = "BIN Search";
		var img = document.getElementById("vantivIqGlobalSearchImg");
	    if (selected_search_type == "BIN Search") {
	    	var input= document.getElementById("globalSearch");
	    	input.value="";
	    	img.src = img.src.replace("iQ_search.jpg","iQ_search_loader.gif");
	        window.location = url+"/group"+site+"/bin-search?p_p_id=BinsearchPortlet_WAR_vantiviqbinsearchportlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_BinsearchPortlet_WAR_vantiviqbinsearchportlet_action=globalBinSearch&binNumber="+criteria;
	    } else if (selected_search_type == "Card Number") {
	    	img.src = img.src.replace("iQ_search.jpg","iQ_search_loader.gif");
	        if (site.toLowerCase().indexOf("merchant") > -1) {
	            window.location = url+"/group"+site+"/transaction-research?p_p_id=SettlementResearchPortlet_WAR_vantiviqmerchanttransactionresearchportlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_SettlementResearchPortlet_WAR_vantiviqmerchanttransactionresearchportlet_action=globalAccountSearch&cardNumber="+criteria;
	        } else {
	            window.location = url+"/group"+site+"/fi-transaction-research?p_p_id=FITransactionResearchPortlet_WAR_vantiviqfitransactionresearchportlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_FITransactionResearchPortlet_WAR_vantiviqfitransactionresearchportlet_action=globalAccountSearch&cardNumber="+criteria;
	        }
	    }
	}
}

function vantivIqGlobalSitePreference(cname, url, site) {
	setCookie(cname, site);
	window.location = url + "/group" + site;	
}

function setCookie(cname, cvalue) {	
	document.cookie = cname + "=" + cvalue + "; expires="+(time()+31536000)+"; path=/;";
}

function vantivIqGlobalSearchTypeSelected(type, placeholder, maxLength) {
    window.selected_search_type = type;
    var dropdown = document.getElementById("searchTypeDropdown");
    if (dropdown) {
    	dropdown.firstChild.nodeValue = type + "\xA0";
    	var search = document.getElementById("globalSearch");
    	search.value = "";
    	search.placeholder = placeholder;
    	search.maxLength = maxLength;
    }
}

function vantivIqGlobalSearchOnEnter(url,site,e) {
	var charCode = (e.which) ? e.which : e.keyCode;
	if(e.keyCode === 13 || e.which === 13){
		vantivIqGlobalSearch(url,site);
		return true;
    }
	else if (charCode > 47 && charCode < 58 || charCode == 127 || charCode == 8) {
		return true;
	} else {
		return false;
	}

}

function clearInput()
{
	var input= document.getElementById("globalSearch");
	input.value="";
}

function markAlertAsRead(notificationId,userId){
	var  formData = {notificationId: notificationId,userId: userId};
	$.ajax({
		url : '../../vantiv-iq-sys-admin-portlet/markAlertAsRead',
		type: 'GET',
		dataType:'text',
		data : formData,
		success: function(data, textStatus, jqXHR){
			styleAlertAsRead(notificationId);	
		}
	});
}
			
function styleAlertAsRead(notificationId){
	$("span[id=" + notificationId + "]").removeClass("vv-alert-unread");
	$("span[id=" + notificationId + "]").addClass("vv-alert-read");
}

function markAlertAsDeleted(notificationId, userId){
	var  formData = {notificationId: notificationId, userId: userId};
	$.ajax({
		url : '../../vantiv-iq-sys-admin-portlet/markAlertAsDeleted',
		type: 'GET',
		dataType:'text',
		data : formData,
		success: function(data, textStatus, jqXHR){
			styleAlertAsDeleted(notificationId);	
		}
	});
}

function styleAlertAsDeleted(notificationId){
	$("tr[id=" + notificationId +"]").remove();
	$("#alertCounter").html(parseInt($("#alertCounter").html(), 10)-1);
}

function setAlertButtonStyles(){
	$("[id=C]").addClass("vv-icon-status vv-status-critical");
	$("[id=T]").addClass("vv-icon-status vv-status-clock");
	$("[id=I]").addClass("vv-icon-status vv-status-info");
	$("[id=href").hide();
}

function buildURLForAlert(linkid,linkTarget){
	var url = document.URL;
	var siteType = "merchant";
	var finalURL = "";
	if (linkTarget != "" && linkTarget.indexOf("https://pci") != -1){
        finalURL = linkTarget;
        window.open(finalURL,'_blank');
	 }else{
		 if(url.indexOf("merchant") >-1){
				siteType = "merchant";
			}else{
				siteType="fi";
			}
			finalURL = url.substr(0,url.indexOf(siteType));
			finalURL = finalURL + siteType + linkTarget;
			window.location.href = finalURL;
	 }
	
}

setTimeout(function () {
	
	if ($('#settlementGridMenuOverlay').length) {
		$('html, body').click(function() {
			closePopover();	
		})
		$(window).scroll(function() {
			closePopover();	
		})
	}
	
	if ($('#authGridMenuOverlay').length) {
		$('html, body').click(function() {
			closeAuthPopover();
		})
		$(window).scroll(function() {
			closeAuthPopover();
		})
	}
	
}, 1000);

if ($('.modalLaunch').length) {

	$('.modalLaunch').click(function() {
		setTimeout(function (){
			$('.modal').scroll(function() {
				$('.dhx_toolbar_poly_dhx_skyblue.dhxtoolbar_icons_18').css('display', 'none');
				$('.dhxtoolbar_btn_pres').removeClass('dhxtoolbar_btn_pres').addClass('dhxtoolbar_btn_def');
				$('.dhxtoolbar_btn_over').removeClass('dhxtoolbar_btn_over').addClass('dhxtoolbar_btn_def');
			})
		}, 1000);
	})
}

$('body').on('DOMNodeInserted', '.vv-module', function() {
	$('#settlementGridMenuOverlayShowCard a[href="#"]').click(function(event) {
		event.returnValue = false;
		event.preventDefault();
	})
})

$('body').on('DOMNodeInserted', '#journal-nav-container', function() {
$('a[data-toggle="modal-popover"]').click(function(event) {
	setTimeout(function () {
		
		if ($('#iqElectronicJournalOverlay').length) {
			$('html, body').click(function() {
				$('#iqElectronicJournalOverlay').css('display', 'none');
			})
			$(window).scroll(function() {
				$('#iqElectronicJournalOverlay').css('display', 'none');
			})
		}
		
	}, 500);
})
})
