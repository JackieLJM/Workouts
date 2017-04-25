<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Internet Explorer Select Width and Style Bug Workaround - JainaEwen.com</title>
<link rel="stylesheet" type="text/css" href="../css/main.css" />
<link rel="stylesheet" type="text/css" href="demo-main.css" />
<link rel="stylesheet" type="text/css" href="demo-13px.css" />
<script type="text/javascript" src="jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="jquery.ie-select-style.pack.js"></script>
<!--[if lte ie 6]><script type="text/javascript" src="jquery.bgiframe.js"></script><![endif]-->
<script type="text/javascript"><!--
$(function ()
{
    $('select#example-one').ieSelectStyle();
    
    $('select#example-two').ieSelectStyle
    ({
        applyWidth : false
    });
    
    $('select#example-three').ieSelectStyle
    ({
        width : '30%',
        applyStyle : false
    });
});
//--></script>


</head>

<body>

<h1>Internet Explorer Select Width and Style Bug Workaround</h1>

<p>Styling the <code>select</code> box in Internet Explorer 6 and 7 is almost impossible. This jQuery plugin provides a workaround for that problem. It will apply borders, background colours (background images still don't work properly) and padding to any <code>select</code> element. It also incorporates the 'Internet Explorer Select Width Bug Workaround' I created last month (found <a href="http://www.jainaewen.com/files/javascript/jquery/ie-select-width/" title="View my other Internet Explorer Select Width Bug Workaround here">here</a>.)</p>
<p>It works by searching the stylesheets and calculating the specificity of any styles associated with the <code>select</code> box, then creates a series of elements that will wrap around the <code>select</code> box. A sprite is used to represent the arrow of the <code>select</code> box.</p>
<p>If you change the font size of the <code>select</code> box the image will also need to be changed. I have provided sprites and CSS to support font sizes of 13px (default font size for a <code>select</code> box which also works fine for 14px), 16px, 18px and 20px</p>
<p>This jQuery plugin for Internet Explorer's buggy <code>select</code> is confirmed to be compatible with jQuery 1.2.6 upwards. For versions earlier than 1.2.8 (I think, can't quite remember) however, you will need to use the dimensions plugin which is included.</p>
<p>Leave any comments below or on the plugin's jQuery page, or contact me <a href="http://www.jainaewen.com/c4ontact.html" title="Contact me here">here</a>.</p>

<h2>API</h2>
<dl>
    <dt><code>width : null ($.ieSelectStyle.defaults.width)</code></dt>
    <dd>Sets the width of the <code>select</code>.</dd>
    
    <dt><code>containerClassName : 'ie-select-width-container' ($.ieSelectStyle.defaults.containerClassName)</code></dt>
    <dd>The class name to use for the <code>select</code> container.</dd>
    
    <dt><code>overlayClassName : 'ie-select-width-overlay' ($.ieSelectStyle.defaults.overlayClassName)</code></dt>
    <dd>The class name to use for the <code>select</code> arrow overlay (only applies if <code>applyWidth</code> is true.)</dd>
    
    <dt><code>overlayCSS : null ($.ieSelectStyle.defaults.overlayCSS)</code></dt>
    <dd>CSS for the overlay element. Use this to override the CSS applied by the plugin.</dd>
    
    <dt><code>containerCSS : null ($.ieSelectStyle.defaults.containerCSS)</code></dt>
    <dd>CSS for the container element. Use this to override the CSS applied by the plugin.</dd>
    
    <dt><code>applyWidth : true ($.ieSelectStyle.defaults.applyWidth)</code></dt>
    <dd>Set <em>true</em> (default) to apply the <code>select</code> option width fix.</dd>
    
    <dt><code>applyStyle : true ($.ieSelectStyle.defaults.applyStyle)</code></dt>
    <dd>Set <em>true</em> (default) to apply the <code>select</code> style fix.</dd>
</dl>

