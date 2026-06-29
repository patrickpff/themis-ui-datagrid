import { useEffect, useState } from "react";
import DataGrid from "../components/DataGrid";
import type { Column } from "@/types/datagrid.types";

type Books = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
};

const columns: Column<Books>[] = [
  { key: "author", header: "Author", filterable: true },
  { key: "country", header: "Country" },
  { key: "imageLink", header: "Image Link" },
  { key: "language", header: "Language" },
  { key: "link", header: "Link" },
  { key: "pages", header: "Pages" },
  { key: "title", header: "Title", filterable: true },
  { key: "year", header: "Year" },
];

export default function App() {
  const [data, setData] = useState<Books[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json",
    )
      .then((response) => response.json())
      .then((books: Books[]) => {
        setData(books);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>DataGrid Playground</h1>

      <DataGrid
        columns={columns}
        data={data}
        loading={loading}
        pagination={{ pageSize: 5, maxVisiblePages: 5 }}
      />
    </div>
  );
}
