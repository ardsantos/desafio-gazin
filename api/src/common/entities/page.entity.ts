export class Page<T> {
  totalCount: number;
  nodes: T[];

  constructor(totalCount: number, data: T[]) {
    this.totalCount = totalCount;
    this.nodes = data;
  }
}
