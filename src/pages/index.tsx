const Page = () => {
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Page;

export async function getStaticProps() {
  return {
    props: {
      title: "Home",
    },
  };
}
