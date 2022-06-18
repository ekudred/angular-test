export class PostModel {
  public id: string
  public title: string
  public body: string
  public createdAt: string

  constructor(id: string, title: string, body: string, createdAt: string) {
    this.id = id
    this.title = title
    this.body = body
    this.createdAt = createdAt
  }
}
