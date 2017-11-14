import getEventListener from './EventListener/EventListenerFactory';

class OrbitControl {
    constructor() {
        console.log('Hello, OrbitControl');

        this.eventListener = getEventListener();
    }
}

export default OrbitControl;
