import { IPost, IPostService } from "../interfaces";
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';

export class PostService implements IPostService {

  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {

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