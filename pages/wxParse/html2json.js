  var __wxImageArray=[];
  var __placeImgeUrlHttps  = "https";
  var wxDiscode = require('wxDiscode.js');
  var HTMLParser = require('htmlparser.js');
	var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
	var block = makeMap("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
	var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
	var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
	var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
	var special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");
  function makeMap(str) {
		var obj = {}, items = str.split(",");
		for (var i = 0; i < items.length; i++)
			obj[items[i]] = true;
		return obj;
	}
  
  function q(v) {
    return '"' + v + '"';
  }

  function removeDOCTYPE(html) {
    return html
      .replace(/<\?xml.*\?>\n/, '')
      .replace(/<!doctype.*\>\n/, '')
      .replace(/<!DOCTYPE.*\>\n/, '');
  }
  function html2json(html,bindData) {
    __wxImageArray = [];
    html = removeDOCTYPE(html);
    var bufArray = [];
    var results = {
      node: 'root',
      child: [],
    };
    HTMLParser(html, {
      start: function(tag, attrs, unary) {
        var node = {
          node: 'element',
          tag: tag,
        };
        
        if(block[tag]){
          node.tagType = "block";
        }else if(inline[tag]){
          node.tagType = "inline";
        }else if(closeSelf[tag]){
          node.tagType = "closeSelf";
        }
        
        if (attrs.length !== 0) {
          node.attr = attrs.reduce(function(pre, attr) {
            var name = attr.name;
            var value = attr.value;
            if(name == 'class'){
              console.dir(value);
              node.classStr = value;
            }
            if (value.match(/ /)) {
              value = value.split(' ');
            }
            if (pre[name]) {
              if (Array.isArray(pre[name])) {
                pre[name].push(value);
              } else {
                pre[name] = [pre[name], value];
              }
            } else {
              pre[name] = value;
            }

            return pre;
          }, {});
        }


        if(node.tag == 'img'){
          node.imgIndex = __wxImageArray.length;
          __wxImageArray.push(node);
          var imgUrl = node.attr.src;
          imgUrl = wxDiscode.urlToHttpUrl(imgUrl,__placeImgeUrlHttps);
          node.attr.src = imgUrl;
          node.from = bindData;
          if (unary) {
                var parent = bufArray[0] || results;
                if (parent.child === undefined) {
                  parent.child = [];
                }
                parent.child.push(node);
              } else {
                bufArray.unshift(node);
              }
          
        }else{
          if (unary) {
            var parent = bufArray[0] || results;
            if (parent.child === undefined) {
              parent.child = [];
            }
            parent.child.push(node);
          } else {
            bufArray.unshift(node);
          }

        }

        

        
      },
      end: function(tag) {
        var node = bufArray.shift();
        if (node.tag !== tag) console.error('invalid state: mismatch end tag');

        if (bufArray.length === 0) {
          results.child.push(node);
        } else {
          var parent = bufArray[0];
          if (parent.child === undefined) {
            parent.child = [];
          }
          parent.child.push(node);
        }
      },
      chars: function(text) {
        var node = {
          node: 'text',
          text: text,
        };
        if (bufArray.length === 0) {
          results.child.push(node);
        } else {
          var parent = bufArray[0];
          if (parent.child === undefined) {
            parent.child = [];
          }
          parent.child.push(node);
        }
      },
      comment: function(text) {
        var node = {
          node: 'comment',
          text: text,
        };
        var parent = bufArray[0];
        if (parent.child === undefined) {
          parent.child = [];
        }
        parent.child.push(node);
      },
    });
    return results;
  };

  function json2html(json) {
    var empty = ['area', 'base', 'basefont', 'br', 'col', 'frame', 'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param', 'embed'];

    var child = '';
    if (json.child) {
      child = json.child.map(function(c) {
        return json2html(c);
      }).join('');
    }

    var attr = '';
    if (json.attr) {
      attr = Object.keys(json.attr).map(function(key) {
        var value = json.attr[key];
        if (Array.isArray(value)) value = value.join(' ');
        return key + '=' + q(value);
      }).join(' ');
      if (attr !== '') attr = ' ' + attr;
    }

    if (json.node === 'element') {
      var tag = json.tag;
      if (empty.indexOf(tag) > -1) {
        return '<' + json.tag + attr + '/>';
      }
      var open = '<' + json.tag + attr + '>';
      var close = '</' + json.tag + '>';
      return open + child + close;
    }

    if (json.node === 'text') {
      return json.text;
    }

    if (json.node === 'comment') {
      return '<!--' + json.text + '-->';
    }

    if (json.node === 'root') {
      return child;
    }
  };

  function returnWxImageArray(){
    return __wxImageArray;
  }

  module.exports = {
    html2json:html2json,
    wxImageArray: returnWxImageArray
  };
  
