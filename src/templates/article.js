import React from 'react';
import { graphql } from 'gatsby';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Layout from './layout';
import Sidebar from '../components/sidebar';

export default function Article(props) {
  return (
    <Layout>
      <div className="content">
        <Sidebar data={props.data?.categories?.edges} />

        <article>
          <h1>{props.data?.article?.title}</h1>

          <section
            className="article-content"
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(props.data?.article?.content?.json),
            }}
          />
        </article>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query Article($slug: String) {
    categories: allContentfulHelpCenterCategory {
      edges {
        node {
          name
          slug
        }
      }
    }

    article: contentfulHelpCenterArticle(slug: { eq: $slug }) {
      title
      slug
      content {
        json
      }
    }
  }
`;
