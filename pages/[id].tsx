import { supabase } from "#/utils/supabase";
import { Database } from "#/types/supabase";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

type Lesson = Database["public"]["Tables"]["lessons"]["Row"];
const LessonDetails = ({ lesson }: { lesson: Lesson }) => {
  console.log("lesson", lesson);
  return (
    <div className="mx-auto w-full max-w-3xl py-16 px-8">
      <h1 className="mb-6 text-3xl">{lesson.title}</h1>
      <p>{lesson.description}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  let { data: lessons, error } = await supabase.from("lessons").select("id");

  if (error) console.log("error get lessons", error);

  let paths: { params: { id: string } }[] = [{ params: { id: "0" } }];

  if (lessons) {
    paths = lessons.map(({ id }) => ({
      params: {
        id: id.toString(),
      },
    }));
  }

  return {
    paths,
    fallback: false,
  };
};

interface IdGetStaticPropsParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IdGetStaticPropsParams;

  let { data: lesson, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (error) console.log("error get lesson from [id]", error);

  return {
    props: {
      lesson,
    },
  };
};

export default LessonDetails;
