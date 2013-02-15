// JavaScript Document
//connect to database
var username = "user3";
var pwd = "user3";

$(document).bind("mobileinit", function(){
	//overide to open db
	$.mobile.db = openDatabase('lawone', '1.0', 'lawone database', 2*1024*1024);
	$.mobile.db.transaction(function(t) {
		//t.executeSql('DROP TABLE IF EXISTS users');
	//t.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, pwd TEXT)");
	t.executeSql("CREATE TABLE IF NOT EXISTS file (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,fileNumber VARCHAR NOT NULL, lastUpdate VARCHAR, partner TEXT)")
	t.executeSql("INSERT INTO file(fileNumber, lastUpdate, partner) VALUES (?,?,?)",["123/ref/2012","5/11/2012","Melvin Kamau"]);
	
    });
	
	//menu show and hide
$('.myPage').live('pageinit', function(event) {
	$("#hide").hide();
    $("#show_menu").bind('tap',function(event, ui){
        $('#menu').show('fast', function() {});
		$('#hide').show('fast', function() {});
		$(this).hide();
		//$( "#show_menu" ).dialog({ overlayTheme: "a" });
		//$.mobile.page.prototype.options.theme  = "b";
		$(function() {
			//var docHeight = $(document).height();
			$('#main').append("<div id='overlay'></div>");
			$("#overlay")
			//.height(docHeight)
			.css({
				'opacity' : 0.4,
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'background-color': 'black',
				'width': '100%',
				'height':'100%',
				'margin-top':'105px',
				'z-index': 5000
				});
			});
    })
	
	$("#hide").bind('tap',function(event, ui){
		$(this).hide();
        $('#menu').hide('fast', function() {});
		$('#show_menu').show('fast', function() {});
		$('#overlay').remove()
    })
	
	
	$('#overlay').live('click', function()  {
    	$(this).fadeOut("fast", function() {
			$(this).remove();
			$('#hide').hide('fast', function() {});
			$('#show_menu').show('fast', function() {});
			$('#menu').hide('fast', function() {});
		
		});
	});
	
		
});
//end show and hide

	//function showAll(file_id ,file_num,file_date){
//		$("#file").apppend(
//		
//		'<li data-theme="c" class="files">' +
//        '<a href="#popupPanel" data-rel="popup" data-transition="slide" data-position-to="window" ' +
//	    'data-user="'+ row.id + '"><img src="icons/star.jpg" alt="" class="ui-li-icon ui-li-thumb"> ' +
//        ' <hgroup><h1>' + row.filenumber + '</h1><h2>' + row.lastUpdate + ' | ' + row.partner + ' </h2></hgroup> '+
//        '    </a> ' +
//        '    <span id="notification" class="ui-btn-up-b ui-btn-corner-all">Notifications 4</span> '+
//        '</li>'
//		
//		);
//	}
});



//data role page transition
$("a[data-role=tab]").each(function () {
    var anchor = $(this);
    anchor.bind("click", function () {
        $.mobile.changePage(anchor.attr("href"), {
            transition: "none",
            changeHash: false
        });
        return false;
    });
});

$("div[data-role=page]").bind("pagebeforeshow", function (e, data) {
    $.mobile.silentScroll(0);
    $.mobile.changePage.defaults.transition = 'slide';
});

$('#page_files').live('pageinit', function(event){
	$('#content').append(getFiles)
});

function getFiles() {
	var list = $('#file'), items = [];
	
	$.mobile.db.transaction(function(t) {
		//get records
		t.executeSql("SELECT id, fileNumber, lastUpdate, partner FROM file ORDER BY lastUpdate ",[],
		
		//display records
		function(t, result) {
			var i,
			len = result.rows.length,
			row;
			
			if (len > 0 ) {
				
				for (i = 0; i < len; i += 1) {
					
					row = result.rows.item(i);
					
					items.push(
				   '<li data-theme="c" class="files">' +
                   '<a href="#popupPanel" data-rel="popup" data-transition="slide" data-position-to="window" ' +
				   'data-user="'+ row.id + '"><img src="icons/star.jpg" alt="" class="ui-li-icon ui-li-thumb"> ' +
                   ' <hgroup><h1>' + row.fileNumber + '</h1><h2>' + row.lastUpdate + ' | ' + row.partner + ' </h2></hgroup> '+
                    '    </a> ' +
                    '    <span id="notification" class="ui-btn-up-b ui-btn-corner-all">Notifications 4</span> '+
                   '</li>'
					
					);
				}
					
				list.html(items.join());
				list.listview('refresh');
				
				/*$('a', list).live('click',function(e) {
					getItem(($(this).attr('data-user')));
					});*/
			} 
		});
		
	});	
}

