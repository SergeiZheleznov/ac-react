import { IPost, IPostService } from "../interfaces";
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';

const CREATE_POST = gql`
mutation createPost($title: String!, $source: String!) {
  createPost(input: { data: { title: $title, source: $source } }) {
    post {
      title
      source
    }
  }
}`;
export class PostService implements IPostService {

  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {

  }

  public async createPost(post: IPost): Promise<IPost> {
    const { apolloClient } = this;
    const result = await apolloClient.mutate({
      mutation: CREATE_POST,
      variables: {
        title: post.title,
        source: post.source
      }
    });
    console.log('result', result);
    return {} as IPost;
  }

  public async getLastPosts(): Promise<IPost[]> {
    const { apolloClient } = this;
    const result = await apolloClient.query({
      query: gql`
        query posts {
          posts {
            id,
            title,
            source,
            published_at,
            categories {
              name,
              slug
            }
          }
        }
      `
    });
    return result.data['posts'] as IPost[];
  }

}