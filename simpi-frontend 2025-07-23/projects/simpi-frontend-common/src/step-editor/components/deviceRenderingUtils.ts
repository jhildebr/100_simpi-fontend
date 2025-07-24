export function adjustRenderingToDevicePixelRatio(canvas: HTMLCanvasElement, width: number, height: number): void {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const context = <any>canvas.getContext('2d');

    const backingStoreRatio = (
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1
    );

    const ratio = devicePixelRatio / backingStoreRatio;

    if (devicePixelRatio !== backingStoreRatio) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;

        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
    }
    else {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = '';
        canvas.style.height = '';
    }

    context.scale(ratio, ratio);
}