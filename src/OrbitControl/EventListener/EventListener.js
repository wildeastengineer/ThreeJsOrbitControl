import Observer from './Observer';

class EventListener extends Observer {
    constructor(params) {
        super(params);

        this.domElement = params.domElement;
    }
}

export default EventListener;
