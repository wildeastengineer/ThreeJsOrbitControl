class Observer {
    constructor() {
        this.observers = {};
    }

    on(event, handler) {
        this.observers[event] = this.observers[event] || [];
        this.observers[event].push(handler);
    }

    off(event, handler) {
        this.observers[event] = this.observers[event] || [];

        const handlerIndex = this.observers.indexOf(handler);

        if (handlerIndex > -1) {
            this.observers[event] = [
                ...this.observers[event].slice(0, handlerIndex),
                ...this.observers[event].slice(handlerIndex + 1)
            ];
        }
    }

    fire(event, ...params) {
        this.observers[event] = this.observers[event] || [];

        for (let handler of this.observers[event]) {
            handler.apply(null, params);
        }
    }
}

export default Observer;
