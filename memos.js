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
		mainUI.id = "memos_frame";
		mainUI.className = "memos_hidden";
		mainUI.innerHTML = '<div id="memos_right"><div id="memos_right_container"><div id="memos_panel"><div id="memos_bar"><a id="memos_exit_button">X</a><a id="memos_option_button">*</a><a id="memos_visible_button">&lt;</a></div></div><ul id="memos_list" style="display: none;"></ul></div></div><div id="memos_main" style="display: none;"></div>';

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
				<ul id="memos_list" style="display: none;"></ul>
			</div>
		</div>
		<div id="memos_main" style="display: none;"></div>
		';
		*/
		document.getElementsByTagName( "body" )[0].appendChild( mainUI );

		var memo_list = document.getElementById( "memos_list" );
		var memo_main = document.getElementById( "memos_main" );
		var visible_button = document.getElementById( "memos_visible_button" );
		visible_button.onclick = function( event )
		{
			if ( memo_list.style.display != "none" )
				memo_list.style.display = "none";
			else
				memo_list.style.display = "block";

			if ( memo_main.style.display != "none" )
				memo_main.style.display = "none";
			else
				memo_main.style.display = "block";
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

		// --------------------------------
		//	item
		// --------------------------------
		var ui_item = document.createElement( "li" );
		ui_item.id = "memos_" + memo_item.id;
		ui_item.className = "memos_item";

		// --------------------------------
		//	item > title
		// --------------------------------
		var title = document.createElement( "span" );
		title.className = "memos_item_title";
		title.innerHTML = memo_item.title;

		// --------------------------------
		//	item > close button
		// --------------------------------
		var closebtn = document.createElement( "span" );
		closebtn.className = "memos_item_close_button";
		closebtn.innerHTML = "X";
		closebtn.addEventListener( 'click', (function( id )
		{
			this.removeItemToList( id );
		}).bind( this, memo_item.id ) );

		// --------------------------------
		//	add item to list
		// --------------------------------
		ui_item.appendChild( title );
		ui_item.appendChild( closebtn );
		ui_item.addEventListener( 'dblclick', (function( memo_item )
		{
			this.openMemo( memo_item );
		}).bind( this, memo_item ) );
		memo_list.appendChild( ui_item );
	},

	removeItemToList : function( id )
	{
		var memo_list = document.getElementById( "memos_list" );
		for ( i in memo_list.childNodes )
		{
			if ( memo_list.childNodes[i].id == "memos_" + id )
			{
				memo_list.removeChild( memo_list.childNodes[i] );
				break;
			}
		}
	},
	
	addAddButtonToList : function()
	{
		var memo_list = document.getElementById( "memos_list" );

		var ui_item = document.createElement( "li" );
		ui_item.id = "memos_add_button";
		ui_item.className = "memos_item";
		ui_item.innerHTML = "+";

		memo_list.appendChild( ui_item );
	},

	openMemo : function( memo_item )
	{
		if ( document.getElementById( "memos_memo_" + memo_item.id ) )
			return;

		var memo_list = document.getElementById( "memos_main" );

		// --------------------------------
		//	item
		// --------------------------------
		var ui_item = document.createElement( "div" );
		ui_item.id = "memos_memo_" + memo_item.id;
		ui_item.className = "memos_memo";

		// --------------------------------
		//	item > title
		// --------------------------------
		var title = document.createElement( "input" );
		title.value = memo_item.title;

		// --------------------------------
		//	item > content
		// --------------------------------
		var content = document.createElement( "textarea" );
		content.innerHTML = memo_item.content;

		// --------------------------------
		//	item > close button
		// --------------------------------
		var closebtn = document.createElement( "a" );
		closebtn.className = "memos_memo_close_button";
		closebtn.innerHTML = "X";
		closebtn.addEventListener( 'click', (function( id )
		{
			this.closeMemo( id );
		}).bind( this, memo_item.id ) );

		// --------------------------------
		//	add item to list
		// --------------------------------
		ui_item.appendChild( title );
		ui_item.appendChild( content );
		ui_item.appendChild( closebtn );
		memo_list.appendChild( ui_item );
		/*
			<div id="memos_memo_1" class="memos_memo">
				<input value="Title1" />
				<textarea>This is memo 1</textarea>
				<a class="memos_memo_close_button"></a>
			</div>
		 */
	},

	closeMemo : function( id )
	{
		var memo_list = document.getElementById( "memos_main" );
		for ( i in memo_list.childNodes )
		{
			if ( memo_list.childNodes[i].id == "memos_memo_" + id )
			{
				memo_list.removeChild( memo_list.childNodes[i] );
				break;
			}
		}
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

