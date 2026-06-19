import DataGrid from "../components/DataGrid";
import type { Column } from "@/types/datagrid.types";

type Books = {
  id: number;
  title: string;
  author: string;
  year: number;
  publisher: string;
};

const columns: Column<Books>[] = [
  { key: "id", header: "ID" },
  { key: "title", header: "Title" },
  { key: "author", header: "Author" },
  { key: "year", header: "Year" },
  { key: "publisher", header: "Publisher" },
];

const data: Books[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    publisher: "Charles Scribner's Sons",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    publisher: "J.B. Lippincott & Co.",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    publisher: "Secker & Warburg",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    publisher: "T. Egerton",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    publisher: "Little, Brown and Company",
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    publisher: "George Allen & Unwin",
  },
  {
    id: 7,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    year: 1953,
    publisher: "Ballantine Books",
  },
  {
    id: 8,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    year: 1954,
    publisher: "George Allen & Unwin",
  },
  {
    id: 9,
    title: "Animal Farm",
    author: "George Orwell",
    year: 1945,
    publisher: "Secker & Warburg",
  },
  {
    id: 10,
    title: "Brave New World",
    author: "Aldous Huxley",
    year: 1932,
    publisher: "Chatto & Windus",
  },
];

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DataGrid Playground</h1>
      <DataGrid columns={columns} data={data} />
    </div>
  );
}
