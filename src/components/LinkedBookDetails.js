// import React from "react";
import Link from "next/link";
import BookDetails from "./BookDetails";

const LinkedBookDetails = ({ index, book }) => {
  return (
    <Link href={`/edit/${book.id}`}>
      <div className="hover:bg-green-50">
        <BookDetails index={index} book={book} />
      </div>
    </Link>
  );
};

export default LinkedBookDetails;
