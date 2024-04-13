import type { Metadata } from "next";
import { Booklist } from "./components/Booklist/Booklist";

export default function IndexPage() {
  return <Booklist />;
}

export const metadata: Metadata = {
  title: "Johnny Book Store",
};
