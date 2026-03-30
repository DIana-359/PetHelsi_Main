export default function PetsEmptyTitle() {
  return (
    <div className=" flex flex-col items-center text-center">
      <h3 className="lg:text-[24px] font-bold font-family mb-2 text-[#333f5d]">
        Ви ще не додали{" "}
        <span className="block lg:inline">жодної тварини :(</span>
      </h3>
      <p className="lg:text-[16px] text-[#333f5d] mb-8">
        Додавайте своїх тварин та з легкістю записуйтесь на консультацію
      </p>
    </div>
  );
}
