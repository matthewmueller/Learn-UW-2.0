$(document).ready(function() {
	
	$(function() {
		$( "#tabs" ).tabs({

			ajaxOptions: {
				
				success: function(xhr) {
					$('.accordion').accordion({
						header: 'header'
					});
					
					$('.ui-dialog').first().remove();
					$('body').children('.createEvent').remove();
					
					$('.createEvent').dialog('close');
					$('.createEvent').dialog({
						width: '600px',
						autoOpen: false
					});
					

					$('.ui-tabs-hide').empty();

					$('.todo.done').find('input').attr('checked', 'checked');

				},
				
				error: function( xhr, status, index, anchor ) {
					$( anchor.hash ).html(
						"Couldn't load this tab. We'll try to fix this as soon as possible. " +
						"If this wouldn't be a demo." );
				}
			}
		});
	});
	
	
	$("#container").show();
	
	
	var addEvent = function(name, klass, day, time) {
		
		var input = $('<input>').attr('type', 'checkbox');
		time = $('<span>').addClass('time').text(time);
		name = $('<span>').addClass('name').text(klass.text + ' - ' + name);
		
		var li = $('<li>').addClass(klass.cls).append(input).append(time).append(name);
		$('.day.'+day.cls).find('.todo.still ul').append(li);
		
	};

	// Buttons
	
	
	$('.cancelButton').live('click', function() {
		$('.createEvent').dialog('close');
		return false;
	});
	
	$('.createCloseButton').live('click', function() {
		var form = $('.createEvent').find('form');
		
		var name = form.find('.eventName').val();
		var klass = form.find('.eventClass');
		var start = form.find('.eventStart').val();
		var day = form.find('.eventDay');
		
		day = {cls : day.val(), text : day.find('option:selected').text()};
		klass = {cls : klass.val(), text : klass.find('option:selected').text()};
		
		addEvent(name, klass, day, start);
		
		$('.createEvent').dialog('close');
		return false;
	});
	
	$('.createButton').live('click', function() {
		$('.createEvent').dialog('close');

		$('.createEvent').dialog('open');
		return false;
	});
	
	$('.openAssignment').live('click', function() {
		var href = $(this).attr('href');
		$('#mainPane').empty();
		$.get(href, function(data) {
		  $('#mainPane').html(data);
		});
		
		
		return false;
	});
	
});



