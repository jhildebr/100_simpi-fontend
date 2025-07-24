import { InteractionHandler } from './interactionHandler';
import { Vector2 } from '../../models/vector2';
import { InteractionHost } from '../interactionHost';
import { MEDIATYPE_VIDEO } from '../editorConstants';

export const MEDIA_TYPE = 'media-type';
export const HAS_AUDIO = 'has-audio';

export class MediaInteractionHandler implements InteractionHandler {

  private isMediaTypeVideo = false;
  private hasAudio = false;

  constructor(host: InteractionHost) {
  }

  public get priority(): number {
    return 7;
  }

  public initialize(host: InteractionHost): void {
    this.isMediaTypeVideo = host.getProperty(MEDIA_TYPE) === MEDIATYPE_VIDEO;
    this.hasAudio = host.getProperty(HAS_AUDIO);
  }

  public handlePointerDown(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handlePointerUp(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handlePointerHover(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handlePointerDrag(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handleClick(host: InteractionHost, pos: Vector2): boolean {
    if (this.isMediaTypeVideo || this.hasAudio) {
      host.getSimpiContext().play();
      return true;
    } else {
      return false;
    }
  }

  public handleDoubleClick(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handleTick(host: InteractionHost): void {
  }

  public handlePinchStart(host:InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handlePinchMove(host: InteractionHost, scale: number): boolean {
    return false;
  }

  public handlePinchEnd(host: InteractionHost): boolean {
    return false;
  }

  public handleRotationStart(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handleRotationMove(host: InteractionHost, rotationDegreesDelta: number): boolean {
    return false;
  }

  public handleRotationEnd(host: InteractionHost): boolean {
    return false;
  }

}
