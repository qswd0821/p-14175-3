"use client";

import type { PostWithContentDto } from "@/type/post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  const { id: idStr } = useParams<{ id: string }>();
  const id = Number(idStr);

  const [post, setPost] = useState<PostWithContentDto | null>(null);

  const deletePost = (id: number) => {
    fetch(`http://localhost:8080/api/v1/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);

        router.replace("/posts");
      });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/posts/${id}`)
      .then((res) => res.json())
      .then(setPost);
  }, [id]);

  if (post == null) return <div>로딩중...</div>;

  return (
    <>
      <h1>글 상세페이지</h1>

      <div>번호 : {post.id}</div>
      <div>제목: {post.title}</div>
      <div style={{ whiteSpace: "pre-line" }}>{post.content}</div>

      <div className="flex gap-2">
        <button
          className="p-2 rounded border cursor-pointer"
          onClick={() =>
            confirm(`${post.id}번 글을 정말로 삭제하시겠습니까?`) &&
            deletePost(post.id)
          }
        >
          삭제
        </button>
      </div>
    </>
  );
}