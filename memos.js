var MEMOS =
{
	init : function()
	{
		MEMOS.UI.init( MEMOS.CONFIGURATION, MEMOS.DATA );
	}
};

MEMOS.CONFIGURATION =
{
	CSS_URL : "memos.css"
};

MEMOS.DATA =
{
	memo_list :
	[
		{ id : 10, title : "Memo1", content : "This is Memo 1" },
		{ id : 11, title : "Memo2", content : "This is Memo 2" },
		{ id : 17, title : "Memo3", content : "This is Memo 3" }
	],
};

MEMOS.UI =
{
	init : function( conf, memo_data )
	{
		this.css = this.loadCss( conf.CSS_URL );

		var mainUI = document.createElement( "div" );
		mainUI.id = "memos_main";
		mainUI.className = "memos_hidden";
		mainUI.innerHTML = '<div id="memos_right"><div id="memos_right_container"><div id="memos_panel"><div id="memos_bar"><a id="memos_exit_button">X</a><a id="memos_option_button">*</a><a id="memos_visible_button">&lt;</a></div></div><ul id="memos_list" style="display: none;"></ul></div></div><div id="memos_edit" style="display: none;"><div id="memos_edit_10" class="memos_edit_item"><a id="memos_edit_close_button_1" class="memos_edit_close_button"></a><input id="memos_edit_title_1" value="Title1" /><textarea id="memos_edit_content_1">This is memo 1</textarea></div><div id="memos_edit_11" class="memos_edit_item"><a id="memos_edit_close_button_2" class="memos_edit_close_button"></a><input id="memos_edit_title_2" value="Title2" /><textarea id="memos_edit_content_2">This is memo 2</textarea></div></div>';

		/*
		mainUI.innerHTML = '
		<div id="memos_right">
			<div id="memos_right_container">
				<div id="memos_panel">
					<div id="memos_bar">
						<a id="memos_exit_button">X</a>
						<a id="memos_option_button">*</a>
						<a id="memos_visible_button">&lt;</a>
					</div>
				</div>
				<ul id="memos_list" style="display: none;">
				</ul>
			</div>
		</div>
		<div id="memos_edit" style="display: none;">
			<div id="memos_edit_1" class="memos_edit_item">
				<input id="memos_edit_title_1" value="Title1" />
				<textarea id="memos_edit_content_1">This is memo 1</textarea>
				<a id="memos_edit_close_button_1" class="memos_edit_close_button"></a>
			</div>
			<div id="memos_edit_2" class="memos_edit_item">
				<input id="memos_edit_title_2" value="Title2" />
				<textarea id="memos_edit_content_2">This is memo 2</textarea>
				<a id="memos_edit_close_button_2" class="memos_edit_close_button"></a>
			</div>
		</div>
		';
		*/
		document.getElementsByTagName( "body" )[0].appendChild( mainUI );

		var memo_list = document.getElementById( "memos_list" );
		var memo_edit = document.getElementById( "memos_edit" );
		var visible_button = document.getElementById( "memos_visible_button" );
		visible_button.onclick = function( event )
		{
			if ( memo_list.style.display != "none" )
				memo_list.style.display = "none";
			else
				memo_list.style.display = "block";

			if ( memo_edit.style.display != "none" )
				memo_edit.style.display = "none";
			else
				memo_edit.style.display = "block";
		}

		for ( i in memo_data.memo_list )
		{
			this.addItemToList( memo_data.memo_list[i] );
		}
		this.addAddButtonToList();

		return mainUI;
	},

	addItemToList : function( memo_item )
	{
		var memo_list = document.getElementById( "memos_list" );

		var ui_item = document.createElement( "li" );
		ui_item.id = "memos_" + memo_item.id;
		ui_item.className = "memos_item";

		var content = document.createElement( "span" );
		content.className = "memos_item_title";
		content.innerHTML = memo_item.title;

		ui_item.appendChild( content );
		ui_item.innerHTML += '<span class="memos_item_close_button">X</span>';
		/*
		ui_item.innerHTML += '
		<span class="memos_item_close_button">X</span>
		';
		*/

		ui_item.addEventListener( 'dblclick', function()
		{
			this.openItem( memo_item );
		}.bind(this) );
		memos_list.appendChild( ui_item );
	},
	
	addAddButtonToList : function()
	{
		var memo_list = document.getElementById( "memos_list" );

		var ui_item = document.createElement( "li" );
		ui_item.id = "memos_add_button";
		ui_item.className = "memos_item";
		ui_item.innerHTML = "+";

		memos_list.appendChild( ui_item );
	},

	openItem : function( memo_item )
	{
		if ( document.getElementById( "memos_edit_" + memo_item.id ) )
		{
			alert( "test" );
			return;
		}

		var memo_edit = document.getElementById( "memos_edit" );
	},

	loadCss : function( url )
	{
		var css = document.createElement( "link" );
		css.type = "text/css";
		css.rel = "stylesheet";
		css.href = url;
		document.getElementsByTagName( "head" )[0].appendChild( css );

		return css;
	}
};

