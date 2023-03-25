import Image from "next/image";
import BasicTemplate from "./components/BasicTemplate";
import CardBlog from "./components/CardBlog";

export default function Home() {


  return (
    <BasicTemplate>
      <CardBlog />
      <CardBlog />
      <CardBlog />
      <CardBlog />
    </BasicTemplate>
  )
}
