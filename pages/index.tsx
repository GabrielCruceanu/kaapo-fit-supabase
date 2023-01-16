import { supabase } from "#/utils/supabase";
import { Database } from "#/types/supabase";
import Link from "next/link";

type Lessons = Database["public"]["Tables"]["lessons"]["Row"];
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Blog({
  lessons,
  profiles,
}: {
  lessons: Lessons[];
  profiles: Profiles;
}) {
  console.log("lessons", lessons);
  console.log("profiles", profiles);

  return (
    <div className="flex min-h-screen w-full  items-center justify-center bg-gray-900 text-white">
      <div className="w-8/12 bg-gray-800 p-6">
        <h1 className="mb-6 text-3xl font-semibold">Blog</h1>
        <ul>
          {lessons.map((lesson) => (
            <Link key={lesson.id} href={`/${lesson.id}`}>
              <li className="mb-4 cursor-pointer border border-gray-200 p-4">
                <h3 className="mb-3 text-xl font-semibold">{lesson.title}</h3>
                <p>{lesson.description}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  let { data: lessons, error } = await supabase.from("lessons").select("*");
  let { data: profiles } = await supabase.from("profiles").select("*");
  if (error) console.log("error get lessons", error);

  return {
    props: {
      lessons,
      profiles,
    },
  };
};
