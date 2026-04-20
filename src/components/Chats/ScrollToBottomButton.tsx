interface ScrollToBottomButtonProps {
  visible: boolean;
  count: number;
  onClick: () => void;
}

export default function ScrollToBottomButton({
  visible,
  count,
  onClick,
}: ScrollToBottomButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute bottom-[72px] right-[16px] z-10 transition-all duration-200 ${
        visible
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-75 pointer-events-none"
      }`}
    >
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="39"
            height="39"
            rx="19.5"
            fill="white"
          />
          <rect
            x="0.5"
            y="0.5"
            width="39"
            height="39"
            rx="19.5"
            stroke="#F2F4F8"
          />
          <path d="M26 17L20 23L14 17" stroke="#1E88E5" />
        </svg>

        {count > 0 && (
          <span className="absolute -top-[16px] left-1/2 -translate-x-1/2 min-w-[21px] h-[21px] px-[4px] rounded-full bg-[#1E88E5] flex items-center justify-center text-[11px] font-[500] leading-[1] text-white">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </div>
    </button>
  );
}
