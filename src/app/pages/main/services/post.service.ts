import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'

import { PostModel } from '../models/post.model'
import { RequestStatus } from '../../../utils/types'

export interface CreatePostOptions {
  title: string
  body: string
}

export interface FindPostsOptions {
  start: number
  limit: number
}

export interface UpdatePostOptions {
  postID: string
  title: string
  body: string
}

export interface DeletePostOptions {
  postID: string
}

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  public readonly apiUrl = 'http://localhost:5000/api/posts'

  public posts: BehaviorSubject<PostModel[]> = new BehaviorSubject<PostModel[]>([])
  public lengthAllPosts: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  public createStatus: BehaviorSubject<RequestStatus> = new BehaviorSubject<RequestStatus>('idle')
  public findStatus: BehaviorSubject<RequestStatus> = new BehaviorSubject<RequestStatus>('idle')
  public updateStatus: BehaviorSubject<RequestStatus> = new BehaviorSubject<RequestStatus>('idle')
  public deleteStatus: BehaviorSubject<RequestStatus> = new BehaviorSubject<RequestStatus>('idle')

  public createPost(options: CreatePostOptions) {
    const { title, body } = options

    this.createStatus.next('loading')

    return this.http
      .post<{ createdPost: PostModel; lengthAllPosts: number }>(this.apiUrl + '/create', { title, body })
      .subscribe(date => {
        const { createdPost, lengthAllPosts } = date

        this.posts.next([createdPost, ...this.posts.getValue().slice(0, -1)])
        this.lengthAllPosts.next(lengthAllPosts)

        this.createStatus.next('idle')
      })
  }

  public findPosts(options: FindPostsOptions) {
    const { start, limit } = options

    this.findStatus.next('loading')

    return this.http
      .post<{ posts: PostModel[]; lengthAllPosts: number }>(this.apiUrl + '/find', { start, limit })
      .subscribe(data => {
        const { posts, lengthAllPosts } = data

        this.posts.next([...this.posts.getValue(), ...posts])
        this.lengthAllPosts.next(lengthAllPosts)

        this.findStatus.next('idle')
      })
  }

  public updatePost(options: UpdatePostOptions) {
    const { postID, title, body } = options

    this.updateStatus.next('loading')

    return this.http
      .post<{ updatedPost: PostModel }>(this.apiUrl + '/update', { postID, title, body })
      .subscribe(data => {
        const { updatedPost } = data

        const posts = this.posts.getValue().map(post => {
          if (post.id === updatedPost.id) {
            post = updatedPost
          }

          return post
        })

        this.posts.next([...posts])

        this.updateStatus.next('idle')
      })
  }

  public deletePost(options: DeletePostOptions) {
    const { postID } = options

    this.deleteStatus.next('loading')

    return this.http
      .post<{ postID: string; lengthAllPosts: number }>(this.apiUrl + '/delete', { postID })
      .subscribe(data => {
        const { postID, lengthAllPosts } = data

        const posts = this.posts.getValue().filter(post => post.id !== postID)

        this.posts.next([...posts])
        this.lengthAllPosts.next(lengthAllPosts)

        this.deleteStatus.next('idle')
      })
  }
}
