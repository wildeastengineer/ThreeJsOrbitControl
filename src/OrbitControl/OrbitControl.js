import getEventListener from './EventListener/EventListenerFactory';

class OrbitControl {
    constructor(params) {
        this.eventListener = getEventListener({
            domElement: params.domElement
        });
    }
}

export default OrbitControl;
