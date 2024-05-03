export const $ = {
    MAIN: 'main',
    createElement: function (type) {
        return document.createElement(type);
    },
    getById: function (id) {
        const element = document.getElementById(id);
        if (element == null)
            throw Error('Element not found in DOM');
        return element;
    },
    querySelector: function (target) {
        const element = document.querySelector(target);
        if (element == null)
            throw Error('Element not found in DOM');
        return element;
    },
};
