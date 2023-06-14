import Link from "next/link";
import { urlFor } from "../sanity";
import { Posts } from "../types";
import Image from "next/image";

interface Props {
  posts: [Posts];
}

const Blogs = ({ posts }: Props) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border-[1px] border-secondaryColor border-opacity-40 h-[450px] group">
              <div className="h-3/5 w-full overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  alt="article"
                  src={urlFor(post.mainImage).url()}
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"
                />
              </div>

              <div className="h-2/5 w-full flex flex-col justify-center">
                <div className="flex justify-between items-center px-4 py-1 border-b-[1px] border-b-gray-500">
                  <p className="font-titleFont text-xl uppercase font-bold">
                    {post.title}
                  </p>
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={urlFor(post.author.image).url()}
                    alt="author"
                  />
                </div>
                <p className="py-2 px-4 text-base">
                  {post.description.substring(0, 60)}... by -{" "}
                  <span className="font-semibold"> {post.author.name} </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default Blogs;
