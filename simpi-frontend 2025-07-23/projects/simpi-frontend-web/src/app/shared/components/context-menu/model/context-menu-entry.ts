export interface ContextMenuEntry<T> {
  text: string;
  iconUrl?: string;
  clickHandler: (param: T) => void;
}
