// ==UserScript==
// @name        leomusic
// @namespace   leomusic
// @description Soundcloud frame height=450px & volume control
// @include     https://lingualeo.com/*
// @require 		https://w.soundcloud.com/player/api.js
// @version     1
// @grant       none
// ==/UserScript==

function fcku__addVolumeControl() {
	var fcku__embed = document.getElementById("embed");
	if (fcku__embed != null) {
		var fcku__sc_iframe = fcku__embed.children[0];
		if (fcku__sc_iframe != null && fcku__sc_iframe.nodeName == "IFRAME" && fcku__sc_iframe.src.indexOf("soundcloud") != -1 ) {
			fcku__sc_iframe.height = 450;
			fcku__sc_iframe.style = "height:450px !important";
			var fcku__sc_iframe_id = fcku__sc_iframe.id;
			if (fcku__sc_iframe_id == "") {
				fcku__sc_iframe_id = "fcku__sc_iframe_id";
				fcku__sc_iframe.id = fcku__sc_iframe_id;
			}
			var fcku__sc_widget = SC.Widget(fcku__sc_iframe);
			var fcku__volume_default = 10;
			fcku__sc_widget.setVolume(fcku__volume_default).play();
			var fcku__volume_control_wrapper = document.createElement("div");
			var fcku__volume_control = document.createElement("input");
			fcku__volume_control.type = "range";
			fcku__volume_control.min = 0;
			fcku__volume_control.max = 100;
			fcku__volume_control.step = 5;
      fcku__volume_control.style = "border:none";
			fcku__volume_control.value = fcku__volume_default;
			fcku__volume_control.onchange = function () {
				fcku__sc_widget.setVolume(this.value); 
				this.title = this.value+"%"; 
				var fcku__volume_control_value = document.getElementById("fcku__volume_control_value");
				fcku__volume_control_value.innerText = this.value;
			};
			
			var fcku__volume_control_value_wrap = document.createElement("span");
			fcku__volume_control_value_wrap.appendChild(document.createTextNode("Volume is "));
			
			var fcku__volume_control_value = document.createElement("span");
				fcku__volume_control_value.id = "fcku__volume_control_value";
				fcku__volume_control_value.style = "margin-left: 5px";
				fcku__volume_control_value.innerText = fcku__volume_default;				
			fcku__volume_control_value_wrap.appendChild(fcku__volume_control_value);
			fcku__volume_control_value_wrap.appendChild(document.createTextNode("%"));
			fcku__volume_control_wrapper.appendChild(fcku__volume_control_value_wrap);
			fcku__volume_control_wrapper.appendChild(fcku__volume_control);
			fcku__volume_control_wrapper.style = "display:flex; margin:10px; justify-content: center;";
			fcku__embed.insertBefore(fcku__volume_control_wrapper, fcku__embed.children[0]);
		}
	}
}


window.onload = function () {
  setTimeout(function () {
  	fcku__addVolumeControl();
  }, 1000);
}
