const l = (function () {
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
            } else if (init1 instanceof Element || init1 instanceof HTMLDocument) {
                if (init2 === undefined) {
                    init = {
                        children: [init1]
                    };
                } else {
                    init.children = [init1];
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

        render() {
            var tag = document.createElement(this.name);

            for (const name in this.props) {
                const val = this.props[name];

                if (typeof val === 'object') {
                    if (typeof tag[name] === 'object') {
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
    
    const lib = (name, init1, init2) => new L(name, init1, init2).render(),
          tags = [ 
              'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 
              'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist',
              'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figure', 'footer',
              'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img',
              'input', 'label', 'legend', 'li', 'ul', 'link', 'main', 'map', 'mark', 'menu', 'menuitem',
              'meta', 'meter', 'nav', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress',
              'q',  's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span',
              'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th',
              'thead', 'time', 'title', 'tr', 'track', 'u', 'var', 'video', 'wbr',
          ];
    for (const tag of tags) {
        lib[tag] = (init1, init2) => new L(tag, init1, init2).render();
    }

    lib.append = (parent, child) => parent.appendChild(child);
    lib.appendBody = child => lib.append(document.body, child);
    lib.prepend = (parent, child) => parent.insertAdjacentElement('afterBegin', child);
    lib.prependBody = child => lib.prepend(document.body, child);
    lib.after = (n1, n2) => n1.insertAdjacentElement('afterEnd', n2);
    lib.before = (n1, n2) => n1.insertAdjacentElement('beforeBegin', n2);

    return lib;
}());
