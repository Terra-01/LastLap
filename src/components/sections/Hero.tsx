import { hero, waitlist, site } from "@/lib/content";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-night pt-24"
    >
      <video
        className="absolute inset-0 size-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={hero.poster}
      >
        <source src={hero.video} type="video/webm" />
        <source src={hero.videoMp4} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />

      <Container className="relative z-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal duration={0.55}>
            <div className="flex flex-col gap-6">
              {/* Opening date, made loud */}
              <div className="flex items-center gap-3">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand/70 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
                </span>
                <span className="text-[15px] font-semibold uppercase tracking-[0.14em] text-foreground sm:text-[17px]">
                  {site.openingLine}
                </span>
              </div>

              <h1 className="t-display">
                {hero.headingLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <p className="t-body max-w-[34rem] text-foreground/80">{hero.paragraph}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} duration={0.55}>
            <div className="rounded-[2px] border border-hairline bg-night/80 p-5 backdrop-blur-md sm:p-6 lg:ml-auto lg:w-full lg:max-w-[26rem]">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <span className="t-small font-semibold text-foreground">Join the waitlist</span>
                <span className="inline-flex items-center gap-2 rounded-[2px] border border-brand/40 bg-brand/10 px-2.5 py-1 t-small text-brand">
                  {waitlist.perkShort}
                </span>
              </div>
              <WaitlistForm compact />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
