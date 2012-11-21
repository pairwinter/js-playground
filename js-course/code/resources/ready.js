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
    });
    $("span.control>a").click(function(){
        var isOpen = $(this).hasClass("openControl")
        $("h4.section_sub_title").each(function(){
            var jThis = $(this);
            if(isOpen){
                jThis.parent().addClass("open");
                jThis.next().show();
            }else{
                jThis.parent().removeClass("open");
                jThis.next().hide();
            }
        });
    });
});
