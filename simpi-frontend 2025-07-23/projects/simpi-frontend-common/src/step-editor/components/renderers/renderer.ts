import { InteractionHost } from '../interactionHost';

export interface Renderer {

    /**
     * Renders objects on the canvas relative to the image or video (after translating and scaling the space)
     */
    renderInImageSpace(host: InteractionHost, context: CanvasRenderingContext2D, ...args: any[]): void;

    /**
     * Renders objects on the canvas relative to the screen (without translating or scaling the space)
     */
    renderInScreenSpace(host: InteractionHost, context: CanvasRenderingContext2D, ...args: any[]): void;

    initializeBeforePlaying?(host: InteractionHost): void;
}
