export default function Console({ output }) {
  return (
    <div className="px-16 py-7 text-white font-mono">
      {output.map((item) => {
        return <p>{item}</p>;
      })}
    </div>
  );
}
