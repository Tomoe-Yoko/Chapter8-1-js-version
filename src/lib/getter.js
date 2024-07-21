import prisma from "./prisma";
//APIで取得した書籍情報の中の必要な部分だけオブジェクトに入れる
//Google Books APIから取得した本の情報を整形して、新しいオブジェクトを作成
const createBook = (book) => {
  const authors = book.volumeInfo.authors;
  const price = book.saleInfo.listPrice;
  const img = book.volumeInfo.imageLinks;
  return {
    id: book.id,
    title: book.volumeInfo.title,
    author: authors ? authors.join(",") : "",

    price: price ? price.amount : 0,
    publisher: book.volumeInfo.publisher,
    published: book.volumeInfo.publishedDate,
    image: img ? img.smallThumbnail : "./vercel.svg",
  };
};
export default createBook;

//検索結果を取得
export async function getBooksByKeyword(keyword) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=ja&maxResults=20&printType=books`
  );
  const result = await res.json();
  // console.log(result);
  const books = [];
  //`result.items`配列の各要素を順番に取り出し、変数`b`に割り当てる
  for (const b of result.items) {
    books.push(createBook(b));
  }
  return books;
}

export async function getBookById(id) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
  const result = await res.json();
  return createBook(result);
}

export async function getReviewById(id) {
  return await prisma.reviews.findUnique({
    where: {
      id: id,
    },
  });
}
export async function getAllReviews() {
  return await prisma.reviews.findMany({
    orderBy: {
      read: "desc",
    },
  });
}
