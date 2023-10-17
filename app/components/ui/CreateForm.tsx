"use client";
import { Button, Divider, Input, Link, Tooltip } from "@nextui-org/react";
import { Snippet } from "@nextui-org/snippet";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateForm() {
  const uuid = useMemo(() => {
    return crypto.randomUUID();
  }, []);
  const [status, setStatus] = useState<"create" | "login">("create");
  const {
    register,
    setError,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = useForm();
  const submit = () => {};
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="m-auto max-w-[300px] w-full flex flex-col gap-4 rounded-2xl"
    >
      {status === "create" && (
        <>
          <div className="flex flex-col gap-1">
            <Snippet
              classNames={{
                content: "hidden",
                pre: "max-w-[calc(100%-32px)] ",
              }}
              hideSymbol
              color="primary"
              variant="bordered"
              codeString={uuid}
            >
              <p className="overflow-auto  scrollbar-hide ">
                <span className="text-xs font-black">id: </span>
                {uuid}
              </p>
            </Snippet>
            <p className="text-xs">
              above is your <span className=" text-primary">id </span>
              save it for later use.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              variant="bordered"
              color="primary"
              label="username"
              classNames={{ inputWrapper: "border-primary" }}
              placeholder={"e.g., anonymousLemon9"}
            />
            <p className="text-xs">
              think of a dummy name. make it unrelated to you as possible. pls.
            </p>
          </div>
          <Button className="btn-def" color="primary" variant="shadow">
            CREATE
          </Button>
          <Divider />
          <Button
            color="secondary"
            variant="shadow"
            className="btn-def"
            onClick={() => setStatus("login")}
          >
            already have one?
          </Button>
        </>
      )}
      {status === "login" && (
        <>
          <>
            <div className="flex flex-col gap-1">
              <Input
                variant="bordered"
                color="primary"
                label="id"
                classNames={{ inputWrapper: "border-primary" }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Input
                variant="bordered"
                color="primary"
                label="username"
                classNames={{ inputWrapper: "border-primary" }}
              />
            </div>
            <Button className="btn-def" color="primary" variant="shadow">
              SNEAK IN
            </Button>
            <Divider />
            <Button
              color="secondary"
              variant="shadow"
              className="btn-def"
              onClick={() => setStatus("create")}
            >
              don't have one yet?
            </Button>
          </>
        </>
      )}
    </form>
  );
}
