Grantnotes
==========

Basic jQuery script and CSS markup for imitating the clever sidebar footnotes used on Grantland.com

Hello, fellow footnoters. Included in this repo are the jQuery script and a very small stylesheet. More to come soon.

<h4>Overview</h4>
  In the simplest terms, this system requires one overarching container element and two additional elements
  within that container: a "main content" div and a (preferably floating) "sidebar" div. The script then scans the document,
  assigning unique ids to the "main content" notes and putting the footnoted text into the sidebar in an appropriate 
  format. In the end, each footnote should be aligned vertically with the sentence in which the citation was made, or, if 
  two footnotes are too long for that to be possible, they should be one on top of the other in correct order.
  
<h4>HTMLing a footnote</h4>
  For this script you will need to do two things: insert a sup element in the "main content" area with whatever notation
  you desire, then create a span of text with class ".footnote-text" that has the content of of the actual note. The
  script will take care of creating containing footnote divs and placing the text into the "sidebar" in the proper
  order and height levels.
  
<h4>The fNote Object</h4>
  Grantnotes works by instantiating an fNote object for each sup element that it finds. Upon construction, an fNote
  creates a new div with class ".footnote" that is placed within the sidbar for footnotes (here called "div.footnote-bar").
  It then gives the sup element a specific id value based on the "note_count" variable that is passed to it (for example,
   if the note_count is 6 the sup will be "sup#ref6". It then searches for the spans of text with class ".footnote-text"
  and places them within the ".footnote" div. IMPORTANT: the "span.footnote-text" elements should be created <i>in order</i>!
  <br/>
  <h5>fNote Variables</h5>
  <ul>
  <li><code>refID</code> -- The string containing the sup element's id (without a '#').</li>
  <li><code>noteID</code> -- Similar to <code>refID</code> but is instead the id given to the <code>.footnote</code> div.</li>
  <li><code>note_count</code> -- This is identical to the <i>note_count</i> that is passed to the constructor.</li>
  <li><code>normal_pos</code> -- An int of the pixel value for the top of the <code>.footnote</code> element where it would <i>normally reside within the DOM</i>. Because 
  this script and stylesheet rely upon the <code>position: relative</code> markup, this value must be taken into account in later calculations.</li>
  <li><code>height</code> -- The height, in pixels, of the given <code>.footnote</code> element. This is calculated using jQuery's <code>.outerHeight(true)</code> function, which includes all margins and padding.</li>
  <li><code>normal_bottom</code> -- The pixel value of the bottom of the given <code>.footnote</code> element as it would normally reside in the DOM.</li>
  </ul>
  <br/>
  <h5>fNote Methods</h5>
  <ul><li><code>position()</code> -- Returns a pixel value for the current position of the top of the given <code>.footnote</code> element. Calculated using jQuery's <code>.position().top</code> method.</li>
  <li><code>bottom()</code> -- Returns the pixel value for the current position of the bottom of the given <code>.footnote</code> element. Calculated using fNote's <code>height</code> variable and <code>postiion</code> method.</li>
  <li><code>offPosition(<i>content_height</i>)</code> -- Primarily for error checking, this method returns the position of the top of the given <code>.footnote</code>
  element with respect to the entire document (using jQuery's <code>.offset().top</code>) then subtracts a <i>content_height</i> value,
  which should be a pixel value for where the top of the content div (in the provided case it's <code>.entry-content</code>) begins with respect
  to the entire document. Useful for comparing with fNote's <code>position()</code> method, as the two should ideally be the same.</li>
  <li><code>offBottom(<i>content_height</i>)</code> -- Similar to <code>offPosition()</code>, but returns the pixel value for the bottom of the given <code>.footnote</code> element
  instead of the top</li>
  <li><code>isNormal()</code> -- Returns a boolean value to check whether or not the given <code>.footnote</code> is currently residing
  in its "normal" position within the document flow. If true, this means that no adjustments have been made to its position, and it has not
  been placed in the final (hopefully correct) position.</li>
  <li><code>refPosition(<i>content_height</i>)</code> -- Returns a pixel value for the position of the top of the referenced <code>sup</code> element
   within that element's containing div. It takes into account the differences in height between the content div and the footnote siderbar.</li>
  <li><code>setPosition(<i>num</i>)</code> -- The method for setting the position of the top of the given <code>.footnote</code>. Makes use of jQuery's
  <code>.css()</code> method and changes the CSS value of "top".
  </ul>