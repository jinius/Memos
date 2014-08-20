var MEMOS =
{
	init : function()
	{
		MEMOS.UI.init( MEMOS.CONFIGURATION );
	}
};

MEMOS.CONFIGURATION =
{
	CSS_URL : "memos.css"
};

MEMOS.UI =
{
	init : function( conf )
	{
		this.css = this.loadCss( conf.CSS_URL );

		var mainUI = document.createElement( "div" );
		mainUI.id = "memos_main";
		mainUI.className = "memos_hidden";
		mainUI.innerHTML = '<div id="memos_right"><div id="memos_right_container"><div id="memos_panel"><div id="memos_bar"><a id="memos_exit_button">X</a><a id="memos_option_button">*</a><a id="memos_visible_button">&lt;</a></div></div><ul id="memos_list" style="display: none;"><li id="memos_0" class="memos_item"><span class="memos_item_title">Memo1</span><span class="memos_item_close_button">X</span></li><li id="memos_1" class="memos_item"><span class="memos_item_title">Memo2</span><span class="memos_item_close_button">X</span></li><li id="memos_2" class="memos_item"><span class="memos_item_title">Memo3</span><span class="memos_item_close_button">X</span></li></ul></div></div>';

		/*
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
					<li id="memos_0" class="memos_item">
						<span class="memos_item_title">Memo1</span>
						<span class="memos_item_close_button">X</span>
					</li>
					<li id="memos_1" class="memos_item">
						<span class="memos_item_title">Memo2</span>
						<span class="memos_item_close_button">X</span>
					</li>
					<li id="memos_2" class="memos_item">
						<span class="memos_item_title">Memo3</span>
						<span class="memos_item_close_button">X</span>
					</li>
				</ul>
			</div>
		</div>
		<div id="memos_memo">
			<textarea id="memos_memo_edit"></textarea>
		</div>
		*/
		document.getElementsByTagName( "body" )[0].appendChild( mainUI );

		var memos_list = document.getElementById( "memos_list" );
		var visible_button = document.getElementById( "memos_visible_button" );
		visible_button.onclick = function( event )
		{
			if ( memos_list.style.display != "none" )
				memos_list.style.display = "none";
			else
				memos_list.style.display = "block";
		}

		return mainUI;
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

