import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <p className="text-sm text-indigo-600">۴۰۴</p>
        <h1 className="mt-2 text-2xl font-extrabold">این صفحه در میز کار نیست</h1>
        <Link href="/" className="mt-4 inline-flex text-sm font-semibold text-indigo-600">
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}
