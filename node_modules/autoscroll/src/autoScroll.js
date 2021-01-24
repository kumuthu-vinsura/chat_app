import _throttle from 'lodash.throttle';

const setup = () => {
    const autoScrollCtrl = {};

    const stopAutoScrolling = () => {
        const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
        cancelAnimationFrame(autoScrollCtrl.pid);
    };

    const _autoScroll = (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) => {
        let scrollParentEl;
        let scrollEl;

        // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
        if (rootEl && options.scroll) {
            let el;
            let rect;
            const sens = options.scrollSensitivity;
            const speed = options.scrollSpeed;
            const x = evt.clientX;
            const y = evt.clientY;
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;
            let vx,
                vy,
                scrollOffsetX,
                scrollOffsetY;

            // Delect scrollEl
            if (scrollParentEl !== rootEl) {
                scrollEl = options.scroll;
                scrollParentEl = rootEl;

                if (scrollEl === true) {
                    scrollEl = rootEl;

                    do {
                        if (scrollEl.offsetWidth < scrollEl.scrollWidth) {
                            break;
                        }

                        if (scrollEl.offsetHeight < scrollEl.scrollHeight) {
                            break;
                        }

                        if (!scrollEl.parentNode) {
                            break;
                        }

                        scrollEl = scrollEl.parentNode;
                    } while (true);
                }
            }

            if (scrollEl) {
                el = scrollEl;
                rect = scrollEl.getBoundingClientRect();
                vx = (Math.abs(rect.right - x) <= sens) - (Math.abs(rect.left - x) <= sens);
                vy = (Math.abs(rect.bottom - y) <= sens) - (Math.abs(rect.top - y) <= sens);
            }

            if (!(vx || vy)) {
                vx = (winWidth - x <= sens) - (x <= sens);
                vy = (winHeight - y <= sens) - (y <= sens);

                if (vx || vy) {
                    el = window;
                }
            }

            if (autoScrollCtrl.vx !== vx || autoScrollCtrl.vy !== vy || autoScrollCtrl.el !== el) {
                autoScrollCtrl.el = el;
                autoScrollCtrl.vx = vx;
                autoScrollCtrl.vy = vy;

                stopAutoScrolling(); // Stop any exist autoScrolling
                if (el) {
                    const requestAnimationFrame =
                        window.requestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.msRequestAnimationFrame;
                    const scrolling = () => {
                        scrollOffsetY = vy ? vy * speed : 0;
                        scrollOffsetX = vx ? vx * speed : 0;

                        if (el === window) {
                            window.scrollTo(
                                window.pageXOffset + scrollOffsetX,
                                window.pageYOffset + scrollOffsetY
                            );
                        } else {
                            el.scrollTop += scrollOffsetY;
                            el.scrollLeft += scrollOffsetX;
                        }

                        autoScrollCtrl.pid = requestAnimationFrame(scrolling);
                    };
                    autoScrollCtrl.pid = requestAnimationFrame(scrolling);
                }
            }
        }
    };

    const throttleAutoScroll = _throttle(_autoScroll, 30);
    const run = (/**Event*/ evt, /**HTMLElement*/ rootEl, /**Object*/ options = {}) => {
        const {
            scroll = true,
            scrollSensitivity = 30,
            scrollSpeed = 10
        } = options;
        const newOptions = {
            scroll,
            scrollSensitivity,
            scrollSpeed
        };

        throttleAutoScroll(evt, newOptions, rootEl);
    };

    return {
        run,
        end: stopAutoScrolling
    };
};

export default setup();
