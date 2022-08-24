import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;




export default async function comments(req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: unknown): any; new(): any; }; }; }) { 
  console.log(graphcmsToken);

const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  })

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) { id }
    }
  `
  try {
    const result = await graphQLClient.request(query, req.body)

  return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error)
  }
  
}