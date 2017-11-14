import Observer from './Observer';

class EventListener extends Observer {
    constructor() {
        console.log('EventListener constructor');
        super();
    }
}

export default EventListener;
