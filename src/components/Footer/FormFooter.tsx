"use client";
import { Button, Input, Form } from "@heroui/react";
import { useProfile } from "@/hooks/owners/useProfile";

export const FormFooter = () => {
  const { data } = useProfile();

  if (data) return null;

  return (
    <div>
      <h3 className="text-[16px] lg:text-[14px] uppercase pb-4">
        Oтримай знижку -10%
      </h3>
      <Form className="flex flex-col pb-14 md:pb-0 md:gap-2">
        <Input
          classNames={{
            inputWrapper: "border border-primary text-primary",
            input: "placeholder:text-primary-300 text-white",
            errorMessage: "text-error-200 text-[16px]",
          }}
          type="email"
          name="email"
          size="sm"
          variant="bordered"
          color="primary"
          placeholder="Введіть e-mail"
          isRequired
        />
        <Button
          type="submit"
          radius="sm"
          size="sm"
          className="bg-white text-primary w-full"
        >
          Отримати знижку
        </Button>
      </Form>
    </div>
  );
};
