var MEMOS =
{
	init : function()
	{
		MEMOS.DATA.init();
		MEMOS.UI.init( MEMOS.CONFIGURATION, MEMOS.DATA );
	}
};

MEMOS.CONFIGURATION =
{
};

MEMOS.DATA =
{
	init : function()
	{
		if ( typeof(Storage) == "undefined" )
		{
			// TODO : no Local Storage support...
		}

		// Dummy data
		localStorage.setItem( "memo_list", '[ { "id" : 10, "title" : "Memo1", "content" : "This is Memo 1" }, { "id" : 11, "title" : "Memo2", "content" : "This is Memo 2" }, { "id" : 17, "title" : "Memo3", "content" : "This is Memo 3" } ]' );

		this.memo_list = JSON.parse( localStorage.memo_list );
	},

//	memo_list :
//	[
//		{ id : 10, title : "Memo1", content : "This is Memo 1" },
//		{ id : 11, title : "Memo2", content : "This is Memo 2" },
//		{ id : 17, title : "Memo3", content : "This is Memo 3" }
//	],

	addItem : function()
	{
		var memo_list = this.memo_list;
		memo_list.splice( memo_list.length, 0, { "id" : 18, "title" : "NewMemo1", "content" : "This is New Memo 1" } );
	},

	removeItem : function( id )
	{
		var memo_list = this.memo_list;

		for ( i in memo_list )
		{
			if ( id == memo_list[i].id )
			{
				memo_list.splice( i, 1 );
			}
		}
	}
};

MEMOS.UI =
{
	init : function( conf, memo_data )
	{
		this.memo_data = memo_data;

		var mainUI = document.createElement( "div" );
		mainUI.id = "memos_frame";
		mainUI.className = "memos_hidden";
		mainUI.innerHTML = '<div id="memos_right"><div id="memos_panel"><div id="memos_bar"><a id="memos_visible_button">&lt;</a><a id="memos_option_button">*</a></div></div><ul id="memos_list"></ul></div><div id="memos_bottom"><div id="memos_main"></div></div>';

		/*
		mainUI.innerHTML = '
		<div id="memos_right">
			<div id="memos_panel">
				<div id="memos_bar">
					<a id="memos_visible_button">&lt;</a>
					<a id="memos_option_button">*</a>
				</div>
			</div>
			<ul id="memos_list"></ul>
		</div>
		<div id="memos_bottom">
			<div id="memos_main">
			</div>
		</div>
		';
		*/
		document.getElementsByTagName( "body" )[0].appendChild( mainUI );

		var memo_list = document.getElementById( "memos_list" );
		var memo_main = document.getElementById( "memos_main" );
		var visible_button = document.getElementById( "memos_visible_button" );
		visible_button.addEventListener( 'click', (function( id )
		{
			if ( mainUI.className == "memos_hidden" )
				mainUI.className = "memos_show";
			else
				mainUI.className = "memos_hidden";
		}) );

		this.updateList();

		return mainUI;
	},

	updateList : function()
	{
		document.getElementById( "memos_list" ).innerHTML = "";
		var memo_list = this.memo_data.memo_list;

		for ( i in memo_list )
		{
			this.addItemToList( memo_list[i] );
		}
		this.addAddButtonToList();
	},

	addItemToList : function( memo_item )
	{
		var ui_list = document.getElementById( "memos_list" );

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
		//	item > delete button
		// --------------------------------
		var closebtn = document.createElement( "span" );
		closebtn.className = "memos_item_close_button";
		closebtn.innerHTML = "X";
		closebtn.addEventListener( 'click', (function( id )
		{
			this.memo_data.removeItem( id );
			this.updateList();
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
		ui_list.appendChild( ui_item );
	},

	removeItemFromList : function( id )
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
		ui_item.addEventListener( 'click', (function( id )
		{
			this.memo_data.addItem();
			this.updateList();
		}).bind(this) );

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
		closebtn.className = "memos_close_button";
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
};

