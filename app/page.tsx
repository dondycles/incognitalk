import { Button } from "@nextui-org/button";
import Main from "@/components/ui/Main";
import { Link } from "@nextui-org/link";
import Incognitalk from "@/components/ui/Incognitalk";
export default function Home() {
  return (
    <Main>
      <article className="m-auto">
        <Incognitalk />
        <p>
          send your message to someone,{" "}
          <span className=" text-secondary font-black">anonymously</span>, here.
        </p>
        <div className=" flex flex-row gap-2">
          <Button
            as={Link}
            href="/portal"
            color="primary"
            variant="shadow"
            className="btn-def mt-2 w-full"
            radius="sm"
          >
            SNEAK IN
          </Button>
        </div>
      </article>
      <p className="text-center">
        created by{" "}
        <Link
          color="primary"
          href="https://facebook.com/dondycles"
          target="_blank"
        >
          @dondycles
        </Link>
      </p>
    </Main>
  );
}
