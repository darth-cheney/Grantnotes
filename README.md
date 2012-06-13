Grantnotes
==========

Basic jQuery script and CSS markup for imitating the clever sidebar footnotes used on Grantland.com

Hello, fellow footnoters. Included in this repo are the jQuery script and a very small stylesheet. More to come soon.

Overview:
  In the simplest terms, this system requires one overarching container element and two additional elements
  within that container: a "main content" div and a (preferably floating) "sidebar" div. The script then scans the document,
  assigning unique ids to the "main content" notes and putting the footnoted text into the sidebar in an appropriate 
  format. In the end, each footnote should be aligned vertically with the sentence in which the citation was made, or, if 
  two footnotes are too long for that to be possible, they should be one on top of the other in correct order.
  
HTMLing a footnote:
  For this script you will need to do two things: insert a <sup> in the "main content" area with whatever notation
  you desire, then create a <span> of text with class ".footnote-text" that has the content of of the actual note. The
  script will take care of creating containing footnote divs and placing the text into the "sidebar" in the proper
  order and height levels.