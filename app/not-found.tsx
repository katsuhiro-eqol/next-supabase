import Link from "next/link";

export default async function NotFound() {

    return (
      <div className="px-9 py-7">
        <p>ページが見つかりません</p>
        <Link href="/">戻る</Link>
      </div>
    );
  }
  