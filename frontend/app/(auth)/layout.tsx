import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="

        bg-[#CECECE]
        lg:bg-[#E2E2E2]

        flex
        items-center
        justify-center

        px-4
        py-8
      "
    >
      <div
        className="
          w-full
          max-w-4xl

          grid
          lg:grid-cols-2

          rounded-[40px]

          overflow-hidden

          shadow-[0_30px_80px_rgba(0,0,0,0.08)]

          border
          border-white/30

          bg-white/70
          backdrop-blur-2xl
        "
      >
        {/* LEFT PANEL */}
        <div
          className="
            hidden
            lg:flex

            flex-col
            justify-between

            p-8

            bg-[#111111]

            text-white

            relative
            overflow-hidden
          "
        >
          {/* Glow */}
          <div
            className="
              absolute
              top-[-100px]
              right-[-100px]

              w-[300px]
              h-[300px]

              rounded-full

              bg-orange-500/20

              blur-3xl
            "
          />

          {/* Branding */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <Image src="/veda-ai-logo-cropped.svg" alt="VedaAI Logo" width={40} height={40} />

              <h1 className="text-4xl font-bold tracking-tight">
                VedaAI
              </h1>
            </div>

            <h2
              className="
                text-4xl
                font-bold
                leading-tight
                tracking-tight
              "
            >
              AI-powered
              <br />
              assignment
              creation
              <br />
              for modern
              educators.
            </h2>

          </div>

          {/* Bottom */}
          <div className="space-y-2">
            {[
              "AI Assignment Generation",
              "Realtime Notifications",
              "PDF Export System",
              "Responsive Dashboard",
            ].map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-3

                  text-zinc-300
                "
              >
                <div
                  className="
                    w-2
                    h-2

                    rounded-full

                    bg-orange-400
                  "
                />

                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          className="
            flex
            items-center
            justify-center

            p-6
            sm:p-10
            lg:p-14
          "
        >
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}