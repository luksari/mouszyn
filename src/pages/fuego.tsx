import dynamic from "next/dynamic";

const Fuego = dynamic(() => import("@/containers/fuego"), {
  ssr: false,
});

const Page = () => {
  return (
    <>
      <div>Hello</div>
      <Fuego />
    </>
  );
};

export default Page;

export async function getStaticProps() {
  return {
    props: {
      title: "Fuego",
    },
  };
}
