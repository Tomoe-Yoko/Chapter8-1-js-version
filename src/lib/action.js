"use server";

import { redirect } from "next/navigation";
import prisma from "./prisma";
import { getBookById } from "./getter";

//formからの入力値をデータベースに登録
export async function addReview(data) {
  const book = await getBookById(data.get("id"));
  const input = {
    title: book.title,
    author: book.author,
    price: Number(book.price),
    publisher: book.publisher,
    published: book.published,
    image: book.image,
    read: new Data(data.get("read")),
    memo: data.get("memo"),
  };

  //新規データであれば、登録、既存データであれば更新
  await prisma.reviews.upsert({
    // ... data to create a Reviews
    create: Object.assign({}, input, { id: data.get("id") }),

    update: input,
    // ... in case it already exists, update

    where: {
      // ... the filter for the Reviews we want to update
      id: data.get("id"),
    },
  });
  //処理成功の後はトップにリダイレクト
  redirect("/");
}
//削除ボタンで指定のレビュー情報を削除
export async function removeReview(data) {
  await prisma.reviews.delete({
    where: { id: data },
  });
  redirect("/");
}
//処理成功の後はトップにリダイレクト
