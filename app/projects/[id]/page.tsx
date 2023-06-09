import ProjectDetails from "@/components/ProjectDetails";
import ProjectSection from "@/components/ProjectSection";
import ProjectTask from "@/components/ProjectTask";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return (
    <div className="w-full max-w-5xl mx-auto my-0">
      <ProjectDetails id={id} />
      <ProjectSection id={id} />
      <ProjectTask id={id} />
    </div>
  );
};

export default page;
