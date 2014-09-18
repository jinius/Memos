'use strict';

var MEMOS =
{
	init : function()
	{
		MEMOS.DATA.init();
		MEMOS.UI.init( MEMOS.DATA );
	}
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
		this.nextId = 1;	// TODO : get last ID
	},

//	memo_list :
//	[
//		{ id : 10, title : "Memo1", content : "This is Memo 1" },
//		{ id : 11, title : "Memo2", content : "This is Memo 2" },
//		{ id : 17, title : "Memo3", content : "This is Memo 3" }
//	],

	addItem : function()
	{
		var newItem =
		{
			"id" : this.nextId,
			"title" : "NewMemo" + this.nextId,
			"content" : "This is New Memo " + this.nextId
		};
		this.memo_list.splice( this.memo_list.length, 0, newItem );
		this.nextId++;

		return newItem;
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
	init : function( memo_data )
	{
		this.memo_data = memo_data;
		var memo_list = memo_data.memo_list;

		// Add Item to List
		for ( var i in memo_list )
			this.addItemToList( memo_list[i] );
		// Add "Add button" to List
		this.addAddButtonToList();
	},

	addItemToList : function( memo_item )
	{
		var item = document.createElement( "div" );
		item.className = "memos_item";
		MAYBE.FRAME.getItem( memo_item.id ).appendChild( item );

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
		closebtn.className = "memos_close_button";
		closebtn.innerHTML = "X";
		closebtn.addEventListener( 'click', (function( id )
		{
			this.memo_data.removeItem( id );
			this.removeItemFromList( id );
		}).bind( this, memo_item.id ) );

		// --------------------------------
		//	add item to list
		// --------------------------------
		item.appendChild( title );
		item.appendChild( closebtn );
		item.addEventListener( 'dblclick', this.openMemo.bind( this, memo_item ) );
	},

	removeItemFromList : function( id )
	{
		MAYBE.FRAME.removeItem( id );
	},
	
	addAddButtonToList : function()
	{
		var item = document.createElement( "div" );
		item.className = "memos_add_button";
		MAYBE.FRAME.getItem( "add" ).appendChild( item );

		item.className = "memos_add_button";
		item.innerHTML = "+";
		item.addEventListener( 'click', (function( id )
		{
			MAYBE.FRAME.removeItem( "add" );
			var newItem = this.memo_data.addItem();
			this.addItemToList( newItem );
			this.addAddButtonToList();
		}).bind(this) );
	},

	openMemo : function( memo_item )
	{
		MAYBE.FRAME.closeWindow( memo_item.id );
		var w = MAYBE.FRAME.getWindow( memo_item.id );

		// --------------------------------
		//	item
		// --------------------------------
		var item = document.createElement( "div" );
		item.className = "memos_memo";

		// --------------------------------
		//	item > title
		// --------------------------------
		var title = document.createElement( "input" );
		title.value = memo_item.title;

		// --------------------------------
		//	item > sync status
		// --------------------------------
		var sync = document.createElement( "span" );
		sync.className = "memos_sync_done";

		// --------------------------------
		//	item > content
		// --------------------------------
		var content = document.createElement( "textarea" );
		content.innerHTML = memo_item.content;
		content.addEventListener( 'keyup', function()
		{
			if ( sync.className == "memos_sync_done" )
			{
				sync.className = "memos_sync_progress";
				setTimeout( function()
				{
					sync.className = "memos_sync_done";
				}, 1000 );
			}
		} );

		// --------------------------------
		//	item > close button
		// --------------------------------
		var closebtn = document.createElement( "a" );
		closebtn.className = "memos_close_button";
		closebtn.innerHTML = "X";
		closebtn.addEventListener( 'click', ( function( id )
		{
			this.closeMemo( id );
		} ).bind( this, memo_item.id ) );

		// --------------------------------
		//	add item to list
		// --------------------------------
		item.appendChild( title );
		item.appendChild( content );
		item.appendChild( closebtn );
		item.appendChild( sync );

		w.appendChild( item );
		MAYBE.FRAME.showWindow( MAYBE.FRAME.getItem( memo_item.id ), w );
	},

	closeMemo : function( id ) // TODO: change parameter
	{
		MAYBE.FRAME.closeWindow( id );
	}
};

