import EventListener from './EventListener';
import dictionary from '../dictionary';

const {
    CONTROL_ACTION,
    MOUSE_BUTTON
} = dictionary;

const getCoordinatesDelta = (coordinates1, coordinates2) => {
    return {
        x: coordinates1.x - coordinates2.x,
        y: coordinates1.y - coordinates2.y
    };
};

const getCursorCoordinates = (event) => {
    return {
        x: event.clientX,
        y: event.clientY
    };
};

const getActionByMouseButtonName = (buttonName) => {
    switch (buttonName) {
        case MOUSE_BUTTON.LEFT: return CONTROL_ACTION.ROTATE;
        case MOUSE_BUTTON.RIGHT: return CONTROL_ACTION.DRAG;
        default: return CONTROL_ACTION.NONE;
    }
};

const getMouseButtonName = (event) => {
    switch (event.which) {
        case 1: return MOUSE_BUTTON.LEFT;
        case 2: return MOUSE_BUTTON.MIDDLE;
        case 3: return MOUSE_BUTTON.RIGHT;
        default: return null;
    }
};

class DesktopEventListener extends EventListener {
    constructor(params) {
        super(params);

        this.state = CONTROL_ACTION.NONE;
        this.useEventCapture = false;

        this.registerEventHandlers(this.domElement, document);
    }

    registerEventHandlers(domElement, document) {
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);

        domElement.addEventListener('mousedown', this.mouseDownHandler, this.useEventCapture);
        domElement.addEventListener('contextmenu', this.contextMenuHandler, this.useEventCapture);
        document.addEventListener('mousemove', this.mouseMoveHandler, this.useEventCapture);
        document.addEventListener('mouseup', this.mouseUpHandler, this.useEventCapture);
    }

    removeEventHandlers(domElement, document) {
        domElement.removeEventListener('mousedown', this.mouseDownHandler, this.useEventCapture);
        domElement.removeEventListener('contextmenu', this.contextMenuHandler, this.useEventCapture);
        document.removeEventListener('mousemove', this.mouseMoveHandler, this.useEventCapture);
        document.removeEventListener('mouseup', this.mouseUpHandler, this.useEventCapture);
    }

    mouseDownHandler(event) {
        event.preventDefault();
        event.stopPropagation();

        const coordinates = getCursorCoordinates(event);
        const mouseButtonName = getMouseButtonName(event);

        this.startCoordinates = coordinates;
        this.state = getActionByMouseButtonName(mouseButtonName);
    }

    contextMenuHandler(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    mouseMoveHandler(event) {
        if (this.state === CONTROL_ACTION.NONE) {
            return;
        }

        const currentCoordinates = getCursorCoordinates(event);
        const delta = getCoordinatesDelta(currentCoordinates, this.startCoordinates);

        this.triggerEvent(this.state, delta);

        this.startCoordinates = currentCoordinates;
    }

    mouseUpHandler() {
        this.state = CONTROL_ACTION.NONE;
    }

    triggerEvent(state, delta) {
        switch (state) {
            case CONTROL_ACTION.DRAG:
                this.fireDrag({
                    x: delta.x,
                    y: delta.y
                });
                break;
            case CONTROL_ACTION.ROTATE:
                this.fireRotate({
                    x: delta.x,
                    y: delta.y
                });
                break;
            case CONTROL_ACTION.ZOOM:
                this.fireZoom({
                    x: delta.x,
                    y: delta.y
                });
                break;
        }
    }
}

export default DesktopEventListener;
