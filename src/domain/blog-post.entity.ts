// export class BlogPost {
//   constructor(
//     public readonly id: string,
//     public title: string,
//     public content: string,
//     public authorId: string,
//     public createdAt: Date,
//     public updatedAt: Date,
//   ) {}

//   updateContent(newContent: string) {
//     this.content = newContent;
//     this.updatedAt = new Date();
//   }
// }

export class BlogPost {
  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
    public authorId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  updateContent(newContent: string) {
    this.content = newContent;
    this.updatedAt = new Date();
  }
}
