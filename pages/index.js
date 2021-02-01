import Layout1 from "../layouts/default";
import Link from "next/link";

const IndexPage = () => {
  return (
    <div>
          Hello World, Dev. <link href="/about" rel="/favicon.ico"></link>
          <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button>
    </div>
  );
};

IndexPage.Layout = Layout1;
export default IndexPage;
