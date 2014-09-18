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
			alert( "Warning: Local Storage not supported. Memo will not be saved." );
			return;
		}

		// Dummy data
		if ( localStorage.memo_list == "" )
		{
			localStorage.setItem( "memo_list", "[]" );
			localStorage.setItem( "memo_nextId", 1 );
		}

		this.memo_list = JSON.parse( localStorage.memo_list );
		this.nextId = localStorage.memo_nextId;
	},

//	memo_list :
//	[
//		{ id : 10, title : "Memo1", content : "This is Memo 1" },
//		{ id : 11, title : "Memo2", content : "This is Memo 2" },
//		{ id : 17, title : "Memo3", content : "This is Memo 3" }
//	],

	addMemo : function()
	{
		var newMemo =
		{
			"id" : this.nextId,
			"title" : "New Memo",
			"content" : ""
		};
		this.memo_list.splice( this.memo_list.length, 0, newMemo );
		this.nextId++;

		this.save();

		return newMemo;
	},

	removeMemo : function( id )
	{
		var memo_list = this.memo_list;

		for ( var i in memo_list )
		{
			if ( id == memo_list[i].id )
			{
				memo_list.splice( i, 1 );
			}
		}

		this.save();
	},

	save : function()
	{
		if ( typeof(Storage) == "undefined" )
		{
			alert( "Warning: Local Storage not supported. Memo will not be saved." );
			return;
		}

		localStorage.memo_list = JSON.stringify( this.memo_list );
		localStorage.memo_nextId = this.nextId;
	}
};

MEMOS.UI =
{
	init : function( memo_data )
	{
		this.memo_data = memo_data;
		var memo_list = memo_data.memo_list;

		// Add Memo to List
		for ( var i in memo_list )
			this.addMemoToList( memo_list[i] );
		// Add "Add button" to List
		this.addAddButtonToList();
	},

	addMemoToList : function( memo_item )
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
			this.memo_data.removeMemo( id );
			this.removeMemo( id );
		}).bind( this, memo_item.id ) );

		// --------------------------------
		//	add item to list
		// --------------------------------
		item.appendChild( title );
		item.appendChild( closebtn );
		item.addEventListener( 'dblclick', this.openMemo.bind( this, memo_item ) );
	},
	
	addAddButtonToList : function()
	{
		var item = document.createElement( "div" );
		item.className = "memos_add_button";
		MAYBE.FRAME.getItem( "add" ).appendChild( item );

		item.className = "memos_add_button";
		item.innerHTML = "+";
		item.addEventListener( 'click', this.addMemo.bind(this) );
	},

	addMemo : function()
	{
		MAYBE.FRAME.removeItem( "add" );
		var newMemo = this.memo_data.addMemo();
		this.addMemoToList( newMemo );
		this.addAddButtonToList();
		this.openMemo( newMemo );
	},

	updateMemo : function( memo_item )
	{
		var item = MAYBE.FRAME.getItem( memo_item.id ).firstChild;
		if ( typeof( item ) == "undefined" )
			return;

		item.querySelector( ".memos_item_title" ).innerHTML = memo_item.title;
	},

	removeMemo : function( id )
	{
		MAYBE.FRAME.closeWindow( id );
		MAYBE.FRAME.removeItem( id );
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
		//	item > sync status
		// --------------------------------
		var sync = document.createElement( "span" );
		sync.className = "memos_sync_done";

		// --------------------------------
		//	item > title
		// --------------------------------
		var title = document.createElement( "input" );
		title.value = memo_item.title;
		title.addEventListener( 'keyup', onChange.bind(this) );

		// --------------------------------
		//	item > content
		// --------------------------------
		var content = document.createElement( "textarea" );
		content.value = memo_item.content;
		content.addEventListener( 'keyup', onChange.bind(this) );

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

		function onChange()
		{
			if ( sync.className == "memos_sync_done" )
			{
				sync.className = "memos_sync_progress";
				setTimeout( ( function()
				{
					memo_item.title = title.value;
					memo_item.content = content.value;
					this.memo_data.save();
					this.updateMemo( memo_item );
					sync.className = "memos_sync_done";
				} ).bind(this), 1000 );
			}
		}

		// --------------------------------
		//	add item to list
		// --------------------------------
		item.appendChild( title );
		item.appendChild( content );
		item.appendChild( closebtn );
		item.appendChild( sync );

		w.appendChild( item );
		MAYBE.FRAME.showWindow( MAYBE.FRAME.getItem( memo_item.id ), w );

		title.focus();
		title.select();
	},

	closeMemo : function( id ) // TODO: change parameter
	{
		this.memo_data.save();
		MAYBE.FRAME.closeWindow( id );
	}
};

