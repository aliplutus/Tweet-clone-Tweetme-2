export type Item = {
  content: string | null;
  like: number[];
  is_retweet?: boolean;
  parent: any;
  user: number;
};
export type Props = {
  setstate: Function;
  item: Item;
};
