const Button = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className="bg-stone-950 text-amber-50 cursor-pointer px-2 py-1 text-xl rounded-md ml-2"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
