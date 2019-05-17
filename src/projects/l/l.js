class L {
    constructor(name, init1={}, init2) {
        let init = init2 || init1;
        if (typeof init1 === 'string') {
            if (init2 === undefined) {
                init = {
                    props: {
                        innerHTML: init
                    }
                };
            } else {
                init.props = init.props || {};
                init.props.innerHTML = init1;
            }
        } else if (Array.isArray(init1)) {
            if (init2 === undefined) {
                init = {
                    children: init1
                };
            } else {
                init.children = init1;
            }
        }

        this.state = init.state || {};
        this.name = name;
        this.children = init.children || [];
        this.props = init.props || init.properties || {};
        this.attrs = init.attrs || init.attributes || {};
    }

    valOf(val) {
        if (typeof val === 'function') {
            return val.bind(this)();
        }
        return val;
    }

    add(tag) {
        this.children.push(tag);
        return this;
    }

    id(id) {
        this.props.id = id;
        return this;
    }

    class(cls) {
        this.props.class = cls;
        return this;
    }

    addClass(cls) {
        this.class += ' ' + cls;
        return this;
    }

    set(prop, val) {
        this.props[prop] = val;
        return this;
    }

    style(css) {
        this.props.style = css;
        return this;
    }

    render() {
        var tag = document.createElement(this.name);

        for (const name in this.props) {
            const val = this.props[name];

            if (typeof val === 'object') {
                if (typeof tag[name] === 'object') {
                    // need to set each property separately
                    // for something like "style"
                    // settings the whole
                    for (const key in val) {
                        tag[name][key] = val[key];
                    }
                } else {
                    tag[name] = this.props[name];                    
                }
            } else {
                tag[name] = this.props[name];
            }
        }

        for (const name in this.attrs) {
            const val = this.attrs[name];
            
            if (val !== null && val !== '') {
                tag.setAttribute(name, this.valOf(this.attrs[name]));
            }
        }
        
        for (let i=0; i<this.children.length; ++i) {
            tag.appendChild(this.children[i]);
        }
        
        return tag;
    }
}

const l = (function () {
    const lib = { tag: (name, init1, init2) => new L(name, init1, init2).render() },
          tags = [
              'a',
              'abbr',
              'address',
              'area',
              'article',
              'aside',
              'audio',
              'b',
              'base',
              'bdi',
              'bdo',
              'blockquote',
              'body',
              'br',
              'button',
              'canvas',
              'caption',
              'cite',
              'code',
              'col',
              'colgroup',
              'data',
              'datalist',
              'dd',
              'del',
              'details',
              'dfn',
              'dialog',
              'div',
              'dl',
              'dt',
              'em',
              'embed',
              'fieldset',
              'figure',
              'footer',
              'form',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'head',
              'header',
              'hgroup',
              'hr',
              'html',
              'i',
              'iframe',
              'img',
              'input',
              'ins',
              'kbd',
              'keygen',
              'label',
              'legend',
              'li',
              'link',
              'main',
              'map',
              'mark',
              'menu',
              'menuitem',
              'meta',
              'meter',
              'nav',
              'noscript', // :)
              'object',
              'ol',
              'optgroup',
              'option',
              'output',
              'p',
              'param',
              'pre',
              'progress',
              'q',
              'rb',
              'rp',
              'rt',
              'rtc',
              'ruby',
              's',
              'samp',
              'script',
              'section',
              'select',
              'small',
              'source',
              'span',
              'strong',
              'style',
              'sub',
              'summary',
              'sup',
              'table',
              'tbody',
              'td',
              'template',
              'textarea',
              'tfoot',
              'th',
              'thead',
              'time',
              'title',
              'tr',
              'track',
              'u',
              'var',
              'video',
              'wbr',
          ];

    for (const tag of tags) {
        lib[tag] = (init1, init2) => new L(tag, init1, init2).render();
    }

    return lib;
}());
