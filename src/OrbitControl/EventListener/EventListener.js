import Observer from './Observer';
import dictionary from '../dictionary';

const {
    EVENT_NAMES
} = dictionary;

class EventListener extends Observer {
    constructor(params) {
        super(params);

        this.domElement = params.domElement;

        this.registerEventHandlers(this.domElement, document);
    }

    fireDrag(value) {
        console.log('fireDrag', value);

        this.fire(EVENT_NAMES.DRAG, value);
    }

    fireZoom(value) {
        console.log('fireZoom', value);

        this.fire(EVENT_NAMES.ZOOM, value);
    }

    fireRotate(value) {
        console.log('fireRotate', value);

        this.fire(EVENT_NAMES.ROTATE, value);
    }

    destructor() {
        this.removeEventHandlers(this.domElement, document);
    }
}

export default EventListener;
