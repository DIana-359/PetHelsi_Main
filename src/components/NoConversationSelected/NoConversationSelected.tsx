import Icon from "../Icon";

export default function NoConversationSelected() {
  return (
    <div className=" hidden 2xl:flex items-center justify-center w-full bg-background p-[16px]">
      <div className="flex flex-col items-center">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-chat-any-selected"
          width="128px"
          height="128px"
          className="fill-background w-[128px] h-[128px] rotate-180 md:rotate-0 stroke-primary-300 mb-[24px]"
        />
        <p className="text-[16px] leading-[1] font-[400] text-gray-900 text-center">
          Оберіть чат, щоб розпочати спілкування
        </p>
      </div>
    </div>
  );
}
