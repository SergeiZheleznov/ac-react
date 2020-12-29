import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { AuthHelper } from "../helpers/AuthHelper";
import { IAuthService } from "../interfaces";
import { IUser } from "../interfaces/IUser";
export class AuthService implements IAuthService {

  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {
    
  }

  public async authenticate() {
    
    try {
      const { apolloClient } = this;
      const result = await apolloClient.query({
        query: gql`
          query {
            me {
              id,
              email,
              username
            }
          }
        `
      });

      const user = result?.data?.me as IUser;
      if (user) {
        return user;
      }
    } catch (error) {
      
    }
    return undefined;
  }

  public async login(email: string, password: string): Promise<void> {

    try {
      const { apolloClient } = this;
      const result = await apolloClient.mutate({
        mutation: gql`
          mutation {
            login(input: { identifier: "${email}", password: "${password}" }) {
              jwt
            }
          }
        `
      });

      const jwt = result?.data?.login?.jwt;
      
      if (jwt) {
        AuthHelper.setToken(jwt);
      }
    } catch (error) {
      
    }
  }

  public logout() {
    AuthHelper.clearToken();
  }
}