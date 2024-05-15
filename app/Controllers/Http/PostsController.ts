import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({}: HttpContextContract) {
    const posts = await Post.all()
    return posts
  } // get

  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'description'])
    const post = await Post.create(data)
    return post
  } // post

  public async show({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    return post
  } //get com parametro id

  public async update({ request, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    const data = request.only(['title', 'description'])

    post.merge(data)

    await post.save()

    return post
  } //edit

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
  } //delete
}
