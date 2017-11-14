import DesktopEventListener from './DesktopEventListener';

const getEventListener = (params) => {
    return new DesktopEventListener(params);
};

export default getEventListener;
