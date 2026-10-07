type SectionHeadingProps = {
  kicker: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  kicker,
  title,
  copy,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="font-space text-[12px] font-bold uppercase tracking-[0.3em] text-accent/60 sm:text-[14px]">
        {kicker}
      </p>
      <h2 className="mt-3 font-fancy text-[clamp(1.75rem,6vw,3rem)] font-medium leading-[1.05] tracking-tight break-words text-white">
        {title}
      </h2>
      {copy ? (
        <p className="mt-5 font-space text-sm leading-relaxed text-muted sm:text-base">{copy}</p>
      ) : null}
    </div>
  );
}
