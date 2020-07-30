import { useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export function useResize(mountRef) {

    const [size, setSize] = useState([0,0]);

    useEffect(() => {
        const mount = mountRef.current;
        setSize([mount.offsetWidth || 0, mount.offsetHeight || 0]);

        const resizeObserver = new ResizeObserver((entries) => {
            if(!entries || !entries.length) {
                return;
            }

            const { width, height } = entries[0].contentRect;
            setSize([width, height]);
        });

        resizeObserver.observe(mount);
    }, [mountRef]);

    return size;
}