<h2 id="demo">Examples</h2>
<p><strong>Obviously this page should be viewed with Internet Explorer in order to see these examples working.</strong></p>
<fieldset id="one">
    <legend>Example one</legend>
    
    <h3>Select width and style fix set to true.</h3>
    <p>This will make <code>select</code> elements in Internet Explorer 6 and 7 to look almost exactly same as they would in Internet Explorer 8.</p>
    <p>Select borders and padding are applied.</p>
    <p>Any options wider than the fixed width <code>select</code> will display as they would in any other decent browser e.g. Firefox, Opera etc.</p>
    
    <dl>
        <dt><label for="example-one">Styled <code>select</code></label></dt>
        <dd>
            <select name="example-one" id="example-one" class="style-true width-true">
                <option value="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget metus eu mauris consectetur hendrerit!</option>
                <option value="#">Proin risus risus, tempus a feugiat nec, sollicitudin eget nisi. Mauris tempor, nibh vel porta dictum.</option>
                <option value="#">Mauris accumsan, ipsum condimentum fermentum ullamcorper, tellus elit venenatis est, non accumsan quam dui quis nisl.</option>
            </select>
        </dd>
    </dl>
    
    <h4>Code</h4>
    <p><code>$('select#example-one').ieSelectStyle();</code></p>
</fieldset>

<fieldset id="two">
    <legend>Example two</legend>
    
    <h3>Select style is set to true, <code>select</code> width is set to false.</h3>
    <p>This will make <code>select</code> elements in Internet Explorer 6 and 7 to look almost exactly same as they would in Internet Explorer 8.</p>
    <p>Select borders and padding are applied.</p>
    <p>The width fix is switched off in this example.</p>
    
    <dl>
        <dt><label for="example-two">Styled <code>select</code></label></dt>
        <dd>
            <select name="example-two" id="example-two" class="style-true width-false">
                <option value="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget metus eu mauris consectetur hendrerit!</option>
                <option value="#">Proin risus risus, tempus a feugiat nec, sollicitudin eget nisi. Mauris tempor, nibh vel porta dictum.</option>
                <option value="#">Mauris accumsan, ipsum condimentum fermentum ullamcorper, tellus elit venenatis est, non accumsan quam dui quis nisl.</option>
            </select>
        </dd>
    </dl>
    
    <h4>Code</h4>
    <p><code>$('select#example-two').ieSelectStyle<br />({<br />&nbsp;&nbsp;&nbsp;&nbsp;applyWidth : false<br />});</code></p>
</fieldset>

<fieldset id="three">
    <legend>Example three</legend>
    
    <h3>Select style is set to false, <code>select</code> width is set to true.</h3>
    <p>The style fix is switched off in this example. This <code>select</code> element will display the same as the other selects in Internet Explorer 8, but will be displayed as their default <code>select</code> style in Internet Explorer 6 and 7.</p>
    <p>Any options wider than the fixed width <code>select</code> will display as they would in any other decent browser e.g. Firefox, Opera etc.</p>
    <p>The <code>select</code> width can be set via the plugin. This provides a graceful fallback in the event the user's browser has Javascript turned off.</p>
    
    <dl>
        <dt><label for="example-three">Styled <code>select</code></label></dt>
        <dd>
            <select name="example-three" id="example-three" class="style-false width-true">
                <option value="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget metus eu mauris consectetur hendrerit!</option>
                <option value="#">Proin risus risus, tempus a feugiat nec, sollicitudin eget nisi. Mauris tempor, nibh vel porta dictum.</option>
                <option value="#">Mauris accumsan, ipsum condimentum fermentum ullamcorper, tellus elit venenatis est, non accumsan quam dui quis nisl.</option>
            </select>
        </dd>
    </dl>
    
    <h4>Code</h4>
    <p><code>$('select#example-three').ieSelectStyle<br />({<br />&nbsp;&nbsp;&nbsp;&nbsp;width : '30%',<br />&nbsp;&nbsp;&nbsp;&nbsp;applyStyle : false<br />});</code></p>
</fieldset>

</body>
</html>
