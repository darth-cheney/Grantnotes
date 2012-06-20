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
	// Prototype for the fNote object
function fNote(ref, arText, fBar, note_count) {
	
	// Set construction actions and constructed variables
	this.number = note_count;
	this.refID =  'ref' + note_count;
	this.noteID = 'foot' + note_count;
	this.bar_offset = fBar.offset().top;

	// Find the footnote text and create a .footnote div
	fBar.append($('<div class="footnote" id="' + this.noteID + '"></div>'));
	this.element = $('div#' + this.noteID + '.footnote'); // a jQuery object representing the newly created div.footnote
	this.element.append($('<sup>' + this.number + '</sup>'));
	this.element.append(arText.find('span.footnote-text').filter(':first'));

	// Now that the div.footnote exists, we can get its normal position, etc:
	this.normal_pos = this.element.position().top;

	// fNote methods
	this.getHeight = function(){ // returns the calculated height of the footnote div
		return this.element.outerHeight(true);
	};

	this.docPosition = function(){ // returns the position of the top of the element relative to the whole document
		return this.element.offset().top;
	};

	this.barPosition = function(){ // returns the position of the top of the element relative to the footnote-bar
		return this.element.position().top;
	};

	this.getBottom = function(){ // returns the position of the element bottom relative to the footnote-bar
		return (this.barPosition() + this.getHeight());
	};

	this.getAbsBottom = function(){ // returns the position of the element bottom relative to the whole page
		return (this.docPosition() + this.getHeight());
	};

	this.refPosition = function(){ // returns the position of the <sup> in arText transposed for the footnote-bar
		return ref.offset().top - this.bar_offset;
	};

	this.setPosition = function(num){ // sets the CSS: top value for the footnote element.
		this.element.css('top', num);
	};
};
//prototype for the article object
function article(arText) {
	this.offset = arText.offset().top;
	this.height = arText.outerHeight(true);
	this.absHeight = this.offset + this.height;
	this.element = arText;
};
// A generic transponsition function	
	//DO THIS LATER

function bottomAdjust(footnote) {
	footnote.element.appendTo(article.element);
	footnote.element.css('position', 'static');
	footnote.element.css('width', '100%');
	footnote.element.css('border-top', '3px solid rgba(0, 0, 0, 0.3)');
	footnote.element.css('padding-top', '7px');
};

	// Main
	var prev_bottom = 0;
	var note_count = 0;
	var noteArray = new Array(); // An array for storing the footnote objects
	var arText = $('article.main-article');
	var article = new article(arText); // create the article object

	// For each <sup> create a new fNote object
	arText.find('sup').each(function(){
		note_count = note_count + 1;
		var ref = $(this);
		var fBar = $('.footnote-bar');
		var footnote = new fNote(ref, arText, fBar, note_count);
		noteArray.push(footnote);
		$('.footnote').css('visibility', 'visible');
	});

	// Go through the noteArray and position the footnotes correctly
	for (var i = 0; i < noteArray.length; i++) {
		var footnote = noteArray[i];
		var ref_pos = footnote.refPosition();
		if(ref_pos < prev_bottom){
			footnote.setPosition(prev_bottom - footnote.normal_pos);
		} else {
			footnote.setPosition(ref_pos - footnote.normal_pos);
		};
		prev_bottom = footnote.getBottom();
		if(prev_bottom > (article.absHeight - footnote.bar_offset)) {
			bottomAdjust(footnote);
		};
	};
});