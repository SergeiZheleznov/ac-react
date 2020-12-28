import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { IAuthService } from "../interfaces";
import { IUser } from "../interfaces/IUser";

// const AUTHENTICATE_USER = gql`
//   mutation {
//     login(input: { identifier: "email", password: "password" }) {
//       jwt
//     }
//   }
// `;

export class AuthService implements IAuthService {

  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {
    
  }

  public async authenticate(email: string, password: string): Promise<IUser> {

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
      console.log(result);
    } catch (error) {
      
    }


    return {
      id: 1,
      login: 'test',
      email: 'test@test.ts'
    }
  }
}