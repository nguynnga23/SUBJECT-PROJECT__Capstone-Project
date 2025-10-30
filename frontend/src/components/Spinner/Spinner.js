function Spinner({ size = "w-10 h-10", color = "border-primary" }) {
  return (
    <div
      className={`${size} border-4 ${color} border-t-transparent rounded-full animate-spin`}
    ></div>
  );
}

export default Spinner;
