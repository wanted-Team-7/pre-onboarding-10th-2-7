export interface SearchElement {
  name: string;
  id: number;
}

export interface StorageItem {
  data: SearchElement[];
  expireTime: number;
}
