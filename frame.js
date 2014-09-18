'use strict';

var MAYBE = {};
MAYBE.FRAME = new ( function()
{
	// --------------------------------
	//	Init
	// --------------------------------
	var frame = document.createElement( "div" );
	frame.id = "maybe_frame";
	frame.className = "maybe_hidden";
	frame.innerHTML = '<div id="maybe_right"><div id="maybe_panel"><ul id="maybe_list"></ul><a id="maybe_visible_button" class="maybe_visible_button">&lt;</a><a id="maybe_option_button" class="maybe_option_button">*</a></div></div><div id="maybe_bottom"><div id="maybe_main"></div></div>';

	/*
	frame.innerHTML = '
	<div id="maybe_right">
		<div id="maybe_panel">
			<ul id="maybe_list"></ul>
			<a id="maybe_visible_button" class="maybe_visible_button">&lt;</a>
			<a id="maybe_option_button" class="maybe_option_button">*</a>
		</div>
	</div>
	<div id="maybe_bottom">
		<div id="maybe_main">
		</div>
	</div>
	';
	*/

	document.getElementsByTagName( "body" )[0].appendChild( frame );
	document.getElementById( "maybe_visible_button" ).addEventListener( 'click', (function( id )
	{
		if ( frame.className == "maybe_hidden" )
			frame.className = "maybe_show";
		else
			frame.className = "maybe_hidden";
	}) );

	this.getItem = function( id )
	{
		var item = document.getElementById( "maybe_item_" + id );
		if ( item )
			return item;

		item = document.createElement( "li" );
		item.id = "maybe_item_" + id;
		item.className = "maybe_item";
		document.getElementById( "maybe_list" ).appendChild( item );

		return item;
	};

	this.removeItem = function( id )
	{
		var item = document.getElementById( "maybe_item_" + id );
		if ( item )
			document.getElementById( "maybe_list" ).removeChild( item );
	};

	this.getWindow = function( id )
	{
		var w = document.getElementById( "maybe_window_" + id );
		if ( w )
			return w;

		w = document.createElement( "div" );
		w.id = "maybe_window_" + id;
		w.className = "maybe_window";

		w.style.width = "0px";
		w.style.opacity = "0";
		window.setTimeout( function() { w.style.opacity = "1"; }, 1000 );
		document.getElementById( "maybe_main" ).appendChild( w );

		return w;
	};

	this.showWindow = function( itemElement, targetElement )
	{
		var effect = document.createElement( "div" );
		effect.className = "effect";

		var rect = itemElement.getBoundingClientRect();
		effect.style.left = rect.left + "px";
		effect.style.top = rect.top + "px";
		effect.style.width = ( rect.right - rect.left ) + "px";
		effect.style.height = ( rect.bottom - rect.top ) + "px";
		document.getElementById( "maybe_frame" ).appendChild( effect );

		rect = targetElement.getBoundingClientRect();
		effect.style.left = ( rect.left - 260 ) + "px";	// rect.left + "px";
		effect.style.top = rect.top + "px";
		effect.style.width = "260px";	// ( rect.right - rect.left ) + "px";
		effect.style.height = ( rect.bottom - rect.top ) + "px";

		window.setTimeout( ( function()
		{
			document.getElementById( "maybe_frame").removeChild( effect );
		} ).bind( this ), 1000 );

		targetElement.style.width = "";
	};

	this.closeWindow = function( id )
	{
		var w = document.getElementById( "maybe_window_" + id );
		if ( w )
			document.getElementById( "maybe_main" ).removeChild( w );
	};

} )();
