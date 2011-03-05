var day = new Date();
day = day.getDay();
switch(day){
case 0:
	day = "sun";
	break;
case 1:
	day = "mon";
	break;
case 2:
	day = "tues";
	break;
case 3:
	day = "wed";
	break;
case 4:
	day = "thurs";
	break;
case 5:
	day = "fri";
	break;
case 6:
	day = "sat";
	break;
default:
	
}

function loadLeftPane(page, callback) {
	$('#leftContent').load('left/'+page+'.html', function() {
		callback.call();
	});
}

$(document).ready(function() {
	
	$('.day.'+day).addClass('today');
	
	$('.todo.done').find('input').attr('checked', 'checked');
	$('.todo.still').find('input').attr('checked', '');
	
	loadLeftPane('main', function() {
		$("#container").show();
		$('#createEvent').dialog('close');
		
		$('#createEvent').dialog({
			width: '600px',
			autoOpen: false
		});
		
		$('#createEvent').find(".eventDay:selected").removeAttr('selected');
		$('#createEvent').find(".eventDay option."+day).attr('selected', 'selected');
		
	});
	
	$('#tabs').find('a').click(function() {
		var name = $(this).attr('name');
		if($('#leftContent').hasClass(name)) {
			return false;
		}
		$('#leftContent').fadeTo('fast', 0, function() {
			loadLeftPane(name, function() {
				$('#leftContent').find('.accordion').accordion({
					header: 'header',
					collapsible: true,
					active: false,
					autoHeight:false
				});
				
				
				$('#leftContent').removeClass().addClass(name).fadeTo('fast', 1);
				$('#createEvent').dialog('close');
				
				$('#createEvent').dialog({
					width: '600px',
					autoOpen: false
				});
				
			});
		});
		
		if(name == 'main') {
			$('.todo', '#mainPane').find('li').each(function(index) {
				$(this).fadeIn('fast');
			});
		} else {
			$('.todo', '#mainPane').find('li').each(function(index) {
				if (!$(this).hasClass(name)) {
					$(this).fadeOut('fast');
				} else {
					$(this).fadeIn('fast');
				}
			});
		}
		
		return false;
	});
		
	var addEvent = function(name, klass, day, time) {
		
		var input = $('<input>').attr('type', 'checkbox');
		time = $('<span>').addClass('time').text(time);
		klassElem = $('<span>').addClass('class').text(klass.text);
		
		switch(klass.cls){
		case 'hci':
			klassElem.addClass('green');
			break;
		case 'finance':
			klassElem.addClass('blue');
			break;
		case 'handball':
			klassElem.addClass('orange');
			break;
		case 'accounting':
			klassElem.addClass('purple');
			break;
		case 'epd':
			klassElem.addClass('yellow');
			break;
		default:
			
		}
		
		name = $('<span>').addClass('name').text(" "+name);
		
		var li = $('<li>').addClass(klass.cls).append(input).append(time).append(klassElem).append(name);
		$('.day.'+day.cls).find('.todo.still ul').append(li);
		
	};

	// Buttons
	
	$('.goCourseCalendar').live('click', function() {
		  $('#mainPane').fadeOut('fast', function() {
			$('#mainPane').children().hide();
			$('#mainPane').find('.calendar').show();
			$('#mainPane').fadeIn('fast');
		  });
	});
	
	$('.cancelButton').live('click', function() {
		$('#createEvent').dialog('close');
		return false;
	});
	
	$('.createCloseButton').live('click', function() {
		var form = $('#createEvent').find('form');
		
		var name = form.find('.eventName').val();
		var klass = form.find('.eventClass');
		var start = form.find('.eventStart').val();
		var day = form.find('.eventDay');
		
		day = {cls : day.val(), text : day.find('option:selected').text()};
		klass = {cls : klass.val(), text : klass.find('option:selected').text()};
		
		addEvent(name, klass, day, start);
		
		$('#createEvent').dialog('close');
		return false;
	});
	
	$('.createViewButton').live('click', function() {
		var form = $('#createEvent').find('form');
		
		var name = form.find('.eventName').val();
		var klass = form.find('.eventClass');
		var start = form.find('.eventStart').val();
		var day = form.find('.eventDay');
		
		day = {cls : day.val(), text : day.find('option:selected').text()};
		klass = {cls : klass.val(), text : klass.find('option:selected').text()};
		
		addEvent(name, klass, day, start);
		
		$('#mainPane').fadeOut('fast', function() {
			$('#mainPane').children().hide();
			$('#mainPane').find('.calendar').show();
			$('#mainPane').fadeIn('fast');
		});
		
		$('#createEvent').dialog('close');
		return false;
	});
	
	$('.createButton').live('click', function() {
		$('#createEvent').dialog('close');

		$('#createEvent').dialog('open');
		return false;
	});
	
	$('.openAssignment').live('click', function() {
		var href = $(this).attr('href');
		$.get(href, function(data) {
		  $('#mainPane').fadeOut('fast', function() {
			$('#mainPane').children().hide();
			$('#mainPane').append(data).fadeIn('fast');
		  });
		});
		
		
		return false;
	});
	
	$('.todo').find('input').live('click',function() {
		var todo = $(this).closest('.todo');
		var day = todo.parent('.day');
		var input = $(this);
		
		if(todo.hasClass('still')) {
			$(input).parent('li').fadeOut('fast', function() {
				$(input).attr('checked', 'checked');
				$(this).appendTo($('.done', day));
				$(this).fadeIn('fast');
			});
			
		} else {
			$(input).parent('li').fadeOut('fast', function() {
				$(input).attr('checked', '');
				$(this).appendTo($('.still', day));
				$(this).fadeIn('fast');
			});
		}
		
	});
	
	
});



