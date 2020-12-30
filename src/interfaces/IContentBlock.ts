export type ContentBlockType = 'text' | 'image';
export interface IContentBlock {
  type: ContentBlockType;
  source: string;
}
export interface IContentBlockText extends IContentBlock {
  type: 'text';
  align: 'left' | 'right' | 'center';
}