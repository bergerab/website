class Objin {
    constructor(parent, init={}) {
        this.parent = parent;
        this.onChange = init.onchange || init.onChange || (() => {});
        this.showAdd = init.showAdd === undefined ? true : init.showAdd;
        this.realtime = init.realtime === undefined ? true : init.realtime;
        this.allowEmpty = init.allowEmpty == false;
        
        this.addLabel = init.addLabel || 'Add';
        this.refreshLabel = init.refreshLabel || 'Refresh';
        this.removeLabel = init.removeLabel || 'Remove';
        
        this.count = init.count || 1;
        
        this.objects = [];

        this.initial = init.initial || [];
        
        this.object = init.object || {};
        this.fields = this.object.fields || [];

        this.inputContainer = null;
        this.render();
    }

    getObject() {
        return this.objects[0];
    }

    getObjects() {
        return this.objects;
    }

    update(input, val) {
        this.onChange(this.values);
    }

    renderField(input, container, object={}) {
        const editor = input.editor,
              type = input.type,
              step = input.step,
              label = input.label || input.key,
              key = input.key || input.label;
        let value = input.value == undefined ? input.val : input.value;

        const makeUpdate = key => value => object[key] = value;

        let control = null;

        if (editor === 'textbox') {
            value = object.key !== undefined ? object.key : value;
            control = new Textbox(makeUpdate(key), this, label, value, type, step);
        } else if (editor === 'select') {
            const options = input.options === undefined ? input.opts : input.options;            
            value = object.key !== undefined ? object[key] : value;
            value = options[value] !== undefined ? options[value] : value;
            control = new Select(makeUpdate(key), this, label, value, options, type);
        } else {
            console.error('Invalid field description has invalid "editor" specifer: ', input, '\n', 'Valid choices are "textbox" and "select".');
            return;
        }

        control.render(container);
    }

    render() {
        const div = this.inputContainer = document.createElement('div'),
              objin = this.objinContainer = document.createElement('div');
        objin.className = 'objin';
        div.className = 'objin-objects';
        objin.appendChild(div);
        
        const add = this.createAddButton(),
              refresh = this.createRefreshButton();

        const buttons = document.createElement('div');
        buttons.className = 'objin-buttons';
        buttons.appendChild(add);
        buttons.appendChild(refresh);
        objin.appendChild(buttons);

        let i = 0,
            object = null;
        
        while (object = this.initial.pop()) {
            this.renderFields(object);
            ++i;
        }
        
        for (; i<this.count; ++i) {
            this.renderFields();
        }
        this.parent.appendChild(objin);
    }

    renderFields(object={}) {
        this.objects.push(object);        
        
        const container = document.createElement('div');
        container.className = 'objin-object-container';
        
        const objectNode = document.createElement('div');
        objectNode.className = 'objin-object';

        for (const input of this.fields) {
            this.renderField(input, objectNode, object);
        }

        const objectSettings = document.createElement('div');
        objectSettings.className = 'objin-object-settings';

        const remove = document.createElement('button');
        remove.className = 'objin-remove objin-setting-button';
        remove.innerHTML =  this.removeLabel;
        remove.onclick = () => {
            container.remove();
        };
        
        objectSettings.appendChild(remove);        

        container.appendChild(objectNode);
        container.appendChild(objectSettings);        
        
        this.inputContainer.appendChild(container);
        
    }

    createRefreshButton() {
        const refresh = document.createElement('button');
        refresh.className = 'objin-refresh objin-setting-button';
        refresh.innerHTML = this.refreshLabel;
        refresh.onclick = () => {
            this.renderFields();
        };
        return refresh;
    }

    createAddButton() {
        const add = document.createElement('button');
        add.className = 'objin-add objin-setting-button';
        add.innerHTML = this.addLabel;
        add.onclick = () => {
            this.renderFields();
        };
        return add;
    }
}

class Textbox {
    constructor(update, master, label, val=null, type=null, step=1) {
        this.update = update;
        this.master = master;
        this.label = label;
        this.type = type;
        this.val = val;
        this.step = step;
    }

    render(container) {
        const input = document.createElement('input'),
              label = document.createElement('label'),
              div = document.createElement('div');

        input.className = 'objin-textbox';
        label.className = 'objin-label';
        div.className = 'objin-input';

        if (this.label) {
            label.innerHTML = this.label;
        }

        if (this.type) {
            input.type = this.type;
            input.step = this.step;
        }
        
        input.onchange = e => {
            let value = this.val;
            if (e !== undefined) {
                value = e.target.value;
            }
            if (typeof this.val === 'number') {
                value = +value;
            }
            
            this.update(value);
        };
        input.onchange();

        input.value = this.val;
        div.appendChild(label);
        div.appendChild(input);

        container.appendChild(div);
    }
}

class Select {
    constructor(update, master, label, val=null, opts={}) {
        this.update = update;
        this.master = master;
        this.label = label;
        this.val = val;
        this.opts = opts;
    }

    render(container) {
        const select = document.createElement('select'),
              label = document.createElement('label'),
              div = document.createElement('div');

        select.className = 'objin-select';
        label.className = 'objin-label';
        div.className = 'objin-input';

        if (this.label) {
            label.innerHTML = this.label;
        }
        
        select.onchange = e => {
            let value = this.val;
            if (e !== undefined) {
                value = e.target.value;
            }
            
            this.update(value);
        };
        select.onchange();


        for (const [key, val] of Object.entries(this.opts)) {
            const option = document.createElement('option');
            option.className = 'objin-option';
            option.value = val;
            option.innerHTML = key;

            if (this.val === key) {
                option.selected = 'selected';
            }
            
            select.appendChild(option);
        }

        div.appendChild(label);
        div.appendChild(select);

        container.appendChild(div);
    }
}

