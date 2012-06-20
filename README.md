Grantnotes
==========
Grantnotes is a simple jQuery reliant script for implementing footnotes similar to those used on Grantland.com

<h4>How to initialize:</h4>
Within a jQuery script, simply call the <code>grantnotes()</code> function.
It takes 2 parameters: a <code>div</code> or <code>article</code> in which the main text appears, and a <code>div</code> for the floated sidebar in which the notes will appear. Both must be passed as jQuery objects.
<br/>
<br/>
<b><u>Example:</u></b>
<br/>
<code>
$(document).ready(function(){<br/>
    grantnotes($('article.main-article'), $('.footnote-bar')); <br/>
});
</code>
<br/>
<br/>
<b>Requirements</b><br/>
The <code>article</code> or <code>div</code> containing the main text should have within it one or more <code>sup</code> elements. It should also 
contain a <code>span</code> with <code>class="footnote-text"</code> for each <code>sup</code> that is found within the main text, as they are each the text that will be incorporated into the footnote. These <code>span</code>
elements should be in order somewhere within the main text.
<br/>
You can include your own numbers or symbols within each <code>sup</code>, but empty elements are ok too; the script will automatically number them for you.
<br/><br/>
The <code>.footnote-bar</code> division should be floated to either side of the <code>article</code> or <code>div</code> containing the main text. It must also have set the markup for <code>position: relative</code> in order for the script to work properly.
<br/>
<br/><br/>
<h4>What will it do?</h4>
For each <code>sup</code> that grantnotes finds within the main text, it creates a new <code>div</code> element of <code>class="footnote</code> and places it within the <code>.footnote-bar</code> that you've already provided as a parameter. It then takes the <code>span.footnote-text</code> associated with that reference (if it has been written in order) and puts it within the newly created <code>.footnote</code> division.<br/><br/>
Once all of the <code>.footnote</code>s are in place, the script will position each footnote so that it is horizontally aligned with the corresponding <code>sup</code> element within the main text. If two <code>sup</code> elements are close to each other in that main text, the resulting footnotes will be placed one on top of the other, sequentially, instead of being aligned horizontally with their respective note. For a better visual of this, load any of the example files provided in this repository.<br/><br/>
All footnotes are given an <code>id</code> of <code>#foot[num]</code> where <code>[num]</code> is the order of the footnote. Again, for a better idea of how this works simply load the source for any of the example pages provided in this repository.
