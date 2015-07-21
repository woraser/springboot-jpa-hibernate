var App = function () {

	var currentPage = ''; // current page
	var collapsed = false; //sidebar collapsed
	var is_mobile = false; //is screen mobile?
	var is_mini_menu = false; //is mini-menu activated
	var is_fixed_header = false; //is fixed header activated
	var responsiveFunctions = []; //responsive function holder
	
	/*-----------------------------------------------------------------------------------*/
	/*	Fullcalendar
	/*-----------------------------------------------------------------------------------*/
	var handleCalendar = function () {
		/* initialize the external events
		-----------------------------------------------------------------*/
	
		var initDrag = function (el) {
		
			// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
			// it doesn't need to have a start or end
			var eventObject = {
				title: $.trim(el.text()) // use the element's text as the event title
			};
			
			// store the Event Object in the DOM element so we can get to it later
			el.data('eventObject', eventObject);
			
			// make the event draggable using jQuery UI
			el.draggable({
				zIndex: 999,
				revert: true,      // will cause the event to go back to its
				revertDuration: 0  //  original position after the drag
			});
			
		}
		
		var addEvent = function (title) {
            title = title.length == 0 ? "Untitled Event" : title;
            var color = jQuery('#text-field')[0].value;
            var html = $('<div class="external-event" style="background-color:'+color+'">' + title + '</div>');
            jQuery('#event-box').append(html);
            initDrag(html);
        }

        $('#external-events div.external-event').each(function () {
            initDrag($(this))
        });

        $('#add-event').unbind('click').click(function () {
            var title = $('#event-title').val();
            addEvent(title);
        });
	
	
		/* initialize the calendar
		-----------------------------------------------------------------*/
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		
		var calendar = $('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			selectable: true,
			selectHelper: true,
			select: function(start, end, allDay) {
				var title = prompt('Event Title:');
				var id = Math.round(Math.random()*1000);
				
				var copiedEventObject = createEvent($(this)[0].element,start,allDay,end,title,calendar);
				if (title) {
					calendar.fullCalendar('renderEvent',copiedEventObject,true);
				}
				//calendar.fullCalendar('unselect');
				operationEvent(copiedEventObject,calendar);
			},
			editable: true,
			droppable: true, // this allows things to be dropped onto the calendar !!!
			drop: function(date, allDay) { // this function is called when something is dropped
			
				var copiedEventObject = createEvent($(this),date,allDay,"","",calendar);
				
				// render the event on the calendar
				// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
				$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
				operationEvent(copiedEventObject,calendar);
			   
				// is the "remove after drop" checkbox checked?
				if ($('#drop-remove').is(':checked')) {
					// if so, remove the element from the "Draggable Events" list
					$(this).remove();
				}
				
			},
			eventClick:function(calEvent, element){
				$('#calendar').fullCalendar("updateEvent", calEvent); 
			},
	/*
			eventDrop:function( event, delta, revertFunc, jsEvent, ui, view ) {
					operationEvent(event,calendar);
				},*/
	
			events: [
				{
					title: 'All Day Event',
					start: new Date(y, m, 1),
					backgroundColor: Theme.colors.blue,
					allDay: true,
					startParam:'start',
					endParam:'end',
					id:1222,
				},
				{
					title: 'Long Event',
					start: new Date(y, m, d-5),
					end: new Date(y, m, d-2),
					allDay: true,
					backgroundColor: Theme.colors.red,
					id:'2',
				},
				{
					title: 'Repeating Event',
					start: new Date(y, m, d-3, 16, 0),
					allDay: true,
					backgroundColor: Theme.colors.yellow,
					id:'3',
				},
				{
					title: 'Repeating Event',
					start: new Date(y, m, d+4, 16, 0),
					allDay: true,
					backgroundColor: Theme.colors.primary,
					id:'4',
				},
				{
					title: 'Meeting',
					start: new Date(y, m, d, 10, 30),
					allDay: true,
					backgroundColor: Theme.colors.green,
					id:'5',
				},
				{
					title: 'Lunch',
					start: new Date(y, m, d, 12, 0),
					end: new Date(y, m, d, 14, 0),
					allDay: true,
					backgroundColor: Theme.colors.red,
					id:'6',
				},
				{
					title: 'Birthday Party',
					start: new Date(y, m, d+1, 19, 0),
					end: new Date(y, m, d+1, 22, 30),
					allDay: true,
					backgroundColor: Theme.colors.gray,
					id:'7',
				},
				{
					title: 'Click for Google',
					start: new Date(y, m, 28),
					end: new Date(y, m, 29),
					url: 'http://google.com/',
					allDay: true,
					backgroundColor: Theme.colors.green,
					id:'8',
				}
			]
		});
	     $('div.fc-event-inner').contextMenu('myMenu1', {
	          bindings: 
	          {
	            'update': function(t) {
	              alert('Trigger was '+t.id+'\nAction was Save');
	            },
	            'delete': function(t) {
	              alert('Trigger was '+t.id+'\nAction was Delete');
	            }
	          }
	    });
	}
	return {

        //Initialise theme pages
        init: function () {
        	handleCalendar();	//Function to display calendar
			//handleUniform();	//Function to handle uniform inputs
			handleThemeSkins();
        },
    };
}();

(function () {
    this.Theme = (function () {
        function Theme() {}
        Theme.colors = {
			white: "#FFFFFF",
			primary: "#5E87B0",
            red: "#D9534F",
            green: "#A8BC7B",
            blue: "#70AFC4",
            orange: "#F0AD4E",
			yellow: "#FCD76A",
            gray: "#6B787F",
            lightBlue: "#D4E5DE",
			purple: "#A696CE",
			pink: "#DB5E8C",
			dark_orange: "#F38630"
        };
        return Theme;
    })();
})(window.jQuery);

function operationEvent(copiedEventObject,calendar){
	  $('div.fc-event-inner').contextMenu('myMenu1', {
        bindings: 
        {
          'update': function(t) {
        		if(copiedEventObject.title == null){
        			title = prompt('Event Title:');
	          		copiedEventObject.title = title;
	          	}else{
	          		title = prompt('Event Title:',copiedEventObject.title);
	          		if(title != ""){
	          			copiedEventObject.title = title;
	          		}
	          	}
        		
        		calendar.fullCalendar('updateEvent',copiedEventObject);
          		operationEvent(copiedEventObject,calendar);
          },
          'delete': function(t) {
              $('#calendar').fullCalendar("removeEvents", copiedEventObject.id); 
          }
        }
  });
}

function createEvent(object,date,allDay,end,title,calendar){
	// retrieve the dropped element's stored Event Object
	var originalEventObject = object.data('eventObject');
	
	// we need to copy it, so that multiple events don't have a reference to the same object
	var copiedEventObject = $.extend({}, originalEventObject);
	// assign it the date that was reported
	copiedEventObject.start = date;
	copiedEventObject.allDay = allDay;
	if(end != ""){
		copiedEventObject.end = end;
	}
	if(title != ""){
		copiedEventObject.title = title;
	}
	copiedEventObject.color = object[0].style.backgroundColor;
	copiedEventObject.id= Math.round(Math.random()*1000);
	
	return copiedEventObject;
}