import { IPost, IPostService } from "../interfaces";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export class PostService implements IPostService {
  public async getLastPosts(): Promise<IPost[]> {

    const client = new ApolloClient({
      uri: 'http://localhost:1337/graphql',
      cache: new InMemoryCache()
    });

    const result = await client.query({
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