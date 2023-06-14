import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  _id: string;
  name: string;
  email: string;
  comment: string;
};

type FormProps = {
  postId: string;
  posts?: any;
};

const Form = ({ postId, posts }: FormProps) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [userErr, setUserErr] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/createComments", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => setSubmitted(false));
  };

  const { data: session } = useSession();

  const handleUserErr = () => {
    if (!session) {
      setUserErr("Please sign in to comment");
    } else {
      setUserErr("");
    }
  };

  return (
    <>
      {submitted ? (
        <div className="flex flex-col items-center p-10 my-10 gap-2 text-white mx-auto bg-bgColor">
          <h1 className="text-2xl font-bold">Thanks for the comment!</h1>
          <p>Your comment will appear after approval.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-5">
          <p className="text-xs text-secondaryColor uppercase font-titleFont font-bold">
            Enjoyed this article?
          </p>
          <h3 className="font-titleFont text-3xl font-bold">
            Leave a Comment below!
          </h3>
          <hr className="py-3 mt-2" />
          {/* form */}
          {/* generate id fo form */}
          <input {...register("_id")} type="hidden" name="_id" value={postId} />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-7 flex flex-col gap-6 mb-10"
          >
            {/* name */}
            <label className="flex flex-col">
              <span className="font-titleFont font-semibold text-base">
                Name
              </span>
              <input
                {...register("name", { required: true })}
                className="text-base placeholder:text-sm border-b-[1px]
            border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl
            shadow-secondaryColor
            "
                placeholder="Enter your name"
                type="text"
              />
            </label>
            {errors.name && (
              <p className="text-sm font-titleFont font-semibold text-red-500 my-1 px-4">
                {" "}
                <span className="text-base font-bold italic mr-2">!</span>Name
                is required!
              </p>
            )}
            {/* email */}
            <label className="flex flex-col">
              <span className="font-titleFont font-semibold text-base">
                Email
              </span>
              <input
                {...register("email", { required: true })}
                className="text-base placeholder:text-sm border-b-[1px]
            border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl
            shadow-secondaryColor
            "
                placeholder="Enter your email"
                type="text"
              />
            </label>
            <label className="flex flex-col">
              <span className="font-titleFont font-semibold text-base">
                Comment
              </span>
              <textarea
                {...register("comment", { required: true })}
                className="text-base placeholder:text-sm border-b-[1px]
            border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl
            shadow-secondaryColor
            "
                placeholder="Enter your comments"
                rows={6}
              />
            </label>
            {session && (
              <button
                className="w-full bg-bgColor text-white text-base font-titleFont
           font-semibold tracking-wider uppercase py-2 rounded-sm hover:bg-secondaryColor duration-300
           "
                type="submit"
              >
                Submit
              </button>
            )}
          </form>
          {!session && (
            <button
              onClick={handleUserErr}
              className="w-full bg-secondaryColor text-white text-base font-titleFont
           font-semibold tracking-wider uppercase py-2 rounded-sm hover:bg-secondaryColor duration-300
           "
              type="submit"
            >
              Submit
            </button>
          )}
          {userErr && (
            <p className="text-sm font-titleFont text-center font-semibold text-red-500 underline underline-offset-2 my-1 px-4 animate-bounce">
              <span className="text-base font-bold italic mr-2"> !</span>{" "}
              {userErr}
            </p>
          )}

          {/* comments */}
          <div className="w-full flex flex-col p-10 my-10 mx-auto shadow-bgColor shadow-lg space-y-2">
            <h3 className="text-3xl font-titleFont font-semibold">Comments</h3>
            <hr />
            {posts.map((comments: any) => (
              <div key={comments._id}>
                <p>
                  {" "}
                  <span className="text-secondaryColor">
                    {comments.name}
                  </span>{" "}
                  {comments.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
