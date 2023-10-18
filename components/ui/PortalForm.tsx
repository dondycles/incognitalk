"use client";
import { useUserState } from "@/lib/store";
import { Button, Divider, Input, Link, Tooltip } from "@nextui-org/react";
import { Snippet } from "@nextui-org/snippet";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { firestore } from "@/lib/firebase";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Incognitalk from "./Incognitalk";

export default function PortalForm() {
  const date = new Date();
  const route = useRouter();
  const uuid = useMemo(() => {
    return crypto.randomUUID();
  }, []);
  const [status, setStatus] = useState<"create" | "login">("create");
  const user = useUserState();
  const {
    register,
    setError,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = useForm();
  const submit = async (data: FieldValues) => {
    if (status === "create") {
      await setDoc(doc(firestore, "sneakers", uuid), {
        username: data.username,
        id: uuid,
        createdAt: date.toLocaleString(),
      });
      user.setId(uuid);
      user.setUsername(data.username);
      user.setCreatedAt(date.toLocaleString());
      user.setIsSignedIn(true);
    }
    if (status === "login") {
      user.setId(data.id);
      user.setUsername(data.username);
      user.setIsSignedIn(true);
    }
    route.push("/");
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="m-auto max-w-[300px] w-full flex flex-col gap-4 rounded-2xl"
    >
      <Incognitalk />
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
              Above is your <span className=" text-primary">id</span>. Save it
              for later use.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              {...register("username", { required: "Username is required." })}
              variant="bordered"
              color="primary"
              label="username"
              classNames={{ inputWrapper: "border-primary" }}
              placeholder={"e.g., anonymousLemon9"}
            />
            <p className={`text-xs ${errors.username && "text-danger"}`}>
              {errors.username
                ? (errors.username.message as string)
                : "Think of a dummy name. Make it unrelated to you as possible."}
            </p>
          </div>
          <Button
            type="submit"
            className="btn-def"
            color={isSubmitting ? "default" : "primary"}
            variant="shadow"
          >
            {isSubmitting ? "CREATING..." : "CREATE"}
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
                {...register("id", { required: "Id is empty." })}
                variant="bordered"
                color="primary"
                label="id"
                classNames={{ inputWrapper: "border-primary" }}
              />
              <p className={`text-xs ${errors.id && "text-danger"}`}>
                {errors.id && (errors.id.message as string)}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Input
                {...register("username", { required: "Username is empty." })}
                variant="bordered"
                color="primary"
                label="username"
                classNames={{ inputWrapper: "border-primary" }}
              />
              <p className={`text-xs ${errors.username && "text-danger"}`}>
                {errors.username && (errors.username.message as string)}
              </p>
            </div>
            <Button
              type="submit"
              className="btn-def"
              color="primary"
              variant="shadow"
            >
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
