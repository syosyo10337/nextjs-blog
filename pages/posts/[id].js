import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilsStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const postData =  await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilsStyles.headingXl}>{postData.title}</h1>
        <div className={utilsStyles.lightText}> 
          <Date dateString={postData.date} />
        </div>
      </article>
      {postData.title}
      <br />
      {postData.id}
      <br />
      <br />
      <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
    </Layout>
  );
}