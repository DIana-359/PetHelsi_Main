"use client"
import { Button, Input, Form } from "@heroui/react"

export const FormFooter = () => {

  return (
    <div>
      <h3 className="text-[12px] uppercase pb-4">
            Oтримай знижку -10%
          </h3>
      <Form
        className="flex flex-col lg:gap-2 lg:w-[250px] lg:mr-20"
      >
            <Input
              classNames={{
                inputWrapper: "border border-primary text-primary",
                input: "placeholder:text-primary-300 text-white",
                errorMessage: "text-error-200 text-sm", 
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
              className="bg-white text-primary w-full xs:w-[168px]"
              >
              Отримати знижку
            </Button>
          </Form>
    </div>
  )
}