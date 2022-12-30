import TraineeDashboard from "../traineeComponents/TraineeDashboard";

const CourseSubtitleViewWrapper = ({ subtitle }) => {
  return (
    <TraineeDashboard>
      <CourseSubtitleView subtitle={subtitle} />
    </TraineeDashboard>
  );
};

const CourseSubtitleView = ({ subtitle }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "5%",
      }}
    >
      <h1>Les</h1>
      <iframe
        style={{
          marginLeft: 150,
          marginTop: 10,
        }}
        width="70%"
        height="50%"
        src={"https://www.youtube.com/embed/UqvpIenUmL0"}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div>hello</div>
    </div>
  );
};

export default CourseSubtitleViewWrapper;
