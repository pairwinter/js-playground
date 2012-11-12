(function(){
    if(window._!=undefined && window._.templateSettings){
        _.templateSettings = {
            interpolate: /\<\@\=(.+?)\@\>/g,
            evaluate: /\<\@(.+?)\@\>/g
        };
    }
})();

$(function(){
	dp.SyntaxHighlighter.ClipboardSwf = '../../resources/javascripts/plugin/syntax-highlighter/Scripts/clipboard.swf';
	dp.SyntaxHighlighter.HighlightAll('code');
    $("h4.section_sub_title").click(function(){
        $(this).parent().toggleClass("open");
        $(this).next().toggle();
    })
});
