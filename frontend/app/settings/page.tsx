export default function SettingsPage() {
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center

        px-5
        py-10
      "
    >
      <div
        className="
          w-full
          max-w-2xl

          bg-white/70
          backdrop-blur-xl

          border
          border-white/40

          rounded-[32px]

          shadow-[0_20px_60px_rgba(0,0,0,0.08)]

          p-8
          sm:p-12

          text-center
        "
      >
        {/* Badge */}
        <div
          className="
            inline-flex
            items-center
            justify-center

            px-4
            py-1.5

            rounded-full

            bg-[#111111]
            text-white

            text-xs
            font-medium
            tracking-wide

            mb-6
          "
        >
          COMING SOON
        </div>

        {/* Title */}
        <h1
          className="
            text-3xl
            sm:text-5xl

            font-bold
            tracking-tight

            text-[#2D2D2D]

            mb-4
          "
        >
          Settings Panel
        </h1>

        {/* Subtitle */}
        <p
          className="
            text-sm
            sm:text-base

            text-zinc-500

            leading-relaxed

            max-w-xl
            mx-auto
          "
        >
          Soon you'll be able to customize your
          VedaAI experience, manage notifications,
          configure preferences, update profiles,
          and personalize your workflow seamlessly.
        </p>
      </div>
    </div>
  );
}