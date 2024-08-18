export default function Logo({ size = "h-full max-h-20" }) {
  return (
    <img src="/kokotask_logo.png" alt="Kokotask Logo" className={size} />
  );
}