/*********************
 *     Grantnotes    *
 *        ECMG       *
 *********************/

// License:  This  program  is  free software; you can redistribute it and/or
// modify  it  under the terms of the GNU General Public License as published
// by  the  Free Software Foundation; either version 3 of the License, or (at
// your  option)  any  later version. This program is distributed in the hope
// that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
// warranty  of  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.





$(document).ready(function(){
	
	// Prototype for Footnote object
	function fNote(ref, note_count, textElem, fBar) { // ref must be a jQuery object matching a single <sup> within the content div
		this.ref = ref;
		this.note_count = note_count;

		// attach the id to the <sup> element that this note will link to
		this.refID = 'ref' + this.note_count;
		this.ref.attr('id', this.refID);
		this.noteID = 'foot' + this.note_count;

		// Calculate and store the heights of the main-text div and the footnote sidebar div
		this.text_offset = textElem.offset().top;
		this.fbar_offset = fBar.offset().top;
		this.fbar_pos = 0;

		if( this.text_offset > this.fBar_offset) {
			this.fbar_pos = this.ref.offset().top - this.fbar_offset;
		}


		// construct a footnote div with the appropriate contents
		$('.entry-content div.footnote-bar').append('<div class="footnote" id="foot' + this.note_count + '"></div');
		this.this_footnote = 'div#foot' + this.note_count + '.footnote';
		$(this.this_footnote).append($('<sup>' + note_count + '</sup>'));
		$(this.this_footnote).append($('.entry-content').find('span.footnote-text').filter(':first'));

		// instantiate the different attributes for a footnote:
		this.normal_pos = $(this.this_footnote).position().top;
		this.height = $(this.this_footnote).outerHeight(true);
		this.normal_bottom = this.normal_pos + this.height;

		// fNote methods
		this.position = function() { // returns the position-top relative to the nearest offset parent
			return $(this.this_footnote).position().top;
		};

		this.bottom = function() { // returns the position of the bottom of the element (relies on this.position())
			return this.position() + this.height;
		};

		this.offPosition = function() { // returns the position as a calculation of total offset minus the content_height
			var offset = $(this.this_footnote).offset().top;
			return offset - this.fbar_offset;
		};

		this.offBottom = function() { // returns the bottom position of the element using the offPosition() method
			var offPos = this.offPosition();
			return offPos + this.height;
		};

		this.isNormal = function() { // returns a boolean value of whether or not the element is in its 'normal' DOM position
			return this.position() == this.normal_pos;
		};

		this.refPosition = function() { // returns the position-top of the linked reference in the text body
			var offset = $('#'+this.refID).offset().top;
			return offset - this.fbar_offset;
		};

		this.setPosition = function(num) { // sets the position-top of the given element
			$(this.this_footnote).css('top', num);
		};
	};

	var prev_bottom = 0;
	var note_count = 0;
	var noteArray = new Array(); // An array for storing the footnote objects
	$('article.main-article p').find('sup').each(function(){ // for each found <sup>, do the following
		note_count = note_count + 1;
		var text = $('article.main-article');
		var fBar = $('div.footnote-bar');

		// instantiate a new footnote object corresponding to the located <sup>
		var footnote = new fNote($(this), note_count, text, fBar);
		noteArray.push(footnote); // add it to the array

		$('.footnote').css('visibility', 'visible');
	});

	// This is where the magic happens. The div.footnote elements are placed at the proper position and cased for overlaps.
	for (var i = 0; i < noteArray.length; i++) {
		var footnote = noteArray[i];
		var ref_pos = footnote.refPosition();
		if(ref_pos < prev_bottom){
			footnote.setPosition(prev_bottom - footnote.normal_pos);
		} else {
			footnote.setPosition(ref_pos - footnote.normal_pos);
		}
		prev_bottom = footnote.bottom();
		console.log(footnote.position());
	};
});	
