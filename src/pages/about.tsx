import { MainLayout } from "../components/layouts";

export default function AboutPage() {
  return (
    <MainLayout name="About" back={"/"}>
      <div className="mx-auto max-w-md flex flex-col gap-4">
        <p className="">Manage Your School in morder way.</p>
        <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt praesentium velit possimus, sunt mollitia asperiores repellendus voluptas itaque rem temporibus nulla laborum reprehenderit iste dolorum totam, illo quo dicta quae!</p>
      </div>
    </MainLayout>
  )
}