import { Vector2 } from '../../models/vector2';
import { InteractionHost } from '../interactionHost';

export interface InteractionHandler {

  priority: number;

  initialize(host: InteractionHost): void;

  handlePointerDown(host: InteractionHost, pos: Vector2): boolean;

  handlePointerUp(host: InteractionHost, pos: Vector2): boolean;

  handlePointerDrag(host: InteractionHost, pos: Vector2): boolean;

  handlePointerHover(host: InteractionHost, pos: Vector2): boolean;

  handleClick(host: InteractionHost, pos: Vector2): boolean;

  handleDoubleClick(host: InteractionHost, pos: Vector2): boolean;

  handleTick(host: InteractionHost): void;

  handlePinchStart(host: InteractionHost, pos: Vector2): boolean;

  handlePinchMove(host: InteractionHost, scale: number): boolean;

  handlePinchEnd(host: InteractionHost): boolean;

  handleRotationStart(host: InteractionHost, pos: Vector2): boolean;

  handleRotationMove(host: InteractionHost, rotationDegreesDelta: number): boolean;

  handleRotationEnd(host: InteractionHost): boolean;
}
