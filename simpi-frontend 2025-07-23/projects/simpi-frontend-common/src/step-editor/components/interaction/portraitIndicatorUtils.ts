import { Vector2 } from '../../models/vector2';
import { Rect } from '../../models/rect';
import { InteractionHost } from '../interactionHost';

export function spanOuter(host: InteractionHost, center: Vector2): Rect {
    return span(host, center, 0.56);
}

export function spanInner(host: InteractionHost, center: Vector2): Rect {
    return span(host, center, 0.46);
}

function span(host: InteractionHost, center: Vector2, xRatio: number): Rect {
    const imageDimensions = host.getImageDimensions();
    const rect = new Rect(Vector2.zero(), new Vector2(imageDimensions.y * xRatio, imageDimensions.y));
    return rect.setPosition(center.x - rect.width / 2, center.y - rect.height / 2);
}
