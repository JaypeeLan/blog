import Head from "next/head";
import "slick-carousel/slick/slick.css";
import Banner from "../components/Banner";
import BannerBottom from "../components/BannerBottom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Blogs from "../components/Posts";

// ========================//
import { sanityClient, urlFor } from "../sanity";
import { Posts } from "../types";

interface Props {
  posts: [Posts];
}

export default function Home({ posts }: Props) {
  return (
    <div>
      <Head>
        <title>My Blog </title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont">
        {/* ============ Header Start here ============ */}
        <Header />
        {/* ============ Header End here ============== */}
        {/* ============ Banner Start here ============ */}
        <Banner />
        {/* ============ Banner End here ============== */}
        <div className="max-w-7xl mx-auto h-60 relative">
          <BannerBottom />
        </div>
        {/* ============ Banner-Bottom End here ======= */}
        {/* ============ Post Part Start here ========= */}

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 px-4 py-6">
          <Blogs posts={posts} />
        </div>
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </div>
  );
}

const queryURL = `*[_type == "post"]{
  _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug,
}
`;
export const getServerSideProps = async () => {
  const query = queryURL;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
