import Layout1 from "../layouts/default";
import Link from "next/link";

const IndexPage = () => {
  return (
    <div>
      Hello World. <link href="/about" rel="/favicon.ico"></link>
    </div>
  );
};

IndexPage.Layout = Layout1;
export default IndexPage;
