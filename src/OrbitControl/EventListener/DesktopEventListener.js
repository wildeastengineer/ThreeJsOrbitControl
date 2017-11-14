import EventListener from './EventListener';

class DesktopEventListener extends EventListener {
    constructor() {
        console.log('DesktopEventListener constructor');
        super();
    }
}

export default DesktopEventListener;
