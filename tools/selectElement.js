function configureElement(element, attributes, children) {
    if (attributes) {
        for (const [name, value] of Object.entries(attributes)) {
            if (name === 'style') {
                Object.assign(element[name], value);
            } else {
                element.setAttribute(name, value);
            }
        }
    }
    if (children) {
        for (const child of children) {
            element.appendChild(child);
        }
    }
}

function createElementNs(name, attributes, children) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', name);
    configureElement(element, attributes, children);
    return element;
}

function createElement(name, attributes, children) {
    const element = document.createElement(name);
    configureElement(element, attributes, children);
    return element;
}

async function withMask(callback) {
    const maskId = '__select-element-mask'
    const maskElement = createElementNs('rect', {x: '0', y: '0', width: '0', height: '0', fill: '#000'});
    const rootStyle = {
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        pointerEvents: 'none'
    };
    const div = createElement('div', {style: rootStyle}, [
        createElementNs('svg', {width: '100%', height: '100%'}, [
            createElementNs('mask', {id: maskId}, [
                createElementNs('rect', {width: '100%', height: '100%', fill: '#FFF'}),
                maskElement
            ]),
            createElementNs('rect', {width: '100%', height: '100%', fill: '#014B', mask: `url(#${maskId})`})
        ])
    ]);
    document.body.appendChild(div);
    const result = await new Promise(resolve => callback(resolve, maskElement))
    div.remove();
    return result;
}

async function selectElement() {
    return await withMask((resolve, mask) => {
        let target;
        const onMousemove = (event) => {
            if (target !== event.target) {
                const rect = event.target.getBoundingClientRect();
                mask.setAttribute('x', rect.left);
                mask.setAttribute('y', rect.top);
                mask.setAttribute('width', rect.width);
                mask.setAttribute('height', rect.height);
                target = event.target;
            }
        }
        const onClick = (event) => {
            event.stopPropagation();
            document.body.removeEventListener('click', onClick, true);
            document.body.removeEventListener('mousemove', onMousemove, true);
            document.body.removeEventListener('keydown', onKeydown, true);
            resolve(event.target);
        }
        const onKeydown = (event) => {
            event.stopPropagation();
            if (event.keyCode = 27 /* Escape */) {
                resolve(null);
                document.body.removeEventListener('click', onClick, true);
                document.body.removeEventListener('mousemove', onMousemove, true);
                document.body.removeEventListener('keydown', onKeydown, true);
            }

        }
        document.body.addEventListener('click', onClick, true);
        document.body.addEventListener('mousemove', onMousemove, true);
        document.body.addEventListener('keydown', onKeydown, true);
    });
}
