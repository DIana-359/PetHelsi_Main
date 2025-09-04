type IconType = {
  sprite: string,
  id: string,
  width: string,
  height: string,
  className: string,
  onClick?: () => void;
}
const Icon = ({
  sprite,
  id,
  width = "28px",
  height = "28px",
  className,
  onClick,
}: IconType) => {
  return (
    <svg width={width} height={height} className={className} onClick={onClick}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
};

export default Icon;
