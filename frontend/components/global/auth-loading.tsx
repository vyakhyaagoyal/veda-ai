export default function AuthLoading() {
  return (
    <div
      className="
        min-h-screen

        flex
        items-center
        justify-center

        bg-[#CECECE]
        lg:bg-[#E2E2E2]
      "
    >
      <div
        className="
          w-14
          h-14

          rounded-full

          border-[3px]
          border-black/10
          border-t-black

          animate-spin
        "
      />
    </div>
  );
}