const MASTAR_URL ="https://us-west-2.cdn.hygraph.com/content/cm3y4vh9e034307w74jgrkvwt/master"


import { gql, request } from 'graphql-request'

export const getcourselist  = async()=>{
    const query = gql`
 query CourseQuery {
    courses {
    id
    name
    price
    time
    tags
    author
    level
    banner {
      url
    }
    description {
      markdown
    }
    chapters {
      title
      id
      content {
        heading
        description {
          markdown
        }
        output {
          markdown
        }
      }
    }
  }
}
    
    `

const result = await request( MASTAR_URL,query)
return result

}


