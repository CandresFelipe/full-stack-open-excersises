import { Total } from "./Total";
import { Content } from "./Content";
import { Header } from "./Header";

export const Course = (props) => {
  const { course } = props;
  return (
    <>
      <Header title={course.name} variant="h2" />
      <div>
        {course.parts.map((course) => (
          <Content
            key={course.id}
            exercises={course.exercises}
            name={course.name}
          />
        ))}
      </div>
      <Total parts={course.parts} />
    </>
  );
};
