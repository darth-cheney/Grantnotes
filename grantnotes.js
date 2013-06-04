

 /*********************
 *   Grantnotes 2.0  *
 *        ECMG       *
 *********************/

// License:  This  program  is  free software; you can redistribute it and/or
// modify  it  under the terms of the GNU General Public License as published
// by  the  Free Software Foundation; either version 3 of the License, or (at
// your  option)  any  later version. This program is distributed in the hope
// that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
// warranty  of  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.



var grantnotes = function(text, footbar, optArgs) {
	if(optArgs) {
		if (optArgs.breakpoint) {
			var breakpoint = optArgs.breakpoint;
		}
		if (optArgs.breakpoint_action) {
			var breakpoint_action = optArgs.breakpoint_action;
		}
		if (optArgs.animate) {
			var animate = true;
		}
		if (typeof(optArgs.note_container == "object")) {
			var note_container = optArgs.note_container;
		} else if (optArgs.note_container == "string") {
			var note_container = $(optArgs.note_container);
		}
		if (optArgs.ref_id) {
			var refID = optArgs.ref_id;
		}
		if (optArgs.foot_id) {
			var footID = optArgs.foot_id;
		}
	}

	function Footnote(reference, text, footbar, note_count) {

		// Constructed variables
		this.number = note_count;
		this.refID = 'ref' + note_count;
		this.footID = 'foot' + note_count;
		this.reference = reference;

		// Make changes to the in-text <sup> elements.
		// If a number exists within the <sup>, use it. Otherwise make one automagically
		var note_char;
		if(!reference.text()) {
			note_char = this.number;
		} else {
			note_char = reference.text();
			reference.text('');
		};
		reference.prepend('<a href="#' + this.footID + '">' + note_char + '</a>');

		// Find the footnote text and create a .footnote div
		footbar.append($('<div class="footnote" id="' + this.footID + '"></div>'));
		this.element = $('div#' + this.footID + '.footnote'); // a jQuery object representing the newly created div.footnote
		this.element.append($('<sup>' + note_char + '</sup>'));
		this.element.append(text.find('span.footnote-text').filter(':first'));
		
		// Make the footnote absolutely positioned, and also hide it
		this.element.css({
			position: 'absolute',
			opacity: '0'
		});


		// Methods
		this.getHeight = function() { // returns calculated height of footnote div
			return this.element.outerHeight(true);
		};

		this.refAbsPosition = function() { // returns pos of in-text ref relative to document
			return this.reference.offset().top;
		};

		this.barPosition = function() { // returns the position of footnote div relative to footbar
			return this.element.position().top;
		};

		this.setPosition = function(num) {
			this.element.css('top', num + 'px');
		};

		this.getBottom = function() {
			return this.barPosition() + this.getHeight();
		};

	}

	function getFootbarOffset() {
		return footbar.offset().top;
	}

	this.positionFootnotes = function(noteArray, footbar_offset) {
		// Loop through the array of footnotes and position them appropriately
		var notes_length = noteArray.length;
		for (var i = 0; i < notes_length; i ++) {
			var footnote = noteArray[i];
			var ref_pos = footnote.refAbsPosition();
			var total_offset = ref_pos - footbar_offset;
			if(total_offset >= 0 && total_offset > prev_bottom) {
				footnote.setPosition(total_offset);
			} else if (total_offset <= prev_bottom) {
				footnote.setPosition(prev_bottom + 10); // +10 for some padding
			} else {
				footnote.setPosition(0);
			}

			prev_bottom = footnote.getBottom();
			footnote.element.animate({
				opacity: '1'
			}, 400);

		}
	}

	// Main
	var note_count = 1;
	var prev_bottom = 0; // Updates with bottom of the previous footnote when looping.
	var noteArray = new Array(); // An array to store the notes as we create them
	var footbar_offset = getFootbarOffset();

	// Make sure that footbar is explicitly set to relative positioning
	footbar.css('position', 'relative');

	// Find each <sup> within the text and create a new Footnote for each
	text.find('sup').each(function(){
		var reference = $(this);
		var footnote = new Footnote(reference, text, footbar, note_count);
		noteArray.push(footnote);
		note_count = note_count + 1;
	});
	
	// This delay helps smooth over browser inconsistencies in loading/rendering (needs work)
	$(window).load(function(){
		setTimeout(function(){
			this.positionFootnotes(noteArray, footbar_offset);
		}, 200);
	});
	
	// Bind the positioning function to any window resizing
	$(window).resize(function() {
		this.positionFootnotes(noteArray, footbar_offset);
	});

	// Call the window resize once just to clear out any weird formatting errors that HAVE BEEN cropping up (TODO)
	//$(window).trigger('resize');

}	