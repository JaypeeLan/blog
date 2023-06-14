import { GetStaticProps } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Posts } from "../../types";
import PortableText from "react-portable-text";
import Form from "../../components/Form";

interface Props {
  post: Posts;
}

const Post = ({ post }: Props) => {
  return (
    <div>
      <Header />
      {/* main image */}
      <img
        className="w-full h-96 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt="coverImage"
      />

      {/* articles */}
      <div className="max-w-6xl mx-auto">
        <article className="w-full mx-auto p-5 bg-secondaryColor/10 mb-10">
          <h1 className="font-titleFont font-medium text-[32px] text-primary border-b-[1px] border-b-cyan-800 mt-10 mb-3">
            {post.title}
          </h1>
          <h2 className="font-bodyFont text-[18px] text-gray-500 mb-2">
            {post.description}
          </h2>
          <div className="flex items-center gap-2">
            <img
              className="rounded-ful w-12 h-12 object-cover bg-red-400"
              src={urlFor(post.author.image).url()}
              alt="author"
            />
            <p className="font-bodyFont text-base">
              Blog post by{" "}
              <span className="font-bold text-secondaryColor">
                {post.author.name}
              </span>
            </p>
          </div>

          <div className="mt-10">
            <PortableText
              content={post.body}
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
              projectId={
                process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s1ihzt76"
              }
              serializers={{
                normal: (props: any) => <p className="my-4" {...props} />,
                h1: (props: any) => (
                  <h1
                    className="text-3xl font-bold my-5 font-titleFont"
                    {...props}
                  />
                ),
                h2: (props: any) => (
                  <h2
                    className="text-2xl font-bold my-5 font-titleFont"
                    {...props}
                  />
                ),
                h3: (props: any) => (
                  <h3
                    className="text-2xl font-bold my-5 font-titleFont"
                    {...props}
                  />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 max-w-fit break-words list-disc">
                    {" "}
                    {children}{" "}
                  </li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className="text-cyan-500 hover:underline">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>
        <hr className="max-w-lg my-5 mx-auto border[1px] border-secondaryColor" />
        {/* ==================================== Comment form ================================ */}

        <Form postId={post._id} posts={post.comments} />

        {/* =================================================================================== */}
      </div>
      <Footer />
    </div>
  );
};

export default Post;

const query = `
*[_type == "post"]{
  _id,
    slug{
    current
    }
}
`;

export const getStaticPaths = async () => {
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Posts) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
      title, 
      author -> {
        name,
        image
      },
      "comments": *[_type == "comment" && post._ref == ^._id && approved == true],
      description,
      publishedAt,
      mainImage,
      slug,
      body
  }
  `;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
