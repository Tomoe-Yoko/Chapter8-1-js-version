import React from "react";
import Image from "next/image";

const BookDetails = ({ index, book }) => {
  return (
    <div className="flex w-full mb-4">
      <div>
        <Image src={book.image} alt="" width={140} height={180} />
      </div>
      <div className="list-none text-black ml-4">
        <ul>
          <li>{index && index + "."}</li>
          <li>{book.title}</li>
          <li>{book.author}</li>
          <li>{book.publisher}刊</li>
          <li>{book.published}発売</li>
        </ul>
      </div>
    </div>
  );
};

export default BookDetails;
